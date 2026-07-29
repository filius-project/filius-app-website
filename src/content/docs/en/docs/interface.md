---
title: Interface and controls
description: Every area of the app, toolbar control, mode, canvas, and inspector explained in detail.
sidebar:
  order: 3
---

This page explains the visible elements of **Filius on iPad**. Names refer to the regular iPad layout. In Split View or a narrow window, several commands are grouped into compact menus.

<img class="doc-screenshot" src="/docs-assets/interface/empty-project.png" alt="Empty Filius on iPad project with the top toolbar, device palette on the left, and design canvas" loading="eager">

## Top toolbar

| Icon                                                                                            | Element                | What it does                                                                                   |
| ----------------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| <img class="doc-icon" src="/docs-assets/modes/new.png" alt="New icon">                          | **New**                | Starts an empty project. Save unsaved work first.                                              |
| <img class="doc-icon" src="/docs-assets/modes/open.png" alt="Open icon">                        | **Open**               | Imports a project from the Files app, including supported `.fls` files.                        |
| <img class="doc-icon" src="/docs-assets/modes/save.png" alt="Save icon">                        | **Save**               | Writes the current project to a file that can be shared or reopened later.                     |
| <img class="doc-icon" src="/docs-assets/modes/design.png" alt="Design mode icon">               | **Design mode**        | Place devices, draw cables, and edit network settings.                                         |
| <img class="doc-icon" src="/docs-assets/modes/simulation.png" alt="Action mode icon">           | **Action mode**        | Starts the simulation and enables virtual computers and applications.                          |
| <img class="doc-icon" src="/docs-assets/modes/documentation.png" alt="Documentation mode icon"> | **Documentation mode** | Adds text and rectangles and exports project documentation.                                    |
| <img class="doc-icon" src="/docs-assets/modes/help.png" alt="Help icon">                        | **Help**               | Opens the built-in contextual help.                                                            |
| <img class="doc-icon" src="/docs-assets/modes/information.png" alt="Information icon">          | **Information**        | Shows product, version, and licence information.                                               |
| `•••`                                                                                           | **More**               | Contains Undo, Redo, Settings, and—when enabled—the experimental protocol application builder. |

### Simulation speed

The percentage slider controls virtual time and the delay per connection. A low value makes packet sequences easier to observe; a high value completes longer experiments sooner. It does **not** change the speed of the iPad’s real Wi-Fi or Internet connection.

:::tip
Use a slow setting while discussing packets in class. Increase it after the configuration has been verified.
:::

## Device palette

The left palette contains the cable tool, PC, notebook, switch, gateway, router, and Remote Link. The selection tool sits at the bottom.

<img class="doc-screenshot doc-screenshot--palette" src="/docs-assets/interface/device-palette.png" alt="Filius on iPad device palette showing cable, PC, notebook, switch, gateway, router, and Remote Link" loading="lazy">

- **Tap:** activate a tool, then tap the canvas.
- **Drag:** move a device directly from the palette to its desired position.
- **Select:** mark an existing device or cable to edit its properties.
- **Narrow layout:** the palette becomes a compact horizontal shelf.

Every palette item is described on [Devices and connections](../devices/).

## Canvas

The large central area is the network diagram.

- Devices can be moved and rearranged.
- Lines represent physical connections between ports.
- A selected item receives a visible highlight.
- Tap empty space to clear a selection.
- In documentation mode, text and rectangles appear above the network.

A clear layout—end devices outside, switches near the centre, and routers between subnets—makes the network easier to explain and troubleshoot.

## Device configuration and inspector

Selecting a device reveals the settings available for that kind of device. Depending on the device, these include:

- display name and position,
- physical ports and occupancy,
- IPv4 address and subnet mask per interface,
- default gateway,
- additional router interfaces and forwarding,
- WAN and LAN sides of a gateway,
- pair ID and status of a Remote Link.

Logical network changes belong in design mode. While action mode is running, the app instead emphasises runtime status, applications, and diagnostics.

## The three workspace modes

### Design mode

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/design.png" alt="Design mode">

Build the network here. Project files, devices, connections, and addresses can only be edited while the simulation is stopped.

### Action mode

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/simulation.png" alt="Action mode">

Starting action mode validates the configuration and creates the virtual network runtime. Tap a PC or notebook to open its desktop and installed applications.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Virtual computer in action mode with its desktop and an application window" loading="lazy">

### Documentation mode

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/documentation.png" alt="Documentation mode">

Add explanatory text and rectangles to the diagram, then export the result as PNG or PDF. Network devices remain visible but are not technically configured in this mode.

## Packet and protocol view

During simulation, Filius on iPad records attributable events. Packet inspection separates a selected packet into layers and shows details such as participating devices, protocol, and virtual time.

<img class="doc-screenshot" src="/docs-assets/interface/packet-viewer.png" alt="Filius on iPad packet inspector with protocol layers and packet details" loading="lazy">

Open this view after `ping`, DNS, HTTP, email, or client/server experiments to explain not just the result but also the route through the simulated network.
