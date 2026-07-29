---
title: Netzwerkfunktionen
description: Ethernet, ARP, IPv4, ICMP, TCP, UDP, Routing, DHCP, DNS, Firewall und NAT im Lernmodell.
sidebar:
  order: 6
---

Filius on iPad bildet zentrale Netzwerkmechanismen deterministisch ab. Das Ziel ist nicht nur ein grünes Ergebnis, sondern eine nachvollziehbare Erklärung der beteiligten Schichten.

## Ethernet und Switch

Kabel verbinden physische Ports. Ein Switch lernt, über welchen Port ein Teilnehmer erreichbar ist, und leitet Ethernet-Frames im gemeinsamen LAN weiter. Ein Broadcast kann mehrere Teilnehmer erreichen; normaler Unicast wird gezielter weitergeleitet, sobald der Switch die Zuordnung kennt.

**Beobachten:** Mehrere Geräte an einen Switch anschließen, nacheinander pingen und die Paketfolge sowie den Lernzustand vergleichen.

## ARP

ARP ordnet eine lokale IPv4-Adresse einer Hardwareadresse zu. Vor einem ersten IPv4-Paket zu einem lokalen Ziel oder Standardgateway kann deshalb ein ARP-Austausch erscheinen.

- Ziel im selben Subnetz: ARP fragt nach dem Ziel selbst.
- Ziel in anderem Subnetz: ARP fragt nach dem Standardgateway.
- Falsche Maske: Der Sender kann fälschlich das Ziel direkt suchen oder unnötig zum Gateway senden.

CMD bietet `arp` und `arpsend` für Diagnose und kontrollierte Experimente.

## IPv4 und ICMP

IPv4 transportiert Pakete zwischen Schnittstellen und Netzen. Subnetzmaske und Route bestimmen den nächsten Schritt. ICMP wird unter anderem für `ping` und Diagnosemeldungen verwendet.

Ein erfolgreicher Ping bestätigt die grundlegende IP-Erreichbarkeit, aber nicht automatisch DNS, TCP-Port, Anwendung oder Zugangsdaten.

## Routing und RIP

Statische Routen geben Zielnetz, Maske und nächsten Hop vor. Vermittlungsrechner benötigen passende Schnittstellen und Weiterleitung. RIP kann Routinginformationen zwischen geeigneten Routern austauschen; die resultierenden Wege sollten in den Routentabellen kontrolliert werden.

**Fehlersuche:** Schnittstellenadresse → direkt verbundene Netze → Standardroute → spezifische Route → nächster Hop.

## UDP und TCP

- **UDP:** Verbindungslose Datagramme, zum Beispiel für DNS und DHCP. Geringer Ablauf, aber keine TCP-Verbindungsphase.
- **TCP:** Verbindungsorientierte Übertragung für Web, E-Mail, Gnutella und wahlweise den einfachen Client. Verbindungsaufbau, Daten und Ende sind getrennte beobachtbare Schritte.

Portnummern identifizieren den Dienst auf einem erreichbaren Gerät. Eine korrekte IP-Adresse reicht nicht, wenn am Zielport kein Dienst läuft oder die Firewall ihn blockiert.

## DHCP

DHCP automatisiert Adresse, Maske, Gateway und DNS-Angaben. Der simulierte Austausch nutzt UDP `67`/`68`. Der Client zeigt den aktiven Lease; der Server verwaltet Bereich und optionale feste Zuordnungen.

## DNS

DNS ordnet Hostnamen IPv4-Adressen zu und nutzt UDP-Port `53`. Mit `host` oder `nslookup` lässt sich die Auflösung unabhängig von einer Web- oder E-Mail-Anwendung prüfen.

## Firewall

Die persönliche Firewall filtert eingehenden TCP-, UDP- und ICMP-Verkehr pro Endgerät. Regeln sollten eng passend zum benötigten Dienst formuliert und anschließend mit unverändertem Clientversuch verglichen werden.

## Gateway, NAT und Portweiterleitung

Das Gateway trennt LAN- und WAN-Seite. NAT kann interne Absender auf eine äußere Adresse abbilden; die Laufzeitansicht zeigt entstandene Zuordnungen. Portweiterleitung macht einen ausgewählten internen Dienst von der äußeren Seite erreichbar.

## Beobachtung statt Blackbox

Verwende gemeinsam:

- CMD (`ipconfig`, `arp`, `route`, `netstat`, `tcpdump`),
- Schnittstellen- und Routentabellen,
- Dienststatus und Anwendungsprotokolle,
- Paketansicht nach Schicht,
- NAT-, DHCP- und DNS-Status.

:::note
Die Simulation ist ein Lernmodell. Sie ersetzt keine Sicherheitsprüfung, Leistungsplanung oder Zertifizierung eines realen Produktionsnetzes.
:::
