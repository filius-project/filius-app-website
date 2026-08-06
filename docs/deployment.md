# Docker and Nginx Proxy Manager deployment

## Reader and outcome

This guide is for the server operator. After reading it, they should be able to deploy a versioned Filius.app image behind the existing Nginx Proxy Manager stack and roll back safely.

## Architecture

```text
Cloudflare DNS/proxy
  → Nginx Proxy Manager
  → shared external Docker network
  → filius-web:8080
      → private Docker bridge
      → filius-contact:3000
          → authenticated TLS SMTP
          → Netcup support mailbox
```

The web container serves static files and proxies only `/api/contact` to the private contact-service bridge. It does not manage public certificates and does not expose a host port. Duplicate access logging is disabled in this inner container; Nginx Proxy Manager remains the visitor-facing access-log source.

The contact service has no public port, database, or file storage. It validates requests and submits accepted messages through the authenticated Netcup SMTP service. Keep Netcup MX, SPF, DKIM, and DMARC records DNS-only and follow [DNS and mail](dns-and-mail.md); no `webmail` hostname is required.

## Registry image

GitHub Actions publishes the web and contact-service images to GHCR for `linux/amd64` and `linux/arm64`. The contact image uses the repository image name with the `-contact` suffix.

Production should use an immutable semantic version or digest. Do not use `latest` as the only production reference.

## Prepare the server

1. Identify the existing Nginx Proxy Manager Docker network.
2. Copy `.env.example` to `.env`.
3. Set both full GHCR image names, one exact version tag, and the network name.
4. Add the SMTP host, username, sender, recipient, and password to the server-side `.env`. Prefer `CONTACT_SMTP_PASSWORD_FILE` when the deployment platform provides a mounted secret. Never use a `PUBLIC_*` name for SMTP credentials.
5. Keep `CONTACT_RETENTION_DAYS`, `CONTACT_RATE_LIMIT_WINDOW_MINUTES`, `PUBLIC_SUPPORT_RETENTION_DAYS`, and `PUBLIC_CONTACT_RATE_LIMIT_WINDOW_MINUTES` aligned with the published privacy notice.
6. Authenticate the Docker host to GHCR if either package is private.

```bash
docker network ls
docker compose config
docker compose pull filius-web filius-contact
docker compose up -d filius-web filius-contact
docker compose ps
```

## Configure Nginx Proxy Manager

Create a Proxy Host:

- domain: `filius.app`;
- scheme: `http`;
- forward host: `filius-web`;
- forward port: `8080`;
- public certificate enabled;
- Force SSL enabled; and
- `www.filius.app` redirected to the canonical hostname.

When Cloudflare proxying is enabled, use Full (strict) mode between Cloudflare and Nginx Proxy Manager. HSTS belongs at the public proxy layer, not in the inner static container.

The current Nginx Proxy Manager defaults rotate access logs weekly with four archives and error logs weekly with ten archives. If the deployed image or custom configuration differs, update both the retention configuration and the public privacy notice. The website Compose file separately limits container output by size (`10m`, three files).

Do not create a second public proxy host for `filius-contact`. The web container resolves it only on the private `contact_backend` bridge. The contact service accepts requests only with an allowed production `Origin` and sends no cross-origin response headers.

## Verify

```bash
docker inspect --format '{{json .State.Health}}' <container>
curl -fsS https://filius.app/healthz
curl -I https://filius.app/
```

Check both container health states. Then open the homepage, quick start, documentation, FAQ, and support pages on iPad Safari and desktop Safari. Submit one contact-form message and verify all of the following:

- the browser reports success without navigating away;
- the message reaches `support@filius.app` with the visitor address only in `Reply-To`;
- SPF, DKIM, and DMARC pass on an external delivery test;
- no message body, email address, or visitor IP appears in either container log; and
- repeated submissions receive rate-limit feedback without creating mail.

## Rollback

Record the previous image reference before deployment. If health checks or public smoke tests fail:

1. restore the previous version in `.env` or Compose configuration;
2. pull both exact images;
3. recreate `filius-web` and `filius-contact`; and
4. repeat health and HTTPS checks.

Do not rebuild an old release during rollback.
