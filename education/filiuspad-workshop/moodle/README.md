# Moodle-Integration

## Empfohlener Weg: SCORM-Lernpaket

1. Lade `public/learning/FiliusPad-Lernpfad-SCORM-1.2.zip` herunter.
2. In Moodle: **Kurs einschalten → Aktivität oder Material anlegen → SCORM-Lernpaket**.
3. Lade die ZIP-Datei hoch; nicht vorher entpacken.
4. Wähle **ein Versuch** und als Bewertung die höchste Bewertung.
5. Setze die Bestehensgrenze auf **70**.
6. Aktiviere die Abschlussverfolgung: Aktivität gilt als abgeschlossen, wenn Moodle den SCORM-Status `completed` erhält.
7. Ergänze unterhalb der Aktivität eine Aufgabe für die Abschlussdatei (`.fls`) und eine Aufgabe für die Reflexion.

Der SCORM-Lernpfad enthält neun Module, Mini-Checks, lokale Notizen und einen Fortschrittsbalken. Die fachliche Arbeit findet in FiliusPad auf dem iPad statt. Das Paket benötigt keine externe Website, keine Videos und keine personenbezogenen Beispieldaten.

## Optional: Fragenbank

`filiuspad-question-bank.xml` ist eine Moodle-XML-Fragensammlung. Importiere sie über **Fragensammlung → Import → Moodle-XML-Format**. Die Fragen können anschließend in einem separaten Abschlussquiz oder als Wiederholungsfragen verwendet werden.

## Didaktischer Kursaufbau

- Abschnitt 1: Startklar und Dateiorganisation
- Abschnitt 2: Peer-to-Peer, Ping und Switch
- Abschnitt 3: Client-Server, Router und Gateway
- Abschnitt 4: Webserver, Browser und DNS
- Abschnitt 5: DHCP, Pakete und Fehlerdiagnose
- Abschnitt 6: Abschlussprojekt und Abgabe

Die SCORM-Aktivität bildet den selbstständigen Kern. Die zusätzlichen Moodle-Aufgaben dienen der überprüfbaren Abgabe der simulierten Netze und der Erklärung in eigenen Worten.
