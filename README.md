# Filius.app website

Public-facing product and documentation website for Filius on iPad, the native iPad network-topology editor and simulator.

The site is built with Astro and Starlight, generated as static files, packaged in an unprivileged NGINX container, and designed to run behind an existing Nginx Proxy Manager deployment.

## Current status

This repository contains an implementation-ready pre-release website:

- multilingual product pages in German, English, and French;
- visual seven-step quick start;
- searchable Starlight documentation;
- FAQ and email-based support;
- configurable privacy and legal notices, plus accessibility and license pages;
- responsive desktop and iPad design;
- Docker and Compose deployment configuration; and
- GitHub Actions image publishing to GitHub Container Registry.

The site is **not ready for public production** until the owner-controlled values in the launch checklist are approved. In particular, legal publisher details, privacy decisions, source licensing, App Store URL, and final attribution remain open.

## Local development

Requirements:

- Node.js 24 or later within the supported range in `package.json`;
- npm; and
- optionally Playwright Chromium for browser tests.

```bash
npm ci
npm run dev
```

Astro serves the development site on the address printed in the terminal.

## Quality checks

```bash
npm run format:check
npm run validate:content
npm run check
npm run build
```

Run all non-browser checks with:

```bash
npm run validate
```

Install the Playwright browser and run responsive tests:

```bash
npx playwright install chromium
npm test
```

The Playwright matrix covers desktop Chromium, iPad portrait, and iPad landscape.

## Content model

- German is the default locale at `/`.
- English is under `/en/`.
- French is under `/fr/`.
- Documentation lives at `/docs/`, `/en/docs/`, and `/fr/docs/`.

Shared marketing copy is typed in the site content module. Starlight documentation is Markdown so teachers and technical contributors can update it without changing page components.

See [Content and localization](docs/content.md).

## Privacy-first usage analytics

Optional self-hosted Umami analytics is built in but disabled until both `UMAMI_SCRIPT_URL` and `UMAMI_WEBSITE_ID` repository variables are set. The analytics script is consent-gated and is never requested before opt-in. Legal publisher, hosting, Cloudflare, and retention values are also supplied as public build variables. See `docs/privacy-and-analytics.md` before enabling analytics or setting `LEGAL_REVIEWED=true`.

## Docker image

Build locally when Docker is available:

```bash
docker build -t filius-app-website:local .
```

The runtime image contains only NGINX and the generated static files. It listens on port `8080` as an unprivileged user.

Production images are intended to be built by GitHub Actions and published to GHCR. Pull requests validate the image without publishing. Pushes to `main`, version tags, scheduled builds, and manual dispatches publish signed metadata; artifact attestations run for public repositories or when explicitly enabled for a supported private repository.

## Nginx Proxy Manager

The Compose service joins the external network already used by Nginx Proxy Manager. It intentionally does not publish a host port.

```bash
cp .env.example .env
# Edit the GHCR owner, image tag, and existing NPM network name.
docker compose pull filius-web
docker compose up -d filius-web
```

Configure the Proxy Host to forward `filius.app` to `filius-web:8080` using HTTP on the private Docker network. TLS terminates at Nginx Proxy Manager. Cloudflare may remain in front as proxied DNS with Full (strict) origin TLS.

See [Deployment](docs/deployment.md) and [DNS and mail](docs/dns-and-mail.md).

## Product assets

The app icon comes from the Filius on iPad asset catalog. The current product screenshot comes from a synthetic iPad simulator test artifact. Legacy low-resolution hardware artwork is deliberately not used as large website illustration while provenance remains unresolved.

Do not add third-party or original FILIUS assets without documenting origin, license, and modification rights.

## Support and contact form

The support page offers both `support@filius.app` and a progressively enhanced contact form. The static Astro site posts to `/api/contact`; the inner Nginx container proxies only that route to the separate `filius-contact` service. The contact service validates a small URL-encoded payload and submits it through the authenticated Netcup SMTP account.

The form deliberately has no attachment upload, database, tracking script, or external CAPTCHA. Abuse controls are a honeypot, strict input limits, same-origin checks, and a rate-limit key derived from the connection address with a per-process random salt. The key remains only in memory for the configured window; the address is not copied into the support message. Completed support messages use the configured 180-day operational deletion period unless a legal retention or evidence duty applies.

The contact service is built and published as `ghcr.io/OWNER/filius-app-website-contact`. SMTP credentials are runtime-only values in the deployment environment. Never expose `CONTACT_SMTP_PASSWORD` as an Astro variable, Docker build argument, repository variable, or committed file. See [Deployment](docs/deployment.md) for the complete setup.

## License status

No license is granted by this repository yet. The website, application source, screenshots, and compatibility material require owner review before public redistribution. Add an approved root license and third-party notices before making the repository public.

## Launch gate

Read [Launch checklist](docs/launch-checklist.md) before connecting production DNS or using the website as an App Store support/privacy URL.
