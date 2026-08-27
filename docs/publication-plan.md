# Publication plan — August 27, 2026

This is the cross-repository execution record for publishing Filius on iPad and its website after private legal verification.

## Executed legal transition

- It is not published: the agreement text, scan, signatures, and private postal details remain outside GitHub.
- The public app repository contains GPLv2, GPLv3, and a SHA-256 attestation for the privately retained executed Apple-platform permission. It does not contain the agreement text, scan, signatures, or addresses.
- The public record contains only the SHA-256 fingerprint; contract terms and personal details remain private.

## App repository — executed / next

1. Sync the current reviewed iPad implementation into the curated production repository without copying the Java development runtime, generated build output, private signing material, or internal parity-only planning files.
2. Publish the curated app repository at `https://github.com/filius-project/filius-ipad`.
3. Keep App Store release gates in place: Apple app record, signing, archive validation, TestFlight, real-iPad acceptance, privacy/export decisions, metadata, screenshots, and App Review remain separate.
4. Create a tagged GitHub release only after the exact candidate has passed the release checklist.

## Website — executed / next

1. Link the website’s source section and license page to the public app repository.
2. Publish the website repository at `https://github.com/filius-project/filius-app-website`.
3. Leave the App Store badge in coming-soon mode until an App Store listing exists.
4. Treat the website privacy notice, legal notice, source attribution, and repository links as approved as of **August 27, 2026**; keep deployment values aligned with those notices.
5. Build and test the static site; publish the container image through the existing GitHub Actions workflow.
6. Deploy through the existing Nginx Proxy Manager/Compose path only after DNS, variables, SMTP end-to-end delivery, privacy consent behavior, and accessibility checks are approved.

## Explicit blockers that cannot be automated from this checkout

- Apple Developer/App Store Connect account actions, certificates, profiles, and signing secrets.
- Final App Store metadata, screenshots, age rating, export compliance, and privacy answers.
- Production infrastructure values and processor records must continue to match the approved website notices.
- Production server access, DNS/proxy changes, external uptime monitoring, and SMTP delivery confirmation.
