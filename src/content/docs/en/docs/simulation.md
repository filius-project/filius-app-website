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

## Simulate packet loss deliberately

Use **Drop packets** to introduce a controlled global outage into a running experiment. Press and hold the control: while it remains pressed, every newly transmitted simulated network frame is dropped. Release it and new traffic flows normally again.

A repeatable experiment:

1. Start a continuous `ping` or repeated client requests.
2. Press and hold **Drop packets** for several seconds.
3. Observe timeouts and events marked as dropped.
4. Release the control and verify that new requests succeed again.

The control affects the entire simulated topology, not only the selected device. It is intentionally momentary and is disabled when the simulation stops or restarts.

## Export packet capture as text

Open **Packet Exchange** on a device, select an interface when needed, and choose **Export**. Filius on iPad saves UTF-8 tab-separated text scoped to the selected device and, when selected, its interface.

The export has deterministic ordering and works with spreadsheets or custom analysis. Passwords, credentials, Remote Link codes, payloads, and message bodies are removed or marked. Capture retention is bounded so a long simulation cannot grow memory without limit. If older events have already been discarded, the export reports their count explicitly.

## Export a detailed report

Open **More** and choose **Export detailed report**. The text report summarizes project metadata, links, devices and interfaces, applications, routes, DNS, DHCP, NAT and port forwarding, firewall, web and email configuration, Remote Links, packet loss, traffic statistics, and individual events.

Use the report for submissions, troubleshooting, or comparing two experiment states. Sensitive values and message content are redacted. It is a snapshot of the current project and retained runtime data; when packet retention has removed older events, the report also states how many were discarded.

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
