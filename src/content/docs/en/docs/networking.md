---
title: Networking features
description: Ethernet, ARP, IPv4, ICMP, TCP, UDP, routing, DHCP, DNS, firewall, and NAT in the learning model.
sidebar:
  order: 6
---

Filius on iPad models central network mechanisms deterministically. The goal is not only a successful result but a traceable explanation of the layers involved.

## Ethernet and switching

Cables join physical ports. A switch learns which participant is reachable through each port and forwards Ethernet frames inside one LAN. Broadcast reaches multiple participants; normal unicast becomes more targeted once the switch knows the mapping.

**Observe it:** attach several endpoints to a switch, ping them in sequence, and compare packets and learned state.

## ARP

ARP maps a local IPv4 address to a hardware address. An ARP exchange can therefore precede the first IPv4 packet sent to a local target or default gateway.

- Target in the same subnet: ARP asks for the target itself.
- Target in another subnet: ARP asks for the default gateway.
- Incorrect mask: the sender can incorrectly search for the target locally or send unnecessarily to a gateway.

CMD provides `arp` and `arpsend` for diagnostics and controlled experiments.

## IPv4 and ICMP

IPv4 carries packets between interfaces and networks. The subnet mask and routes determine the next step. ICMP is used by `ping` and diagnostic messages.

A successful ping confirms basic IP reachability, not DNS, a TCP port, an application, or credentials.

## Routing and RIP

Static routes define a destination network, mask, and next hop. Routers need appropriate interfaces and forwarding. RIP can exchange route information between suitable routers; inspect the resulting route tables instead of assuming convergence.

**Troubleshooting order:** interface address → directly connected networks → default route → specific route → next hop.

## UDP and TCP

- **UDP:** Connectionless datagrams, including DNS and DHCP. Fewer stages, but no TCP connection setup.
- **TCP:** Connection-oriented transport for web, email, Gnutella, and optionally the simple client. Setup, data transfer, and teardown are separate observable stages.

Port numbers identify a service on a reachable host. A correct IP address is not sufficient when no service is listening or the firewall blocks that port.

## DHCP

DHCP automates address, mask, gateway, and DNS settings over simulated UDP ports `67` and `68`. The client shows its active lease; the server controls the pool and optional static assignments.

## DNS

DNS maps hostnames to IPv4 addresses over UDP port `53`. Use `host` or `nslookup` to test resolution independently from a web or email application.

## Firewall

The personal firewall filters inbound TCP, UDP, and ICMP per endpoint. Define rules narrowly for the required service, then repeat the same client experiment to compare the result.

## Gateway, NAT, and port forwarding

A gateway separates LAN and WAN sides. NAT can map internal senders to one external address; runtime inspection shows the resulting mappings. Port forwarding exposes a selected internal service to the outer side.

## Observe instead of treating it as a black box

Use these together:

- CMD (`ipconfig`, `arp`, `route`, `netstat`, `tcpdump`),
- interface and route tables,
- service state and application logs,
- layered packet inspection,
- NAT, DHCP, and DNS state.

:::note
The simulator is an educational model, not a security audit, capacity-planning, or certification tool for production networks.
:::
