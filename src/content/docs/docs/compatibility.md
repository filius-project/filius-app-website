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

## LAN Remote Link: Freigabestatus

Die Verbindung **In diesem Projekt** zwischen zwei Remote Links innerhalb derselben Topologie bleibt unterstützt. Eine gespeicherte Konfiguration mit dem Umfang **Anderes iPad** wird erhalten, ist in freigabefähigen Builds aber noch inaktiv.

Die LAN-Implementierung ist vorhanden und automatisiert geprüft. Vor ihrer Freigabe fehlt jedoch die abschließende Abnahme mit zwei physischen iPads im selben lokalen Netz – einschließlich iPadOS-Berechtigung für das lokale Netzwerk, automatischer Suche, manueller Adressangabe, Wiederverbindung und eines realistischen Unterrichtsablaufs.

:::caution[Noch nicht für den Unterricht einplanen]
Verwende für einen verlässlich ausführbaren Remote-Link-Versuch derzeit **In diesem Projekt**. Plane **Anderes iPad** erst ein, wenn die Zwei-iPad-Abnahme für den konkreten Release dokumentiert wurde.
:::

## Wichtige Desktop-Grenze

Beliebige Java-Anwendungen aus dem Software-Assistenten der Desktop-Version benötigen Compiler, JVM und Desktop-APIs, die Filius on iPad nicht bereitstellt.

:::danger[Vor Unterrichtsbeginn prüfen]
Öffne vorhandene Kursprojekte zuerst in Filius on iPad und teste die benötigten Anwendungen. Eine erfolgreich geladene Datei garantiert nicht, dass jeder Desktop-spezifische Inhalt auf dem iPad ausführbar ist.
:::
