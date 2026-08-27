import assert from "node:assert/strict";
import { once } from "node:events";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";
import { createContactServer, loadConfig } from "./server.mjs";

const baseEnv = {
  PORT: "3000",
  CONTACT_SMTP_HOST: "smtp.example.invalid",
  CONTACT_SMTP_PORT: "465",
  CONTACT_SMTP_SECURE: "true",
  CONTACT_SMTP_USERNAME: "smtp-user@example.invalid",
  CONTACT_SMTP_PASSWORD: "unit-test-placeholder.invalid",
  CONTACT_FROM_ADDRESS: "smtp-user@example.invalid",
  CONTACT_TO_ADDRESS: "recipient@example.invalid",
};

const baseConfig = {
  allowedOrigins: new Set(["https://filius.app"]),
  fromAddress: "smtp-user@example.invalid",
  toAddress: "recipient@example.invalid",
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

test("the Compose override mounts the SMTP password as a runtime secret", async () => {
  const override = await readFile(
    new URL("../compose.smtp-secret.yaml", import.meta.url),
    "utf8",
  );

  assert.match(override, /user:\s*"1000:1000"/);
  assert.match(override, /CONTACT_SMTP_PASSWORD:\s*""/);
  assert.match(
    override,
    /CONTACT_SMTP_PASSWORD_FILE:\s*\/run\/secrets\/contact_smtp_password/,
  );
  assert.match(override, /secrets:\s*[\r\n]+\s*- contact_smtp_password/);
  assert.match(
    override,
    /file:\s*\$\{CONTACT_SMTP_PASSWORD_SECRET_FILE:\?[^}]+\}/,
  );
});

test("loadConfig requires an SMTP password", () => {
  assert.throws(
    () =>
      loadConfig({
        ...baseEnv,
        CONTACT_SMTP_PASSWORD: "",
        CONTACT_SMTP_PASSWORD_FILE: "",
      }),
    /CONTACT_SMTP_PASSWORD or CONTACT_SMTP_PASSWORD_FILE/,
  );
});

test("loadConfig accepts a password from a mounted secret file", async () => {
  const directory = await mkdtemp(`${tmpdir()}/filius-contact-`);
  const secretPath = `${directory}/smtp-password`;
  await writeFile(secretPath, "unit-test-file-placeholder.invalid\n", "utf8");

  try {
    const config = loadConfig({
      ...baseEnv,
      CONTACT_SMTP_PASSWORD: "",
      CONTACT_SMTP_PASSWORD_FILE: secretPath,
    });

    assert.equal(config.smtp.password, "unit-test-file-placeholder.invalid");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("loadConfig rejects an empty mounted secret file", async () => {
  const directory = await mkdtemp(`${tmpdir()}/filius-contact-`);
  const secretPath = join(directory, "smtp-password");
  await writeFile(secretPath, "\n", "utf8");

  try {
    assert.throws(
      () =>
        loadConfig({
          ...baseEnv,
          CONTACT_SMTP_PASSWORD: "",
          CONTACT_SMTP_PASSWORD_FILE: secretPath,
        }),
      /CONTACT_SMTP_PASSWORD or CONTACT_SMTP_PASSWORD_FILE/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("loadConfig reports an unreadable password file", async () => {
  const directory = await mkdtemp(`${tmpdir()}/filius-contact-`);

  try {
    assert.throws(
      () =>
        loadConfig({
          ...baseEnv,
          CONTACT_SMTP_PASSWORD: "",
          CONTACT_SMTP_PASSWORD_FILE: join(directory, "missing-password"),
        }),
      /ENOENT/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("loadConfig prefers the direct password when both sources are set", async () => {
  const directory = await mkdtemp(`${tmpdir()}/filius-contact-`);
  const secretPath = `${directory}/smtp-password`;
  await writeFile(secretPath, "unit-test-file-placeholder.invalid\n", "utf8");

  try {
    const config = loadConfig({
      ...baseEnv,
      CONTACT_SMTP_PASSWORD: "unit-test-direct-placeholder.invalid",
      CONTACT_SMTP_PASSWORD_FILE: secretPath,
    });

    assert.equal(config.smtp.password, "unit-test-direct-placeholder.invalid");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
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
  assert.equal(messages[0].to, baseConfig.toAddress);
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
