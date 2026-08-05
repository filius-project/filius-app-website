# Lehrkraft-Handreichung

## Zielgruppe und Voraussetzungen

Klasse 8 oder vergleichbarer Einstieg in Rechnernetze. Die Lernenden benötigen ein iPad mit FiliusPad, können Apps installieren und Dateien in einem Kursordner speichern. Vorkenntnisse zu IP-Adressen sind hilfreich, aber nicht erforderlich.

## Organisation

- **Selbstlernzeit:** etwa 6–8 Unterrichtsstunden à 45 Minuten.
- **Sozialform:** Einzelarbeit, anschließend kurze Partnererklärung.
- **Abgabe:** pro Modul eine .fls-Datei oder ein zusammengeführtes Abschlussprojekt plus Lernheft.
- **Dateinamen:** JJMMTT-Aufgabe-Name.fls.
- **Moodle:** das beiliegende SCORM-1.2-Paket als eine Aktivität importieren; die mitgelieferte Fragenbank ist optional.

## Erwartungshorizont in Kurzform

| Modul | Erwartete Beobachtung                                                                         |
| ----: | --------------------------------------------------------------------------------------------- |
|     0 | Entwurf konfiguriert; Aktion simuliert und startet Software.                                  |
|     1 | Ping im selben Netz gelingt; die Paketansicht zeigt Adressauflösung und Echo-Nachrichten.     |
|     2 | Switch verbindet mehrere Geräte; Broadcast und gelernte Zielrichtung werden unterschieden.    |
|     3 | Client sendet an einen Port; Echo-Server antwortet mit derselben Nachricht.                   |
|     4 | Ping in fremdes Netz scheitert ohne Gateway und gelingt nach korrekter Gateway-Konfiguration. |
|     5 | Browser fragt HTTP-Inhalt an; Webserver liefert HTML.                                         |
|     6 | DNS-Name wird auf die Webserver-IP aufgelöst; direkter IP-Aufruf dient als Kontrolltest.      |
|     7 | DHCP liefert eine zeitweise Konfiguration; Paketzeilen liefern Hinweise zur Fehlerdiagnose.   |
|     8 | Lernende können Name → IP → Gateway/Router → Zielnetz → Dienst → Antwort erklären.            |

## Bewertungsraster (20 Punkte)

- 4 Punkte: Topologie und Verkabelung vollständig und lesbar
- 4 Punkte: Adressplan mit Maske, Gateways und DNS korrekt
- 4 Punkte: drei reproduzierbare Funktionstests dokumentiert
- 4 Punkte: Paketbeobachtung fachlich sinnvoll erklärt
- 4 Punkte: Fehlerfall, Reflexion und sichere Dateiabgabe

## Typische Hilfen

1. **Ping scheitert im gleichen LAN:** Simulation gestartet? Kabel wirklich verbunden? IPs im selben Netz? Tippfehler?
2. **Ping scheitert zwischen LANs:** Router-Schnittstellen und Standardgateways prüfen.
3. **IP-Aufruf funktioniert, Name nicht:** DNS-Adresse an den Clients und DNS-Eintrag prüfen.
4. **Browser zeigt nichts:** Webserver gestartet? Richtiger Host und HTTP-Adresse?
5. **Echo antwortet nicht:** Dienst läuft? Port 55555 und Ziel-IP stimmen?

## Moodle-Kursaufbau

Das SCORM-Paket ist der selbstständige Lernpfad. Lege zusätzlich Aufgaben oder Foren für die .fls-Abgaben an. Empfohlene Einstellungen: ein Versuch, Bewertung nach dem SCORM-Rohwert, Bestehensgrenze 70 %, Abschluss bei SCORM-Status „completed“. Die Lernenden benötigen Zugriff auf die App; die HTML-Lernoberfläche selbst enthält keine vertraulichen Daten oder externen Tracking-Dienste.

## Rechtlicher und didaktischer Hinweis

Dieses Material ist eine eigenständige iPad-Adaption der Unterrichtsidee. Vor öffentlicher Weitergabe müssen Lizenz, Namens-/Logo-Nutzung und Rechte an übernommenen Filius-Komponenten geklärt sein. Die Lernziele und Aufgabenformulierungen in diesem Paket wurden neu erstellt.
