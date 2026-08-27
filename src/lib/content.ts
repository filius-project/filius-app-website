import type { Locale, NavKey } from "../config";

type QuickStep = { title: string; body: string; result: string };
type Faq = { question: string; answer: string };
type RepositoryKey = "appUrl" | "javaUrl" | "websiteUrl";
export type TrustSection = {
  title: string;
  body: string;
  links?: Array<{ label: string; repository: RepositoryKey }>;
};

type SiteCopy = {
  languageName: string;
  meta: { homeTitle: string; homeDescription: string };
  nav: Record<NavKey, string>;
  common: {
    appStoreSoon: string;
    appStoreAvailable: string;
    readQuickstart: string;
    readDocs: string;
    learnMore: string;
    supportEmail: string;
    preRelease: string;
  };
  hero: { eyebrow: string; title: string; body: string; compatibility: string };
  workflow: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ number: string; title: string; body: string }>;
  };
  classroom: { eyebrow: string; title: string; body: string; points: string[] };
  features: {
    eyebrow: string;
    title: string;
    body: string;
    nodes: Array<{ title: string; body: string }>;
  };
  compatibility: { eyebrow: string; title: string; body: string; note: string };
  source: {
    eyebrow: string;
    title: string;
    body: string;
    appLink: string;
    javaLink: string;
  };
  finalCta: { title: string; body: string };
  quickstart: {
    title: string;
    intro: string;
    before: string[];
    steps: QuickStep[];
    doneTitle: string;
    doneBody: string;
  };
  faq: { title: string; intro: string; items: Faq[] };
  support: {
    title: string;
    intro: string;
    emailTitle: string;
    emailBody: string;
    checklistTitle: string;
    checklist: string[];
  };
  privacy: {
    title: string;
    intro: string;
    sections: Array<{ title: string; body: string }>;
  };
  imprint: { title: string; intro: string; body: string };
  accessibility: {
    title: string;
    intro: string;
    sections: Array<{ title: string; body: string }>;
  };
  licenses: {
    title: string;
    intro: string;
    sections: TrustSection[];
  };
  footer: { tagline: string; original: string; rights: string };
};

export const copy: Record<Locale, SiteCopy> = {
  de: {
    languageName: "Deutsch",
    meta: {
      homeTitle: "Filius on iPad – Netzwerke auf dem iPad verstehen",
      homeDescription:
        "Netzwerke entwerfen, konfigurieren und simulieren – nativ auf dem iPad und kompatibel mit FILIUS-Projekten.",
    },
    nav: {
      overview: "Überblick",
      quickstart: "Schnellstart",
      docs: "Dokumentation",
      news: "Neuigkeiten",
      faq: "FAQ",
      support: "Support",
    },
    common: {
      appStoreSoon: "Demnächst im App Store",
      appStoreAvailable: "Im App Store laden",
      readQuickstart: "Schnellstart öffnen",
      readDocs: "Dokumentation lesen",
      learnMore: "Mehr erfahren",
      supportEmail: "Support per E-Mail",
      preRelease: "Vorabversion",
    },
    hero: {
      eyebrow: "Netzwerksimulation für das iPad",
      title: "Netzwerke bauen. Verstehen, was passiert.",
      body: "Filius on iPad bringt Entwurf, Konfiguration und Simulation von Rechnernetzen in eine native, berührungsfreundliche iPad-App. Für Unterricht, Demonstrationen und kontrollierte Experimente.",
      compatibility:
        "Für iPad · ab iPadOS 17 · öffnet und speichert kompatible .fls-Projekte",
    },
    workflow: {
      eyebrow: "Ein Lernweg, drei Modi",
      title: "Vom Kabel bis zum Paket",
      body: "Die Oberfläche folgt dem Lernprozess: erst planen, dann konfigurieren, anschließend beobachten.",
      items: [
        {
          number: "01",
          title: "Entwerfen",
          body: "Geräte platzieren, Kabel ziehen und eine übersichtliche Topologie aufbauen.",
        },
        {
          number: "02",
          title: "Konfigurieren",
          body: "IP-Adressen, Routen, Dienste und Anwendungen direkt am Gerät einrichten.",
        },
        {
          number: "03",
          title: "Simulieren",
          body: "Verkehr auslösen, Pakete untersuchen und die Wirkung jeder Entscheidung nachvollziehen.",
        },
      ],
    },
    classroom: {
      eyebrow: "Für den Unterricht gebaut",
      title: "Komplexe Netzwerke werden greifbar.",
      body: "Filius on iPad verbindet die bekannte FILIUS-Idee mit einer iPad-gerechten Arbeitsweise.",
      points: [
        "Native iPad-Bedienung mit Touch, Tastatur und Split View",
        "Deutsch, Englisch und Französisch",
        "Speichern, Öffnen und Austauschen von .fls-Projekten",
        "Klare Dokumentation von Funktionen und Grenzen",
      ],
    },
    features: {
      eyebrow: "Das Netzwerk-Labor",
      title: "Mehr als ein Topologie-Editor",
      body: "Eine kompakte Lernumgebung für Protokolle, Dienste und Anwendungen.",
      nodes: [
        { title: "Routing", body: "Statische Routen und RIP" },
        { title: "Adressierung", body: "IPv4, ARP und DHCP" },
        { title: "Dienste", body: "DNS, Web und E-Mail" },
        { title: "Transport", body: "ICMP, UDP und TCP" },
        { title: "Analyse", body: "Pakete, Tabellen und Diagnosen" },
        { title: "Dateien", body: ".fls importieren und exportieren" },
      ],
    },
    compatibility: {
      eyebrow: "Ehrliche Kompatibilität",
      title: "Für bestehende FILIUS-Projekte – mit dokumentierten Grenzen.",
      body: "Bekannte Projektinhalte bleiben editierbar. Unbekannte Desktop-Inhalte werden innerhalb klarer Sicherheitsgrenzen erhalten, damit ein erneutes Speichern nicht unnötig Daten zerstört.",
      note: "Beliebige Java-Anwendungen aus dem Software-Assistenten der Desktop-Version können auf dem iPad nicht ausgeführt werden. Der native Protokoll-Baukasten ist experimentell und standardmäßig deaktiviert.",
    },
    source: {
      eyebrow: "Offen und nachvollziehbar",
      title: "Quellcode mit sauberer Herkunft.",
      body: "Der Quellcode von Filius on iPad ist öffentlich auf GitHub verfügbar. Die ursprüngliche Java-Version von FILIUS wird separat im offiziellen GitLab-Repository gepflegt.",
      appLink: "Filius on iPad auf GitHub",
      javaLink: "Java-FILIUS auf GitLab",
    },
    finalCta: {
      title: "Das erste Netzwerk dauert nur wenige Minuten.",
      body: "Zwei Geräte, ein Kabel, zwei Adressen und ein Ping: Der Schnellstart führt Schritt für Schritt zum ersten Erfolg.",
    },
    quickstart: {
      title: "Schnellstart: Dein erstes Netzwerk",
      intro:
        "In sieben kurzen Schritten baust du eine direkte Verbindung zwischen zwei Rechnern und testest sie mit ping.",
      before: [
        "Filius on iPad auf einem iPad mit iPadOS 17 oder neuer",
        "Etwa fünf bis zehn Minuten Zeit",
        "Keine Internetverbindung für die Simulation erforderlich – endgültige Datenschutzaussage vor Release prüfen",
      ],
      steps: [
        {
          title: "Neues Projekt anlegen",
          body: "Öffne Filius on iPad und wähle „Neu“. Du startest auf einer leeren Arbeitsfläche im Entwurfsmodus.",
          result: "Eine leere Topologie ist sichtbar.",
        },
        {
          title: "Zwei Rechner platzieren",
          body: "Ziehe zwei PCs oder Notebooks aus der Gerätepalette auf die Arbeitsfläche.",
          result: "Beide Geräte stehen mit etwas Abstand nebeneinander.",
        },
        {
          title: "Geräte verbinden",
          body: "Wähle das Kabelwerkzeug und tippe nacheinander auf beide Geräte.",
          result: "Eine direkte Kabelverbindung verbindet beide Geräte.",
        },
        {
          title: "IP-Adressen vergeben",
          body: "Öffne die Eigenschaften des ersten Geräts und setze 192.168.1.10/24. Verwende am zweiten Gerät 192.168.1.20/24.",
          result: "Beide Geräte liegen im selben IPv4-Netz.",
        },
        {
          title: "Simulation starten",
          body: "Wechsle in den Aktionsmodus und starte die Simulation.",
          result: "Die virtuellen Geräte und Anwendungen werden verfügbar.",
        },
        {
          title: "Ping ausführen",
          body: "Öffne auf 192.168.1.10 die Kommandozeile und führe „ping 192.168.1.20“ aus.",
          result:
            "Antworten des zweiten Geräts erscheinen in der Kommandozeile.",
        },
        {
          title: "Ergebnis prüfen und speichern",
          body: "Öffne bei Bedarf die Paketansicht. Speichere das Projekt anschließend als .fls-Datei.",
          result:
            "Das funktionierende Netzwerk kann später wieder geöffnet werden.",
        },
      ],
      doneTitle: "Geschafft: Das erste Paket ist angekommen.",
      doneBody:
        "Als Nächstes kannst du einen Switch ergänzen, DHCP aktivieren oder einen Webserver installieren.",
    },
    faq: {
      title: "Häufige Fragen",
      intro:
        "Kurze Antworten zu Plattform, Kompatibilität, Datenschutz und Support.",
      items: [
        {
          question: "Was ist Filius on iPad?",
          answer:
            "Filius on iPad ist eine native iPad-App zum Entwerfen, Konfigurieren und Simulieren von Rechnernetzen. Sie orientiert sich am Lernansatz von FILIUS.",
        },
        {
          question: "Ist Filius on iPad die Desktop-Version von FILIUS?",
          answer:
            "Nein. Filius on iPad ist eine eigenständige iPad-Implementierung mit kompatiblen Projektabläufen. Die genaue Beziehung und Attribution werden vor Veröffentlichung rechtlich freigegeben.",
        },
        {
          question: "Welche Geräte werden unterstützt?",
          answer:
            "Die aktuelle Konfiguration zielt auf iPads mit iPadOS 17 oder neuer. Die finale App-Store-Angabe muss mit dem veröffentlichten Build übereinstimmen.",
        },
        {
          question: "Kann ich .fls-Dateien öffnen und speichern?",
          answer:
            "Ja. Bekannte Inhalte können importiert, bearbeitet und wieder gespeichert werden. Für unbekannte Desktop-Inhalte gilt ein begrenzter Erhaltungsvertrag.",
        },
        {
          question: "Welche Desktop-Funktionen fehlen?",
          answer:
            "Beliebige Java-Anwendungen aus dem Desktop-Software-Assistenten laufen nicht auf iPadOS. Der native Protokoll-Baukasten ist experimentell.",
        },
        {
          question: "Benötigt die Simulation Internetzugang?",
          answer:
            "Die simulierten Netzwerke laufen lokal auf dem iPad. Für die Übung ist kein externer Internetzugang erforderlich.",
        },
        {
          question: "Werden Daten gesammelt?",
          answer:
            "Optionale, selbst gehostete Reichweitenmessung wird erst nach ausdrücklicher Zustimmung geladen. Ablehnen ist gleichwertig möglich; Werbung und seitenübergreifende Profile sind nicht vorgesehen.",
        },
        {
          question: "Wie verteile ich ein Projekt an Lernende?",
          answer:
            "Speichere das Projekt als .fls-Datei und teile es über die üblichen iPad-Datei- und Freigabefunktionen. Prüfe vorher, dass nur synthetische Unterrichtsdaten enthalten sind.",
        },
        {
          question: "Wo melde ich einen Fehler?",
          answer:
            "Nutze die Support-E-Mail und beschreibe App-Version, iPadOS-Version, Schritte und erwartetes Ergebnis. Sende sensible Projektdateien erst nach Rückfrage.",
        },
        {
          question: "Ist der Quellcode öffentlich?",
          answer:
            "Ja. Filius on iPad ist auf GitHub öffentlich; der Quellcode des ursprünglichen Java-FILIUS wird separat auf GitLab gepflegt.",
        },
      ],
    },
    support: {
      title: "Support",
      intro:
        "Beschreibe das Problem so, dass es ohne Zugriff auf dein iPad nachvollzogen werden kann.",
      emailTitle: "Direkter Kontakt",
      emailBody:
        "Schreibe an support@filius.app, wenn du lieber dein eigenes E-Mail-Programm verwendest oder Dateien nach Rückfrage übermitteln möchtest.",
      checklistTitle: "Bitte mitschicken",
      checklist: [
        "Filius on iPad-Version",
        "iPadOS-Version und iPad-Modell",
        "Kurze Schritte zum Reproduzieren",
        "Erwartetes und tatsächliches Ergebnis",
        "Nur nach Rückfrage: eine bereinigte .fls-Datei oder ein Screenshot",
      ],
    },
    privacy: {
      title: "Datenschutz",
      intro:
        "Informationen zu Websitebetrieb, optionaler Reichweitenmessung, Einwilligung und Support.",
      sections: [
        {
          title: "Website",
          body: "Technisch notwendige Serverprotokolle sichern den Betrieb. Optionale Reichweitenmessung wird nur nach Einwilligung geladen.",
        },
        {
          title: "Support",
          body: "Das Kontaktformular übermittelt erforderliche Angaben ohne eigene Datenbank an das konfigurierte Supportpostfach. Direkte E-Mail bleibt als Alternative verfügbar; Löschung, Rechtsgrundlage und Missbrauchsschutz sind in der Datenschutzerklärung beschrieben.",
        },
        {
          title: "App",
          body: "Aussagen zur Datenerhebung der App werden anhand des signierten Release-Archivs, aller SDKs und der tatsächlichen Netzwerkpfade geprüft.",
        },
      ],
    },
    imprint: {
      title: "Impressum",
      intro: "Anbieterinformationen und Kontaktangaben für filius.app.",
      body: "Name, ladungsfähige Anschrift und aktive Kontaktadresse sind veröffentlicht. Die Angaben entsprechen dem bestätigten Betrieb von filius.app.",
    },
    accessibility: {
      title: "Barrierefreiheit",
      intro: "Filius.app wird mit WCAG 2.2 AA als Ziel entwickelt.",
      sections: [
        {
          title: "Umfang",
          body: "Geprüft werden Tastaturbedienung, VoiceOver, Kontrast, Fokus, Vergrößerung, reduzierte Bewegung, Touch-Ziele und verständliche Struktur.",
        },
        {
          title: "Bekannte Grenzen",
          body: "Die Website befindet sich im Aufbau. Eine formelle Prüfung und eine Liste verbleibender Einschränkungen folgen vor Veröffentlichung.",
        },
        {
          title: "Feedback",
          body: "Barrieren können über support@filius.app gemeldet werden. Bitte nenne Seite, Browser, Hilfsmittel und die beobachtete Schwierigkeit.",
        },
      ],
    },
    licenses: {
      title: "Lizenzen und Herkunft",
      intro:
        "Öffentliche Quellen, Lizenzgrundlagen und Herkunft der verwendeten Bestandteile.",
      sections: [
        {
          title: "Filius on iPad",
          body: "Der Quellcode von Filius on iPad ist öffentlich verfügbar. GPLv2 oder GPLv3 gilt zusammen mit der privat aufbewahrten Apple-Plattform-Zusatzgenehmigung; das Repository veröffentlicht dafür einen SHA-256-Nachweis.",
          links: [{ label: "Filius on iPad auf GitHub", repository: "appUrl" }],
        },
        {
          title: "FILIUS",
          body: "Die ursprüngliche Java-Lernsoftware FILIUS und ihre Materialien werden vom ursprünglichen Projekt separat gepflegt. Filius on iPad wird unabhängig entwickelt und unterstützt das Java-Projektformat.",
          links: [{ label: "Java-FILIUS auf GitLab", repository: "javaUrl" }],
        },
        {
          title: "Website-Assets",
          body: "App-Icon und Produktscreenshot stammen aus dem Filius on iPad-Projekt. Die übrigen Website-Grafiken werden als eigenständige CSS- und Vektorillustrationen gepflegt.",
          links: [
            { label: "Website-Quellcode auf GitHub", repository: "websiteUrl" },
          ],
        },
        {
          title: "Schriften und Frameworks",
          body: "Astro, Starlight und die selbst gehosteten Schriften behalten ihre jeweiligen Open-Source-Lizenzen. Die zugehörigen Paketmetadaten und Upstream-Lizenztexte bleiben maßgeblich.",
        },
      ],
    },
    footer: {
      tagline: "Netzwerke auf dem iPad entwerfen, konfigurieren und verstehen.",
      original: "Mit Anerkennung des ursprünglichen FILIUS-Projekts.",
      rights: "Filius on iPad wird unabhängig gepflegt.",
    },
  },
  en: {
    languageName: "English",
    meta: {
      homeTitle: "Filius on iPad – Understand networks on iPad",
      homeDescription:
        "Design, configure, and simulate networks natively on iPad with compatible FILIUS project workflows.",
    },
    nav: {
      overview: "Overview",
      quickstart: "Quick start",
      docs: "Documentation",
      news: "News",
      faq: "FAQ",
      support: "Support",
    },
    common: {
      appStoreSoon: "Coming soon to the App Store",
      appStoreAvailable: "Download on the App Store",
      readQuickstart: "Open quick start",
      readDocs: "Read documentation",
      learnMore: "Learn more",
      supportEmail: "Email support",
      preRelease: "Preview",
    },
    hero: {
      eyebrow: "Network simulation for iPad",
      title: "Build networks. Understand what happens.",
      body: "Filius on iPad brings network design, configuration, and simulation to a native, touch-oriented iPad app for lessons, demonstrations, and controlled experiments.",
      compatibility:
        "For iPad · iPadOS 17 or later · opens and saves compatible .fls projects",
    },
    workflow: {
      eyebrow: "One learning path, three modes",
      title: "From cable to packet",
      body: "The interface follows the learning process: plan first, configure next, then observe.",
      items: [
        {
          number: "01",
          title: "Design",
          body: "Place devices, draw cables, and build a clear topology.",
        },
        {
          number: "02",
          title: "Configure",
          body: "Set addresses, routes, services, and applications directly on each device.",
        },
        {
          number: "03",
          title: "Simulate",
          body: "Generate traffic, inspect packets, and understand every decision.",
        },
      ],
    },
    classroom: {
      eyebrow: "Built for the classroom",
      title: "Complex networks become tangible.",
      body: "Filius on iPad combines the familiar FILIUS learning idea with an iPad-native workflow.",
      points: [
        "Native iPad interaction with touch, keyboard, and Split View",
        "German, English, and French",
        "Save, open, and exchange .fls projects",
        "Clear documentation of capabilities and limits",
      ],
    },
    features: {
      eyebrow: "The network lab",
      title: "More than a topology editor",
      body: "A compact learning environment for protocols, services, and applications.",
      nodes: [
        { title: "Routing", body: "Static routes and RIP" },
        { title: "Addressing", body: "IPv4, ARP, and DHCP" },
        { title: "Services", body: "DNS, web, and email" },
        { title: "Transport", body: "ICMP, UDP, and TCP" },
        { title: "Inspection", body: "Packets, tables, and diagnostics" },
        { title: "Files", body: "Import and export .fls projects" },
      ],
    },
    compatibility: {
      eyebrow: "Honest compatibility",
      title: "For existing FILIUS projects—with documented boundaries.",
      body: "Known project content remains editable. Unknown desktop content is preserved within explicit safety bounds so resaving does not unnecessarily destroy data.",
      note: "Arbitrary Java applications created by the desktop software wizard cannot run on iPad. The native protocol builder is experimental and disabled by default.",
    },
    source: {
      eyebrow: "Open and traceable",
      title: "Source code with clear provenance.",
      body: "The Filius on iPad source is public on GitHub. The original Java version of FILIUS is maintained separately in its official GitLab repository.",
      appLink: "Filius on iPad on GitHub",
      javaLink: "Java FILIUS on GitLab",
    },
    finalCta: {
      title: "Your first network takes only a few minutes.",
      body: "Two devices, one cable, two addresses, and one ping: the quick start leads to a visible result.",
    },
    quickstart: {
      title: "Quick start: Your first network",
      intro:
        "Build a direct connection between two computers and test it with ping in seven short steps.",
      before: [
        "Filius on iPad on an iPad running iPadOS 17 or later",
        "About five to ten minutes",
        "No external internet access is needed for the simulated exercise",
      ],
      steps: [
        {
          title: "Create a new project",
          body: "Open Filius on iPad and choose New. Start with an empty design canvas.",
          result: "An empty topology is visible.",
        },
        {
          title: "Place two computers",
          body: "Drag two PCs or notebooks from the device palette onto the canvas.",
          result: "Two devices sit apart on the canvas.",
        },
        {
          title: "Connect the devices",
          body: "Choose the cable tool and tap both devices in sequence.",
          result: "A direct cable joins them.",
        },
        {
          title: "Assign IP addresses",
          body: "Set the first device to 192.168.1.10/24 and the second to 192.168.1.20/24.",
          result: "Both devices share the same IPv4 network.",
        },
        {
          title: "Start simulation",
          body: "Switch to action mode and start the simulation.",
          result: "Virtual devices and applications become available.",
        },
        {
          title: "Run ping",
          body: "Open the terminal on 192.168.1.10 and run “ping 192.168.1.20”.",
          result: "Replies from the second device appear.",
        },
        {
          title: "Inspect and save",
          body: "Open packet inspection if useful, then save the project as an .fls file.",
          result: "The working network can be reopened later.",
        },
      ],
      doneTitle: "Done: your first packet arrived.",
      doneBody: "Next, add a switch, enable DHCP, or install a web server.",
    },
    faq: {
      title: "Frequently asked questions",
      intro:
        "Short answers about platform support, compatibility, privacy, and support.",
      items: [
        {
          question: "What is Filius on iPad?",
          answer:
            "A native iPad app for designing, configuring, and simulating computer networks, inspired by the FILIUS learning approach.",
        },
        {
          question: "Is it the desktop FILIUS application?",
          answer:
            "No. Filius on iPad is an independently maintained iPad implementation with compatible project workflows. It is not published, operated, or officially supported by the original FILIUS project.",
        },
        {
          question: "Which devices are supported?",
          answer:
            "The current target is iPad with iPadOS 17 or later. The final App Store listing must match the shipped build.",
        },
        {
          question: "Can it open and save .fls projects?",
          answer:
            "Yes. Known content can be edited and resaved; unknown desktop content follows a bounded preservation contract.",
        },
        {
          question: "Which desktop features are unavailable?",
          answer:
            "Arbitrary Java applications from the desktop software wizard cannot run on iPadOS. The native protocol builder remains experimental.",
        },
        {
          question: "Does simulation need internet access?",
          answer:
            "The simulated networks run locally on the iPad. The exercise does not require external internet access.",
        },
        {
          question: "Does it collect data?",
          answer:
            "Optional self-hosted audience measurement loads only after explicit consent. Rejecting is equally available; advertising and cross-site profiles are not used.",
        },
        {
          question: "How can teachers share projects?",
          answer:
            "Save an .fls file and share it through normal iPad file workflows. Use synthetic classroom data.",
        },
        {
          question: "How do I report a bug?",
          answer:
            "Email support with app version, iPadOS version, reproduction steps, expected result, and actual result.",
        },
        {
          question: "Is the source public?",
          answer:
            "Yes. Filius on iPad is public on GitHub; the original Java FILIUS source is maintained separately on GitLab.",
        },
      ],
    },
    support: {
      title: "Support",
      intro:
        "Describe the issue so it can be reproduced without access to your iPad.",
      emailTitle: "Direct contact",
      emailBody:
        "Email support@filius.app if you prefer your own email application or need to send files after being asked.",
      checklistTitle: "Please include",
      checklist: [
        "Filius on iPad version",
        "iPadOS version and iPad model",
        "Short reproduction steps",
        "Expected and actual result",
        "Only after request: a redacted .fls file or screenshot",
      ],
    },
    privacy: {
      title: "Privacy",
      intro:
        "Information about website operation, optional audience measurement, consent, and support.",
      sections: [
        {
          title: "Website",
          body: "Technically necessary server logs support operation. Optional audience measurement loads only after consent.",
        },
        {
          title: "Support",
          body: "The contact form relays necessary details without its own database to the configured support mailbox. Direct email remains available; deletion, legal basis, and abuse protection are described in the privacy notice.",
        },
        {
          title: "App",
          body: "App data statements will be verified against the signed release archive, included SDKs, and real network behavior.",
        },
      ],
    },
    imprint: {
      title: "Legal notice",
      intro: "Provider and contact information for filius.app.",
      body: "The provider name, service address, and active contact address are published for the confirmed operation of filius.app.",
    },
    accessibility: {
      title: "Accessibility",
      intro: "Filius.app is being developed toward WCAG 2.2 AA.",
      sections: [
        {
          title: "Scope",
          body: "Testing covers keyboard use, VoiceOver, contrast, focus, zoom, reduced motion, touch targets, and understandable structure.",
        },
        {
          title: "Known limitations",
          body: "The site is under construction. A formal review and remaining limitation list will be published before launch.",
        },
        {
          title: "Feedback",
          body: "Report barriers to support@filius.app with the page, browser, assistive technology, and observed problem.",
        },
      ],
    },
    licenses: {
      title: "Licenses and provenance",
      intro:
        "Public source repositories, licensing basis, and provenance of the components in use.",
      sections: [
        {
          title: "Filius on iPad",
          body: "The Filius on iPad source is publicly available. GPLv2 or GPLv3 applies together with the privately retained Apple-platform additional permission; the repository publishes a SHA-256 attestation for it.",
          links: [{ label: "Filius on iPad on GitHub", repository: "appUrl" }],
        },
        {
          title: "FILIUS",
          body: "The original Java FILIUS software and teaching materials are maintained separately by the original project. Filius on iPad is independently maintained and supports the Java project format.",
          links: [{ label: "Java FILIUS on GitLab", repository: "javaUrl" }],
        },
        {
          title: "Website assets",
          body: "The app icon and product screenshot come from Filius on iPad. The remaining website graphics are maintained as independent CSS and vector illustrations.",
          links: [
            { label: "Website source on GitHub", repository: "websiteUrl" },
          ],
        },
        {
          title: "Fonts and frameworks",
          body: "Astro, Starlight, and the self-hosted fonts retain their respective open-source licenses. Their package metadata and upstream license texts remain authoritative.",
        },
      ],
    },
    footer: {
      tagline: "Design, configure, and understand networks on iPad.",
      original: "With acknowledgement of the original FILIUS project.",
      rights: "Filius on iPad is independently maintained.",
    },
  },
  fr: {
    languageName: "Français",
    meta: {
      homeTitle: "Filius on iPad – Comprendre les réseaux sur iPad",
      homeDescription:
        "Concevez, configurez et simulez des réseaux nativement sur iPad avec des projets FILIUS compatibles.",
    },
    nav: {
      overview: "Aperçu",
      quickstart: "Démarrage",
      docs: "Documentation",
      news: "Actualités",
      faq: "FAQ",
      support: "Assistance",
    },
    common: {
      appStoreSoon: "Bientôt sur l’App Store",
      appStoreAvailable: "Télécharger sur l’App Store",
      readQuickstart: "Ouvrir le démarrage",
      readDocs: "Lire la documentation",
      learnMore: "En savoir plus",
      supportEmail: "Contacter l’assistance",
      preRelease: "Aperçu",
    },
    hero: {
      eyebrow: "Simulation de réseau pour iPad",
      title: "Construire des réseaux. Comprendre leur fonctionnement.",
      body: "Filius on iPad apporte la conception, la configuration et la simulation de réseaux dans une app iPad native et tactile, pour les cours, démonstrations et expériences contrôlées.",
      compatibility:
        "Pour iPad · iPadOS 17 ou version ultérieure · ouvre et enregistre des projets .fls compatibles",
    },
    workflow: {
      eyebrow: "Un parcours, trois modes",
      title: "Du câble au paquet",
      body: "L’interface suit le processus d’apprentissage : planifier, configurer, puis observer.",
      items: [
        {
          number: "01",
          title: "Concevoir",
          body: "Placez les appareils, reliez-les et construisez une topologie claire.",
        },
        {
          number: "02",
          title: "Configurer",
          body: "Définissez les adresses, routes, services et applications de chaque appareil.",
        },
        {
          number: "03",
          title: "Simuler",
          body: "Générez du trafic, inspectez les paquets et comprenez chaque décision.",
        },
      ],
    },
    classroom: {
      eyebrow: "Pensé pour la classe",
      title: "Les réseaux complexes deviennent concrets.",
      body: "Filius on iPad associe l’approche pédagogique de FILIUS à une utilisation native sur iPad.",
      points: [
        "Interaction tactile, clavier et Split View",
        "Allemand, anglais et français",
        "Ouverture, enregistrement et échange de projets .fls",
        "Documentation claire des fonctions et limites",
      ],
    },
    features: {
      eyebrow: "Le laboratoire réseau",
      title: "Plus qu’un éditeur de topologie",
      body: "Un environnement compact pour les protocoles, services et applications.",
      nodes: [
        { title: "Routage", body: "Routes statiques et RIP" },
        { title: "Adressage", body: "IPv4, ARP et DHCP" },
        { title: "Services", body: "DNS, web et e-mail" },
        { title: "Transport", body: "ICMP, UDP et TCP" },
        { title: "Analyse", body: "Paquets, tables et diagnostics" },
        { title: "Fichiers", body: "Import et export .fls" },
      ],
    },
    compatibility: {
      eyebrow: "Compatibilité transparente",
      title: "Pour les projets FILIUS existants, avec des limites documentées.",
      body: "Les contenus connus restent modifiables. Les contenus de bureau inconnus sont conservés dans des limites de sécurité explicites.",
      note: "Les applications Java arbitraires créées avec l’assistant de bureau ne fonctionnent pas sur iPad. Le générateur de protocoles natif est expérimental et désactivé par défaut.",
    },
    source: {
      eyebrow: "Ouvert et traçable",
      title: "Un code source à la provenance claire.",
      body: "Le code source de Filius on iPad est public sur GitHub. La version Java d’origine de FILIUS est maintenue séparément dans son dépôt GitLab officiel.",
      appLink: "Filius on iPad sur GitHub",
      javaLink: "FILIUS Java sur GitLab",
    },
    finalCta: {
      title: "Votre premier réseau ne prend que quelques minutes.",
      body: "Deux appareils, un câble, deux adresses et un ping : le démarrage rapide mène à un résultat visible.",
    },
    quickstart: {
      title: "Démarrage : votre premier réseau",
      intro:
        "Construisez une liaison directe entre deux ordinateurs et testez-la avec ping en sept étapes.",
      before: [
        "Filius on iPad sur un iPad avec iPadOS 17 ou ultérieur",
        "Environ cinq à dix minutes",
        "Pas d’Internet externe requis pour l’exercice simulé — déclaration finale à vérifier",
      ],
      steps: [
        {
          title: "Créer un projet",
          body: "Ouvrez Filius on iPad et choisissez Nouveau pour obtenir une zone de conception vide.",
          result: "Une topologie vide est visible.",
        },
        {
          title: "Placer deux ordinateurs",
          body: "Faites glisser deux PC ou portables depuis la palette.",
          result: "Deux appareils apparaissent sur la zone de travail.",
        },
        {
          title: "Relier les appareils",
          body: "Choisissez l’outil câble, puis touchez les deux appareils.",
          result: "Un câble direct les relie.",
        },
        {
          title: "Attribuer les adresses IP",
          body: "Configurez 192.168.1.10/24 sur le premier et 192.168.1.20/24 sur le second.",
          result: "Les deux appareils partagent le même réseau IPv4.",
        },
        {
          title: "Démarrer la simulation",
          body: "Passez en mode action et lancez la simulation.",
          result: "Les appareils et applications virtuels sont disponibles.",
        },
        {
          title: "Exécuter ping",
          body: "Ouvrez le terminal sur 192.168.1.10 et saisissez « ping 192.168.1.20 ».",
          result: "Les réponses du second appareil apparaissent.",
        },
        {
          title: "Inspecter et enregistrer",
          body: "Consultez les paquets si nécessaire, puis enregistrez le projet au format .fls.",
          result: "Le réseau fonctionnel peut être rouvert.",
        },
      ],
      doneTitle: "Terminé : le premier paquet est arrivé.",
      doneBody:
        "Ajoutez ensuite un commutateur, activez DHCP ou installez un serveur web.",
    },
    faq: {
      title: "Questions fréquentes",
      intro:
        "Réponses courtes sur la plateforme, la compatibilité, la confidentialité et l’assistance.",
      items: [
        {
          question: "Qu’est-ce que Filius on iPad ?",
          answer:
            "Une app iPad native pour concevoir, configurer et simuler des réseaux, inspirée de l’approche pédagogique de FILIUS.",
        },
        {
          question: "Est-ce la version de bureau de FILIUS ?",
          answer:
            "Non. Filius on iPad est une implémentation iPad maintenue indépendamment avec des flux de projets compatibles. Elle n’est ni publiée, ni exploitée, ni officiellement prise en charge par le projet FILIUS d’origine.",
        },
        {
          question: "Quels appareils sont pris en charge ?",
          answer:
            "La cible actuelle est l’iPad avec iPadOS 17 ou ultérieur. La fiche App Store finale doit correspondre au build publié.",
        },
        {
          question: "Puis-je ouvrir et enregistrer des fichiers .fls ?",
          answer:
            "Oui. Les contenus connus sont modifiables ; les contenus inconnus suivent un contrat de conservation limité.",
        },
        {
          question: "Quelles fonctions de bureau manquent ?",
          answer:
            "Les applications Java arbitraires de l’assistant de bureau ne fonctionnent pas sur iPadOS. Le générateur natif reste expérimental.",
        },
        {
          question: "La simulation nécessite-t-elle Internet ?",
          answer:
            "Les réseaux simulés s’exécutent localement sur l’iPad. L’exercice ne nécessite pas d’accès Internet externe.",
        },
        {
          question: "Des données sont-elles collectées ?",
          answer:
            "La mesure d’audience auto-hébergée facultative n’est chargée qu’après consentement explicite. Le refus est proposé de façon équivalente ; il n’y a ni publicité ni profil intersites.",
        },
        {
          question: "Comment partager un projet en classe ?",
          answer:
            "Enregistrez un fichier .fls et partagez-le avec les fonctions de fichiers de l’iPad, en utilisant des données synthétiques.",
        },
        {
          question: "Comment signaler un problème ?",
          answer:
            "Envoyez la version de l’app, la version d’iPadOS, les étapes, le résultat attendu et le résultat observé.",
        },
        {
          question: "Le code source est-il public ?",
          answer:
            "Oui. Filius on iPad est public sur GitHub ; le code source du FILIUS Java d’origine est maintenu séparément sur GitLab.",
        },
      ],
    },
    support: {
      title: "Assistance",
      intro:
        "Décrivez le problème afin qu’il puisse être reproduit sans accès à votre iPad.",
      emailTitle: "Contact direct",
      emailBody:
        "Écrivez à support@filius.app si vous préférez votre application de messagerie ou devez envoyer des fichiers après demande.",
      checklistTitle: "Informations utiles",
      checklist: [
        "Version de Filius on iPad",
        "Version d’iPadOS et modèle d’iPad",
        "Étapes de reproduction",
        "Résultat attendu et observé",
        "Uniquement sur demande : fichier .fls nettoyé ou capture",
      ],
    },
    privacy: {
      title: "Confidentialité",
      intro:
        "Informations sur le fonctionnement du site, la mesure facultative, le consentement et l’assistance.",
      sections: [
        {
          title: "Site",
          body: "Les journaux serveur techniquement nécessaires assurent le fonctionnement. La mesure facultative n’est chargée qu’après consentement.",
        },
        {
          title: "Assistance",
          body: "Le formulaire transmet les informations nécessaires, sans base de données propre, à la boîte d’assistance configurée. L’e-mail direct reste disponible ; la suppression, la base juridique et la protection contre les abus sont décrites dans la politique de confidentialité.",
        },
        {
          title: "App",
          body: "Les déclarations de l’app seront vérifiées avec l’archive signée, les SDK inclus et le comportement réseau réel.",
        },
      ],
    },
    imprint: {
      title: "Mentions légales",
      intro: "Informations sur l’éditeur et le contact de filius.app.",
      body: "Le nom de l’éditeur, l’adresse de service et l’adresse de contact active sont publiés pour l’exploitation confirmée de filius.app.",
    },
    accessibility: {
      title: "Accessibilité",
      intro: "Filius.app vise le niveau WCAG 2.2 AA.",
      sections: [
        {
          title: "Périmètre",
          body: "Les tests couvrent clavier, VoiceOver, contraste, focus, zoom, réduction des animations, cibles tactiles et structure.",
        },
        {
          title: "Limites connues",
          body: "Le site est en construction. Un audit formel et la liste des limites restantes seront publiés avant le lancement.",
        },
        {
          title: "Retour",
          body: "Signalez les obstacles à support@filius.app en indiquant la page, le navigateur, la technologie d’assistance et le problème.",
        },
      ],
    },
    licenses: {
      title: "Licences et provenance",
      intro:
        "Dépôts publics, bases de licence et provenance des composants utilisés.",
      sections: [
        {
          title: "Filius on iPad",
          body: "Le code source de Filius on iPad est public. La GPLv2 ou GPLv3 s’applique avec l’autorisation supplémentaire Apple conservée en privé ; le dépôt en publie une attestation SHA-256.",
          links: [{ label: "Filius on iPad sur GitHub", repository: "appUrl" }],
        },
        {
          title: "FILIUS",
          body: "Le logiciel Java FILIUS et ses ressources pédagogiques sont maintenus séparément par le projet d’origine. Filius on iPad est maintenu indépendamment et prend en charge le format de projet Java.",
          links: [{ label: "FILIUS Java sur GitLab", repository: "javaUrl" }],
        },
        {
          title: "Ressources du site",
          body: "L’icône et la capture du produit proviennent de Filius on iPad. Les autres visuels du site sont maintenus comme illustrations CSS et vectorielles indépendantes.",
          links: [
            {
              label: "Code source du site sur GitHub",
              repository: "websiteUrl",
            },
          ],
        },
        {
          title: "Polices et frameworks",
          body: "Astro, Starlight et les polices auto-hébergées conservent leurs licences open source respectives. Les métadonnées des paquets et les textes de licence en amont restent déterminants.",
        },
      ],
    },
    footer: {
      tagline: "Concevoir, configurer et comprendre les réseaux sur iPad.",
      original: "Avec reconnaissance du projet FILIUS d’origine.",
      rights: "Filius on iPad est maintenu indépendamment.",
    },
  },
};
