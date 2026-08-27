---
title: Dokumentation
description: Schneller Einstieg in Filius on iPad, seine Arbeitsmodi und den Umgang mit FILIUS-Projekten.
sidebar:
  order: 1
---

Filius on iPad ist eine native iPad-Anwendung zum Entwerfen, Konfigurieren und Simulieren von Rechnernetzen. Diese Dokumentation beschreibt den **aktuellen iPad-Funktionsumfang** und trennt bestätigte Funktionen von geplanten oder experimentellen Bereichen.

## Der schnellste Einstieg

1. Arbeite zuerst den [Schnellstart](/quickstart/) durch.
2. Lerne in [Oberfläche und Bedienelemente](./interface/) alle sichtbaren Bereiche kennen.
3. Wähle mit [Geräte und Verbindungen](./devices/) die richtigen Topologieelemente.
4. Baue im [Entwurfsmodus](./design/) ein Netzwerk und starte danach den [Simulationsmodus](./simulation/).
5. Installiere gezielt die unter [Simulierte Anwendungen](./applications/) beschriebenen Clients und Dienste.
6. Prüfe vor einer Unterrichtsplanung die [Kompatibilität](./compatibility/); bei Problemen hilft die [Fehlersuche](./troubleshooting/).

:::note[Veröffentlichungsstatus]
Die App-Store-Verfügbarkeit wird separat angekündigt. Quellcode, Lizenzgrundlagen, Datenschutz- und Anbieterangaben sind bereits öffentlich dokumentiert.
:::

## Grundprinzip

Filius on iPad folgt drei Arbeitsschritten:

- **Entwerfen:** Geräte und Kabel zu einer Topologie verbinden.
- **Konfigurieren:** Adressen, Routen, Dienste und Anwendungen einrichten.
- **Simulieren:** Netzwerkverkehr erzeugen, beobachten und erklären.

## Vertiefende Netzwerkversuche

Die aktuelle iPad-Implementierung unterstützt zusätzliche Versuche, die über den ersten Ping hinausgehen:

- [Netzwerkfunktionen](./networking/): DNS mit `A`-, `MX`- und `NS`-Records, rekursive Auflösung sowie Webadministration auf Router und Gateway,
- [Simulierte Anwendungen](./applications/): Webserver mit virtuellen Hosts sowie Antworten und Löschen im E-Mail-Client,
- [Simulationsmodus](./simulation/): globaler Paketverlust, Paketmitschnitt als TSV und redigierter Detailbericht,
- [Entwurfsmodus](./design/): Gerätebeschriftungen aus Name, IP-Adresse, MAC-Adresse oder beiden Adressen,
- [Kompatibilität](./compatibility/): aktueller Freigabestatus von LAN Remote Link zwischen zwei iPads.

Der Entwicklungsbericht [Von der Java-Referenz zum iPad](/news/java-ipad-parity/) beschreibt, wie diese Unterschiede gefunden, implementiert und geprüft wurden.
