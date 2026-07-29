# Docker and Nginx Proxy Manager deployment

## Reader and outcome

This guide is for the server operator. After reading it, they should be able to deploy a versioned Filius.app image behind the existing Nginx Proxy Manager stack and roll back safely.

## Architecture

```text
Cloudflare DNS/proxy
  → Nginx Proxy Manager
  → shared external Docker network
  → filius-web:8080
```

The inner container serves static files only. It does not manage public certificates and does not expose a host port. Duplicate access logging is disabled in this inner container; Nginx Proxy Manager remains the visitor-facing access-log source.

## Registry image

GitHub Actions publishes multi-platform images to GHCR for `linux/amd64` and `linux/arm64`.

Production should use an immutable semantic version or digest. Do not use `latest` as the only production reference.

## Prepare the server

1. Identify the existing Nginx Proxy Manager Docker network.
2. Copy `.env.example` to `.env`.
3. Set the full GHCR image, exact version tag, and network name.
4. Authenticate the Docker host to GHCR if the package is private.

```bash
docker network ls
docker compose config
docker compose pull filius-web
docker compose up -d filius-web
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

## Verify

```bash
docker inspect --format '{{json .State.Health}}' <container>
curl -fsS https://filius.app/healthz
curl -I https://filius.app/
```

Also open the homepage, quick start, documentation, FAQ, and support pages on iPad Safari and desktop Safari.

## Rollback

Record the previous image reference before deployment. If health checks or public smoke tests fail:

1. restore the previous version in `.env` or Compose configuration;
2. pull that exact image;
3. recreate only `filius-web`; and
4. repeat health and HTTPS checks.

Do not rebuild an old release during rollback.
