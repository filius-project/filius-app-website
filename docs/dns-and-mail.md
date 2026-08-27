# DNS and mail

## Purpose

This runbook records the production DNS design for `filius.app`. The website is proxied through Cloudflare, while email is delivered through the configured mail provider. Cloudflare Email Routing and a `webmail.example.invalid` hostname are not part of the design.

All mail-related records must be **DNS only** in Cloudflare. Cloudflare's HTTP proxy must never be enabled for SMTP, IMAP, DKIM, or MX targets.

## Required records

| Type   | Name              |         Priority | Value                                                                                     | Proxy    |
| ------ | ----------------- | ---------------: | ----------------------------------------------------------------------------------------- | -------- |
| MX     | `@`               | provider-defined | `<approved mail-provider MX target>`                                                      | DNS only |
| A/AAAA | provider-defined  |                — | `<approved mail-provider address>`                                                        | DNS only |
| TXT    | `@`               |                — | `<approved-provider SPF policy>`                                                          | DNS only |
| CNAME  | `key1._domainkey` |                — | `key1._domainkey.webhosting.systems`                                                      | DNS only |
| CNAME  | `key2._domainkey` |                — | `key2._domainkey.webhosting.systems`                                                      | DNS only |
| TXT    | `_dmarc`          |                — | `v=DMARC1; p=quarantine; sp=quarantine; rua=mailto:<approved-reporting-address>; pct=100` | DNS only |

The DKIM records should delegate the provider's rotating selectors where supported. Do not copy provider keys or exact production DNS values into this public repository; keep them in the private operations record.

Create the approved DMARC reporting mailbox or alias before relying on aggregate reports; keep its production address in the private operations record. A webmail hostname is not required; the mailbox can be read through a configured mail client or forwarded according to the approved privacy design.

## Records to remove or avoid

- Keep `webmail` A and AAAA records absent. The support mailbox does not require a public webmail hostname.
- Do not add Cloudflare Email Routing MX records unless the approved mail design explicitly requires them.
- Do not create more than one SPF TXT record at the zone apex.
- Do not proxy `mail`, MX targets, DKIM selectors, or mail-discovery records.

An `autoconfig` record may remain only when it is required by the approved mail provider; it is unrelated to webmail.

## SPF policy

The enforced SPF policy should not authorize web-proxy addresses as mail senders. Keep the provider-specific mechanisms and includes in the private operations record.

```text
v=spf1 <approved-provider-mechanisms> -all
```

Before enforcing SPF, send an external delivery test through the approved provider and verify the resulting headers. If another outbound sender is introduced, add only that provider's documented include or IP range.

## DMARC rollout

The domain is currently at the quarantine stage:

```text
v=DMARC1; p=quarantine; sp=quarantine; rua=mailto:<approved-reporting-address>; pct=100
```

After the external delivery test, verify `dkim=pass`, `spf=pass`, and `dmarc=pass` with the visible `From` domain aligned. Record provider-specific evidence privately.

After reviewing aggregate reports for at least one normal sending cycle and confirming that no legitimate source fails, enforce rejection:

```text
v=DMARC1; p=reject; sp=reject; rua=mailto:<approved-reporting-address>; pct=100
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

The final two commands should return no result. For a new sender or after any mail-provider change, send a message through the approved SMTP provider to an external mailbox and inspect the received headers. Before retaining enforcement, require:

- `spf=pass` for the envelope sender;
- `dkim=pass` with `header.d=filius.app`;
- `dmarc=pass` with the visible From domain `filius.app`; and
- successful inbound delivery to the approved support and reporting mailboxes.

MTA-STS and TLS reporting are separate follow-up controls. Do not publish `_mta-sts` or `_smtp._tls` records until the HTTPS policy endpoint and report handling are actually deployed.
