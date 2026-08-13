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
          → the configured mailbox provider support mailbox
```

The web container serves static files and proxies only `/api/contact` to the private contact-service bridge. It does not manage public certificates and does not expose a host port. Duplicate access logging is disabled in this inner container; Nginx Proxy Manager remains the visitor-facing access-log source.

The contact service has no public port, database, or file storage. It validates requests and submits accepted messages through the authenticated the configured mailbox provider SMTP service. Keep the configured mailbox provider MX, SPF, DKIM, and DMARC records DNS-only and follow [DNS and mail](dns-and-mail.md); no `webmail` hostname is required.

## Registry image

GitHub Actions publishes the web and contact-service images to GHCR for `linux/amd64` and `linux/arm64`. The contact image uses the repository image name with the `-contact` suffix.

Production should use an immutable semantic version or digest. Do not use `latest` as the only production reference.

## Prepare the server

1. Identify the existing Nginx Proxy Manager Docker network.
2. Copy `.env.example` to `.env`.
3. Set both full GHCR image names, one exact version tag, and the network name.
4. Add the SMTP host, username, sender, recipient, and password to the server-side `.env`. The repository intentionally contains no SMTP password. Never use a `PUBLIC_*` name for SMTP credentials.
5. Keep `CONTACT_RETENTION_DAYS`, `CONTACT_RATE_LIMIT_WINDOW_MINUTES`, `PUBLIC_SUPPORT_RETENTION_DAYS`, and `PUBLIC_CONTACT_RATE_LIMIT_WINDOW_MINUTES` aligned with the published privacy notice.
6. Authenticate the Docker host to GHCR if either package is private.

`docker compose` automatically reads the `.env` file next to this Compose file. Choose one of the following two secret-delivery methods.

### Direct environment variable

The minimum production configuration for the current the configured mailbox provider mailbox is:

```dotenv
CONTACT_SMTP_HOST=provider-smtp.example.invalid
CONTACT_SMTP_PORT=465
CONTACT_SMTP_SECURE=true
CONTACT_SMTP_USERNAME=deployment-mailbox@example.invalid
CONTACT_SMTP_PASSWORD='replace-with-the-the configured mailbox provider-mailbox-password'
CONTACT_SMTP_PASSWORD_FILE=
CONTACT_SMTP_PASSWORD_SECRET_FILE=
CONTACT_FROM_ADDRESS=deployment-mailbox@example.invalid
CONTACT_TO_ADDRESS=support@filius.app
```

Use the password for the mailbox named by `CONTACT_SMTP_USERNAME`; this is not the Cloudflare, GHCR, or server-login password. Keep the file private (`chmod 600 .env`) and do not paste the password into a Dockerfile, image build argument, Git repository, or `PUBLIC_*` variable. Single-quote the value so characters such as `$` remain literal in Compose’s environment-file parser.

Validate and deploy without printing the rendered environment:

```bash
docker network ls
docker compose config --quiet
docker compose pull filius-web filius-contact
docker compose up -d filius-contact filius-web
docker compose ps
docker compose logs --tail=100 filius-contact
```

### Compose-mounted secret file

The repository includes `compose.smtp-secret.yaml`, an override that mounts one host file at `/run/secrets/contact_smtp_password` and configures the contact service to read it. Store the file outside the Git checkout, make it readable by Docker without making it public, and set only its host path in `.env`:

```dotenv
CONTACT_SMTP_PASSWORD=
CONTACT_SMTP_PASSWORD_FILE=
CONTACT_SMTP_PASSWORD_SECRET_FILE=/srv/filius/secrets/contact-smtp-password
```

The contact image runs as UID/GID `1000:1000`. File-backed Compose secrets use the host file's permissions, so make the file owned by that numeric identity before starting the service. Create the file without a trailing shell-history leak, restrict it, and use both Compose files for every command:

```bash
sudo install -d -o 1000 -g 1000 -m 700 /srv/filius/secrets
secret_tmp=$(mktemp)
trap 'rm -f "$secret_tmp"; unset password' EXIT
chmod 600 "$secret_tmp"
read -r -s -p "SMTP mailbox password: " password
printf "\n"
printf "%s\n" "$password" > "$secret_tmp"
sudo install -o 1000 -g 1000 -m 600 \
  "$secret_tmp" /srv/filius/secrets/contact-smtp-password
rm -f "$secret_tmp"
unset password
trap - EXIT

docker compose -f compose.yaml -f compose.smtp-secret.yaml config --quiet
docker compose -f compose.yaml -f compose.smtp-secret.yaml pull filius-web filius-contact
docker compose -f compose.yaml -f compose.smtp-secret.yaml up -d filius-contact filius-web
docker compose -f compose.yaml -f compose.smtp-secret.yaml ps
```

Deployment platforms that mount secrets themselves may omit the override and set `CONTACT_SMTP_PASSWORD_FILE` directly to the existing path inside the `filius-contact` container. The service uses the direct password when both direct and file-based values are present.

### Rotate only the SMTP secret

A password change does not require restarting the public web container. For the mounted-secret method, rerun the secure creation block above instead of editing the file in place; the `install` command reapplies the required mode and numeric ownership to the replacement. Recreate only `filius-contact`, using the same Compose-file selection as the original deployment:

```bash
# Direct environment variable
docker compose config --quiet
docker compose up -d --force-recreate filius-contact

# Or, for the checked-in mounted-secret override
docker compose -f compose.yaml -f compose.smtp-secret.yaml config --quiet
docker compose -f compose.yaml -f compose.smtp-secret.yaml up -d --force-recreate filius-contact
```

Avoid non-quiet `docker compose config` on a shared terminal or in CI logs after setting a direct password: the rendered Compose configuration includes environment values. The contact service refuses to start when the SMTP host, username, password (or password file), or sender address is missing. A bad mailbox password instead appears as a failed contact request and is recorded in the contact-service log by error type/code only.

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
