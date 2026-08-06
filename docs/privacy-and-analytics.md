# EU privacy and self-hosted analytics

The website supports optional self-hosted Umami analytics behind an explicit opt-in. The analytics script is not requested until the visitor selects **Allow analytics**. Reject and accept use equal controls, the site remains usable without analytics, and the decision can be changed through the persistent privacy-settings control.

This is a technical implementation aid, not a substitute for a legal review of the actual operator, hosting contracts, log configuration, and jurisdiction.

## Recommended deployment

1. Run a separate, maintained Umami installation with its own database.
2. Publish it through Nginx Proxy Manager as `https://analytics.filius.app`.
3. Create the website `filius.app` in Umami and copy its website ID.
4. Ensure the Umami reverse proxy and application do not retain full visitor IP addresses in access or application logs.
5. Configure retention and deletion in Umami to match the value declared by `ANALYTICS_RETENTION_DAYS`.
6. Add the repository variables listed below and rebuild the website image.

The website Content Security Policy permits analytics only from `https://analytics.filius.app` or from a same-origin script path. A different analytics origin requires a deliberate CSP review in `nginx/security-headers.conf` and a matching allow-list change in `src/config.ts`.

## GitHub repository variables

The image workflow passes non-secret public configuration as Docker build arguments:

| Repository variable                 | Example                                                          | Purpose                                                            |
| ----------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| `UMAMI_SCRIPT_URL`                  | `https://analytics.filius.app/script.js`                         | Analytics script; keep empty to disable tracking and the banner    |
| `UMAMI_WEBSITE_ID`                  | Umami website UUID                                               | Enables analytics when combined with the script URL                |
| `UMAMI_DOMAINS`                     | `filius.app,www.filius.app`                                      | Prevents collection on preview hosts                               |
| `LEGAL_REVIEWED`                    | `false` until approved                                           | Removes draft/noindex treatment only after review                  |
| `LEGAL_CONTROLLER_NAME`             | Public operator name                                             | GDPR controller and legal notice                                   |
| `LEGAL_CONTROLLER_ADDRESS`          | Public service address on one line                               | GDPR and provider identification                                   |
| `LEGAL_CONTROLLER_EMAIL`            | `support@filius.app`                                             | Privacy and legal contact                                          |
| `LEGAL_CONTROLLER_PHONE`            | Optional public number                                           | Include only when applicable                                       |
| `LEGAL_VAT_ID`                      | Optional                                                         | Include only when legally applicable                               |
| `LEGAL_REGISTER_ENTRY`              | Optional                                                         | Include only when legally applicable                               |
| `HOSTING_PROVIDER_NAME`             | `Oracle Cloud Infrastructure (Oracle Deutschland B.V. & Co. KG)` | Hosting disclosure                                                 |
| `HOSTING_PROVIDER_ADDRESS`          | `Riesstraße 25, 80992 München`                                   | German Oracle contracting-entity address; verify against OCI order |
| `HOSTING_COUNTRY`                   | `Germany`                                                        | Physical hosting country                                           |
| `HOSTING_REGION`                    | `eu-frankfurt-1`                                                 | Exact OCI region; required before legal approval                   |
| `CLOUDFLARE_PROXY_ENABLED`          | `true`                                                           | Declares Cloudflare as the visitor-facing proxy                    |
| `ACCESS_LOG_RETENTION_DAYS`         | `35`                                                             | Upper bound from NPM weekly rotation plus four archives            |
| `ERROR_LOG_RETENTION_DAYS`          | `77`                                                             | Upper bound from NPM weekly rotation plus ten archives             |
| `EMAIL_PROVIDER_NAME`               | `netcup GmbH`                                                    | Destination mailbox provider                                       |
| `EMAIL_PROVIDER_ADDRESS`            | `Emmy-Noether-Straße 10, 76131 Karlsruhe, Germany`               | Recipient disclosure                                               |
| `EMAIL_PROVIDER_COUNTRY`            | `Germany`                                                        | Recipient location                                                 |
| `EMAIL_PROVIDER_MODE`               | `netcup-mailbox`, `consumer-gmail`, or `google-workspace`        | Selects provider-specific mailbox wording                          |
| `SUPPORT_RETENTION_DAYS`            | `180`                                                            | Deletion period for completed support requests                     |
| `CONTACT_RATE_LIMIT_WINDOW_MINUTES` | `15`                                                             | Maximum lifetime of the in-memory salted rate-limit key            |
| `ANALYTICS_RETENTION_DAYS`          | `180`                                                            | Must match Umami deletion policy                                   |
| `PRIVACY_NOTICE_DATE`               | `6 August 2026`                                                  | Date displayed in the privacy notice                               |
| `ENABLE_ARTIFACT_ATTESTATION`       | `false`                                                          | Set only when a private repository supports GitHub attestations    |

These values are public in the generated website and must not contain secrets. Enter addresses and other build arguments as single-line values (for example, comma-separated) so the Docker build-argument list remains valid.

## Known processors and transfer safeguards

The current architecture has processors even though there is no custom processor contract stored in this repository:

| Processor                   | Purpose                                                               | Contract/safeguard to retain in the compliance record                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oracle Cloud Infrastructure | VM, network, storage, and self-hosted analytics infrastructure        | The Oracle Services Data Processing Agreement is incorporated into the Oracle cloud-services contract. The current published DPA is dated 14 August 2025; its data-transfer annex applies Oracle’s Binding Corporate Rules for Processors and EU Standard Contractual Clauses to restricted transfers. Oracle’s DPF may apply only where the relevant contract expressly specifies it. Confirm the exact Oracle contracting entity and OCI region shown in the tenancy/order. |
| Cloudflare, Inc.            | Visitor-facing reverse proxy, DNS, TLS/security, and abuse protection | Cloudflare’s Data Processing Addendum is part of the service agreement. The current published DPA is version 6.4 effective 3 April 2026 and incorporates the EU Standard Contractual Clauses, with the EU-U.S. Data Privacy Framework used where applicable.                                                                                                                                                                                                                  |
| netcup GmbH                 | Authenticated SMTP delivery and mailbox storage for support messages  | The active Netcup mailbox uses a 180-day operational deletion period after a request is completed, subject to statutory retention and evidence duties. Retain the contract/privacy terms applicable to the account. Do not describe Cloudflare Email Routing or Google as the mail provider unless the MX and forwarding design is changed.                                                                                                                                   |

Self-hosted Umami is application software rather than an additional external processor when it runs entirely inside the Oracle tenancy. Oracle remains the infrastructure processor for that data.

The DPAs are normally incorporated into the providers’ standard service terms rather than uploaded to this website. Download or otherwise retain the versions that apply to the active accounts and record them in the controller’s processing records. This repository does not constitute that record.

## Log behavior

The current Nginx Proxy Manager default configuration rotates access logs weekly with four archives and error logs weekly with ten archives. The privacy notice therefore uses conservative upper bounds of approximately 35 and 77 days. The downstream Filius static container now disables duplicate access logging. Its Compose configuration limits Docker output to three files of 10 MB each.

## Contact-form behavior

The contact form remains separate from the static Astro application. Nginx proxies `/api/contact` to a small Node service on a private Docker bridge. The service accepts only URL-encoded same-origin requests, enforces strict field and body-size limits, rejects invalid categories and email addresses, and sends accepted messages through authenticated TLS SMTP.

The form has no attachment upload, database, browser storage, third-party CAPTCHA, or analytics event. A hidden honeypot silently discards obvious automated submissions. Rate limiting uses a SHA-256 key derived from the connection address and a new random salt for each service process. Only that key, count, and expiry remain in memory for the configured 15-minute window; the address is not added to the support email or application logs.

Runtime contact configuration is secret-bearing and is not passed to the Astro build:

| Runtime variable                    | Example                                     | Purpose                                            |
| ----------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| `CONTACT_SMTP_HOST`                 | `mx2e75.netcup.net`                         | TLS SMTP endpoint                                  |
| `CONTACT_SMTP_PORT`                 | `465`                                       | SMTP port                                          |
| `CONTACT_SMTP_SECURE`               | `true`                                      | Use implicit TLS                                   |
| `CONTACT_SMTP_USERNAME`             | `kontakt@filius.app`                        | Authenticated SMTP account                         |
| `CONTACT_SMTP_PASSWORD`             | deployment secret                           | SMTP password; never commit or build into an image |
| `CONTACT_SMTP_PASSWORD_FILE`        | mounted secret path                         | Optional alternative to the direct password        |
| `CONTACT_FROM_ADDRESS`              | `kontakt@filius.app`                        | DMARC-aligned envelope/header sender               |
| `CONTACT_TO_ADDRESS`                | `support@filius.app`                        | Support mailbox                                    |
| `CONTACT_ALLOWED_ORIGINS`           | `https://filius.app,https://www.filius.app` | Exact accepted browser origins                     |
| `CONTACT_RATE_LIMIT_MAX`            | `5`                                         | Attempts per rate-limit window                     |
| `CONTACT_RATE_LIMIT_WINDOW_MINUTES` | `15`                                        | In-memory key lifetime                             |
| `CONTACT_RETENTION_DAYS`            | `180`                                       | Retention marker added to support messages         |

The runtime retention and rate-limit values must match the corresponding public build variables. Mailbox deletion remains an operational control: configure or perform deletion so completed messages do not exceed the declared period.

## Consent behavior

- Preference key: `filius.analyticsConsent.v1`
- Storage: browser local storage
- Lifetime: 180 days
- Values: `granted` or `denied`
- No analytics request before `granted`
- Global Privacy Control or Do Not Track defaults to denied
- Search parameters and URL fragments are excluded from page-view collection
- App Store, support-email, and security-report links have named Umami events
- Withdrawing consent reloads the page so the analytics script is no longer present

## Operational checklist

Before setting `LEGAL_REVIEWED=true`:

- Verify controller name, service address, and contact details.
- Confirm the exact Oracle contracting entity and OCI region from the tenancy/order.
- Retain the applicable Oracle and Cloudflare DPAs and record their transfer safeguards.
- Verify that the active Netcup mailbox continues to apply the documented 180-day operational deletion period. If mail is later forwarded to personal Gmail or Google Workspace, change `EMAIL_PROVIDER_MODE` and update this notice before deployment.
- Verify the contact service’s same-origin rejection, honeypot, rate limit, no-content logging, and end-to-end SMTP delivery.
- Confirm the Nginx Proxy Manager version and that its logrotate defaults have not been overridden.
- Configure origin, Umami, database, and mail log retention to match the notice.
- Verify whether any additional provider transfers data outside the EEA and document the mechanism.
- Verify the competent supervisory authority for the controller’s establishment.
- Test consent in all languages and ensure no analytics request occurs before opt-in.
- Record the exact deployed Umami version and configuration.
- Have the privacy notice and legal notice reviewed for the operator’s jurisdiction.
