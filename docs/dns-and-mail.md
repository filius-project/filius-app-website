# DNS and mail

## Purpose

This runbook records the production DNS design for `filius.app`. The website is proxied through Cloudflare, while email is delivered directly by the configured mailbox provider. Cloudflare Email Routing and a `webmail.example.invalid` hostname are not part of the design.

All mail-related records must be **DNS only** in Cloudflare. Cloudflare's HTTP proxy must never be enabled for SMTP, IMAP, DKIM, or MX targets.

## Required records

| Type  | Name              | Priority | Value                                                                         | Proxy    |
| ----- | ----------------- | -------: | ----------------------------------------------------------------------------- | -------- |
| MX    | `@`               |       10 | `mail.example.invalid`                                                             | DNS only |
| MX    | `@`               |       50 | `provider-smtp.example.invalid`                                                           | DNS only |
| A     | `mail`            |        — | `203.0.113.10`                                                               | DNS only |
| TXT   | `@`               |        — | `v=spf1 mx include:approved-provider-spf.example.invalid -all`                              | DNS only |
| CNAME | `key1._domainkey` |        — | `key1._domainkey.webhosting.systems`                                          | DNS only |
| CNAME | `key2._domainkey` |        — | `key2._domainkey.webhosting.systems`                                          | DNS only |
| TXT   | `_dmarc`          |        — | `v=DMARC1; p=quarantine; sp=quarantine; rua=mailto:dmarc-report@example.invalid; pct=100` | DNS only |

The two DKIM records delegate the configured mailbox provider's rotating selectors. Do not replace them with copied public-key TXT values because the CNAMEs allow the configured mailbox provider to rotate keys without another zone edit.

Create `dmarc-report@example.invalid` as a mailbox or alias before relying on aggregate reports. A webmail hostname is not required; the mailbox can be read through a configured mail client or forwarded according to the approved privacy design.

## Records to remove or avoid

- Keep `webmail` A and AAAA records absent. The support mailbox does not require a public webmail hostname.
- Do not add Cloudflare Email Routing MX records while the configured mailbox provider remains the mail provider.
- Do not create more than one SPF TXT record at the zone apex.
- Do not proxy `mail`, MX targets, DKIM selectors, or mail-discovery records.

The `autoconfig` CNAME may remain because it helps desktop mail clients discover the configured mailbox provider settings; it is unrelated to webmail.

## SPF policy

The enforced SPF policy deliberately omits the `a` mechanism: the apex A/AAAA records point at Cloudflare's website proxy, and those addresses must not be authorized to send mail. The `mx` mechanism remains because the the configured mailbox provider mail system may participate in outbound delivery.

```text
v=spf1 mx include:approved-provider-spf.example.invalid -all
```

On 3 August 2026, a message submitted through the authenticated the configured mailbox provider SMTP service and delivered to Gmail passed SPF. Gmail identified `192.0.2.10` as an authorized sender for `deployment-mailbox@example.invalid`. If another outbound sender is introduced later, add only that provider's documented include or IP range before retaining `-all`.

## DMARC rollout

The domain is currently at the quarantine stage:

```text
v=DMARC1; p=quarantine; sp=quarantine; rua=mailto:dmarc-report@example.invalid; pct=100
```

On 3 August 2026, Gmail reported `dkim=pass` with `d=filius.app` and selector `key2`, `spf=pass` for `deployment-mailbox@example.invalid`, and `dmarc=pass` aligned with the visible `From` domain. Delivery used TLS 1.3. The earlier monitoring policy was therefore advanced from `p=none` to `p=quarantine`.

After reviewing aggregate reports for at least one normal sending cycle and confirming that no legitimate source fails, enforce rejection:

```text
v=DMARC1; p=reject; sp=reject; rua=mailto:dmarc-report@example.invalid; pct=100
```

Do not add forensic-report (`ruf`) delivery unless its privacy and operational implications are explicitly approved.

## Verification

Run these checks after every DNS change:

```bash
dig +short MX filius.app
dig +short TXT filius.app
dig +short CNAME key1._domainkey.filius.app
dig +short CNAME key2._domainkey.filius.app
dig +short TXT _dmarc.filius.app
dig +short A webmail.example.invalid
dig +short AAAA webmail.example.invalid
```

The final two commands should return no result. For a new sender or after any mail-provider change, send a message through the configured mailbox provider SMTP to an external mailbox and inspect the received headers. Before retaining enforcement, require:

- `spf=pass` for the envelope sender;
- `dkim=pass` with `header.d=filius.app`;
- `dmarc=pass` with the visible From domain `filius.app`; and
- successful inbound delivery to `support@filius.app` and `dmarc-report@example.invalid`.

MTA-STS and TLS reporting are separate follow-up controls. Do not publish `_mta-sts` or `_smtp._tls` records until the HTTPS policy endpoint and report handling are actually deployed.
