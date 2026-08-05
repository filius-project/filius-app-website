import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const execFileAsync = promisify(execFile);

const root = new URL("../education/filiuspad-workshop/", import.meta.url)
  .pathname;
const scormRoot = join(root, "scorm");
const publicRoot = new URL("../public/learning/", import.meta.url).pathname;

const modules = [
  {
    id: "start",
    number: "0",
    title: "Startklar: Dein virtuelles Netz",
    goal: "Du kennst die beiden Arbeitsmodi, kannst ein Projekt speichern und weißt, wie du Beobachtungen dokumentierst.",
    concept:
      "FiliusPad trennt Entwurf und Aktion: Im Entwurfsmodus baust und konfigurierst du die Topologie. Im Aktionsmodus läuft die Simulation und du startest Anwendungen.",
    materials: [
      "iPad mit FiliusPad",
      "Dateien-App oder ein Lernordner",
      "Stift oder Tastatur",
    ],
    steps: [
      "Lege ein neues Projekt an. Verwende für alle Dateien das Schema <strong>JJMMTT-Aufgabe-Name</strong>, zum Beispiel <code>260805-01-Ada</code>.",
      "Finde den Umschalter <strong>Entwurfsmodus / Aktionsmodus</strong> und öffne bei einem Rechner den Laufzeit-Arbeitsbereich.",
      "Speichere das leere Projekt als <code>260805-00-Ada.fls</code>.",
      "Notiere in deinem Heft: Was ist im Entwurf möglich, was erst in der Aktion?",
    ],
    observe:
      "Ein gutes Laborprotokoll enthält Topologie, Adressen, ausgeführte Befehle, Beobachtungen und eine kurze Erklärung.",
    deliverable:
      "Eine gespeicherte leere Projektdatei und eine Liste mit zwei Unterschieden zwischen den Modi.",
    questions: [
      [
        "In welchem Modus startest du eine Simulation?",
        "Aktionsmodus",
        "Entwurfsmodus",
      ],
      ["Welche Endung hat eine FiliusPad-Projektdatei?", ".fls", ".moodle"],
    ],
  },
  {
    id: "peer",
    number: "1",
    title: "Zwei Rechner direkt verbinden",
    goal: "Du baust ein Peer-to-Peer-Netz und prüfst die Verbindung mit ping.",
    concept:
      "Zwei Geräte können direkt miteinander verbunden werden. Damit IPv4-Kommunikation funktioniert, müssen beide Adressen im selben Netz liegen und eindeutig sein.",
    materials: ["Projekt aus Modul 0", "Zwei Rechner oder Notebooks"],
    steps: [
      "Platziere zwei Rechner. Benenne sie <code>Rechner 10</code> und <code>Rechner 11</code>.",
      "Verbinde die Rechner mit einem Kabel.",
      "Setze <code>192.168.10.10</code> und <code>192.168.10.11</code> mit der Subnetzmaske <code>255.255.255.0</code>.",
      "Starte die Simulation. Installiere auf Rechner 10 <strong>CMD</strong> und führe <code>ping 192.168.10.11</code> aus.",
      "Öffne zusätzlich die Paket-/Datenaustauschansicht. Welche Nachrichten siehst du?",
    ],
    observe:
      "Beim ersten Ping kann vor der Echo-Anfrage eine Auflösung der Zieladresse sichtbar werden. Danach folgen Echo request und Echo reply.",
    deliverable:
      "Die Projektdatei, ein kurzer Ping-Nachweis und eine beschriftete Pfeilskizze Quelle → Ziel.",
    questions: [
      [
        "Welche Bedingung muss für ein direktes IPv4-Netz gelten?",
        "Gleicher Netzbereich und eindeutige Adressen",
        "Jedes Gerät braucht eine öffentliche Internetadresse",
      ],
      [
        "Wofür steht eine Ping-Antwort?",
        "Das Ziel hat die Anfrage beantwortet",
        "Der Switch hat eine neue IP vergeben",
      ],
    ],
  },
  {
    id: "switch",
    number: "2",
    title: "Ein Switch verbindet ein LAN",
    goal: "Du erweiterst das Netz, beobachtest Lernen von MAC-Adressen und erklärst LAN und Protokoll.",
    concept:
      "Ein Switch verbindet mehrere Geräte im selben lokalen Netz. Er lernt, an welchem Port eine Quell-MAC-Adresse erreichbar ist, und leitet Frames gezielter weiter.",
    materials: [
      "Projekt aus Modul 1",
      "Einen Switch und einen dritten Rechner",
    ],
    steps: [
      "Platziere einen Switch und einen dritten Rechner namens <code>Server 12</code>.",
      "Verbinde alle drei Rechner mit dem Switch. Lass die Adressen im Netz <code>192.168.10.0/24</code>.",
      "Starte die Simulation und sende von Rechner 10 einen Ping an Rechner 12.",
      "Sende danach von Rechner 11 einen Ping an Rechner 12. Vergleiche die Paketansichten.",
      "Beschreibe, was im Alltag einem Switch entspricht, wenn man an ein Stromnetz denkt.",
    ],
    observe:
      "Broadcasts können mehrere Ports erreichen; bekannte Ziele werden vom Switch gezielter weitergeleitet. Zeichne die beobachtete Richtung ein.",
    deliverable:
      "Eine beschriftete LAN-Topologie und drei Sätze zu Switch, LAN und Protokoll.",
    questions: [
      [
        "Was ist ein LAN?",
        "Ein lokales Rechnernetz",
        "Ein einzelner Computer ohne Verbindung",
      ],
      [
        "Was beschreibt ein Protokoll?",
        "Regeln für die Kommunikation",
        "Die Farbe eines Netzwerkkabels",
      ],
    ],
  },
  {
    id: "client-server",
    number: "3",
    title: "Client und Server",
    goal: "Du untersuchst einen Dienst und trennst Client, Serverprogramm und Servergerät.",
    concept:
      "Ein Client fordert einen Dienst an. Ein Serverprogramm bietet ihn an. Ein Computer wird oft ebenfalls Server genannt, wenn er solche Programme bereitstellt.",
    materials: ["Projekt aus Modul 2", "CMD, Echo-Server, Einfacher Client"],
    steps: [
      "Installiere auf <code>Server 12</code> den <strong>Echo-Server</strong> und starte ihn auf Port <code>55555</code>.",
      "Installiere auf <code>Rechner 10</code> den <strong>Einfachen Client</strong> und verbinde ihn mit <code>192.168.10.12:55555</code>.",
      "Sende drei Nachrichten. Beobachte Antwort, Quelle, Ziel und Port in der Paketansicht.",
      "Erkläre mit eigenen Worten, was der Echo-Server leistet.",
      "Übertrage das Prinzip auf Webserver, Dateiserver und Mailserver.",
    ],
    observe:
      "Der Port unterscheidet den Dienst. Die IP-Adresse führt zum Gerät; der Port führt zum passenden Serverprogramm.",
    deliverable:
      "Ein Ablaufbild mit Anfrage und Antwort sowie eine Erklärung des Client-Server-Prinzips.",
    questions: [
      [
        "Was identifiziert den Dienst auf einem Gerät?",
        "Ein Port",
        "Die Farbe des Geräts",
      ],
      [
        "Wer fordert beim Echo-Beispiel die Leistung an?",
        "Der Client",
        "Der Switch",
      ],
    ],
  },
  {
    id: "router",
    number: "4",
    title: "Zwei Netze mit einem Router verbinden",
    goal: "Du unterscheidest Netzadresse, Gateway und Router und findest einen Konfigurationsfehler.",
    concept:
      "Ein Router verbindet unterschiedliche IP-Netze. Ein Gerät schickt Ziele außerhalb seines eigenen Netzes an das Standardgateway.",
    materials: [
      "Projekt aus Modul 3",
      "Router/Vermittlungsrechner, zweiter Switch, drei weitere Rechner",
    ],
    steps: [
      "Baue ein zweites LAN mit <code>192.168.20.0/24</code> und den Geräten <code>Client 20</code> (<code>192.168.20.10</code>) und <code>Client 21</code> (<code>192.168.20.11</code>).",
      "Platziere einen Router mit zwei Schnittstellen. Verwende <code>192.168.10.1</code> und <code>192.168.20.1</code>.",
      "Teste aus dem ersten LAN einen Ping zu <code>192.168.20.10</code> ohne Gateway. Notiere das Ergebnis.",
      "Setze das Gateway der Geräte im ersten LAN auf <code>192.168.10.1</code> und im zweiten LAN auf <code>192.168.20.1</code>.",
      "Teste erneut und erkläre, warum sich das Ergebnis ändert.",
    ],
    observe:
      "Ohne Gateway bleibt ein Ziel in einem fremden Netz unerreichbar. Mit Gateway kann der Router das Paket weiterleiten.",
    deliverable:
      "Zwei farbig markierte IP-Netze, Router-Adressen und ein Vorher-/Nachher-Vergleich.",
    questions: [
      [
        "Wann wird das Standardgateway benötigt?",
        "Für Ziele außerhalb des eigenen Netzes",
        "Für jede Datei im selben Ordner",
      ],
      [
        "Was verbindet ein Router?",
        "Verschiedene Netzwerke",
        "Nur zwei Anwendungen auf demselben Gerät",
      ],
    ],
  },
  {
    id: "web",
    number: "5",
    title: "Das eigene Web: Server und Browser",
    goal: "Du stellst eine lokale HTML-Seite bereit und rufst sie über den Webbrowser ab.",
    concept:
      "Der Webserver ist ein Dienst. Der Webbrowser ist sein Client. Eine Webseite besteht aus HTML und kann weitere Dateien anfordern.",
    materials: [
      "Projekt aus Modul 4",
      "Datei-Explorer, Texteditor, Webserver, Webbrowser",
    ],
    steps: [
      "Installiere auf <code>Server 12</code> den <strong>Datei-Explorer</strong>, den <strong>Texteditor</strong> und den <strong>Webserver</strong>.",
      "Öffne die vorhandene Datei <code>/www/index.html</code> im Texteditor und ersetze sie durch eine eigene Seite mit Überschrift, Absatz und Link.",
      "Lege mit dem Datei-Explorer im Ordner <code>/www</code> zusätzlich <code>kontakt.html</code> an und bearbeite die Datei anschließend im Texteditor.",
      "Starte den Webserver. Installiere auf <code>Client 20</code> den <strong>Webbrowser</strong>.",
      "Öffne im Browser <code>http://192.168.10.12</code>. Beobachte die HTTP-Anfrage und -Antwort.",
    ],
    observe:
      "Der Browser stellt eine Anfrage; der Webserver liefert Inhalt. Bei einer zweiten Seite entsteht eine weitere Anfrage.",
    deliverable:
      "Eine eigene Mini-Webseite und ein Sequenzdiagramm Browser → Webserver → Browser.",
    questions: [
      [
        "Wer ist im Web-Beispiel der Client?",
        "Der Webbrowser",
        "Der Webserver",
      ],
      ["Welche Sprache beschreibt die Struktur einer Seite?", "HTML", "IPv4"],
    ],
  },
  {
    id: "dns",
    number: "6",
    title: "DNS: Namen statt Zahlen",
    goal: "Du richtest einen DNS-Eintrag ein und rufst die Webseite mit einem Namen auf.",
    concept:
      "DNS ordnet einen Hostnamen einer IP-Adresse zu. Der Browser kann dadurch einen Namen nutzen, obwohl die Kommunikation weiterhin eine IP-Adresse benötigt.",
    materials: [
      "Projekt aus Modul 5",
      "DNS-Server auf einem neuen Server im ersten LAN",
    ],
    steps: [
      "Platziere <code>DNS 53</code> im ersten LAN mit <code>192.168.10.53</code> und Gateway <code>192.168.10.1</code>.",
      "Trage bei den Rechnern den DNS-Server <code>192.168.10.53</code> ein.",
      "Installiere und starte den <strong>DNS-Server</strong> auf DNS 53.",
      "Lege den Eintrag <code>www.filius.test → 192.168.10.12</code> an.",
      "Öffne im Browser <code>http://www.filius.test</code> und vergleiche die Anfrage mit dem direkten Aufruf über die IP-Adresse.",
      "Markiere in <code>www.filius.test</code> Root, Top-Level-Domain, Second-Level-Domain und Hostname.",
    ],
    observe:
      "Ohne DNS kann der direkte IP-Aufruf funktionieren, während der Name fehlschlägt. Mit dem Eintrag wird der Name aufgelöst.",
    deliverable:
      "Ein DNS-Diagramm und eine Tabelle mit mindestens drei Namen-IP-Zuordnungen.",
    questions: [
      [
        "Was liefert DNS im Kern?",
        "Eine Zuordnung von Name zu IP-Adresse",
        "Eine neue Stromversorgung",
      ],
      [
        "Was bleibt beim DNS-Aufruf gleich?",
        "Die Ziel-IP des Webservers nach der Auflösung",
        "Die Tastatur des Clients",
      ],
    ],
  },
  {
    id: "dhcp-packets",
    number: "7",
    title: "Automatik und Pakete",
    goal: "Du vergleichst feste Adressen mit DHCP und liest eine Paketfolge als technische Geschichte.",
    concept:
      "DHCP kann Netzwerkkonfiguration automatisch vergeben. Paketorientierte Übertragung zerlegt eine Kommunikation in einzelne Nachrichten mit Quelle, Ziel, Protokoll und Dienst.",
    materials: ["Projekt aus Modul 6", "DHCP-Server oder Paketansicht"],
    steps: [
      "Vergleiche eine fest eingetragene IP-Konfiguration mit einem DHCP-Client.",
      "Richte einen DHCP-Server für <code>192.168.20.0/24</code> ein oder öffne die vorhandene DHCP-Funktion.",
      "Aktiviere die automatische Konfiguration auf einem Client und notiere den erhaltenen Lease.",
      "Lade die Webseite erneut und notiere mindestens fünf Paketzeilen: Quelle, Ziel, Protokoll oder Dienst, Beobachtung.",
      "Erkläre, warum eine Datei nicht als ein einziger unteilbarer Block übertragen werden muss.",
    ],
    observe:
      "Die Paketansicht macht die Kommunikation beobachtbar. Ein Fehler kann an Adresse, Gateway, DNS, Dienststatus oder Erreichbarkeit liegen.",
    deliverable:
      "Ein ausgefülltes Paketprotokoll und eine Fehlerdiagnose mit mindestens zwei überprüften Hypothesen.",
    questions: [
      [
        "Was ist ein DHCP-Lease?",
        "Eine zeitweise vergebene Netzwerkkonfiguration",
        "Ein Webseitentitel",
      ],
      [
        "Was hilft bei der Fehlersuche?",
        "Quelle, Ziel, Protokoll und Dienststatus prüfen",
        "Alle Geräte zufällig umbenennen",
      ],
    ],
  },
  {
    id: "capstone",
    number: "8",
    title: "Abschluss: Dein kleines Internet",
    goal: "Du planst, baust und erklärst eine eigene vernetzte Anwendung.",
    concept:
      "Ein Netz ist ein Zusammenspiel aus Geräten, Adressen, Weiterleitung, Namensauflösung und Anwendungen. Gute Netzplanung macht jeden Weg nachvollziehbar.",
    materials: [
      "Die bisherigen Projektdateien",
      "Skizzenpapier oder Notiz-App",
      "FiliusPad",
    ],
    steps: [
      "Plane zwei LANs mit mindestens vier Endgeräten, einem Switch, einem Router, einem DNS-Server und einem Webserver.",
      "Lege einen Adressplan mit Netzmaske, Gateway und DNS fest.",
      "Baue die Topologie in FiliusPad und speichere sie unter <code>260805-09-Abschluss-Name.fls</code>.",
      "Beweise drei Dinge: Ping über den Router, Webzugriff über IP, Webzugriff über DNS-Namen.",
      "Exportiere oder zeichne eine Dokumentation mit Topologie, Adressplan, Paketbeobachtung und Fehlerfall.",
      "Schreibe eine Reflexion: Welche Konfiguration war notwendig, damit der Name bis zur Webseite führte?",
    ],
    observe:
      "Eine vollständige Erklärung folgt dem Weg: Name → DNS-IP → Gateway/Router → Zielnetz → Port/Dienst → Antwort.",
    deliverable:
      "Funktionierende Abschlussdatei, Netzplan, Adresstabelle und eine einseitige Erklärung.",
    questions: [
      [
        "Welche Reihenfolge ist für einen Webaufruf mit DNS plausibel?",
        "DNS-Auflösung, Routing, HTTP-Dienst, Antwort",
        "Drucker, Tastatur, Akku, DNS",
      ],
      [
        "Was ist ein guter Abschlussnachweis?",
        "Reproduzierbare Tests mit Ergebnis und Erklärung",
        "Nur ein Screenshot ohne Kontext",
      ],
    ],
  },
];

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const inline = (value) =>
  value
    .replaceAll(/`([^`]+)`/g, "<code>$1</code>")
    .replaceAll(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

const moduleCard = (m, workbook = false) => `
<section class="${workbook ? "workbook-page" : "module"}" id="${m.id}">
  <div class="eyebrow">Modul ${m.number} · ${workbook ? "Arbeitsheft" : "Lernpfad"}</div>
  <h2>${m.title}</h2>
  <p class="goal"><strong>Lernziel:</strong> ${m.goal}</p>
  <div class="callout"><strong>Denke daran</strong><br>${m.concept}</div>
  <h3>Du brauchst</h3><ul>${m.materials.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>
  <h3>Aufgabe</h3><ol>${m.steps.map((x) => `<li>${inline(x)}</li>`).join("")}</ol>
  <div class="diagram"><div class="device">Quelle</div><div class="arrow">→</div><div class="device accent">Ziel / Dienst</div></div>
  <h3>Beobachte und erkläre</h3><p>${m.observe}</p>
  <div class="answer"><strong>Dein Nachweis</strong><p>${m.deliverable}</p><div class="lines"></div><div class="lines"></div></div>
  ${workbook ? `<div class="reflection"><strong>Check-out</strong><p>Was hat funktioniert? Was würdest du zuerst prüfen, wenn der Test fehlschlägt?</p><div class="lines"></div></div>` : ""}
</section>`;

const workbookHtml = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>FiliusPad – Rechnernetze Lernheft</title><style>
@page{size:A4;margin:14mm 15mm 15mm}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#17212b;margin:0;font-size:10.5pt;line-height:1.38}h1{font-size:31pt;line-height:1.05;margin:0 0 18px;color:#0d4052}h2{font-size:22pt;line-height:1.1;margin:7px 0 12px;color:#0d4052}h3{font-size:13pt;margin:17px 0 6px;color:#176078}.cover{min-height:265mm;display:flex;flex-direction:column;justify-content:space-between}.cover-top{border-top:5px solid #e5b84b;padding-top:10px}.tag{display:inline-block;background:#e8f4f5;color:#0d4052;padding:5px 10px;border-radius:20px;font-weight:bold}.subtitle{font-size:16pt;max-width:140mm;color:#4c5c64}.coverbox,.callout{border:1px solid #aac4ca;border-left:5px solid #e5b84b;border-radius:9px;padding:12px 15px;background:#f3f8f8}.coverbox{margin-top:22mm}.meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.meta div{border-bottom:1px solid #bbc9ce;padding:7px 2px}.footer{font-size:8.5pt;color:#63747d;border-top:1px solid #d9e2e5;padding-top:7px}.workbook-page{page-break-before:always;min-height:255mm}.eyebrow{font-size:9pt;letter-spacing:.08em;text-transform:uppercase;color:#7a5a04;font-weight:700}.goal{font-size:12pt;background:#eef7f7;padding:9px 12px;border-radius:7px}.callout{margin:10px 0}.module ul,.module ol,.workbook-page ul,.workbook-page ol{padding-left:24px}.module li,.workbook-page li{margin:5px 0}code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#edf0f1;padding:1px 4px;border-radius:3px}.diagram{display:flex;align-items:center;justify-content:center;gap:12px;margin:18px 0}.device{border:2px solid #0d4052;border-radius:8px;padding:12px 19px;text-align:center;font-weight:bold;min-width:80px;background:#fff}.device.accent{background:#dff1ef}.arrow{font-size:24pt;color:#e5a927}.answer,.reflection{border:1px solid #bbc9ce;border-radius:8px;padding:10px 12px;margin-top:13px}.answer{background:#fffdf6}.lines{height:20px;border-bottom:1px solid #bfc9cc}.small{font-size:9pt;color:#5d6c73}.table{width:100%;border-collapse:collapse;margin:10px 0}.table th,.table td{border:1px solid #b6c5c9;padding:6px;text-align:left}.table th{background:#eaf3f3}.checklist{columns:2}.checklist li{break-inside:avoid}.glossary{columns:2}.glossary dt{font-weight:bold;color:#0d4052}.glossary dd{margin:0 0 6px 0}.no-break{break-inside:avoid}
</style></head><body>
<div class="cover"><div class="cover-top"><span class="tag">Filius on iPad · Lernheft</span><h1>Rechnernetze selbst erkunden</h1><p class="subtitle">Ein selbstständiger Workshop für Klasse 8: bauen, beobachten, erklären.</p><div class="coverbox"><strong>Dein Auftrag</strong><p>Baue mit FiliusPad Schritt für Schritt ein kleines Netzwerk. Führe Tests aus, beobachte Pakete und erkläre, warum die Verbindung funktioniert oder scheitert.</p><p>Dieses Lernheft überträgt die Lernidee des bestehenden FILIUS-Workshops auf die iPad-Oberfläche. Aufgaben und Formulierungen sind neu geschrieben; die Fachkonzepte bleiben anschlussfähig.</p></div><div class="meta"><div>Name: __________________________</div><div>Kurs: __________________________</div><div>Startdatum: ____________________</div><div>Abgabe: ________________________</div></div></div><div class="footer">FiliusPad Lernheft · Entwurf für Unterricht und selbstständiges Lernen · Stand 05.08.2026</div></div>
<section class="workbook-page"><div class="eyebrow">So arbeitest du</div><h2>Vom ersten Kabel zum kleinen Internet</h2><p>Arbeite die Module in der Reihenfolge durch. Nach jedem Modul speicherst du deine <code>.fls</code>-Datei und beantwortest den Check-out.</p><div class="callout"><strong>Merksatz</strong><br>Im <strong>Entwurfsmodus</strong> baust und konfigurierst du. Im <strong>Aktionsmodus</strong> läuft die Simulation und du startest Programme.</div><h3>Arbeitsregeln</h3><ul class="checklist"><li>Speichere nach jedem Modul.</li><li>Verwende klare Gerätenamen.</li><li>Notiere IP, Maske, Gateway und DNS.</li><li>Beobachte Quelle, Ziel, Dienst und Ergebnis.</li><li>Teste eine Vermutung, statt nur zu raten.</li><li>Teile keine echten Passwörter oder privaten Daten.</li></ul><h3>Adressplan für den Workshop</h3><table class="table"><tr><th>Netz</th><th>Bereich</th><th>Beispiel-Gateway</th></tr><tr><td>LAN 10</td><td>192.168.10.0/24</td><td>192.168.10.1</td></tr><tr><td>LAN 20</td><td>192.168.20.0/24</td><td>192.168.20.1</td></tr></table><p class="small">Wenn deine Lehrkraft eine andere Adressierung vorgibt, verwende diese und notiere sie deutlich.</p></section>
${modules.map((m) => moduleCard(m, true)).join("\n")}
<section class="workbook-page"><div class="eyebrow">Abschluss</div><h2>Dein kleines Internet</h2><p>Zeige, dass du nicht nur klicken, sondern den Weg einer Nachricht erklären kannst.</p><h3>Pflichtnachweise</h3><ul><li>Ping innerhalb eines LANs</li><li>Ping über den Router in das andere LAN</li><li>Webseite über IP-Adresse</li><li>Webseite über DNS-Namen</li><li>Mindestens fünf beobachtete Paketzeilen</li><li>Eine absichtlich eingebaute und anschließend erklärte Störung</li></ul><h3>Adress- und Diensttabelle</h3><table class="table"><tr><th>Gerät</th><th>IP / Maske</th><th>Gateway</th><th>Dienst</th></tr>${[1, 2, 3, 4, 5, 6].map(() => '<tr><td style="height:27px"></td><td></td><td></td><td></td></tr>').join("")}</table><h3>Reflexion</h3><p>Erkläre in fünf bis acht Sätzen, wie aus <code>http://www.filius.test</code> eine Webseite wird.</p><div class="lines"></div><div class="lines"></div><div class="lines"></div><div class="lines"></div><div class="lines"></div></section>
<section class="workbook-page"><div class="eyebrow">Nachschlagen</div><h2>Glossar</h2><dl class="glossary"><dt>Adresse</dt><dd>Eine Kennzeichnung, mit der ein Ziel im Netz gefunden wird.</dd><dt>DNS</dt><dd>Ordnet Namen wie <code>www.filius.test</code> IP-Adressen zu.</dd><dt>Gateway</dt><dd>Der nächste Router für Ziele außerhalb des eigenen Netzes.</dd><dt>IP-Adresse</dt><dd>Logische Adresse eines Geräts in einem IP-Netz.</dd><dt>LAN</dt><dd>Local Area Network, ein lokales Rechnernetz.</dd><dt>MAC-Adresse</dt><dd>Hardware-nahe Adresse einer Netzwerkschnittstelle.</dd><dt>Port</dt><dd>Nummer, die einen Dienst auf einem Gerät unterscheidet.</dd><dt>Protokoll</dt><dd>Vereinbarte Regeln und Nachrichtenformate.</dd><dt>Router</dt><dd>Vermittelt Daten zwischen verschiedenen Netzen.</dd><dt>Server</dt><dd>Ein Programm, das einen Dienst anbietet; oft auch das Gerät, auf dem es läuft.</dd><dt>Switch</dt><dd>Verbindet mehrere Geräte in einem LAN und leitet Frames weiter.</dd></dl><div class="callout"><strong>Fehler-Checkliste</strong><br>Simulation läuft? Kabel verbunden? IP und Maske korrekt? Gateway gesetzt? DNS eingetragen? Dienst gestartet? Ziel und Port richtig?</div></section>
</body></html>`;

const scormCss = `:root{--ink:#17212b;--teal:#0d4052;--mint:#dff1ef;--gold:#e5b84b;--paper:#f7faf9}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.5 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}header{background:var(--teal);color:white;padding:24px 5vw;position:sticky;top:0;z-index:2}header h1{margin:0;font-size:clamp(24px,4vw,40px)}header p{margin:4px 0 0;opacity:.85}.shell{display:grid;grid-template-columns:260px 1fr;max-width:1260px;margin:auto}.nav{padding:24px 16px;border-right:1px solid #d6e2e3;min-height:calc(100vh - 100px);position:sticky;top:100px;align-self:start}.nav button{display:block;width:100%;text-align:left;border:0;background:transparent;padding:10px 12px;border-radius:8px;cursor:pointer;color:var(--ink)}.nav button.active{background:var(--mint);font-weight:700;color:var(--teal)}main{padding:34px 5vw 90px;max-width:900px}.eyebrow{color:#7a5a04;text-transform:uppercase;letter-spacing:.09em;font-size:12px;font-weight:800}.goal,.callout,.task,.quiz{border-radius:12px;padding:16px 18px;margin:18px 0}.goal{background:#eaf6f6;border-left:5px solid var(--gold)}.callout{background:white;border:1px solid #b8ced0}.task{background:#fffdf5;border:1px solid #e7d28b}.task li{margin:7px 0}code{background:#edf0f1;padding:2px 5px;border-radius:4px;font-family:ui-monospace,monospace}.quiz{background:white;border:1px solid #b8ced0}.quiz h3{margin-top:0}.question{padding:10px 0;border-top:1px solid #e1eaeb}.question:first-of-type{border-top:0}.question label{display:block;padding:5px 0}.feedback{font-weight:700;margin-top:10px}.correct{color:#126b3b}.wrong{color:#a33131}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}button.primary,button.secondary{border:0;border-radius:9px;padding:11px 16px;cursor:pointer;font-weight:700}button.primary{background:var(--gold);color:#2b260f}button.secondary{background:#dcebed;color:var(--teal)}.progress{height:9px;background:#dbe7e8;border-radius:99px;overflow:hidden;margin-top:14px}.progress i{display:block;height:100%;background:var(--gold);width:0%;transition:width .2s}.hidden{display:none}.badge{display:inline-block;padding:4px 9px;border-radius:99px;background:#dff1ef;color:var(--teal);font-size:13px;font-weight:700}.note{width:100%;min-height:100px;border:1px solid #b8ced0;border-radius:8px;padding:10px;font:inherit}.diagram{display:flex;justify-content:center;align-items:center;gap:14px;margin:22px 0}.device{border:2px solid var(--teal);border-radius:10px;padding:12px 18px;font-weight:800;background:white;text-align:center}.device.accent{background:var(--mint)}.arrow{font-size:26px;color:#b57900}.result{padding:12px;border-radius:8px;background:#f5f0dc;margin-top:12px}.muted{color:#63747d}@media(max-width:760px){.shell{display:block}.nav{position:static;min-height:0;border-right:0;border-bottom:1px solid #d6e2e3;display:flex;overflow:auto;gap:5px}.nav button{min-width:145px}.main{padding:24px}.nav button{font-size:13px}}
`;

const scormJs = `const api=findAPI();let state={done:[],scores:{}};try{state=JSON.parse(localStorage.getItem('filiuspad-scorm-state')||'null')||state}catch{}let current=0;function findAPI(){let w=window;for(let i=0;i<8&&w;i++,w=w.parent){if(w.API)return w.API}return null}function scormSet(n,v){if(api){api.LMSSetValue(n,String(v));api.LMSCommit('')}}function save(){localStorage.setItem('filiuspad-scorm-state',JSON.stringify(state));scormSet('cmi.core.lesson_status',state.done.length===MODULES.length?'completed':'incomplete');scormSet('cmi.core.score.raw',Math.round(state.done.length/MODULES.length*100));const progress=document.querySelector('#progress');if(progress)progress.style.width=(state.done.length/MODULES.length*100)+'%';}function renderNav(){const n=document.querySelector('.nav');n.innerHTML=MODULES.map((m,i)=>'<button data-i="'+i+'" class="'+(i===current?'active':'')+'">'+m.number+'. '+m.title+'</button>').join('');n.querySelectorAll('button').forEach(b=>b.onclick=()=>show(Number(b.dataset.i)))}function show(i){current=i;const m=MODULES[i];document.querySelector('#content').innerHTML='<div class="eyebrow">Modul '+m.number+' · selbstständig</div><h2>'+m.title+'</h2><p class="goal"><strong>Lernziel:</strong> '+m.goal+'</p><div class="callout"><strong>Fachidee</strong><br>'+m.concept+'</div><h3>Aufgabe</h3><div class="task"><ol>'+m.steps.map(s=>'<li>'+s+'</li>').join('')+'</ol></div><div class="diagram"><div class="device">Quelle</div><div class="arrow">→</div><div class="device accent">Ziel / Dienst</div></div><h3>Dein Nachweis</h3><p>'+m.deliverable+'</p><textarea class="note" id="note" placeholder="Notiere hier deine Beobachtung …"></textarea><div class="quiz"><h3>Mini-Check</h3>'+m.questions.map((q,qi)=>'<div class="question"><strong>'+(qi+1)+'. '+q[0]+'</strong>'+[q[1],q[2]].map((a,ai)=>'<label><input type="radio" name="q'+qi+'" value="'+ai+'"> '+a+'</label>').join('')+'</div>').join('')+'<button class="primary" id="check">Antworten prüfen</button><div id="feedback" class="feedback"></div></div><div class="actions"><button class="secondary" id="back" '+(i===0?'disabled':'')+'>← Zurück</button><button class="primary" id="next">'+(i===MODULES.length-1?'Lernpfad abschließen':'Nächstes Modul →')+'</button></div><p class="muted"><span class="badge">'+(state.done.includes(m.id)?'Erledigt':'Noch offen')+'</span> &nbsp; Bearbeite die Aufgabe auf dem iPad und speichere deine Projektdatei.</p>';document.querySelector('#note').value=localStorage.getItem('filiuspad-note-'+m.id)||'';document.querySelector('#note').oninput=e=>localStorage.setItem('filiuspad-note-'+m.id,e.target.value);document.querySelector('#check').onclick=()=>{let score=0;m.questions.forEach((_,qi)=>{if(document.querySelector('input[name="q'+qi+'"]:checked')?.value==='0')score++});state.scores[m.id]=score;const fb=document.querySelector('#feedback');fb.textContent=score===m.questions.length?'Richtig — Modul abgeschlossen.':'Noch einmal nachdenken: Lies die Fachidee und prüfe deine Beobachtung.';fb.className='feedback '+(score===m.questions.length?'correct':'wrong');if(score===m.questions.length&&!state.done.includes(m.id))state.done.push(m.id);save();renderNav();const badge=document.querySelector('.badge');if(badge)badge.textContent=state.done.includes(m.id)?'Erledigt':'Noch offen';};document.querySelector('#back').onclick=()=>show(i-1);document.querySelector('#next').onclick=()=>{if(!state.done.includes(m.id)){const fb=document.querySelector('#feedback');fb.textContent='Bitte beantworte den Mini-Check vollständig richtig, bevor du weitergehst.';fb.className='feedback wrong';return}show(Math.min(i+1,MODULES.length-1));};renderNav();document.querySelector('#progress').style.width=(state.done.length/MODULES.length*100)+'%'}function start(){if(api){api.LMSInitialize('');scormSet('cmi.core.lesson_status','incomplete');scormSet('cmi.core.score.min','0');scormSet('cmi.core.score.max','100')}show(0);window.addEventListener('beforeunload',()=>{save();if(api)api.LMSFinish('')})}start();`;

const scormManifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="filiuspad-learning-path" version="1.0" xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2" xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_v1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 http://www.imsglobal.org/xsd/imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 http://www.adlnet.org/xsd/adlcp_rootv1p2.xsd">
  <metadata><schema>ADL SCORM</schema><schemaversion>1.2</schemaversion></metadata>
  <organizations default="filiuspad-path"><organization identifier="filiuspad-path" structure="hierarchical"><title>FiliusPad: Rechnernetze selbst erkunden</title><item identifier="filiuspad-sco" identifierref="filiuspad-resource"><title>Selbstständiger Lernpfad</title><adlcp:masteryscore>70</adlcp:masteryscore></item></organization></organizations>
  <resources><resource identifier="filiuspad-resource" type="webcontent" adlcp:scormtype="sco" href="index.html"><file href="index.html"/><file href="styles.css"/><file href="scorm.js"/><file href="README.txt"/></resource></resources>
</manifest>`;

const scormHtml = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FiliusPad Lernpfad</title><link rel="stylesheet" href="styles.css"><script>const MODULES=${JSON.stringify(modules)};</script></head><body><header><h1>FiliusPad: Rechnernetze selbst erkunden</h1><p>Selbstständiger Lernpfad für Klasse 8 · Bearbeitung auf dem iPad</p><div class="progress"><i id="progress"></i></div></header><div class="shell"><nav class="nav" aria-label="Module"></nav><main id="content"></main></div><script src="scorm.js"></script></body></html>`;

const readme = `FiliusPad Lernpfad – SCORM 1.2\n\nImportiere dieses ZIP in Moodle als Aktivität „SCORM-Lernpaket“. Der Lernpfad setzt FiliusPad auf einem iPad voraus. Die Schülerinnen und Schüler arbeiten die neun Module in der Seitenleiste durch, bearbeiten die Aufgaben in der App und bestehen pro Modul den Mini-Check. Nach vollständiger Bearbeitung meldet das Paket den Status „completed“ und einen Fortschritt von 100 %.\n\nDie SCORM-Datei enthält keine externen Videos, Tracking-Dienste oder personenbezogenen Beispieldaten. Notizen bleiben lokal im Browser und werden zusätzlich – sofern Moodle die SCORM-API bereitstellt – als Abschlussstatus und Rohwert übergeben.\n`;

const curriculum = `# FiliusPad: Rechnernetze selbst erkunden\n\n## Zweck\n\nDieses Material adaptiert die Lernidee des vorhandenen FILIUS-Workshops für Filius on iPad. Es richtet sich an absolute Anfängerinnen und Anfänger in Klasse 8 und funktioniert ohne externe Videos oder QR-Codes. Die Lernenden bauen eine Topologie, beobachten den Datenaustausch und erklären ihre Entscheidungen.\n\n## Lernziele\n\nNach Abschluss können Lernende:\n\n- ein direktes Peer-to-Peer-Netz und ein LAN mit Switch aufbauen;\n- IPv4-Adresse, Subnetzmaske und Gateway unterscheiden;\n- einen Ping als Test und als Paketfolge deuten;\n- Client, Serverprogramm, Port und Protokoll erklären;\n- zwei Netze mit einem Router verbinden;\n- einen Webserver und Browser als Dienst und Client einsetzen;\n- mit einem lokalen DNS-Namen eine IP-Adresse auflösen;\n- DHCP und paketorientierte Übertragung einordnen;\n- eine Netzstörung systematisch untersuchen und dokumentieren.\n\n## Ablauf\n\n| Modul | Thema | Richtwert | Nachweis |\n|---:|---|---:|---|\n| 0 | Startklar und Arbeitsweise | 20 min | gespeicherte Datei, Modusvergleich |\n| 1 | Zwei Rechner direkt verbinden | 45 min | Ping und Paketbeobachtung |\n| 2 | Switch und LAN | 45 min | Topologie und Begriffe |\n| 3 | Client-Server und Echo | 45 min | Anfrage/Antwort mit Port |\n| 4 | Router und Gateway | 60 min | Ping vor/nach Gateway |\n| 5 | Webserver und Browser | 60 min | lokale HTML-Seite |\n| 6 | DNS | 60 min | Name-zu-IP-Auflösung |\n| 7 | DHCP und Pakete | 45 min | Paketprotokoll und Diagnose |\n| 8 | Abschlussprojekt | 90 min | funktionsfähiges Mini-Internet |\n\n## Übertragungsprinzipien\n\nDie fachliche Progression ist aus dem vorhandenen Workshop übernommen, die Arbeitsaufträge sind für die native iPad-Oberfläche neu formuliert. Desktop-spezifische Menüs, Windows-Befehle und externe Video-Links wurden nicht vorausgesetzt. Die Lernenden sollen stets zuerst eine Vermutung aufstellen, dann im Simulator beobachten und schließlich mit Fachbegriffen erklären.\n`;

const teacherGuide = `# Lehrkraft-Handreichung\n\n## Zielgruppe und Voraussetzungen\n\nKlasse 8 oder vergleichbarer Einstieg in Rechnernetze. Die Lernenden benötigen ein iPad mit FiliusPad, können Apps installieren und Dateien in einem Kursordner speichern. Vorkenntnisse zu IP-Adressen sind hilfreich, aber nicht erforderlich.\n\n## Organisation\n\n- **Selbstlernzeit:** etwa 6–8 Unterrichtsstunden à 45 Minuten.\n- **Sozialform:** Einzelarbeit, anschließend kurze Partnererklärung.\n- **Abgabe:** pro Modul eine .fls-Datei oder ein zusammengeführtes Abschlussprojekt plus Lernheft.\n- **Dateinamen:** JJMMTT-Aufgabe-Name.fls.\n- **Moodle:** das beiliegende SCORM-1.2-Paket als eine Aktivität importieren; die mitgelieferte Fragenbank ist optional.\n\n## Erwartungshorizont in Kurzform\n\n| Modul | Erwartete Beobachtung |\n|---:|---|\n| 0 | Entwurf konfiguriert; Aktion simuliert und startet Software. |\n| 1 | Ping im selben Netz gelingt; die Paketansicht zeigt Adressauflösung und Echo-Nachrichten. |\n| 2 | Switch verbindet mehrere Geräte; Broadcast und gelernte Zielrichtung werden unterschieden. |\n| 3 | Client sendet an einen Port; Echo-Server antwortet mit derselben Nachricht. |\n| 4 | Ping in fremdes Netz scheitert ohne Gateway und gelingt nach korrekter Gateway-Konfiguration. |\n| 5 | Browser fragt HTTP-Inhalt an; Webserver liefert HTML. |\n| 6 | DNS-Name wird auf die Webserver-IP aufgelöst; direkter IP-Aufruf dient als Kontrolltest. |\n| 7 | DHCP liefert eine zeitweise Konfiguration; Paketzeilen liefern Hinweise zur Fehlerdiagnose. |\n| 8 | Lernende können Name → IP → Gateway/Router → Zielnetz → Dienst → Antwort erklären. |\n\n## Bewertungsraster (20 Punkte)\n\n- 4 Punkte: Topologie und Verkabelung vollständig und lesbar\n- 4 Punkte: Adressplan mit Maske, Gateways und DNS korrekt\n- 4 Punkte: drei reproduzierbare Funktionstests dokumentiert\n- 4 Punkte: Paketbeobachtung fachlich sinnvoll erklärt\n- 4 Punkte: Fehlerfall, Reflexion und sichere Dateiabgabe\n\n## Typische Hilfen\n\n1. **Ping scheitert im gleichen LAN:** Simulation gestartet? Kabel wirklich verbunden? IPs im selben Netz? Tippfehler?\n2. **Ping scheitert zwischen LANs:** Router-Schnittstellen und Standardgateways prüfen.\n3. **IP-Aufruf funktioniert, Name nicht:** DNS-Adresse an den Clients und DNS-Eintrag prüfen.\n4. **Browser zeigt nichts:** Webserver gestartet? Richtiger Host und HTTP-Adresse?\n5. **Echo antwortet nicht:** Dienst läuft? Port 55555 und Ziel-IP stimmen?\n\n## Moodle-Kursaufbau\n\nDas SCORM-Paket ist der selbstständige Lernpfad. Lege zusätzlich Aufgaben oder Foren für die .fls-Abgaben an. Empfohlene Einstellungen: ein Versuch, Bewertung nach dem SCORM-Rohwert, Bestehensgrenze 70 %, Abschluss bei SCORM-Status „completed“. Die Lernenden benötigen Zugriff auf die App; die HTML-Lernoberfläche selbst enthält keine vertraulichen Daten oder externen Tracking-Dienste.\n\n## Rechtlicher und didaktischer Hinweis\n\nDieses Material ist eine eigenständige iPad-Adaption der Unterrichtsidee. Vor öffentlicher Weitergabe müssen Lizenz, Namens-/Logo-Nutzung und Rechte an übernommenen Filius-Komponenten geklärt sein. Die Lernziele und Aufgabenformulierungen in diesem Paket wurden neu erstellt.\n`;

await mkdir(scormRoot, { recursive: true });
await mkdir(join(root, "source"), { recursive: true });
await mkdir(publicRoot, { recursive: true });
await writeFile(join(root, "source", "curriculum.md"), curriculum);
await writeFile(join(root, "source", "teacher-guide.md"), teacherGuide);
await writeFile(join(root, "source", "workbook.html"), workbookHtml);
await writeFile(join(root, "scorm", "index.html"), scormHtml);
await writeFile(join(root, "scorm", "styles.css"), scormCss);
await writeFile(join(root, "scorm", "scorm.js"), scormJs);
await writeFile(join(root, "scorm", "imsmanifest.xml"), scormManifest);
await writeFile(join(root, "scorm", "README.txt"), readme);
await writeFile(
  join(root, "README.md"),
  `# FiliusPad Lernmaterial\n\nDieses Paket enthält ein druckbares Lernheft und einen selbstständigen Moodle-Lernpfad für Filius on iPad.\n\n- [Curriculum und Ablauf](source/curriculum.md)\n- [Handreichung für Lehrkräfte](source/teacher-guide.md)\n- [Moodle-Integration und Fragenbank](moodle/README.md)\n- [SCORM-1.2-Importhinweise](scorm/README.txt)\n- source/workbook.html ist die druckbare Quelle für das PDF.\n\nDie erzeugten Dateien liegen nach dem Build unter public/learning/.\n`,
);

const workbookSource = await readFile(
  join(root, "source", "workbook.html"),
  "utf8",
);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1600 },
  });
  await page.setContent(workbookSource, { waitUntil: "load" });
  await page.pdf({
    path: join(publicRoot, "FiliusPad-Lernheft.pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });
} finally {
  await browser.close();
}

const scormArchive = join(publicRoot, "FiliusPad-Lernpfad-SCORM-1.2.zip");
await rm(scormArchive, { force: true });
await execFileAsync("/usr/bin/zip", [
  "-qrj",
  scormArchive,
  join(scormRoot, "imsmanifest.xml"),
  join(scormRoot, "index.html"),
  join(scormRoot, "styles.css"),
  join(scormRoot, "scorm.js"),
  join(scormRoot, "README.txt"),
]);

const questionBank = join(root, "moodle", "filiuspad-question-bank.xml");
try {
  await copyFile(
    questionBank,
    join(publicRoot, "FiliusPad-Fragenbank-Moodle.xml"),
  );
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const landingHtml = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FiliusPad Lernmaterial</title><style>body{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.5;margin:0;background:#f7faf9;color:#17212b}.wrap{max-width:920px;margin:0 auto;padding:56px 24px}h1{font-size:42px;line-height:1.05;color:#0d4052}.card{background:white;border:1px solid #c9dadd;border-radius:16px;padding:20px;margin:16px 0}.downloads{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}a.button{display:inline-block;border-radius:10px;background:#e5b84b;color:#211b04;text-decoration:none;font-weight:800;padding:12px 16px}.muted{color:#61717a}</style></head><body><main class="wrap"><p class="muted">Filius on iPad · Unterrichtsmaterial</p><h1>Rechnernetze selbst erkunden</h1><p>Ein selbstständiger Workshop für Klasse 8: bauen, beobachten und erklären.</p><section class="downloads"><article class="card"><h2>Lernheft als PDF</h2><p>Druckbares Arbeitsheft mit Modulen, Nachweisfeldern und Glossar.</p><a class="button" href="./FiliusPad-Lernheft.pdf">PDF öffnen</a></article><article class="card"><h2>Moodle-Lernpfad</h2><p>SCORM-1.2-Paket für den selbstständigen Lernpfad mit Mini-Checks.</p><a class="button" href="./FiliusPad-Lernpfad-SCORM-1.2.zip">SCORM-ZIP herunterladen</a></article><article class="card"><h2>Fragenbank</h2><p>Optionale Moodle-XML-Fragen für Wiederholung oder Abschlussquiz.</p><a class="button" href="./FiliusPad-Fragenbank-Moodle.xml">Moodle-XML herunterladen</a></article></section><p class="muted">Die fachliche Arbeit findet in FiliusPad auf dem iPad statt. Das Material enthält keine externen Videos oder Tracking-Dienste.</p></main></body></html>`;
await writeFile(join(publicRoot, "index.html"), landingHtml);

await execFileAsync(process.execPath, [
  join(process.cwd(), "node_modules", "prettier", "bin", "prettier.cjs"),
  "--write",
  join(root, "README.md"),
  join(root, "moodle", "README.md"),
  join(root, "scorm", "index.html"),
  join(root, "scorm", "styles.css"),
  join(root, "scorm", "scorm.js"),
  join(root, "source", "curriculum.md"),
  join(root, "source", "teacher-guide.md"),
  join(root, "source", "workbook.html"),
  join(publicRoot, "index.html"),
]);

console.log(
  `Generated ${modules.length} modules, PDF, SCORM archive, and Moodle assets at ${publicRoot}`,
);
