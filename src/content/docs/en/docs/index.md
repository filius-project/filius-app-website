---
title: Documentation
description: Start using Filius on iPad, understand its modes, and work safely with FILIUS projects.
sidebar:
  order: 1
---

Filius on iPad is a native iPad application for designing, configuring, and simulating computer networks. These pages document the **current iPad scope** and distinguish confirmed capabilities from planned or experimental work.

## Fastest path

1. Complete the [quick start](/en/quickstart/).
2. Learn every visible area in [Interface and controls](./interface/).
3. Choose the right topology items with [Devices and connections](./devices/).
4. Build the network in [Design mode](./design/), then start [Simulation mode](./simulation/).
5. Install the clients and services described under [Simulated applications](./applications/).
6. Check [Compatibility](./compatibility/) before preparing a lesson and use [Troubleshooting](./troubleshooting/) when results differ from expectations.

:::note[Publication status]
App Store availability will be announced separately. Source repositories, licensing basis, privacy information, and provider details are already documented publicly.
:::

## Three-step model

- **Design:** place devices and connect a topology.
- **Configure:** assign addresses, routes, services, and applications.
- **Simulate:** generate traffic, inspect it, and explain the result.

## Advanced network experiments

The current iPad implementation supports several experiments beyond the first ping:

- [Networking features](./networking/): DNS with `A`, `MX`, and `NS` records, recursive resolution, and router or gateway web administration,
- [Simulated applications](./applications/): web-server virtual hosts plus reply and deletion workflows in the email client,
- [Simulation mode](./simulation/): global packet loss, packet capture as TSV, and a redacted detailed report,
- [Design mode](./design/): device labels derived from a name, IP address, MAC address, or both addresses,
- [Compatibility](./compatibility/): the current release status of LAN Remote Link between two iPads.

The development article [From the Java reference to iPad](/en/news/java-ipad-parity/) explains how these gaps were found, implemented, and verified.
