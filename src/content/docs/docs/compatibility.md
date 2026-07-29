---
title: Kompatibilität mit FILIUS
description: Was bei .fls-Projekten unterstützt, erhalten oder nicht ausgeführt wird.
sidebar:
  order: 7
---

Filius on iPad behandelt das FILIUS-Projektformat als Kompatibilitätsvertrag.

## Unterstützte Abläufe

- `.fls`-Dateien importieren
- bekannte Geräte, Verbindungen und Konfigurationen bearbeiten
- Projekte speichern und erneut öffnen
- bekannte simulierte Anwendungen verwenden
- unbekannte Inhalte innerhalb definierter Größen- und Sicherheitsgrenzen erhalten

## Erhalten bedeutet nicht ausführbar

Unbekannte JavaBean/XML-Inhalte können in einem Projekt erhalten bleiben, ohne dass Filius on iPad sie auf dem iPad ausführen kann.

## Wichtige Desktop-Grenze

Beliebige Java-Anwendungen aus dem Software-Assistenten der Desktop-Version benötigen Compiler, JVM und Desktop-APIs, die Filius on iPad nicht bereitstellt.

:::danger[Vor Unterrichtsbeginn prüfen]
Öffne vorhandene Kursprojekte zuerst in Filius on iPad und teste die benötigten Anwendungen. Eine erfolgreich geladene Datei garantiert nicht, dass jeder Desktop-spezifische Inhalt auf dem iPad ausführbar ist.
:::
