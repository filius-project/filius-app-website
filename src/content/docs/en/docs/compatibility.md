---
title: FILIUS compatibility
description: What .fls content is editable, preserved, or unavailable on iPad.
sidebar:
  order: 7
---

Filius on iPad treats the FILIUS project format as a compatibility contract.

## Supported workflows

- import `.fls` files
- edit known devices, links, and configuration
- save and reopen projects
- use supported simulated applications
- preserve unknown content within explicit safety bounds

## Preserved does not mean executable

Unknown JavaBean/XML content may remain in a project even when Filius on iPad cannot execute it.

## LAN Remote Link release status

The **This project** connection between two Remote Links in one topology remains supported. A saved **Another iPad** configuration is preserved, but it remains inactive in release-ready builds.

The LAN implementation exists and has automated coverage. Its final acceptance still requires two physical iPads on the same local network, including the iPadOS Local Network permission, automatic discovery, manual address fallback, reconnection, and a realistic classroom workflow.

:::caution[Do not plan a lesson around it yet]
Use **This project** for a Remote Link experiment that must run reliably today. Plan **Another iPad** only after two-iPad acceptance has been recorded for the specific release.
:::

## Desktop boundary

Arbitrary applications from the desktop software wizard require a compiler, JVM, and desktop APIs that are unavailable on iPad.

:::danger[Check before class]
Open existing course projects in Filius on iPad and test every required application. Loading a file successfully does not prove that all desktop-specific content can run on iPad.
:::
