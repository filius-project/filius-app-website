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

| Repository variable           | Example                                                          | Purpose                                                            |
| ----------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| `UMAMI_SCRIPT_URL`            | `https://analytics.filius.app/script.js`                         | Analytics script; keep empty to disable tracking and the banner    |
| `UMAMI_WEBSITE_ID`            | Umami website UUID                                               | Enables analytics when combined with the script URL                |
| `UMAMI_DOMAINS`               | `filius.app,www.filius.app`                                      | Prevents collection on preview hosts                               |
| `LEGAL_REVIEWED`              | `false` until approved                                           | Removes draft/noindex treatment only after review                  |
| `LEGAL_CONTROLLER_NAME`       | Public operator name                                             | GDPR controller and legal notice                                   |
| `LEGAL_CONTROLLER_ADDRESS`    | Public service address on one line                               | GDPR and provider identification                                   |
| `LEGAL_CONTROLLER_EMAIL`      | `support@filius.app`                                             | Privacy and legal contact                                          |
| `LEGAL_CONTROLLER_PHONE`      | Optional public number                                           | Include only when applicable                                       |
| `LEGAL_VAT_ID`                | Optional                                                         | Include only when legally applicable                               |
| `LEGAL_REGISTER_ENTRY`        | Optional                                                         | Include only when legally applicable                               |
| `HOSTING_PROVIDER_NAME`       | `Oracle Cloud Infrastructure (Oracle Deutschland B.V. & Co. KG)` | Hosting disclosure                                                 |
| `HOSTING_PROVIDER_ADDRESS`    | `Riesstraße 25, 80992 München`                                   | German Oracle contracting-entity address; verify against OCI order |
| `HOSTING_COUNTRY`             | `Germany`                                                        | Physical hosting country                                           |
| `HOSTING_REGION`              | `eu-frankfurt-1`                                                 | Exact OCI region; required before legal approval                   |
| `CLOUDFLARE_PROXY_ENABLED`    | `true`                                                           | Declares Cloudflare as the visitor-facing proxy                    |
| `ACCESS_LOG_RETENTION_DAYS`   | `35`                                                             | Upper bound from NPM weekly rotation plus four archives            |
| `ERROR_LOG_RETENTION_DAYS`    | `77`                                                             | Upper bound from NPM weekly rotation plus ten archives             |
| `EMAIL_PROVIDER_NAME`         | `Google Ireland Limited`                                         | Destination mailbox provider                                       |
| `EMAIL_PROVIDER_ADDRESS`      | `Gordon House, Barrow Street, Dublin 4`                          | Recipient disclosure                                               |
| `EMAIL_PROVIDER_COUNTRY`      | `Ireland`                                                        | Recipient location                                                 |
| `EMAIL_PROVIDER_MODE`         | `consumer-gmail` or `google-workspace`                           | Selects independent-controller or processor wording                |
| `ANALYTICS_RETENTION_DAYS`    | `180`                                                            | Must match Umami deletion policy                                   |
| `PRIVACY_NOTICE_DATE`         | `29 July 2026`                                                   | Date displayed in the privacy notice                               |
| `ENABLE_ARTIFACT_ATTESTATION` | `false`                                                          | Set only when a private repository supports GitHub attestations    |

These values are public in the generated website and must not contain secrets. Enter addresses and other build arguments as single-line values (for example, comma-separated) so the Docker build-argument list remains valid.

## Known processors and transfer safeguards

The current architecture has processors even though there is no custom processor contract stored in this repository:

| Processor                         | Purpose                                                               | Contract/safeguard to retain in the compliance record                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oracle Cloud Infrastructure       | VM, network, storage, and self-hosted analytics infrastructure        | The Oracle Services Data Processing Agreement is incorporated into the Oracle cloud-services contract. The current published DPA is dated 14 August 2025; its data-transfer annex applies Oracle’s Binding Corporate Rules for Processors and EU Standard Contractual Clauses to restricted transfers. Oracle’s DPF may apply only where the relevant contract expressly specifies it. Confirm the exact Oracle contracting entity and OCI region shown in the tenancy/order. |
| Cloudflare, Inc.                  | Visitor-facing reverse proxy, DNS, TLS/security, and abuse protection | Cloudflare’s Data Processing Addendum is part of the service agreement. The current published DPA is version 6.4 effective 3 April 2026 and incorporates the EU Standard Contractual Clauses, with the EU-U.S. Data Privacy Framework used where applicable.                                                                                                                                                                                                                  |
| Mailbox or email-routing provider | Delivery and storage of messages sent to `support@filius.app`         | Not yet identified. DNS currently has no MX record for `filius.app`; fill the email-provider variables and retain that provider’s DPA/transfer terms before activating support email.                                                                                                                                                                                                                                                                                         |

Self-hosted Umami is application software rather than an additional external processor when it runs entirely inside the Oracle tenancy. Oracle remains the infrastructure processor for that data.

The DPAs are normally incorporated into the providers’ standard service terms rather than uploaded to this website. Download or otherwise retain the versions that apply to the active accounts and record them in the controller’s processing records. This repository does not constitute that record.

## Log behavior

The current Nginx Proxy Manager default configuration rotates access logs weekly with four archives and error logs weekly with ten archives. The privacy notice therefore uses conservative upper bounds of approximately 35 and 77 days. The downstream Filius static container now disables duplicate access logging. Its Compose configuration limits Docker output to three files of 10 MB each.

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
- Confirm that the destination is a personal Gmail account. If it is Google Workspace, change `EMAIL_PROVIDER_MODE` to `google-workspace` and retain the Workspace DPA.
- Confirm the Nginx Proxy Manager version and that its logrotate defaults have not been overridden.
- Configure origin, Umami, database, and mail log retention to match the notice.
- Verify whether any additional provider transfers data outside the EEA and document the mechanism.
- Verify the competent supervisory authority for the controller’s establishment.
- Test consent in all languages and ensure no analytics request occurs before opt-in.
- Record the exact deployed Umami version and configuration.
- Have the privacy notice and legal notice reviewed for the operator’s jurisdiction.
