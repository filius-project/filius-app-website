---
title: Simulationsmodus
description: Simulation starten, virtuelle Geräte bedienen und Netzwerkverkehr untersuchen.
sidebar:
  order: 7
---

Der Aktionsmodus friert den Entwurf ein und erzeugt daraus eine virtuelle Netzwerklaufzeit. Technische Änderungen erfolgen wieder im Entwurfsmodus; Anwendungen und Diagnose gehören in den Aktionsmodus.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Virtueller Rechner und Anwendungen im Aktionsmodus" loading="eager">

## Simulation starten und stoppen

1. Entwurf speichern.
2. Symbol **Aktionsmodus** antippen.
3. Eventuelle Konfigurationshinweise beheben.
4. Simulationsgeschwindigkeit für den Versuch einstellen.
5. Zum Beenden wieder in den Entwurfsmodus wechseln.

Beim Stoppen wird die Laufzeit beendet. Speichere relevante Projektänderungen und dokumentiere Ergebnisse, bevor du einen Versuch grundlegend umbaust.

## Virtuellen Rechner öffnen

Tippe auf einen Rechner oder ein Notebook. Der virtuelle Desktop zeigt die installierten Anwendungen. Über **Software-Installation** lassen sich Anwendungen pro Gerät ergänzen oder entfernen. Die vollständige Referenz steht unter [Simulierte Anwendungen](../applications/).

Netzwerkgeräte wie Switch, Router oder Gateway öffnen stattdessen Status-, Schnittstellen-, Weiterleitungs- oder NAT-Ansichten.

## Ersten Verkehr erzeugen

CMD auf PC 1 öffnen:

```text
ipconfig
ping 192.168.1.20
arp
```

- `ipconfig` bestätigt die lokale Konfiguration.
- Beim ersten `ping` kann zunächst ARP die Hardwareadresse des Ziels ermitteln.
- Danach transportiert ICMP Anfrage und Antwort.
- `arp` zeigt den erlernten Nachbarn.

Wenn der zweite Ping weniger vorbereitende Pakete erzeugt, kann das am bereits gefüllten ARP-Zustand liegen.

## Anwendungen beobachten

Für höhere Protokolle eine klare Reihenfolge verwenden:

1. IP-Erreichbarkeit mit `ping` prüfen.
2. Falls ein Name verwendet wird, DNS mit `host` oder `nslookup` prüfen.
3. Serverdienst starten und Port notieren.
4. Client mit Ziel, Protokoll und Port konfigurieren.
5. Versuch ausführen.
6. Anwendungsausgabe und Paketansicht vergleichen.

## Paketansicht

<img class="doc-screenshot" src="/docs-assets/interface/packet-viewer.png" alt="Paketansicht mit Protokollschichten und Details" loading="lazy">

Die Paketansicht ordnet aufgezeichnete Nachrichten ihren Schichten zu. Suche beim Fehler nach dem letzten erfolgreichen Schritt:

- **kein ARP:** falsches lokales Netz, Link oder Schnittstelle,
- **ARP, aber kein ICMP-Ergebnis:** Ziel, Route oder Firewall prüfen,
- **DNS-Anfrage ohne passende Antwort:** DNS-Server und Eintrag prüfen,
- **TCP-Aufbau ohne Anwendungsantwort:** Dienst, Port und Serveranwendung prüfen,
- **SMTP/POP3/HTTP-Fehler:** Anwendungsdaten und Zugangskonfiguration prüfen.

## Gezielten Paketverlust simulieren

Mit **Pakete verwerfen** lässt sich ein globaler Ausfall gezielt in einen laufenden Versuch einbauen. Halte das Steuerelement gedrückt: Solange der Druck aktiv ist, werden alle neu übertragenen simulierten Netzwerk-Frames verworfen. Nach dem Loslassen fließt neuer Verkehr wieder normal.

Ein reproduzierbarer Versuch:

1. Einen fortlaufenden `ping` oder wiederholte Clientanfragen starten.
2. **Pakete verwerfen** einige Sekunden gedrückt halten.
3. Währenddessen Timeouts und als verworfen markierte Ereignisse beobachten.
4. Loslassen und prüfen, ob neue Anfragen wieder erfolgreich sind.

Die Funktion wirkt auf die gesamte simulierte Topologie, nicht nur auf das ausgewählte Gerät. Sie ist absichtlich momentbezogen und wird beim Beenden oder Neustarten der Simulation deaktiviert.

## Paketmitschnitt als Text exportieren

Öffne auf einem Gerät **Paketaustausch**, wähle bei Bedarf eine Schnittstelle und tippe **Exportieren**. Filius on iPad speichert einen UTF-8-Text im TSV-Format, der dem aktuell gewählten Gerät und – falls ausgewählt – der Schnittstelle entspricht.

Der Export ist deterministisch sortiert und für Tabellenprogramme sowie eigene Auswertungen geeignet. Passwörter, Zugangsdaten, Remote-Link-Codes, Nutzdaten und Nachrichtentexte werden entfernt oder markiert. Die Paketaufzeichnung ist begrenzt, damit lange Simulationen den Speicher nicht unbegrenzt vergrößern. Wenn ältere Ereignisse bereits verworfen wurden, weist der Export ihre Anzahl ausdrücklich aus.

## Detailbericht exportieren

Öffne **Mehr** und wähle **Detailbericht exportieren**. Der Textbericht fasst Projektmetadaten, Verbindungen, Geräte und Schnittstellen, Anwendungen, Routen, DNS, DHCP, NAT und Portweiterleitungen, Firewall, Web- und E-Mail-Konfiguration, Remote Links, Paketverlust sowie Verkehrsstatistik und einzelne Ereignisse zusammen.

Der Bericht ist für Abgabe, Fehlersuche und Vergleich zweier Versuchsstände gedacht. Sensible Werte und Nachrichteninhalte werden redigiert. Er ist eine Momentaufnahme des aktuellen Projekts und der noch gespeicherten Laufzeitdaten; bei begrenzter Paketaufzeichnung nennt er auch die Zahl älterer, bereits entfernter Ereignisse.

## Diagnose-Reihenfolge

1. Kabel und Linkstatus
2. IP-Adresse und Netzmaske
3. Standardgateway und Routingtabelle
4. DNS, falls Hostnamen verwendet werden
5. Firewallregeln
6. Serverprozess und Zielport
7. Clientkonfiguration
8. Paketansicht, `tcpdump` und Laufzeitprotokoll

:::tip
Ändere pro Wiederholung nur eine Variable. So lässt sich die Ursache eines Erfolgs oder Fehlers aus der Paketfolge ableiten.
:::
