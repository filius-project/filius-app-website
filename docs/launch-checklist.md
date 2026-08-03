# Launch checklist

The implementation is complete enough for preview deployment, but the following owner-controlled decisions block public production use.

## Identity and legal

- [ ] Approve the public product name.
- [ ] Approve the exact relationship wording and attribution for the original FILIUS project.
- [ ] Add responsible publisher name and service address.
- [ ] Approve website copyright and content license.
- [ ] Approve the public application-source license and asset redistribution scope.
- [ ] Generate complete third-party notices.

## App Store

- [ ] Create and approve the App Store listing.
- [ ] Add the numeric App Store ID and final listing URL to site configuration.
- [ ] Replace the coming-soon treatment with Apple’s approved badge assets.
- [ ] Verify minimum iPadOS and device support against the shipped build.
- [ ] Use the final website support and privacy URLs in App Store Connect.

## Privacy and support

- [ ] Confirm mailbox provider and ownership of `support@filius.app`.
- [ ] Approve hosting-log retention and access.
- [ ] Approve the app privacy inventory against the signed archive.
- [ ] Replace draft privacy copy with the approved policy.
- [ ] Decide whether a contact form is required.
- [ ] If required, approve processor, retention, anti-abuse, and deletion behavior before building it.

## Infrastructure

- [ ] Create the public website GitHub repository.
- [ ] Review and enable the GHCR workflow.
- [ ] Confirm package visibility and server registry credentials.
- [ ] Set the external Nginx Proxy Manager network name.
- [ ] Configure production image version or digest.
- [ ] Configure Cloudflare DNS, proxying, DNSSEC, and Full (strict) TLS.
- [ ] Configure Nginx Proxy Manager certificate and canonical-host redirect.
- [ ] Add external uptime monitoring and backup the proxy/Compose configuration.

## Quality

- [ ] Pass formatting, content, Astro checks, and production build.
- [ ] Pass Playwright desktop and iPad tests.
- [ ] Run a manual VoiceOver and keyboard review.
- [ ] Review contrast without automated-rule suppression.
- [ ] Verify 200% zoom and reduced-motion behavior.
- [ ] Replace the current development screenshot with approved release-candidate screenshots if needed.
- [ ] Confirm every translated page with a fluent reviewer.
- [ ] Check all external links immediately before launch.

## Provider and legal notice

- [x] Confirm the current provider is Sören Schröder acting as a private individual.
- [x] Confirm the planned transition is a standard Gewerbeanmeldung as an unregistered sole trader, not an `e.K.` registration.
- [x] Confirm that the site does not publish journalistic-editorial content under § 18(2) MStV.
- [x] Confirm that the provider is neither willing nor obliged to participate in consumer dispute resolution.
- [ ] Activate `support@filius.app` and verify inbound delivery before setting `LEGAL_REVIEWED=true`.
- [ ] Add register, VAT ID, or business identification details only if they are actually assigned or applicable.

## EU privacy and analytics

- [ ] Fill all `LEGAL_*`, hosting, OCI-region, Cloudflare, log-retention, and email-provider repository variables.
- [ ] Confirm the Oracle contracting entity and `eu-frankfurt-1` region in the tenancy/order.
- [ ] Retain the applicable Oracle and Cloudflare DPAs and document Oracle’s BCR-P/SCC safeguards and Cloudflare’s DPF/SCC safeguards.
- [ ] Confirm whether the Gmail destination is personal Gmail (`consumer-gmail`) or Google Workspace (`google-workspace`).
- [ ] For personal Gmail, record Google Ireland Limited as an independent recipient/controller; for Workspace, retain the Workspace DPA.
- [ ] Deploy the self-hosted analytics instance and set `UMAMI_SCRIPT_URL` and `UMAMI_WEBSITE_ID`, or leave both empty to disable tracking.
- [ ] Confirm that origin, proxy, analytics, database, and mail retention match the privacy notice.
- [ ] Confirm processor agreements and any Chapter V GDPR transfer safeguards.
- [ ] Test accept, reject, withdrawal, Global Privacy Control, and no-request-before-consent behavior.
- [ ] Obtain a legal review before setting `LEGAL_REVIEWED=true`.
