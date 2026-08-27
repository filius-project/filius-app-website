import { createHash, randomBytes, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
import nodemailer from "nodemailer";

const MAX_BODY_BYTES = 16 * 1024;
const CATEGORIES = new Set([
  "support",
  "feedback",
  "accessibility",
  "privacy",
  "other",
]);
const LOCALES = new Set(["de", "en", "fr"]);

const responseCopy = {
  de: {
    success: "Danke. Deine Nachricht wurde an den Support gesendet.",
    invalid:
      "Bitte prüfe E-Mail-Adresse, Thema und Nachricht. Die Nachricht muss zwischen 20 und 4.000 Zeichen lang sein.",
    rateLimited:
      "Zu viele Sendeversuche. Bitte warte einige Minuten oder nutze die Support-E-Mail.",
    unavailable:
      "Die Nachricht konnte gerade nicht gesendet werden. Bitte versuche es erneut oder nutze support@filius.app.",
    forbidden: "Die Anfrage konnte nicht angenommen werden.",
    title: "Nachricht gesendet",
    back: "Zurück zum Support",
  },
  en: {
    success: "Thank you. Your message was sent to support.",
    invalid:
      "Check the email address, topic, and message. The message must contain between 20 and 4,000 characters.",
    rateLimited:
      "Too many attempts. Wait a few minutes or use the support email address.",
    unavailable:
      "The message could not be sent right now. Please try again or use support@filius.app.",
    forbidden: "The request could not be accepted.",
    title: "Message sent",
    back: "Back to support",
  },
  fr: {
    success: "Merci. Votre message a été envoyé à l’assistance.",
    invalid:
      "Vérifiez l’adresse e-mail, le sujet et le message. Le message doit contenir entre 20 et 4 000 caractères.",
    rateLimited:
      "Trop de tentatives. Patientez quelques minutes ou utilisez l’adresse e-mail d’assistance.",
    unavailable:
      "Le message ne peut pas être envoyé pour le moment. Réessayez ou utilisez support@filius.app.",
    forbidden: "La demande n’a pas pu être acceptée.",
    title: "Message envoyé",
    back: "Retour à l’assistance",
  },
};

function envText(env, name, fallback = "") {
  const value = String(env[name] ?? "").trim();
  return value || fallback;
}

function envInteger(env, name, fallback) {
  const value = Number.parseInt(envText(env, name), 10);
  return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}

function envFlag(env, name, fallback = false) {
  const value = envText(env, name);
  return value ? value.toLowerCase() === "true" : fallback;
}

function loadSecret(env, directName, fileName) {
  const direct = envText(env, directName);
  if (direct) return direct;
  const file = envText(env, fileName);
  return file ? readFileSync(file, "utf8").trim() : "";
}

export function loadConfig(env = process.env) {
  const smtpPort = envInteger(env, "CONTACT_SMTP_PORT", 465);
  const config = {
    port: envInteger(env, "PORT", 3000),
    allowedOrigins: new Set(
      envText(
        env,
        "CONTACT_ALLOWED_ORIGINS",
        "https://filius.app,https://www.filius.app",
      )
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    ),
    smtp: {
      host: envText(env, "CONTACT_SMTP_HOST"),
      port: smtpPort,
      secure: envFlag(env, "CONTACT_SMTP_SECURE", smtpPort === 465),
      username: envText(env, "CONTACT_SMTP_USERNAME"),
      password: loadSecret(
        env,
        "CONTACT_SMTP_PASSWORD",
        "CONTACT_SMTP_PASSWORD_FILE",
      ),
    },
    fromAddress: envText(env, "CONTACT_FROM_ADDRESS"),
    toAddress: envText(env, "CONTACT_TO_ADDRESS"),
    rateLimitMax: envInteger(env, "CONTACT_RATE_LIMIT_MAX", 5),
    rateLimitWindowMs:
      envInteger(env, "CONTACT_RATE_LIMIT_WINDOW_MINUTES", 15) * 60 * 1000,
    retentionDays: envInteger(env, "CONTACT_RETENTION_DAYS", 180),
  };

  const missing = [
    ["CONTACT_SMTP_HOST", config.smtp.host],
    ["CONTACT_SMTP_USERNAME", config.smtp.username],
    [
      "CONTACT_SMTP_PASSWORD or CONTACT_SMTP_PASSWORD_FILE",
      config.smtp.password,
    ],
    ["CONTACT_FROM_ADDRESS", config.fromAddress],
    ["CONTACT_TO_ADDRESS", config.toAddress],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length) {
    throw new Error(
      `Missing required contact-service configuration: ${missing.join(", ")}`,
    );
  }

  return config;
}

function createTransport(config) {
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    requireTLS: !config.smtp.secure,
    auth: {
      user: config.smtp.username,
      pass: config.smtp.password,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: {
      minVersion: "TLSv1.2",
      servername: config.smtp.host,
    },
  });
}

function createRateLimiter({ max, windowMs, now = Date.now }) {
  const entries = new Map();
  const salt = randomBytes(32);
  let lastSweep = 0;

  return {
    consume(identifier) {
      const timestamp = now();
      if (timestamp - lastSweep >= windowMs || entries.size >= 10_000) {
        for (const [entryKey, entry] of entries) {
          if (entry.expiresAt <= timestamp) entries.delete(entryKey);
        }
        while (entries.size >= 10_000) {
          const oldestKey = entries.keys().next().value;
          if (!oldestKey) break;
          entries.delete(oldestKey);
        }
        lastSweep = timestamp;
      }
      const key = createHash("sha256")
        .update(salt)
        .update(identifier || "unknown")
        .digest("hex");
      const existing = entries.get(key);

      if (!existing || existing.expiresAt <= timestamp) {
        entries.set(key, { count: 1, expiresAt: timestamp + windowMs });
        return { allowed: true, retryAfterSeconds: 0 };
      }

      if (existing.count >= max) {
        return {
          allowed: false,
          retryAfterSeconds: Math.max(
            1,
            Math.ceil((existing.expiresAt - timestamp) / 1000),
          ),
        };
      }

      existing.count += 1;
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}

function localeFrom(value) {
  return LOCALES.has(value) ? value : "de";
}

function normalizeText(value, maximum) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, maximum);
}

function isValidEmail(value) {
  return (
    value.length <= 254 &&
    /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/u.test(value) &&
    !/[\r\n]/u.test(value)
  );
}

function validateSubmission(params) {
  const submission = {
    locale: localeFrom(params.get("locale")),
    company: normalizeText(params.get("company"), 200),
    name: normalizeText(params.get("name"), 100),
    email: normalizeText(params.get("email"), 254),
    category: normalizeText(params.get("category"), 32),
    message: normalizeText(params.get("message"), 4000),
    appVersion: normalizeText(params.get("appVersion"), 100),
    device: normalizeText(params.get("device"), 160),
  };

  const valid =
    isValidEmail(submission.email) &&
    CATEGORIES.has(submission.category) &&
    submission.message.length >= 20 &&
    submission.message.length <= 4000;

  return { valid, submission };
}

function clientIdentifier(request) {
  const cloudflareAddress = request.headers["cf-connecting-ip"];
  if (typeof cloudflareAddress === "string" && cloudflareAddress) {
    return cloudflareAddress;
  }
  const realAddress = request.headers["x-real-ip"];
  if (typeof realAddress === "string" && realAddress) return realAddress;
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded) {
    return forwarded.split(",", 1)[0].trim();
  }
  return request.socket.remoteAddress ?? "unknown";
}

async function readRequestBody(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("Request body too large");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function wantsJson(request) {
  return String(request.headers.accept ?? "").includes("application/json");
}

function supportPath(locale) {
  return locale === "de" ? "/support/" : `/${locale}/support/`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function htmlResponse(locale, message, successful) {
  const copy = responseCopy[locale];
  const title = successful ? copy.title : message;
  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>${escapeHtml(title)} – Filius on iPad</title>
  <style>body{margin:0;background:#f4f1e8;color:#17203f;font:1.1rem/1.6 system-ui,sans-serif}main{width:min(42rem,calc(100% - 2rem));margin:10vh auto;padding:clamp(1.5rem,5vw,3rem);box-sizing:border-box;border:1px solid #d7d4ca;border-radius:1.5rem;background:#fff;box-shadow:0 1rem 3rem #17203f18}h1{font-size:clamp(2.2rem,7vw,4.5rem);line-height:1;margin:.2rem 0 1.2rem}a{display:inline-flex;margin-top:1rem;padding:.7rem 1rem;border-radius:999px;background:#17203f;color:#fff;font-weight:700;text-decoration:none}</style>
</head>
<body><main><p>Filius on iPad</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p><a href="${supportPath(locale)}">${escapeHtml(copy.back)}</a></main></body>
</html>`;
}

function sendResponse(
  request,
  response,
  { status, locale, message, ok, headers = {} },
) {
  const commonHeaders = {
    "Cache-Control": "no-store",
    "Content-Security-Policy":
      "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    ...headers,
  };

  if (wantsJson(request)) {
    response.writeHead(status, {
      ...commonHeaders,
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify({ ok, message }));
    return;
  }

  response.writeHead(status, {
    ...commonHeaders,
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(htmlResponse(locale, message, ok));
}

function mailText(submission, requestId) {
  const optional = [
    submission.name ? `Name: ${submission.name}` : "",
    submission.appVersion ? `App version: ${submission.appVersion}` : "",
    submission.device ? `Device: ${submission.device}` : "",
  ].filter(Boolean);

  return [
    "A request was submitted through the contact form on filius.app.",
    "",
    `Request ID: ${requestId}`,
    `Language: ${submission.locale}`,
    `Category: ${submission.category}`,
    `Reply address: ${submission.email}`,
    ...optional,
    "",
    "Message:",
    submission.message,
  ].join("\n");
}

export function createContactServer({
  config,
  sendMail,
  logger = console,
  now = Date.now,
}) {
  const rateLimiter = createRateLimiter({
    max: config.rateLimitMax,
    windowMs: config.rateLimitWindowMs,
    now,
  });

  return createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://contact.internal");

    if (request.method === "GET" && url.pathname === "/healthz") {
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      });
      response.end("ok\n");
      return;
    }

    if (url.pathname !== "/api/contact" || request.method !== "POST") {
      response.writeHead(404, {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      });
      response.end("not found\n");
      return;
    }

    let locale = "de";
    try {
      const origin = String(request.headers.origin ?? "");
      if (!config.allowedOrigins.has(origin)) {
        sendResponse(request, response, {
          status: 403,
          locale,
          message: responseCopy[locale].forbidden,
          ok: false,
        });
        return;
      }

      const contentType = String(request.headers["content-type"] ?? "");
      if (!contentType.startsWith("application/x-www-form-urlencoded")) {
        sendResponse(request, response, {
          status: 415,
          locale,
          message: responseCopy[locale].invalid,
          ok: false,
        });
        return;
      }

      const params = new URLSearchParams(await readRequestBody(request));
      const result = validateSubmission(params);
      locale = result.submission.locale;
      const copy = responseCopy[locale];

      // The honeypot intentionally returns the normal success response so it
      // does not teach automated senders how they were detected.
      if (result.submission.company) {
        sendResponse(request, response, {
          status: 200,
          locale,
          message: copy.success,
          ok: true,
        });
        return;
      }

      const rateLimit = rateLimiter.consume(clientIdentifier(request));
      if (!rateLimit.allowed) {
        sendResponse(request, response, {
          status: 429,
          locale,
          message: copy.rateLimited,
          ok: false,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        });
        return;
      }

      if (!result.valid) {
        sendResponse(request, response, {
          status: 400,
          locale,
          message: copy.invalid,
          ok: false,
        });
        return;
      }

      const requestId = randomUUID();
      await sendMail({
        envelope: {
          from: config.fromAddress,
          to: config.toAddress,
        },
        from: `Filius website <${config.fromAddress}>`,
        to: config.toAddress,
        replyTo: result.submission.email,
        subject: `[Filius website] ${result.submission.category}`,
        text: mailText(result.submission, requestId),
        headers: {
          "Auto-Submitted": "auto-generated",
          "X-Filius-Contact-Request": requestId,
          "X-Filius-Retention-Days": String(config.retentionDays),
        },
        disableFileAccess: true,
        disableUrlAccess: true,
      });

      logger.info?.(
        JSON.stringify({
          event: "contact_sent",
          requestId,
          category: result.submission.category,
        }),
      );
      sendResponse(request, response, {
        status: 200,
        locale,
        message: copy.success,
        ok: true,
      });
    } catch (error) {
      const status = Number(error?.statusCode) === 413 ? 413 : 503;
      logger.error?.(
        JSON.stringify({
          event: "contact_failed",
          error: error instanceof Error ? error.name : "UnknownError",
          code:
            error && typeof error === "object" && "code" in error
              ? String(error.code)
              : undefined,
        }),
      );
      sendResponse(request, response, {
        status,
        locale,
        message: responseCopy[locale].unavailable,
        ok: false,
      });
    }
  });
}

export function start(env = process.env) {
  const config = loadConfig(env);
  const transport = createTransport(config);
  const server = createContactServer({
    config,
    sendMail: (message) => transport.sendMail(message),
  });
  server.listen(config.port, "0.0.0.0", () => {
    console.info(
      JSON.stringify({ event: "contact_service_ready", port: config.port }),
    );
  });
  return server;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    start();
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "contact_service_start_failed",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    );
    process.exitCode = 1;
  }
}
