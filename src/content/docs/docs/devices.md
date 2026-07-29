---
title: Geräte und Verbindungen
description: Kabel, Rechner, Notebook, Switch, Gateway, Vermittlungsrechner und Remote Link im Detail.
sidebar:
  order: 4
---

Die Gerätepalette bildet die physische Topologie. Jedes Symbol hat eine andere Aufgabe und andere Anschlüsse.

## Kabelwerkzeug

<img class="doc-device" src="/docs-assets/devices/cable.png" alt="Kabelwerkzeug aus Filius on iPad">

Das Kabelwerkzeug verbindet zwei freie Anschlüsse.

1. Kabel auswählen.
2. Erstes Gerät bzw. ersten Anschluss antippen.
3. Zielgerät bzw. Zielanschluss antippen.
4. Prüfen, ob die Verbindungslinie sichtbar ist.

Ein Anschluss kann nicht gleichzeitig für mehrere Kabel verwendet werden. Ein Switch stellt deshalb viele Anschlüsse bereit. Direkte Rechner-zu-Rechner-Verbindungen eignen sich für den einfachsten Ping-Test.

## Rechner (PC)

<img class="doc-device" src="/docs-assets/devices/pc.png" alt="Rechner-Symbol">

**Aufgabe:** Simuliertes Endgerät für Benutzeranwendungen und Serverdienste.  
**Standardanschluss:** `eth0`  
**Typische Einstellungen:** IPv4-Adresse, Subnetzmaske, Standardgateway und optional DHCP.  
**Typischer Einsatz:** Terminal, Browser, E-Mail-Client, Webserver, DNS- oder DHCP-Server.

Der Rechner und das Notebook verhalten sich netzwerktechnisch gleich. Das unterschiedliche Symbol hilft, Rollen im Diagramm sichtbar zu machen.

## Notebook

<img class="doc-device" src="/docs-assets/devices/notebook.png" alt="Notebook-Symbol">

**Aufgabe:** Mobiles Endgerät mit demselben simulierten Anwendungssystem wie der Rechner.  
**Standardanschluss:** `eth0`  
**Typischer Einsatz:** Zweiter Ping-Teilnehmer, Webclient, E-Mail-Client oder Peer-to-Peer-Knoten.

Filius on iPad simuliert hier kein echtes WLAN. Auch das Notebook wird in der Topologie über ein virtuelles Kabel verbunden.

## Switch

<img class="doc-device" src="/docs-assets/devices/switch.png" alt="Switch-Symbol">

**Aufgabe:** Verbindet mehrere Geräte in einem gemeinsamen LAN.  
**Anschlüsse:** 24 physische Ports (`sw1` bis `sw24`).  
**Lernziel:** Ethernet-Weiterleitung, MAC-Lernen und Aufbau einer Stern-Topologie.

Ein Switch ersetzt keinen Router: Er verbindet Geräte desselben lokalen Netzes, stellt aber nicht automatisch den Weg in ein anderes IPv4-Subnetz bereit.

## Vermittlungsrechner (Router)

<img class="doc-device" src="/docs-assets/devices/router.png" alt="Vermittlungsrechner-Symbol">

**Aufgabe:** Vermittelt IPv4-Pakete zwischen unterschiedlichen Subnetzen.  
**Startkonfiguration:** Eine Schnittstelle (`rt1`); weitere Schnittstellen können für zusätzliche Netze ergänzt werden.  
**Typische Einstellungen:** Eigene Adresse und Maske pro Schnittstelle sowie Weiterleitungs- bzw. Routingeinträge.

Jedes angeschlossene Netz benötigt eine Router-Schnittstelle mit einer Adresse aus genau diesem Netz. Endgeräte tragen die passende Router-Adresse als Standardgateway ein.

## Gateway

<img class="doc-device" src="/docs-assets/devices/gateway.png" alt="Gateway-Symbol">

**Aufgabe:** Verbindet eine LAN-Seite mit einer WAN-Seite und kann Adressübersetzung abbilden.  
**Anschlüsse:** Festes `wan0` und `lan0`.  
**Typischer Einsatz:** Ein internes Netz soll über eine gemeinsame äußere Adresse mit einem zweiten Netz kommunizieren; die NAT-Tabelle kann im Aktionsmodus untersucht und zurückgesetzt werden.

Achte auf die Seiten: Das interne Netz gehört an `lan0`, das äußere Netz an `wan0`.

## Remote Link

<img class="doc-device" src="/docs-assets/devices/remote-link.png" alt="Remote-Link-Symbol">

**Aufgabe:** Bildet eine deterministische Punkt-zu-Punkt-Verbindung zwischen zwei getrennt gezeichneten Stellen der Topologie.  
**Anschluss:** `remote0`  
**Konfiguration:** Beide Remote Links aktivieren und dieselbe eindeutige Paar-ID vergeben.

Statusanzeigen unterscheiden nicht verbunden, aktiv, mehrdeutig und deaktiviert. Genau zwei aktivierte Links mit derselben Paar-ID bilden ein Paar. Es werden dabei keine echten Host-Netzwerk-Sockets geöffnet.

## Nicht unterstütztes Gerät

Unbekannte Gerätetypen aus importierten `.fls`-Dateien können als Platzhalter erhalten bleiben. Sie werden gekennzeichnet, haben aber möglicherweise keine bearbeitbare oder simulierbare Konfiguration. Siehe [Kompatibilität](../compatibility/).

## Welches Element brauche ich?

| Ziel                               | Empfohlener Aufbau                             |
| ---------------------------------- | ---------------------------------------------- |
| Erster Ping                        | Zwei Endgeräte und ein direktes Kabel          |
| Mehrere Geräte in einem LAN        | Endgeräte → Switch                             |
| Zwei IPv4-Subnetze                 | Je ein LAN → Vermittlungsrechner               |
| LAN/WAN und NAT beobachten         | Internes LAN → Gateway → äußeres Netz          |
| Getrennte Diagrammbereiche koppeln | Zwei Remote Links mit gleicher Paar-ID         |
| Client/Server-Anwendung testen     | Zwei Endgeräte; Anwendung passend installieren |

:::tip
Beschrifte Geräte nach ihrer Rolle, etwa `Client`, `Webserver`, `DNS` oder `Router A`. Das ist für Unterricht und Paketdiagnose hilfreicher als viele gleichnamige „Rechner“.
:::
