---
locale: de
translationKey: ipad-remote-link
slug: ipad-remote-link
title: "Zwei iPads, ein simuliertes Netz: Remote Link über das lokale Netzwerk"
summary: "Remote Link verbindet künftig zwei laufende Filius-Simulationen auf unterschiedlichen iPads – mit vollständigen Ethernet-Frames, automatischer Suche und verschlüsselter Übertragung."
publishedAt: 2026-08-12
kind: development
topics:
  - Remote Link
  - Netzwerk
  - Unterricht
  - Sicherheit
readingMinutes: 5
featured: true
---

Zwei Lerngruppen entwerfen getrennte Netze, starten ihre Simulationen auf zwei iPads – und verbinden beide Topologien über das echte lokale Netzwerk. Genau diese Unterrichtssituation soll der neue iPad-zu-iPad-Modus von Remote Link ermöglichen.

## Die Idee aus der Desktop-Version weiterführen

Die ursprüngliche Java-Version von FILIUS konnte mit dem Modem zwei laufende Programminstanzen über eine reale TCP-Verbindung koppeln. Wir haben dieses Verhalten im Quelltext noch einmal geprüft: Eine Seite nimmt die Verbindung an, die andere stellt sie über IP-Adresse und Port her. Anschließend werden vollständige simulierte Ethernet-Frames in beide Richtungen übertragen.

Auf dem iPad übernimmt Remote Link diese Aufgabe. Der bestehende Modus für zwei gekoppelte Remote Links innerhalb eines Projekts bleibt erhalten. Neu hinzu kommt als Verbindungsbereich **Anderes iPad**.

## So wird die Verbindung aufgebaut

Jede Gruppe fügt ihrer Topologie einen Remote Link hinzu und verbindet ihn per Kabel mit dem simulierten Netz. Danach sind nur wenige gemeinsame Einstellungen nötig:

1. Auf beiden iPads **Anderes iPad** auswählen.
2. Denselben Verbindungscode eintragen.
3. Ein iPad auf **Verbindung bereitstellen**, das andere auf **Verbindung beitreten** stellen.
4. Die Gegenstelle automatisch im lokalen Netz suchen lassen – oder Adresse und Port manuell eintragen.
5. Auf beiden iPads die Simulation starten und den Zugriff auf das lokale Netzwerk erlauben.

Während der Simulation zeigen Statusmeldungen, ob Remote Link wartet, sucht, verbindet oder bereits verbunden ist. Wird die reale Verbindung unterbrochen, versucht die beitretende Seite automatisch, sie wiederherzustellen.

## Nicht nur Ping, sondern die ganze Verbindung

Remote Link transportiert keine speziell vorbereiteten Ping-Nachrichten und bildet auch keinen einzelnen Dienst nach. Übertragen wird der vollständige Ethernet-Frame aus der Simulation. Dadurch können ARP, IPv4, ICMP, TCP und UDP dieselbe Verbindung nutzen – und damit auch die darauf aufbauenden simulierten Anwendungen.

Für den Unterricht ist das entscheidend: Die Grenze zwischen den beiden iPads bleibt Teil des untersuchten Netzes. Pakete können weiterhin in der Simulation verfolgt werden, statt in einem anwendungsspezifischen Tunnel zu verschwinden.

> Das lokale Netzwerk transportiert die simulierten Frames; die Regeln des simulierten Netzes bleiben auf beiden iPads sichtbar und überprüfbar.

## Für das lokale Netz entworfen

Die automatische Suche verwendet Apples lokale Diensterkennung. Falls ein Schulnetz solche Ankündigungen nicht weiterleitet, steht die manuelle Verbindung über Hostname oder IP-Adresse und Port bereit.

Der gemeinsame Verbindungscode dient nicht nur zum Zuordnen der beiden Seiten. Aus ihm wird auch der Schlüssel für eine authentifizierte Verschlüsselung abgeleitet. Der Code selbst wird nicht im lokalen Netz angekündigt, und die Verbindung benötigt keinen Cloud- oder Vermittlungsserver.

Remote Link folgt außerdem dem Lebenszyklus der Simulation: Beim Stoppen, Deaktivieren oder Verlassen der aktiven App wird die reale Verbindung beendet. Beide Apps müssen deshalb während der gemeinsamen Simulation geöffnet und aktiv bleiben.

## Bewusste Grenzen

Der neue Modus ist für zwei iPads im selben erreichbaren lokalen Netzwerk vorgesehen. Er ist kein Internet-Relay, bietet keine Umgehung von NAT oder Firewalls und verbindet nicht direkt mit dem Datenformat des Java-Modems. WLANs mit aktivierter Client-Isolation können direkte Verbindungen zwischen Geräten ebenfalls blockieren.

Pro Remote-Link-Endpunkt wird genau eine Gegenstelle verbunden. Mehrere getrennte Verbindungen in einer Klasse sind trotzdem möglich, wenn unterschiedliche Verbindungscodes und Ports verwendet werden.

## Entwicklungsstand

Die Funktion ist in der iPad-App implementiert. Automatisierte Tests decken unter anderem den verschlüsselten Verbindungsaufbau, falsche Verbindungscodes, bidirektionale Frame-Übertragung, Wiederverbindung, Speicherung und den bisherigen projektinternen Remote Link ab.

Bevor daraus eine Veröffentlichung wird, steht noch ein wichtiger Praxistest aus: zwei physische iPads im selben WLAN, einschließlich lokaler Netzwerkfreigabe, automatischer Suche und eines echten Unterrichtsablaufs. Deshalb ist dieser Beitrag als **Entwicklung** gekennzeichnet – nicht als bereits verfügbare Version.
