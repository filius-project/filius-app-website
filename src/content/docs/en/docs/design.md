---
title: Design mode
description: Place, connect, select, and fully configure network devices.
sidebar:
  order: 5
---

Design mode creates the physical and logical network structure. See [Devices and connections](../devices/) for every palette symbol.

<img class="doc-screenshot" src="/docs-assets/interface/empty-project.png" alt="Empty design mode with toolbar, device palette, and canvas" loading="eager">

## 1. Plan the topology

Decide roles before placing devices: which systems are clients, which provide services, and which networks should be separated by a router or gateway? Name devices after their role early.

Two endpoints are enough for a first LAN. For three or more participants, a star topology around a switch is easier to read.

## 2. Place devices

Drag PCs, notebooks, switches, routers, gateways, or Remote Links from the palette to the canvas. Leave room for cables, addresses, and documentation.

After selecting a device, its name, interfaces, position, and network settings can be edited as supported by that device kind.

## 3. Derive labels from IP and MAC addresses

PC and notebook labels on the canvas can follow their network configuration automatically. Open the device configuration and choose a source under **Device label**:

- **Manual name:** shows the device name you entered,
- **IP address:** shows the primary interface address,
- **MAC address:** shows its hardware address,
- **IP and MAC address:** shows both values together.

The manual name remains the fallback when the selected source has no value yet. IP labels work well on address-planning worksheets; MAC labels make ARP and switch-learning experiments easier to follow on the canvas.

## 4. Create cables

1. Select the cable tool.
2. Tap the first device or a free port.
3. Tap the destination device or port.
4. Confirm the line is visible and the port is occupied.

Direct endpoint-to-endpoint links are supported. Use a switch when several devices must share one LAN.

## 5. Assign IPv4 addresses

For a direct test, both devices belong to the same network:

| Device |        Address |            Mask | Default gateway |
| ------ | -------------: | --------------: | --------------: |
| PC 1   | `192.168.1.10` | `255.255.255.0` |           empty |
| PC 2   | `192.168.1.20` | `255.255.255.0` |           empty |

With `/24`, the first three address groups match and the final number must be unique per device.

## 6. Connect two subnets

Example:

| Area                    | Router address | Endpoint        | Endpoint gateway |
| ----------------------- | -------------- | --------------- | ---------------- |
| LAN A `192.168.10.0/24` | `192.168.10.1` | `192.168.10.10` | `192.168.10.1`   |
| LAN B `192.168.20.0/24` | `192.168.20.1` | `192.168.20.10` | `192.168.20.1`   |

The router needs one interface in each network. Without the correct default gateway, an endpoint does not send traffic for the other network to the router.

## 7. Review before simulation

- every required cable is present,
- every IPv4 address is unique in its network,
- masks match the planned subnets,
- each default gateway belongs to the endpoint’s local network,
- the router is addressed on both sides,
- Remote Links have one unambiguous pair,
- server devices have meaningful names.

:::caution
Duplicate IP addresses, separate networks without a router, an incorrect mask, an off-subnet gateway, or a missing cable can produce similar symptoms. Troubleshoot from the physical link upward, not from the application downward.
:::
