---
title: Simulated applications
description: Installation, operation, and learning goals for every available application.
sidebar:
  order: 8
---

Virtual PCs and notebooks have their own desktop and **Software Installation** area. Applications are installed per device, so client and server roles must be assigned deliberately.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Virtual desktop with installed applications in Filius on iPad" loading="eager">

## Install or remove an application

1. Finish and address the network in design mode.
2. Start action mode.
3. Tap a PC or notebook.
4. Open **Software Installation** or the Installer menu.
5. Install the required application. Its icon appears on the virtual desktop.
6. Tap the application, configure it, and start it.

Removing an application removes its launcher from that virtual desktop. Save the project before substantial changes.

:::note
Not every application belongs on every device. A web experiment needs a web server on one device and a web browser on another. Email requires at least an email server and correctly configured clients.
:::

## CMD

<img class="doc-app-icon" src="/docs-assets/applications/cmd.png" alt="CMD icon">

The command shell combines network diagnostics with the virtual file system. It is the primary troubleshooting tool.

| Group                     | Commands and purpose                                          |
| ------------------------- | ------------------------------------------------------------- |
| Reachability              | `ping`, `trace`, `path`, `traceroute`, `route`                |
| Addresses and connections | `ipconfig`, `netstat`, `arp`, `arpsend`, `tcpdump`            |
| DNS                       | `host`, `nslookup`, `dns add`, `dns remove`, `dns resolve`    |
| Files                     | `cat`, `cd`, `cp`, `del`, `ls`, `mkdir`, `mv`, `pwd`, `touch` |
| Help                      | `help` or `help <command>`                                    |

**Example:** `ping 192.168.1.20` checks IP reachability. `host web.school` then tests name resolution. `tcpdump` prints a bounded snapshot of recorded packets rather than starting a real blocking host process.

## File Explorer

<img class="doc-app-icon" src="/docs-assets/applications/file-explorer.png" alt="File Explorer icon">

Browses the selected device’s virtual file system. These directories and files are part of the simulation, not the iPad’s real Files app.

**Use it to:** inspect results from the text editor, web server, email, or Gnutella; explain directory structures; and work with the same files from CMD.

## Text Editor

<img class="doc-app-icon" src="/docs-assets/applications/text-editor.png" alt="Text Editor icon">

Creates and edits text files in the virtual file system. Drafts can be saved or reset to their last saved state.

**Use it for:** HTML pages served by the web server, text files for transfer or peer-to-peer sharing, and demonstrating that `cat` in CMD reads the same stored content.

## Image Viewer

<img class="doc-app-icon" src="/docs-assets/applications/image-viewer.png" alt="Image Viewer icon">

Opens supported virtual image files. It reads only from the simulated file system of the current device.

**Use it to:** confirm that an image was transferred or downloaded and distinguish binary image content from plain text.

## Web server

<img class="doc-app-icon" src="/docs-assets/applications/web-server.png" alt="Web server icon">

Provides HTTP content from a virtual computer. The service can be started, stopped, and restarted; its default port is `80`.

**Procedure:**

1. Install the web server on the server device.
2. Prepare content in its virtual file system.
3. Start the service and check its status.
4. On a second device, open the web browser and enter the IP address or a resolvable hostname.
5. If it fails, check `ping` first, DNS second, and service status last.

## Web browser

<img class="doc-app-icon" src="/docs-assets/applications/web-browser.svg" alt="Web browser icon">

Resolves a hostname through the configured DNS server when needed and retrieves HTTP content over simulated TCP.

**Learning goal:** Explain the sequence DNS → TCP → HTTP. A successful ping does not guarantee a successful page load: DNS, the destination port, and the web service must also be correct.

## Echo server

<img class="doc-app-icon" src="/docs-assets/applications/echo-server.png" alt="Echo server icon">

Runs a simple service that sends received payloads back to the client. Choose a port and protocol for the experiment; runtime diagnostics show start, stop, and traffic events.

**Use it for:** client/server fundamentals, port numbers, and the difference between reaching a host and reaching a service.

## Simple client

<img class="doc-app-icon" src="/docs-assets/applications/simple-client.png" alt="Simple client icon">

Connects to a destination address and port over simulated TCP or UDP sockets, sends data, receives a response, and disconnects.

**Typical experiment:** Start an echo server on device A; select the same protocol and port on device B; send text and compare the returned data with packet inspection.

## DNS server

<img class="doc-app-icon" src="/docs-assets/applications/dns-server.png" alt="DNS server icon">

Stores hostname-to-IPv4 records and answers simulated DNS queries on UDP port `53`.

**Procedure:**

1. Give the DNS server a fixed IP address.
2. Add records such as `web.school → 192.168.10.20`.
3. Configure clients to use that DNS server address.
4. Test with `host web.school` or the web browser.

DNS does not replace routing. The client must be able to reach both the DNS server and the resolved target address.

## DHCP server

<img class="doc-app-icon" src="/docs-assets/applications/dhcp-server.png" alt="DHCP server icon">

Automatically assigns IPv4 settings to enabled DHCP clients. Configure the address range, subnet mask, gateway, DNS server, and optional static assignments. DHCP uses simulated UDP ports `67` and `68`.

**Check:** After the exchange, the client displays its active lease. Use `ipconfig` to confirm the assigned address.

:::caution
The DHCP server itself needs a sensible fixed configuration. Any advertised gateway or DNS address must actually exist and be reachable in the simulated network.
:::

## Personal firewall

<img class="doc-app-icon" src="/docs-assets/applications/firewall.png" alt="Personal firewall icon">

Filters inbound TCP, UDP, and ICMP traffic for this virtual device. ICMP can be allowed separately, and service rules can specify protocol, port, and source.

**Learning experiment:** Verify ping and an echo service without filtering. Then block ICMP or the selected service port and compare the changed results in CMD and packet inspection.

## Email server

<img class="doc-app-icon" src="/docs-assets/applications/email-server.png" alt="Email server icon">

Hosts local mailboxes and runs simulated SMTP and POP3 services. SMTP defaults to port `25` and POP3 to port `110`. Configure a domain and user accounts.

**Use it for:** distinguishing message submission from retrieval, understanding server accounts and mail domains, and observing several application steps over one IP network.

## Email client

<img class="doc-app-icon" src="/docs-assets/applications/email-client.png" alt="Email client icon">

Sends messages through the configured SMTP server and retrieves them through POP3. It needs an email address, credentials, and the host and port for both services.

**Recommended topology:** One email server with two accounts and two client devices. Configure both clients with the server IP first; add DNS later and replace the IP with a hostname.

## Gnutella

<img class="doc-app-icon" src="/docs-assets/applications/gnutella.png" alt="Gnutella icon">

Creates a simulated peer-to-peer network. Peers can join through a known participant, discover other peers, search shared files, and download them. The service runs on TCP port `6346`.

The application has **Network**, **Search**, **Files**, and **Settings** areas. Shared and downloaded files live in the virtual file system’s peer-to-peer folder.

**Typical experiment:** Install Gnutella on three devices; introduce two peers directly; join the third through one known peer; search for a file and inspect the multi-step message exchange.

## Experimental protocol application builder

The native TCP/UDP protocol builder is intended for limited experiments and is hidden by default.

:::caution
It does not run arbitrary Java source code and is not a compatible replacement for the desktop edition’s Java source assistant. Existing teaching projects that depend on custom Java software must be evaluated separately.
:::

## Fast troubleshooting sequence

1. **Link present?** Check cables and occupied ports.
2. **IP correct?** Check address, mask, and default gateway.
3. **Target reachable?** Use `ping` or `trace`.
4. **Name resolvable?** Check `host`/`nslookup` and DNS settings.
5. **Service running?** Check the server application and port.
6. **Client correct?** Check destination, protocol, port, and credentials.
7. **Firewall?** Check inbound rules and ICMP permission.
8. **Inspect packets:** Use packet inspection or `tcpdump` around the failing step.
