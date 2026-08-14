---
locale: en
translationKey: java-ipad-parity
slug: java-ipad-parity
title: "From the Java reference to iPad: closing the next parity gap"
summary: "How a source-level comparison became a production-focused set of DNS, web, email, diagnostics, reporting, and network-observation improvements on iPad."
publishedAt: 2026-08-13
kind: development
topics:
  - Compatibility
  - Networking
  - Quality
  - Development
readingMinutes: 7
featured: false
---

A compatibility project can look complete long before it behaves completely. The main screens may exist, projects may open, and the first classroom exercises may work. The remaining differences are often hidden one level deeper: a record type that cannot be selected, an action that stops at “send,” or diagnostic data that can be viewed but not handed in.

That was the starting point for the latest Java-to-iPad parity pass. Instead of asking whether Filius on iPad had “DNS,” “web,” or “email,” we compared the observable workflows in the Java reference with the iPad implementation and asked a stricter question: **Can a learner complete the same experiment and explain the same result?**

## Start with behavior, not screen names

The review treated the Java version as a behavioral reference, not as a layout template. A native iPad interface should follow iPad interaction patterns, but the underlying learning contract still needs to survive the move.

For each gap, we wrote down four things before changing the interface:

1. the input a learner can configure,
2. the network behavior that should follow,
3. the evidence that should remain visible,
4. the project data that must survive save and reopen.

That prevented shallow ports. A DNS menu containing `MX` and `NS` would not be useful if resolution still understood only `A`. A report button would not be safe if it copied passwords or email bodies into a shared file. A packet-loss switch would not be trustworthy if it left the simulation in an invisible altered state.

## DNS became a resolver, not just a table

The iPad DNS server now models typed `A`, `MX`, and `NS` records with TTL values. It can answer authoritative queries, forward them to another DNS server, or follow `NS` referrals with glue addresses during recursive resolution. Successful answers enter a cache, while loop and hop limits keep malformed topologies deterministic.

This makes several classroom sequences possible on iPad: delegating a subdomain, tracing a lookup across multiple simulated networks, comparing a first lookup with a cache hit, and locating a mail exchanger separately from its address.

The important implementation lesson was that every caller had to use the same typed resolver. It was not enough to improve the DNS application while leaving browser or email hostname lookups on an older shortcut. The final pass therefore followed the lookup path from the user action to the simulated UDP exchange and back.

## Web experiments gained two different kinds of hosting

Ordinary simulated web servers can now define virtual hosts. A hostname and optional port select a document root, with explicit enabled and default states. Two names can therefore resolve to one IP address and still return different sites.

Routers and gateways gained a separate web-administration service under `/admin`. An allowed source network and administration port form the access policy. From an authorized simulated client, learners can inspect or change routes, DHCP, NAT and port forwarding, and firewall settings through HTTP.

That administration site belongs entirely to the simulated network. It does not expose the real iPad, school Wi-Fi, or home router. Keeping that boundary explicit was part of the feature rather than an afterthought.

## Small application actions completed larger workflows

The email client already sent and retrieved messages. The parity review found the missing continuation: replying, replying to all recipients, and deleting messages from the inbox or sent folder.

Reply actions now create a new draft with the relevant recipients and message reference. Deletion is confirmed and scoped to the open folder, so removing a sent copy does not silently remove the corresponding inbox copy.

This is a small interface change with a larger teaching effect. A learner can now carry a conversation through several messages and then reason about separate local mailbox views instead of treating email as a one-shot demo.

## Diagnostics became portable evidence

Three related changes make experiments easier to observe and submit:

- **Drop packets** is a momentary global control. While it is held, all newly transmitted simulated frames are dropped; releasing it restores normal traffic.
- **Packet Exchange** can export the selected device or interface as deterministic UTF-8 TSV.
- **Export detailed report** produces a stable text snapshot of topology, configuration, services, security rules, Remote Links, packet-loss evidence, and retained traffic.

Both exports redact credentials, shared link codes, payloads, and message bodies. Long-running simulations also need a memory boundary, so packet traces use bounded retention. When older traces have been discarded, exports state that count instead of presenting the remaining sample as a complete history.

That last detail came from reviewing the feature as an operational system rather than stopping at a successful export. A diagnostic tool should describe the limits of its own evidence.

## Labels now support the experiment

PC and notebook labels can follow the manual name, IP address, MAC address, or both network identities. The manual name remains a fallback when the chosen value is unavailable.

This reduces the need to copy addresses onto separate annotations. IP-derived labels help with subnet exercises; MAC-derived labels help learners connect ARP results and switch-learning tables to the devices on the canvas.

## Verification was part of each slice

The work was split into vertical slices: state and persistence, runtime behavior, native controls, localization and accessibility, then focused verification. Tests covered record validation and recursive DNS, virtual-host dispatch and administration mutations, email reply and deletion semantics, packet-loss lifecycle, label derivation, report redaction, export ordering, and backward-compatible project loading.

Broader service-focused and full UI runs checked that those pieces still worked through the actual application, while protocol oracles compared key networking contracts independently from the SwiftUI screens. Release simulator builds then verified integration across the complete application.

The process also included repeated final reviews. Those reviews found issues such as packet history growing without a production bound and reports needing an explicit format version. Fixing those findings before describing the work publicly is exactly why parity is a process, not a checklist.

## One release gate remains deliberately closed

LAN Remote Link can connect two running simulations over a real local network, and its protocol, encryption, discovery, persistence, and reconnection paths have automated coverage. It is not being promoted as released yet.

Final acceptance still requires a complete run on **two physical iPads** on the same reachable network, including the iPadOS Local Network permission, automatic discovery, manual fallback, interruption, and a realistic classroom workflow. Release-ready builds therefore preserve an **Another iPad** configuration but keep it inactive. The in-project Remote Link mode remains available.

That distinction is intentional. Automated evidence can establish a strong implementation baseline; it cannot replace the last hardware-specific acceptance step.

## The result

This parity pass did not try to make the iPad app resemble every desktop dialog. It transferred the behaviors that make the experiments meaningful: richer DNS, name-based web hosting, simulated network administration, complete email workflows, controlled failure, portable evidence, and labels tied to network identity.

The documentation has been updated alongside the implementation so these capabilities can be used as experiments rather than discovered as hidden controls. The remaining LAN Remote Link gate is documented just as clearly as the completed work. Production readiness depends on both kinds of honesty.
