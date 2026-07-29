---
title: Simulation mode
description: Start the runtime, operate virtual devices, and inspect network traffic.
sidebar:
  order: 7
---

Action mode freezes the design and creates a virtual network runtime from it. Return to design mode for technical topology changes; use action mode for applications and diagnostics.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Virtual computer and applications in action mode" loading="eager">

## Start and stop simulation

1. Save the design.
2. Tap **Action mode**.
3. Resolve any configuration warnings.
4. Set an appropriate simulation speed.
5. Return to design mode to stop.

Stopping ends the runtime. Save relevant project changes and record results before rebuilding the experiment.

## Open a virtual computer

Tap a PC or notebook. Its virtual desktop lists installed applications. **Software Installation** adds or removes applications per device. See [Simulated applications](../applications/) for the complete reference.

Network devices such as switches, routers, and gateways instead expose status, interfaces, forwarding, or NAT views.

## Generate the first traffic

Open CMD on PC 1:

```text
ipconfig
ping 192.168.1.20
arp
```

- `ipconfig` confirms local configuration.
- The first `ping` may use ARP to discover the target’s hardware address.
- ICMP then carries request and reply.
- `arp` shows the learned neighbour.

A second ping may need fewer preparatory packets because ARP state already exists.

## Observe applications

Use a fixed sequence for higher-level protocols:

1. Verify IP reachability with `ping`.
2. If using a name, verify DNS with `host` or `nslookup`.
3. Start the server service and note its port.
4. Configure the client destination, protocol, and port.
5. Run the experiment.
6. Compare application output with packet inspection.

## Packet inspection

<img class="doc-screenshot" src="/docs-assets/interface/packet-viewer.png" alt="Packet inspector showing protocol layers and packet details" loading="lazy">

Look for the last successful stage:

- **no ARP:** check local subnet, link, and interface,
- **ARP but no ICMP result:** check target, route, and firewall,
- **DNS query without a suitable answer:** check DNS server and record,
- **TCP setup without application response:** check the service, port, and server application,
- **SMTP, POP3, or HTTP error:** check application data and credentials.

## Diagnostic order

1. Cable and link state
2. IP address and subnet mask
3. Default gateway and route table
4. DNS when hostnames are used
5. Firewall rules
6. Server process and destination port
7. Client configuration
8. Packet inspection, `tcpdump`, and runtime logs

:::tip
Change only one variable per repetition. That makes the cause of a success or failure visible in the packet sequence.
:::
