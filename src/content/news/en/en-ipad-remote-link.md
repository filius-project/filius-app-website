---
locale: en
translationKey: ipad-remote-link
slug: ipad-remote-link
title: "Two iPads, one simulated network: Remote Link over the local network"
summary: "Remote Link will connect two running Filius simulations on separate iPads—with complete Ethernet frames, automatic discovery, and encrypted transport."
publishedAt: 2026-08-12
kind: development
topics:
  - Remote Link
  - Networking
  - Classroom
  - Security
readingMinutes: 5
featured: true
---

Two groups design separate networks, start their simulations on two iPads, and then join both topologies across the real local network. That is the classroom situation the new iPad-to-iPad mode for Remote Link is designed to support.

## Carrying the desktop idea forward

In the original Java version of FILIUS, the modem could join two running application instances over a real TCP connection. We checked the source again: one side accepts the connection, the other connects by IP address and port, and complete simulated Ethernet frames then travel in both directions.

Remote Link takes on that role on iPad. The existing mode for pairing two Remote Links inside one project remains available. A new connection scope, **Another iPad**, adds the cross-device option.

## Connecting the two simulations

Each group adds a Remote Link to its topology and cables it to the simulated network. Only a few shared settings are then required:

1. Select **Another iPad** on both devices.
2. Enter the same link code.
3. Set one iPad to **Host connection** and the other to **Join connection**.
4. Let the joining iPad find the host automatically on the local network—or enter its address and port manually.
5. Start both simulations and allow Local Network access when iPadOS asks.

Runtime status messages show whether Remote Link is waiting, browsing, connecting, or connected. If the real connection drops, the joining side automatically attempts to reconnect.

## More than a ping

Remote Link does not transport a special-purpose ping message or proxy one selected service. It carries the complete Ethernet frame produced by the simulation. ARP, IPv4, ICMP, TCP, and UDP can therefore cross the same link, together with the simulated applications built on top of them.

That distinction matters in class: the boundary between the iPads remains part of the network being investigated. Learners can continue to inspect packets inside the simulation instead of losing them inside an application-specific tunnel.

> The local network carries the simulated frames; the rules of the simulated network remain visible and testable on both iPads.

## Designed for the local network

Automatic discovery uses Apple’s local service discovery. If a school network does not pass those announcements between devices, a manual hostname or IP address and port remain available as a fallback.

The shared link code does more than match the two endpoints. It is also used to derive a key for authenticated encryption. The code itself is not announced on the local network, and the connection does not require a cloud or relay service.

Remote Link also follows the simulation lifecycle. Stopping the simulation, disabling the device, or leaving the app’s active state closes the real connection. Both apps therefore need to remain open and active during the shared simulation.

## Deliberate limits

This mode is intended for two iPads on the same reachable local network. It is not an Internet relay, does not traverse NAT or firewalls, and does not speak the Java modem’s wire format directly. Wi-Fi networks with client isolation can also block direct device-to-device connections.

Each Remote Link endpoint accepts exactly one peer. A class can still run several separate links by using different link codes and ports.

## Development status

The feature is implemented in the iPad app. Automated coverage includes the encrypted handshake, incorrect link codes, bidirectional frame transfer, reconnection, persistence, and the existing in-project Remote Link behavior.

One important acceptance step remains before this becomes a release: a live run with two physical iPads on the same Wi-Fi, including Local Network permission, automatic discovery, and a realistic classroom workflow. That is why this entry is labelled **Development**, not an available release.
