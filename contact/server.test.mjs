import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { createContactServer } from "./server.mjs";

const baseConfig = {
  allowedOrigins: new Set(["https://filius.app"]),
  fromAddress: "kontakt@filius.app",
  toAddress: "support@filius.app",
  rateLimitMax: 5,
  rateLimitWindowMs: 15 * 60 * 1000,
  retentionDays: 180,
};

const validBody = new URLSearchParams({
  locale: "en",
  email: "learner@example.org",
  category: "support",
  message: "The simulated DNS request never receives a response.",
  appVersion: "1.0",
  device: "iPadOS 19, iPad Air",
});

async function withServer(options, run) {
  const server = createContactServer(options);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    server.close();
    await once(server, "close");
  }
}

function request(baseUrl, body = validBody, headers = {}) {
  return fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Origin: "https://filius.app",
      "CF-Connecting-IP": "203.0.113.10",
      ...headers,
    },
    body,
  });
}

test("valid submissions are relayed without visitor IP or attachments", async () => {
  const messages = [];
  await withServer(
    {
      config: baseConfig,
      sendMail: async (message) => messages.push(message),
      logger: { info() {}, error() {} },
    },
    async (baseUrl) => {
      const response = await request(baseUrl);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), {
        ok: true,
        message: "Thank you. Your message was sent to support.",
      });
    },
  );

  assert.equal(messages.length, 1);
  assert.equal(messages[0].replyTo, "learner@example.org");
  assert.equal(messages[0].to, "support@filius.app");
  assert.equal(messages[0].disableFileAccess, true);
  assert.equal(messages[0].disableUrlAccess, true);
  assert.match(messages[0].text, /The simulated DNS request/);
  assert.doesNotMatch(messages[0].text, /203\.0\.113\.10/);
});

test("invalid submissions are rejected before mail is sent", async () => {
  let sent = false;
  await withServer(
    {
      config: baseConfig,
      sendMail: async () => {
        sent = true;
      },
      logger: { info() {}, error() {} },
    },
    async (baseUrl) => {
      const response = await request(
        baseUrl,
        new URLSearchParams({
          locale: "de",
          email: "not-an-email",
          category: "support",
          message: "Zu kurz",
        }),
      );
      assert.equal(response.status, 400);
      assert.equal((await response.json()).ok, false);
    },
  );
  assert.equal(sent, false);
});

test("the honeypot silently accepts automated submissions", async () => {
  let sent = false;
  const body = new URLSearchParams(validBody);
  body.set("company", "Example Incorporated");

  await withServer(
    {
      config: baseConfig,
      sendMail: async () => {
        sent = true;
      },
      logger: { info() {}, error() {} },
    },
    async (baseUrl) => {
      const response = await request(baseUrl, body);
      assert.equal(response.status, 200);
      assert.equal((await response.json()).ok, true);
    },
  );
  assert.equal(sent, false);
});

test("cross-origin submissions are rejected", async () => {
  await withServer(
    {
      config: baseConfig,
      sendMail: async () => assert.fail("mail must not be sent"),
      logger: { info() {}, error() {} },
    },
    async (baseUrl) => {
      const response = await request(baseUrl, validBody, {
        Origin: "https://example.org",
      });
      assert.equal(response.status, 403);
    },
  );
});

test("rate limiting uses an ephemeral client identifier", async () => {
  const config = { ...baseConfig, rateLimitMax: 1 };
  await withServer(
    {
      config,
      sendMail: async () => {},
      logger: { info() {}, error() {} },
    },
    async (baseUrl) => {
      assert.equal((await request(baseUrl)).status, 200);
      const limited = await request(baseUrl);
      assert.equal(limited.status, 429);
      assert.equal(limited.headers.has("retry-after"), true);
    },
  );
});

test("health checks do not require SMTP traffic", async () => {
  await withServer(
    {
      config: baseConfig,
      sendMail: async () => assert.fail("mail must not be sent"),
      logger: { info() {}, error() {} },
    },
    async (baseUrl) => {
      const response = await fetch(`${baseUrl}/healthz`);
      assert.equal(response.status, 200);
      assert.equal(await response.text(), "ok\n");
    },
  );
});

test("non-JavaScript submissions receive a localized confirmation page", async () => {
  await withServer(
    {
      config: baseConfig,
      sendMail: async () => {},
      logger: { info() {}, error() {} },
    },
    async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: {
          Accept: "text/html",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Origin: "https://filius.app",
          "CF-Connecting-IP": "203.0.113.20",
        },
        body: validBody,
      });
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type"), /text\/html/);
      const html = await response.text();
      assert.match(html, /Message sent/);
      assert.match(html, /href="\/en\/support\/"/);
    },
  );
});
