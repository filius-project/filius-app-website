---
locale: de
translationKey: custom-java-applications-ipad
slug: custom-java-applications-ipad
title: "Eigene Anwendungen auf dem iPad: Warum wir Java-Code nicht einfach ausführen"
summary: "Der Software-Assistent der Desktop-Version bearbeitet und kompiliert Java. Auf dem iPad setzen wir stattdessen auf einen begrenzten nativen Protokoll-Baukasten – und lassen ihn experimentell, bis der Bedarf im Unterricht klar ist."
publishedAt: 2026-08-14
kind: development
topics:
  - Kompatibilität
  - Eigene Anwendungen
  - Unterricht
  - Entwicklung
readingMinutes: 7
featured: false
---

Einer der deutlichsten verbleibenden Unterschiede zwischen FILIUS auf dem Desktop und Filius on iPad wird besonders leicht unterschätzt. Die Desktop-Anwendung besitzt einen Software-Assistenten zum Erstellen eigener Client- und Server-Anwendungen. Auf dem iPad gibt es dafür derzeit keinen vollständig kompatiblen Ablauf.

Dabei fehlt nicht bloß eine übersehene Editoransicht. Die Java-Funktion hängt von einer kompletten Ausführungsumgebung ab, während unser heutiger Ersatz auf dem iPad bewusst nur einen begrenzten Teil desselben Lernbereichs abdeckt. Wir möchten diese Grenze offen erklären: Was leistet die Desktop-Version, warum haben wir sie nicht direkt kopiert, was existiert bereits auf dem iPad und welche Erkenntnisse brauchen wir vor dem nächsten Schritt?

## Was der Desktop-Assistent tatsächlich macht

Der Desktop-Ablauf speichert nicht nur einige Protokollwerte. Er erzeugt Java-Quelldateien aus Client- oder Server-Vorlagen, öffnet sie zur Bearbeitung, ruft einen Java-Compiler auf und registriert die kompilierte Anwendung, damit sie auf einem simulierten Rechner installiert werden kann.

Die Vorlagen sind mit FILIUS-eigenen Java-Anwendungsklassen, simulierten Sockets, Hintergrund-Threads und Swing-Fenstern verbunden. Lernende können die Nachrichtenverarbeitung ändern, Programmlogik ergänzen und die Oberfläche anpassen. Das Ergebnis ist ausführbarer Java-Code, der in derselben Desktop-Umgebung wie FILIUS läuft.

Der letzte Punkt ist entscheidend. Ein Quelltexteditor allein würde nur das Aussehen der Funktion nachbilden, nicht ihr Ergebnis. Für vollständige Kompatibilität müsste das bearbeitete Programm kompilieren, geladen werden, mit dem Simulator interagieren, seine Oberfläche anzeigen, sauber beendet werden und ein klar definiertes Verhalten beim Austausch von Projekten zwischen Systemen besitzen.

## Warum das keine direkte Portierung ist

Filius on iPad ist eine native Anwendung in Swift und SwiftUI. Sie enthält weder einen Java-Compiler noch eine Java Virtual Machine, eine Swing-Kompatibilitätsschicht oder ein System zum dynamischen Laden neu kompilierter Java-Klassen.

Diese Bausteine nur für eine einzelne Funktion einzubauen, würde eine zweite Anwendungsplattform innerhalb der iPad-App schaffen. Anschließend müssten wir die internen Schnittstellen des Java-Assistenten, sein Thread-Modell, seine Annahmen über Benutzeroberflächen, Speicherung, Lebenszyklus, Fehlerausgabe und Simulator-Anbindung dauerhaft kompatibel halten. Selbst der aus Standardvorlagen erzeugte Quelltext ist an Klassen der Desktop-Version gebunden; er lässt sich nicht einfach an die native iPad-Laufzeit übergeben.

Die Ausführung von durch Nutzerinnen und Nutzer bearbeitetem Code würde außerdem die Fehler- und Vertrauensgrenze deutlich vergrößern. Ein Unterrichtswerkzeug braucht vorhersehbare Projektdateien, begrenzten Ressourcenverbrauch, klaren Abbau laufender Dienste und deterministisches simuliertes Netzwerkverhalten. Eine allgemeine Code-Laufzeit macht all diese Eigenschaften schwerer erklärbar, prüfbar und wartbar.

Deshalb haben wir entschieden, beliebige Java-, JVM- oder Swing-Ausführung nicht als Weg zur Parität zu verfolgen.

## Das Lernziel ist wichtiger als der Mechanismus

Unsere Frage bei der Parität lautet nicht: „Können wir jeden Desktop-Dialog nachbauen?“ Sie lautet: „Können Lernende das Experiment durchführen, das Netzwerkverhalten beobachten und das Ergebnis erklären?“

Daraus entstand ein nativer, deklarativer Baukasten für Protokollanwendungen. Statt Quelltext zu schreiben, definiert man einen Client oder Server, wählt TCP oder UDP sowie einen Port und hinterlegt begrenzte Client-Nachrichten oder geordnete Anfrage-Antwort-Regeln. Die Anwendung läuft ausschließlich über die simulierte Netzwerk-Engine. Sie kann weder eine Verbindung zum echten Netzwerk des iPads öffnen noch ein Skript laden oder ein neues natives Fenster einführen.

Dieses kleinere Modell bietet wichtige Eigenschaften:

- Das Verhalten ist deterministisch und kann vor der Ausführung geprüft werden.
- Der Datenverkehr erscheint in derselben simulierten Paketansicht wie bei eingebauten Anwendungen.
- Eigene Definitionen können auf virtuellen PCs und Notebooks installiert werden.
- Stoppen, Deinstallieren, Zurücksetzen und Löschen von Geräten können Sockets zuverlässig bereinigen.
- Native Speicherung und Wiederherstellung behalten die Definitionen, ohne Java-Klassen vorzutäuschen.

Das ist eine echte Funktion, aber ein **Ersatz**, keine kompatible Umsetzung des Java-Software-Assistenten.

## Warum der iPad-Baukasten experimentell bleibt

Der heutige Baukasten kann exakte Textnachrichten modellieren. Er kann keine beliebigen Berechnungen, Schleifen, Zustandsautomaten, eigenen Java-Oberflächen oder allgemeine Bibliotheksnutzung ausdrücken. Ebenso importiert und startet er kein bestehendes Java-Quelltextprojekt.

Sein Projektformat gehört nativ zu Filius on iPad. Beim Export in das Java-`.fls`-Format werden native Protokolldefinitionen mit einem Kompatibilitätshinweis ausgelassen, statt sie als Java-Anwendungen auszugeben. Umgekehrt bedeutet das Bewahren unbekannter Desktop-Inhalte beim Öffnen und erneuten Speichern eines Projekts nicht, dass diese Inhalte auf dem iPad ausführbar werden.

Außerdem ist eine Produktfrage noch nicht gut genug beantwortet: **Für welche konkreten Unterrichtsaufgaben müssen Lernende eine eigene Anwendung konstruieren – und welches kleinste Werkzeug erfüllt diese Aufgaben verständlich?**

Ohne repräsentative Unterrichtsszenarien wären zusätzliche Bedienelemente nur Spekulation. Der heutige Ablauf mit exakten Nachrichten ist für technische Erprobung nützlich, aber noch nicht intuitiv genug für alle Lernenden. Deshalb bleibt er standardmäßig unter **Einstellungen → Experimentelle Funktionen → Protokollanwendungen aktivieren** ausgeschaltet.

## Wie es weitergehen könnte

Der nächste Schritt sollte nicht „mehr Programmierfunktionen hinzufügen“ lauten. Er sollte eine kurze, von Unterrichtsbedürfnissen geleitete Erkundungsphase sein.

Vor einer Neugestaltung benötigen wir repräsentative Aufgaben von Lehrkräften oder Verantwortlichen für Lehrpläne. Jede Aufgabe sollte das Lernziel, das kleinste nötige Protokollverhalten, den erwarteten Ablauf im Unterricht und die gewünschte Form für Austausch oder Bewertung benennen.

Wenn dieser Bedarf bestätigt wird, ist ein geführtes **Protokoll-Labor** die vielversprechendste Richtung. Untersuchen würden wir:

1. eine kleine Auswahl gut vermittelbarer Client-/Server-Vorlagen;
2. eine visuelle Anfrage-Antwort-Zeitleiste statt eines Formulars voller Implementierungsdetails;
3. eine Live-Vorschau der Pakete, die eine Aktion erzeugen würde;
4. Validierungshinweise in Begriffen der Netzwerktechnik statt in Compiler-Sprache;
5. ein dokumentiertes, begrenztes Austauschformat für native Protokolldefinitionen;
6. die Übersetzung einer begrenzten Auswahl häufiger Muster aus dem Desktop-Assistenten.

Der letzte Punkt muss bewusst eng bleiben. Das Erkennen und Übersetzen standardisierter Vorlagenmuster könnte möglich sein. Zu versprechen, beliebigen Java-Quelltext zu verstehen oder auszuführen, wäre nicht ehrlich.

Ein neu gestalteter Ablauf sollte experimentell bleiben, bis Lehrkräfte repräsentative Aufgaben ohne Wissen über den Quellcode des Projekts durchführen können und Speicherung, Wiederherstellung, Export, Barrierefreiheit sowie Laufzeit-Bereinigung als vollständiger Unterrichtsweg geprüft wurden.

## Was heute eingeplant werden sollte

Unterricht, der das Bearbeiten und Kompilieren eigener Java-Anwendungen voraussetzt, sollte weiterhin die Desktop-Version von FILIUS verwenden. Auf dem iPad eignen sich die eingebauten simulierten Anwendungen für den regulären Unterricht; der Protokoll-Baukasten sollte nur als Erprobungsfunktion betrachtet werden.

Verweist ein bestehendes `.fls`-Projekt auf eine nur auf dem Desktop verfügbare eigene Anwendung, sollte der gesamte Unterrichtsablauf vorab getestet werden. Dass sich ein Projekt erfolgreich öffnen lässt, belegt Dateikompatibilität – nicht die Ausführbarkeit jeder referenzierten Anwendung.

Diese Lücke ist real, aber ebenso real ist der Grund dafür. Wir beschreiben lieber einen bewusst begrenzten Ersatz korrekt, als eine unvollständige Laufzeit als vollständige Parität zu bezeichnen. Die Zukunft dieser Funktion sollte von den Experimenten bestimmt werden, die Lernende brauchen – nicht allein davon, dass die Desktop-Umsetzung Java verwendet.
