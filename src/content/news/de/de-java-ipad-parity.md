---
locale: de
translationKey: java-ipad-parity
slug: java-ipad-parity
title: "Von der Java-Referenz zum iPad: die nächste Paritätslücke schließen"
summary: "Wie aus einem Vergleich auf Quellcode-Ebene produktionsorientierte Verbesserungen für DNS, Web, E-Mail, Diagnose, Berichte und Netzwerkbeobachtung auf dem iPad wurden."
publishedAt: 2026-08-13
kind: development
topics:
  - Kompatibilität
  - Netzwerk
  - Qualität
  - Entwicklung
readingMinutes: 7
featured: true
---

Ein Kompatibilitätsprojekt kann vollständig aussehen, lange bevor es sich vollständig verhält. Die wichtigsten Ansichten sind vorhanden, Projekte lassen sich öffnen und die ersten Unterrichtsversuche funktionieren. Die verbleibenden Unterschiede liegen oft eine Ebene tiefer: Ein Record-Typ ist nicht auswählbar, ein Ablauf endet nach dem Senden oder Diagnosedaten lassen sich ansehen, aber nicht abgeben.

Das war der Ausgangspunkt für den aktuellen Java-zu-iPad-Paritätsdurchlauf. Statt nur zu fragen, ob Filius on iPad „DNS“, „Web“ oder „E-Mail“ besitzt, haben wir die beobachtbaren Abläufe der Java-Referenz mit der iPad-Implementierung verglichen. Die strengere Frage lautete: **Kann eine lernende Person denselben Versuch durchführen und dasselbe Ergebnis erklären?**

## Verhalten statt Bildschirmnamen vergleichen

Die Java-Version diente als Verhaltensreferenz, nicht als Vorlage für das Layout. Eine native iPad-Oberfläche soll den Interaktionsmustern von iPadOS folgen. Der fachliche Lernvertrag muss den Plattformwechsel trotzdem überstehen.

Für jede Lücke wurden vor der Oberflächenarbeit vier Punkte festgehalten:

1. welche Eingabe konfiguriert werden kann,
2. welches Netzwerkverhalten daraus folgen soll,
3. welche Belege sichtbar bleiben müssen,
4. welche Projektdaten Speichern und erneutes Öffnen überstehen müssen.

So wurden oberflächliche Übertragungen vermieden. Ein DNS-Menü mit `MX` und `NS` wäre wertlos, wenn die Auflösung weiterhin nur `A` versteht. Ein Bericht wäre unsicher, wenn er Passwörter oder E-Mail-Texte in eine geteilte Datei kopiert. Ein Schalter für Paketverlust wäre unzuverlässig, wenn er die Simulation unsichtbar verändert zurücklässt.

## Aus der DNS-Tabelle wurde ein Resolver

Der DNS-Server auf dem iPad bildet nun typisierte `A`-, `MX`- und `NS`-Records mit TTL-Werten ab. Er kann autoritative Antworten geben, Anfragen an einen anderen DNS-Server weiterleiten oder während einer rekursiven Auflösung `NS`-Verweisen mit Glue-Adressen folgen. Erfolgreiche Antworten gelangen in einen Cache; Schleifen- und Hop-Grenzen halten auch fehlerhafte Topologien deterministisch.

Damit werden auf dem iPad neue Unterrichtsfolgen möglich: eine Subdomain delegieren, eine Suche über mehrere simulierte Netze verfolgen, die erste Anfrage mit einem Cache-Treffer vergleichen und den Mailserver getrennt von seiner Adresse bestimmen.

Die wichtigste technische Erkenntnis war, dass alle Aufrufer denselben typisierten Resolver verwenden müssen. Es genügt nicht, nur die DNS-Anwendung zu erweitern, während Browser oder E-Mail bei Hostnamen noch einen älteren Kurzweg nutzen. Der abschließende Durchgang verfolgte deshalb den Weg von der Benutzeraktion über den simulierten UDP-Austausch bis zur Antwort.

## Webversuche erhielten zwei unterschiedliche Arten von Hosting

Normale simulierte Webserver können jetzt virtuelle Hosts definieren. Hostname und optionaler Port wählen einen Dokumentenstamm; Aktivierungs- und Standardstatus sind ausdrücklich konfigurierbar. Zwei Namen können damit auf dieselbe IP-Adresse zeigen und trotzdem verschiedene Websites liefern.

Router und Gateways erhielten zusätzlich einen getrennten Webadministrationsdienst unter `/admin`. Ein erlaubtes Quellnetz und ein Administrationsport bilden die Zugriffsrichtlinie. Von einem berechtigten simulierten Client aus lassen sich Routen, DHCP, NAT und Portweiterleitungen sowie Firewallregeln über HTTP untersuchen oder ändern.

Diese Administration gehört vollständig zum simulierten Netzwerk. Sie öffnet keinen Zugang zum echten iPad, Schul-WLAN oder privaten Router. Diese Grenze ausdrücklich zu machen, war Teil der Funktion und keine nachträgliche Erläuterung.

## Kleine Anwendungsaktionen vervollständigten größere Abläufe

Der E-Mail-Client konnte bereits Nachrichten senden und abrufen. Der Paritätsvergleich zeigte die fehlende Fortsetzung: Antworten, Allen antworten und das Löschen aus Posteingang oder Gesendet.

Antwortaktionen erzeugen nun einen neuen Entwurf mit den passenden Empfängern und dem Bezug zur ursprünglichen Nachricht. Das Löschen wird bestätigt und bleibt auf den geöffneten Ordner begrenzt. Das Entfernen einer gesendeten Kopie löscht daher nicht stillschweigend die zugehörige Posteingangskopie.

Die Änderung an der Oberfläche ist klein, der Unterrichtseffekt größer. Lernende können ein Gespräch über mehrere Nachrichten fortführen und anschließend getrennte lokale Ordneransichten erklären, statt E-Mail nur als einmalige Vorführung zu sehen.

## Diagnose wurde zu übertragbarem Beleg

Drei zusammenhängende Änderungen erleichtern Beobachtung und Abgabe:

- **Pakete verwerfen** ist eine globale, momentbezogene Steuerung. Solange sie gedrückt bleibt, werden alle neu übertragenen simulierten Frames verworfen; nach dem Loslassen fließt neuer Verkehr wieder normal.
- **Paketaustausch** kann das ausgewählte Gerät oder die gewählte Schnittstelle deterministisch als UTF-8-TSV exportieren.
- **Detailbericht exportieren** erzeugt eine stabile Textaufnahme von Topologie, Konfiguration, Diensten, Sicherheitsregeln, Remote Links, Paketverlustbelegen und gespeichertem Verkehr.

Beide Exporte redigieren Zugangsdaten, gemeinsame Link-Codes, Nutzdaten und Nachrichtentexte. Lange Simulationen benötigen außerdem eine Speichergrenze. Die Paketaufzeichnung ist deshalb begrenzt. Wurden ältere Ereignisse bereits entfernt, nennen die Exporte deren Anzahl, statt den verbleibenden Ausschnitt als vollständige Historie darzustellen.

Gerade dieses Detail entstand aus der Betrachtung als produktives Gesamtsystem. Ein Diagnosewerkzeug sollte die Grenzen seiner eigenen Belege beschreiben.

## Beschriftungen unterstützen jetzt den Versuch

Beschriftungen von Rechnern und Notebooks können dem manuellen Namen, der IP-Adresse, der MAC-Adresse oder beiden Netzwerkidentitäten folgen. Ist der gewählte Wert noch nicht verfügbar, bleibt der manuelle Name als Ersatz sichtbar.

Dadurch müssen Adressen seltener als getrennte Notiz auf die Arbeitsfläche geschrieben werden. IP-Beschriftungen unterstützen Subnetzaufgaben; MAC-Beschriftungen verbinden ARP-Ergebnisse und Switch-Lerntabellen sichtbar mit den Geräten.

## Prüfung gehörte zu jedem Teilstück

Die Arbeit wurde in vertikale Teilstücke zerlegt: Zustand und Persistenz, Laufzeitverhalten, native Bedienelemente, Lokalisierung und Barrierefreiheit, danach gezielte Verifikation. Tests deckten Record-Validierung und rekursives DNS, virtuelle-Host-Zuordnung und Administrationsänderungen, Antworten und Löschen in E-Mail-Ordnern, den Lebenszyklus des Paketverlusts, Beschriftungsableitung, Redigierung, Exportreihenfolge und rückwärtskompatibles Laden ab.

Breitere dienstbezogene und vollständige UI-Läufe prüften die Abläufe durch die echte Anwendung. Protokoll-Orakel verglichen wichtige Netzwerkverträge unabhängig von den SwiftUI-Ansichten. Release-Builds für den Simulator prüften anschließend die Integration über die vollständige Anwendung hinweg.

Zum Prozess gehörten außerdem wiederholte Abschlussprüfungen. Dabei wurden unter anderem eine noch fehlende Produktionsgrenze für die Paketaufzeichnung und die Notwendigkeit einer ausdrücklichen Formatversion für Berichte gefunden. Solche Befunde vor der öffentlichen Beschreibung zu beheben, zeigt: Parität ist ein Prozess, keine Checkliste.

## Eine Freigabesperre bleibt bewusst geschlossen

LAN Remote Link kann zwei laufende Simulationen über ein echtes lokales Netzwerk verbinden. Protokoll, Verschlüsselung, Suche, Persistenz und Wiederverbindung besitzen automatisierte Abdeckung. Als veröffentlicht wird die Funktion trotzdem noch nicht bezeichnet.

Für die abschließende Abnahme ist weiterhin ein vollständiger Lauf auf **zwei physischen iPads** im selben erreichbaren Netz nötig – einschließlich iPadOS-Berechtigung für das lokale Netzwerk, automatischer Suche, manueller Alternative, Unterbrechung und realistischem Unterrichtsablauf. Freigabefähige Builds erhalten deshalb eine Konfiguration **Anderes iPad**, lassen sie aber inaktiv. Remote Links innerhalb desselben Projekts bleiben verfügbar.

Diese Unterscheidung ist beabsichtigt. Automatisierte Belege schaffen eine starke technische Ausgangslage; sie ersetzen nicht den letzten hardwarespezifischen Abnahmeschritt.

## Das Ergebnis

Dieser Paritätsdurchlauf sollte nicht jeden Desktop-Dialog auf dem iPad nachbilden. Übertragen wurden die Verhaltensweisen, die den Versuch fachlich tragen: umfangreicheres DNS, namensbasiertes Webhosting, simulierte Netzwerkadministration, vollständige E-Mail-Abläufe, kontrollierter Ausfall, übertragbare Belege und Beschriftungen aus Netzwerkidentitäten.

Die Dokumentation wurde gemeinsam mit der Implementierung aktualisiert, damit diese Fähigkeiten als Versuche genutzt und nicht als versteckte Bedienelemente entdeckt werden. Die verbleibende Freigabesperre für LAN Remote Link wird ebenso klar beschrieben wie die abgeschlossene Arbeit. Produktionsreife braucht beide Formen von Ehrlichkeit.
