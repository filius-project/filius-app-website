---
title: Devices and connections
description: Cable, PC, notebook, switch, gateway, router, and Remote Link explained in detail.
sidebar:
  order: 4
---

The device palette creates the physical topology. Every icon has a different role and set of ports.

## Cable tool

<img class="doc-device" src="/docs-assets/devices/cable.png" alt="Cable tool from Filius on iPad">

The cable tool joins two free ports.

1. Select Cable.
2. Tap the first device or port.
3. Tap the destination device or port.
4. Confirm that the connection line is visible.

A port cannot carry multiple cables at the same time. A switch therefore supplies many ports. A direct PC-to-PC connection is useful for the first ping test.

## PC

<img class="doc-device" src="/docs-assets/devices/pc.png" alt="PC icon">

**Role:** Simulated endpoint for user applications and server services.  
**Default port:** `eth0`  
**Typical settings:** IPv4 address, subnet mask, default gateway, and optional DHCP.  
**Typical use:** CMD, browser, email client, web server, DNS server, or DHCP server.

A PC and notebook behave the same at network level. Their different icons make roles easier to recognise in a diagram.

## Notebook

<img class="doc-device" src="/docs-assets/devices/notebook.png" alt="Notebook icon">

**Role:** Mobile endpoint with the same simulated application environment as a PC.  
**Default port:** `eth0`  
**Typical use:** Second ping participant, web client, email client, or peer-to-peer node.

Filius on iPad does not simulate real Wi-Fi here. The notebook is also attached through a virtual cable.

## Switch

<img class="doc-device" src="/docs-assets/devices/switch.png" alt="Switch icon">

**Role:** Connects several devices in one LAN.  
**Ports:** 24 physical ports (`sw1` through `sw24`).  
**Learning goal:** Ethernet forwarding, MAC learning, and a star topology.

A switch is not a router: it joins devices in a local network but does not automatically provide a path into a different IPv4 subnet.

## Router

<img class="doc-device" src="/docs-assets/devices/router.png" alt="Router icon">

**Role:** Forwards IPv4 packets between different subnets.  
**Initial configuration:** One interface (`rt1`); more interfaces can be added for further networks.  
**Typical settings:** Address and mask for each interface plus forwarding or route entries.

Each attached network needs a router interface with an address from that network. End devices use the matching router address as their default gateway.

## Gateway

<img class="doc-device" src="/docs-assets/devices/gateway.png" alt="Gateway icon">

**Role:** Connects a LAN side to a WAN side and can demonstrate address translation.  
**Ports:** Fixed `wan0` and `lan0`.  
**Typical use:** An internal network communicates with a second network through one external address; the NAT table can be inspected and reset in action mode.

Connect the internal network to `lan0` and the outer network to `wan0`.

## Remote Link

<img class="doc-device" src="/docs-assets/devices/remote-link.png" alt="Remote Link icon">

**Role:** Creates a deterministic point-to-point connection between two separately drawn areas of the topology.  
**Port:** `remote0`  
**Configuration:** Enable both Remote Links and assign the same unique pair ID.

Status indicators distinguish unpaired, active, ambiguous, and disabled states. Exactly two enabled links with the same pair ID form a pair. No real host-network sockets are opened.

## Unsupported device

Unknown device kinds imported from `.fls` files can be preserved as placeholders. They are marked but may not have editable or simulated behaviour. See [Compatibility](../compatibility/).

## Which item should I use?

| Goal                             | Recommended topology                                      |
| -------------------------------- | --------------------------------------------------------- |
| First ping                       | Two endpoints and one direct cable                        |
| Several devices in one LAN       | Endpoints → switch                                        |
| Two IPv4 subnets                 | One LAN per side → router                                 |
| Observe LAN/WAN and NAT          | Internal LAN → gateway → external network                 |
| Join separated diagram areas     | Two Remote Links with the same pair ID                    |
| Test a client/server application | Two endpoints with the appropriate applications installed |

:::tip
Name devices after their role, such as `Client`, `Web server`, `DNS`, or `Router A`. That is more useful for teaching and packet inspection than many identically named PCs.
:::
