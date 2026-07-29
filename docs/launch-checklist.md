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
