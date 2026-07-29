---
title: Entwurfsmodus
description: Geräte platzieren, verbinden, auswählen und vollständig konfigurieren.
sidebar:
  order: 5
---

Im Entwurfsmodus entsteht die physische und logische Grundstruktur des Netzwerks. Die vollständige Symbolerklärung steht unter [Geräte und Verbindungen](../devices/).

<img class="doc-screenshot" src="/docs-assets/interface/empty-project.png" alt="Leerer Entwurfsmodus mit Werkzeugleiste, Gerätepalette und Arbeitsfläche" loading="eager">

## 1. Topologie planen

Definiere vor dem Platzieren die Rollen: Welche Geräte sind Clients, welche bieten Dienste an, und welche Netze sollen durch Router oder Gateway getrennt werden? Benenne Geräte frühzeitig nach ihrer Rolle.

Für ein erstes LAN genügen zwei Endgeräte. Für drei oder mehr Teilnehmer ist eine Stern-Topologie mit Switch übersichtlicher.

## 2. Geräte platzieren

Ziehe Rechner, Notebook, Switch, Vermittlungsrechner, Gateway oder Remote Link aus der Palette auf die Arbeitsfläche. Halte zwischen Geräten genug Platz für Kabel, Adressangaben und Dokumentation.

Nach dem Auswählen eines Geräts können – abhängig vom Typ – Name, Schnittstellen, Position und Netzwerkkonfiguration bearbeitet werden.

## 3. Kabel erstellen

1. Kabelwerkzeug auswählen.
2. Erstes Gerät bzw. einen freien Anschluss antippen.
3. Zielgerät bzw. Zielanschluss antippen.
4. Prüfen, ob die Verbindung sichtbar und der Port belegt ist.

Direkte Endgerät-zu-Endgerät-Verbindungen sind möglich. Ein Switch wird benötigt, wenn mehrere Geräte gemeinsam in einem LAN arbeiten sollen.

## 4. IPv4-Adressen vergeben

Für einen direkten Test müssen beide Geräte im selben Netz liegen:

| Gerät |        Adresse |           Maske | Standardgateway |
| ----- | -------------: | --------------: | --------------: |
| PC 1  | `192.168.1.10` | `255.255.255.0` |            leer |
| PC 2  | `192.168.1.20` | `255.255.255.0` |            leer |

Bei `/24` müssen die ersten drei Zahlenblöcke übereinstimmen; die letzte Zahl muss pro Gerät eindeutig sein.

## 5. Zwei Subnetze verbinden

Beispiel:

| Bereich                 | Router-Adresse | Endgerät        | Gateway des Endgeräts |
| ----------------------- | -------------- | --------------- | --------------------- |
| LAN A `192.168.10.0/24` | `192.168.10.1` | `192.168.10.10` | `192.168.10.1`        |
| LAN B `192.168.20.0/24` | `192.168.20.1` | `192.168.20.10` | `192.168.20.1`        |

Der Vermittlungsrechner benötigt eine Schnittstelle in jedem Netz. Ohne passendes Standardgateway senden Endgeräte Pakete für das andere Netz nicht zum Router.

## 6. Entwurf prüfen

Vor dem Aktionsmodus:

- kein notwendiger Anschluss frei oder versehentlich doppelt belegt,
- jede IPv4-Adresse im jeweiligen Netz eindeutig,
- Maske passend zum geplanten Subnetz,
- Standardgateway im lokalen Netz des Endgeräts,
- Router auf beiden Seiten adressiert,
- Remote Links eindeutig gepaart,
- Servergeräte sinnvoll benannt.

:::caution
Doppelte IP-Adressen, unterschiedliche Netze ohne Router, eine falsche Maske, ein Gateway außerhalb des lokalen Netzes oder fehlende Kabel führen zu schwer unterscheidbaren Fehlerbildern. Prüfe deshalb von der physischen Verbindung zur Anwendung – nicht umgekehrt.
:::
