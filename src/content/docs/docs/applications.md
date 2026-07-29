---
title: Simulierte Anwendungen
description: Installation, Bedienung und Lernziele aller verfügbaren Anwendungen.
sidebar:
  order: 8
---

Virtuelle Rechner und Notebooks besitzen einen eigenen Desktop und eine **Software-Installation**. Anwendungen werden pro Gerät installiert; Server- und Clientrollen müssen daher bewusst verteilt werden.

<img class="doc-screenshot" src="/docs-assets/interface/runtime-device.png" alt="Virtueller Desktop mit installierten Anwendungen in Filius on iPad" loading="eager">

## Anwendung installieren oder entfernen

1. Netzwerk im Entwurfsmodus fertigstellen und adressieren.
2. Aktionsmodus starten.
3. Rechner oder Notebook antippen.
4. **Software-Installation** beziehungsweise das Installer-Menü öffnen.
5. Gewünschte Anwendung installieren. Das Symbol erscheint auf dem virtuellen Desktop.
6. Anwendung antippen, konfigurieren und starten.

Eine Anwendung zu entfernen löscht ihren Startpunkt vom Desktop. Vor wichtigen Änderungen sollte das Projekt gespeichert werden.

:::note
Nicht jede Anwendung gehört auf jedes Gerät. Bei einem Webversuch benötigt ein Gerät den Webserver, ein anderes den Webbrowser. Für E-Mail werden mindestens E-Mail-Server und passend konfigurierte Clients benötigt.
:::

## CMD

<img class="doc-app-icon" src="/docs-assets/applications/cmd.png" alt="CMD-Symbol">

Die Kommandozeile verbindet Netzwerkdiagnose und virtuelles Dateisystem. Sie ist das wichtigste Werkzeug für die Fehlersuche.

| Gruppe                    | Befehle und Zweck                                             |
| ------------------------- | ------------------------------------------------------------- |
| Erreichbarkeit            | `ping`, `trace`, `path`, `traceroute`, `route`                |
| Adressen und Verbindungen | `ipconfig`, `netstat`, `arp`, `arpsend`, `tcpdump`            |
| DNS                       | `host`, `nslookup`, `dns add`, `dns remove`, `dns resolve`    |
| Dateien                   | `cat`, `cd`, `cp`, `del`, `ls`, `mkdir`, `mv`, `pwd`, `touch` |
| Hilfe                     | `help` oder `help <befehl>`                                   |

**Beispiel:** `ping 192.168.1.20` prüft IP-Erreichbarkeit. `host web.schule` prüft danach, ob die Namensauflösung funktioniert. `tcpdump` zeigt eine begrenzte Momentaufnahme der aufgezeichneten Pakete.

## Datei-Explorer

<img class="doc-app-icon" src="/docs-assets/applications/file-explorer.png" alt="Datei-Explorer-Symbol">

Durchsucht das virtuelle Dateisystem des ausgewählten Geräts. Verzeichnisse und Dateien sind Teil der Simulation, nicht der echten Dateien-App des iPads.

**Geeignet für:** Ergebnisse aus Texteditor, Webserver, E-Mail oder Gnutella kontrollieren; Verzeichnisstrukturen erklären; dieselben Dateien anschließend in CMD verwenden.

## Texteditor

<img class="doc-app-icon" src="/docs-assets/applications/text-editor.png" alt="Texteditor-Symbol">

Erstellt und bearbeitet Textdateien im virtuellen Dateisystem. Entwürfe können gespeichert oder auf den letzten gespeicherten Stand zurückgesetzt werden.

**Geeignet für:** HTML-Seiten für den Webserver, einfache Textdateien für Dateiübertragung oder Peer-to-Peer-Freigaben und das Zusammenspiel mit `cat` in CMD.

## Bildbetrachter

<img class="doc-app-icon" src="/docs-assets/applications/image-viewer.png" alt="Bildbetrachter-Symbol">

Öffnet unterstützte virtuelle Bilddateien. Er liest nur Inhalte aus dem simulierten Dateisystem des Geräts.

**Geeignet für:** Nachweisen, dass eine Bilddatei übertragen oder heruntergeladen wurde, und Dateitypen von reinen Textinhalten unterscheiden.

## Webserver

<img class="doc-app-icon" src="/docs-assets/applications/web-server.png" alt="Webserver-Symbol">

Stellt HTTP-Inhalte von einem virtuellen Rechner bereit. Der Dienst kann gestartet, gestoppt und neu gestartet werden; standardmäßig wird Port `80` verwendet.

**Vorgehen:**

1. Webserver auf dem Servergerät installieren.
2. Inhalte im virtuellen Dateisystem vorbereiten.
3. Dienst starten und Status kontrollieren.
4. Auf einem zweiten Gerät den Webbrowser öffnen und IP-Adresse oder auflösbaren Hostnamen eingeben.
5. Bei Problemen zuerst `ping`, dann DNS und zuletzt den Dienststatus prüfen.

## Webbrowser

<img class="doc-app-icon" src="/docs-assets/applications/web-browser.svg" alt="Webbrowser-Symbol">

Löst bei Bedarf einen Hostnamen über den konfigurierten DNS-Server auf und ruft HTTP-Inhalte über das simulierte TCP ab.

**Geeignet für:** Die Abfolge DNS → TCP → HTTP erklären. Ein erfolgreicher Ping garantiert noch keinen erfolgreichen Webseitenabruf: DNS, Zielport und Webserver müssen ebenfalls stimmen.

## Echo-Server

<img class="doc-app-icon" src="/docs-assets/applications/echo-server.png" alt="Echo-Server-Symbol">

Startet einen einfachen Dienst, der empfangene Nutzdaten zurücksendet. Port und Protokoll werden passend zum Experiment festgelegt; Laufzeitdiagnosen zeigen Start, Stopp und Verkehr.

**Geeignet für:** Client/Server-Grundlagen, Ports und Unterschied zwischen Erreichbarkeit des Rechners und Erreichbarkeit eines Dienstes.

## Einfacher Client

<img class="doc-app-icon" src="/docs-assets/applications/simple-client.png" alt="Einfacher-Client-Symbol">

Verbindet sich über simulierte TCP- oder UDP-Sockets mit einer Zieladresse und einem Zielport, sendet Daten, empfängt Antworten und trennt die Verbindung wieder.

**Typischer Versuch:** Echo-Server auf Gerät A starten; auf Gerät B dasselbe Protokoll und denselben Port wählen; Text senden und zurückgesendete Daten sowie Paketansicht vergleichen.

## DNS-Server

<img class="doc-app-icon" src="/docs-assets/applications/dns-server.png" alt="DNS-Server-Symbol">

Verwaltet Hostname-zu-IPv4-Einträge und beantwortet simulierte DNS-Anfragen über UDP-Port `53`.

**Vorgehen:**

1. DNS-Server eine feste IP-Adresse geben.
2. Einträge wie `web.schule → 192.168.10.20` anlegen.
3. Auf Clients diese DNS-Server-Adresse konfigurieren.
4. Mit `host web.schule` oder dem Webbrowser testen.

DNS ersetzt keine Route. Der Client muss sowohl den DNS-Server als auch die aufgelöste Zieladresse erreichen können.

## DHCP-Server

<img class="doc-app-icon" src="/docs-assets/applications/dhcp-server.png" alt="DHCP-Server-Symbol">

Vergibt automatisch IPv4-Konfigurationen an aktivierte DHCP-Clients. Konfiguriert werden unter anderem Adressbereich, Subnetzmaske, Gateway, DNS-Server und bei Bedarf feste Zuordnungen. DHCP verwendet die simulierten Ports UDP `67` und `68`.

**Prüfen:** Nach dem Start zeigt der Client seinen aktiven Lease. Mit `ipconfig` lässt sich die übernommene Adresse kontrollieren.

:::caution
Der DHCP-Server benötigt selbst eine sinnvolle feste Konfiguration. Ein vergebener Standardgateway- oder DNS-Wert muss im simulierten Netz tatsächlich erreichbar sein.
:::

## Persönliche Firewall

<img class="doc-app-icon" src="/docs-assets/applications/firewall.png" alt="Firewall-Symbol">

Filtert eingehenden TCP-, UDP- und ICMP-Verkehr für genau dieses virtuelle Gerät. ICMP kann separat zugelassen werden; für Dienste können Protokoll-, Port- und Quellregeln definiert werden.

**Lernversuch:** Zuerst Ping und Echo-Dienst ohne Filter testen. Danach ICMP oder den verwendeten Dienstport blockieren und die veränderten Ergebnisse in CMD und Paketansicht vergleichen.

## E-Mail-Server

<img class="doc-app-icon" src="/docs-assets/applications/email-server.png" alt="E-Mail-Server-Symbol">

Stellt lokale Postfächer bereit und betreibt simulierte SMTP- und POP3-Dienste. Standardmäßig nutzt SMTP Port `25` und POP3 Port `110`. Konfiguriert werden Domain und Benutzerkonten.

**Geeignet für:** Unterschied zwischen Senden und Abrufen, Serverkonten, Maildomänen und mehreren Anwendungsschritten über dasselbe IP-Netz.

## E-Mail-Client

<img class="doc-app-icon" src="/docs-assets/applications/email-client.png" alt="E-Mail-Client-Symbol">

Sendet Nachrichten über den konfigurierten SMTP-Server und ruft sie über POP3 ab. Benötigt E-Mail-Adresse, Zugangsdaten sowie Host und Port beider Dienste.

**Empfohlener Aufbau:** Ein E-Mail-Server mit zwei Konten und zwei Clientgeräte. Zuerst beide Clients mit der Server-IP konfigurieren; anschließend kann DNS ergänzt und die IP durch einen Hostnamen ersetzt werden.

## Gnutella

<img class="doc-app-icon" src="/docs-assets/applications/gnutella.png" alt="Gnutella-Symbol">

Bildet ein simuliertes Peer-to-Peer-Netz. Peers können über einen bekannten Teilnehmer beitreten, andere Peers entdecken, freigegebene Dateien suchen und herunterladen. Der Dienst läuft über TCP-Port `6346`.

Die Anwendung besitzt Bereiche für **Netzwerk**, **Suche**, **Dateien** und **Einstellungen**. Freigegebene und heruntergeladene Dateien liegen im Peer-to-Peer-Ordner des virtuellen Dateisystems.

**Typischer Versuch:** Auf drei Geräten Gnutella installieren; zwei Peers direkt bekannt machen; auf dem dritten über einen bekannten Peer beitreten; eine Datei suchen und den mehrstufigen Nachrichtenaustausch beobachten.

## Experimenteller Protokoll-Baukasten

Der native TCP/UDP-Protokoll-Baukasten ist für begrenzte, ausdrücklich aktivierte Experimente vorgesehen. Er ist standardmäßig ausgeblendet.

:::caution
Er führt keinen beliebigen Java-Quellcode aus und ist kein kompatibler Ersatz für den Java-Quellcode-Assistenten der Desktop-Version. Vorhandene Unterrichtsprojekte mit eigener Java-Software müssen gesondert geprüft werden.
:::

## Schnelle Fehlerdiagnose

1. **Link vorhanden?** Kabel und belegte Ports prüfen.
2. **IP passend?** Adresse, Maske und Standardgateway prüfen.
3. **Ziel erreichbar?** `ping` oder `trace` verwenden.
4. **Name auflösbar?** `host`/`nslookup` und DNS-Konfiguration prüfen.
5. **Dienst gestartet?** Serveranwendung und Port kontrollieren.
6. **Client korrekt?** Zieladresse, Protokoll, Port und Zugangsdaten kontrollieren.
7. **Firewall?** Eingehende Regeln und ICMP-Freigabe prüfen.
8. **Pakete ansehen:** Paketansicht oder `tcpdump` für den fehlgeschlagenen Schritt verwenden.
