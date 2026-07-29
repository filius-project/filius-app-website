---
title: Oberfläche und Bedienelemente
description: Alle Bereiche der App, Schaltflächen, Modi, Arbeitsfläche und Inspektoren im Detail.
sidebar:
  order: 3
---

Diese Seite erklärt die sichtbaren Elemente von **Filius on iPad**. Die Bezeichnungen beziehen sich auf die reguläre iPad-Ansicht. In Split View oder bei schmalem Fenster werden mehrere Befehle platzsparend in Menüs zusammengefasst.

<img class="doc-screenshot" src="/docs-assets/interface/empty-project.png" alt="Leeres Projekt in Filius on iPad mit oberer Werkzeugleiste, Gerätepalette links und Arbeitsfläche" loading="eager">

## Obere Werkzeugleiste

| Symbol                                                                                             | Element                 | Funktion                                                                                                       |
| -------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| <img class="doc-icon" src="/docs-assets/modes/new.png" alt="Symbol Neu">                           | **Neu**                 | Beginnt ein leeres Projekt. Nicht gespeicherte Änderungen sollten vorher gesichert werden.                     |
| <img class="doc-icon" src="/docs-assets/modes/open.png" alt="Symbol Öffnen">                       | **Öffnen**              | Importiert ein Projekt aus der Dateien-App, einschließlich unterstützter `.fls`-Dateien.                       |
| <img class="doc-icon" src="/docs-assets/modes/save.png" alt="Symbol Speichern">                    | **Speichern**           | Schreibt das aktuelle Projekt in eine Datei, die geteilt oder später erneut geöffnet werden kann.              |
| <img class="doc-icon" src="/docs-assets/modes/design.png" alt="Symbol Entwurfsmodus">              | **Entwurfsmodus**       | Geräte platzieren, Kabel zeichnen und Netzwerkeinstellungen bearbeiten.                                        |
| <img class="doc-icon" src="/docs-assets/modes/simulation.png" alt="Symbol Aktionsmodus">           | **Aktionsmodus**        | Startet die Simulation. Virtuelle Rechner und Anwendungen werden bedienbar.                                    |
| <img class="doc-icon" src="/docs-assets/modes/documentation.png" alt="Symbol Dokumentationsmodus"> | **Dokumentationsmodus** | Ergänzt Textfelder und Rechtecke und exportiert die Projektdokumentation.                                      |
| <img class="doc-icon" src="/docs-assets/modes/help.png" alt="Symbol Hilfe">                        | **Hilfe**               | Öffnet die integrierte, kontextbezogene Hilfe.                                                                 |
| <img class="doc-icon" src="/docs-assets/modes/information.png" alt="Symbol Information">           | **Information**         | Zeigt Produkt-, Versions- und Lizenzinformationen.                                                             |
| `•••`                                                                                              | **Mehr**                | Enthält Rückgängig, Wiederholen, Einstellungen und – wenn aktiviert – den experimentellen Protokoll-Baukasten. |

### Simulationsgeschwindigkeit

Der Prozentregler bestimmt die virtuelle Zeit und die Verzögerung pro Verbindung. Eine niedrige Einstellung macht Paketfolgen leichter beobachtbar; eine hohe Einstellung lässt längere Abläufe schneller enden. Er verändert **nicht** die Geschwindigkeit des echten WLANs oder Internets.

:::tip
Für eine Paketbesprechung im Unterricht zuerst langsam simulieren. Wenn die Konfiguration funktioniert, kann die Geschwindigkeit erhöht werden.
:::

## Gerätepalette

Die linke Palette enthält das Kabelwerkzeug, Rechner, Notebook, Switch, Gateway, Vermittlungsrechner und Remote Link. Unten befindet sich das Auswahlwerkzeug.

<img class="doc-screenshot doc-screenshot--palette" src="/docs-assets/interface/device-palette.png" alt="Gerätepalette von Filius on iPad mit Kabel, Rechner, Notebook, Switch, Gateway, Vermittlungsrechner und Remote Link" loading="lazy">

- **Tippen:** Werkzeug aktivieren und anschließend auf die Arbeitsfläche tippen.
- **Ziehen:** Ein Gerät direkt aus der Palette an die gewünschte Position ziehen.
- **Auswählen:** Ein vorhandenes Gerät oder Kabel markieren, um Eigenschaften zu bearbeiten.
- **Schmale Ansicht:** Die Palette wird zu einer horizontalen, einklappbaren Ablage.

Alle Elemente der Palette werden auf der Seite [Geräte und Verbindungen](../devices/) einzeln erklärt.

## Arbeitsfläche

Die große mittlere Fläche ist das Netzwerkdiagramm.

- Geräte können verschoben und neu angeordnet werden.
- Linien zeigen physische Verbindungen zwischen Anschlüssen.
- Ein ausgewähltes Element erhält eine sichtbare Hervorhebung.
- Freie Fläche kann zum Aufheben einer Auswahl verwendet werden.
- Im Dokumentationsmodus liegen Texte und Rechtecke über dem Netzwerk.

Eine klare Anordnung – Endgeräte außen, Switches in der Mitte und Router zwischen Subnetzen – erleichtert das Lesen und die Fehlersuche.

## Gerätekonfiguration und Inspektor

Nach Auswahl eines Geräts erscheinen die dafür verfügbaren Einstellungen. Je nach Gerät gehören dazu:

- Anzeigename und Position,
- physische Anschlüsse und deren Belegung,
- IPv4-Adresse und Subnetzmaske je Schnittstelle,
- Standardgateway,
- zusätzliche Router-Schnittstellen und Weiterleitung,
- WAN-/LAN-Seiten eines Gateways,
- Paar-ID und Status eines Remote Links.

Änderungen am logischen Netzwerk werden im Entwurfsmodus vorgenommen. Im laufenden Aktionsmodus stehen stattdessen Laufzeitstatus, Anwendungen und Diagnoseansichten im Vordergrund.

## Die drei Arbeitsmodi

### Entwurfsmodus

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/design.png" alt="Entwurfsmodus">

Hier wird das Netzwerk gebaut. Projektdateien, Geräte, Verbindungen und Adressen lassen sich nur bearbeiten, wenn die Simulation angehalten ist.

### Aktionsmodus

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/simulation.png" alt="Aktionsmodus">

Beim Start werden Konfigurationen geprüft und die virtuelle Netzwerklaufzeit erzeugt. Tippe auf einen Rechner oder ein Notebook, um dessen Desktop und installierte Anwendungen zu öffnen.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Virtueller Rechner im Aktionsmodus mit Desktop und Anwendungsfenster" loading="lazy">

### Dokumentationsmodus

<img class="doc-icon doc-icon--large" src="/docs-assets/modes/documentation.png" alt="Dokumentationsmodus">

Dieser Modus ergänzt das Diagramm um erklärende Texte und Rechtecke. Das Ergebnis kann als PNG oder PDF exportiert werden. Netzwerkelemente bleiben sichtbar, werden hier aber nicht technisch konfiguriert.

## Paket- und Protokollansicht

Während der Simulation zeichnet Filius on iPad nachvollziehbare Ereignisse auf. Die Paketansicht gliedert ein ausgewähltes Paket nach Schichten und zeigt unter anderem beteiligte Geräte, Protokoll und Zeit.

<img class="doc-screenshot" src="/docs-assets/interface/packet-viewer.png" alt="Paketansicht von Filius on iPad mit Schichten und Protokolldetails" loading="lazy">

Nutze diese Ansicht nach `ping`, DNS-, HTTP-, E-Mail- oder Client/Server-Versuchen, um nicht nur das Ergebnis, sondern den Weg durch das simulierte Netzwerk zu erklären.
