---
locale: de
translationKey: contact-form-architecture
slug: contact-form-behind-the-scenes
title: "Hinter dem Kontaktformular: ein kleiner Dienst statt eines großen Umwegs"
summary: "Warum das Supportformular über einen eigenen, privaten Dienst läuft und bewusst auf Uploads, Datenbank und Drittanbieter-CAPTCHA verzichtet."
publishedAt: 2026-08-10
kind: development
topics:
  - Support
  - Datenschutz
  - Infrastruktur
readingMinutes: 4
---

Ein Kontaktformular sieht einfach aus: Adresse, Thema, Nachricht, Absenden. Hinter dieser kleinen Oberfläche steckt trotzdem eine wichtige Architekturentscheidung. Filius on iPad verwendet keinen externen Formulardienst und kein fremdes CAPTCHA.

## Ein kurzer, kontrollierter Weg

Der Browser sendet das Formular an dieselbe Website. Der Web-Container leitet ausschließlich den Pfad `/api/contact` an einen separaten Kontakt-Dienst im privaten Docker-Netz weiter. Dieser Dienst prüft die Eingaben und übergibt eine akzeptierte Nachricht über das authentifizierte Support-Postfach.

Der Kontakt-Dienst besitzt keinen öffentlichen Port. Er ist nur für den Web-Container erreichbar.

## Bewusst wenig Daten

Das Formular hat keinen Datei-Upload und keine eigene Datenbank. Es verarbeitet nur die Angaben, die für die Supportanfrage nötig sind. Ein unsichtbares Feld bremst einfache Bots; Größenlimits, Ursprungsprüfung und eine kurzlebige Rate-Limit-Kennung ergänzen den Schutz.

Die E-Mail-Adresse der anfragenden Person wird als Antwortadresse verwendet. Sie muss nicht zusätzlich in Serverprotokolle oder eine zweite Ablage kopiert werden.

## Warum ein eigener Dienst?

Eine statische Website kann sicher und schnell ausgeliefert werden, soll aber keine SMTP-Zugangsdaten enthalten. Der getrennte Dienst hält diese Zugangsdaten zur Laufzeit auf dem Server und lässt den öffentlichen Web-Container klein und schreibgeschützt.

Das Ergebnis ist kein spektakuläres Feature. Es ist eine bewusst unsichtbare Grundlage: Support soll erreichbar sein, ohne dafür unnötig viele Systeme und Datenspuren einzuführen.
