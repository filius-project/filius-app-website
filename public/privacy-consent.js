(() => {
  "use strict";

  const storageKey = "filius.analyticsConsent.v1";
  const scriptId = "filius-analytics-script";
  const rootId = "privacy-consent-root";
  const settingsId = "privacy-settings-button";

  const translations = {
    de: {
      title: "Datenschutzeinstellungen",
      body: "Optionale, selbst gehostete Reichweitenmessung hilft uns zu verstehen, welche Seiten hilfreich sind. Sie wird erst nach deiner Zustimmung geladen. Es gibt keine Werbung und kein seitenübergreifendes Profil.",
      accept: "Analyse erlauben",
      reject: "Nur notwendige Speicherung",
      settings: "Datenschutzeinstellungen",
      privacy: "Datenschutzerklärung",
      saved: "Deine Auswahl wurde gespeichert.",
      path: "/privacy/",
    },
    en: {
      title: "Privacy settings",
      body: "Optional, self-hosted usage measurement helps us understand which pages are useful. It loads only after you consent. There is no advertising or cross-site profile.",
      accept: "Allow analytics",
      reject: "Necessary storage only",
      settings: "Privacy settings",
      privacy: "Privacy notice",
      saved: "Your selection has been saved.",
      path: "/en/privacy/",
    },
    fr: {
      title: "Réglages de confidentialité",
      body: "Une mesure d’audience facultative et auto-hébergée nous aide à savoir quelles pages sont utiles. Elle n’est chargée qu’après votre accord. Il n’y a ni publicité ni profil intersites.",
      accept: "Autoriser l’analyse",
      reject: "Stockage nécessaire uniquement",
      settings: "Réglages de confidentialité",
      privacy: "Politique de confidentialité",
      saved: "Votre choix a été enregistré.",
      path: "/fr/privacy/",
    },
  };

  const language = document.documentElement.lang?.toLowerCase().startsWith("fr")
    ? "fr"
    : document.documentElement.lang?.toLowerCase().startsWith("en")
      ? "en"
      : "de";
  const text = translations[language];

  const readChoice = (maxAgeDays) => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (!value || !["granted", "denied"].includes(value.choice)) return null;
      const age = Date.now() - Number(value.savedAt || 0);
      if (age > maxAgeDays * 86400000) {
        localStorage.removeItem(storageKey);
        return null;
      }
      return value.choice;
    } catch {
      return null;
    }
  };

  const saveChoice = (choice) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ choice, savedAt: Date.now(), version: 1 }),
      );
    } catch {
      // Consent remains valid for this page view when storage is unavailable.
    }
    document.dispatchEvent(
      new CustomEvent("filius:analytics-consent", { detail: { choice } }),
    );
  };

  const loadAnalytics = (config) => {
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.src = config.scriptUrl;
    script.dataset.websiteId = config.websiteId;
    script.dataset.doNotTrack = "true";
    script.dataset.excludeSearch = "true";
    script.dataset.excludeHash = "true";
    if (config.domains) script.dataset.domains = config.domains;
    document.head.append(script);
  };

  const removeBanner = () => document.getElementById(rootId)?.remove();

  const createSettingsButton = (openSettings) => {
    if (document.getElementById(settingsId)) return;
    const button = document.createElement("button");
    button.type = "button";
    button.id = settingsId;
    button.className = "privacy-settings-button";
    button.textContent = text.settings;
    button.addEventListener("click", openSettings);
    document.body.append(button);
  };

  const showBanner = (config, currentChoice = null, focusChoice = false) => {
    removeBanner();
    const root = document.createElement("section");
    root.id = rootId;
    root.className = "privacy-consent";
    root.setAttribute("aria-labelledby", "privacy-consent-title");
    root.setAttribute("aria-describedby", "privacy-consent-description");

    const copy = document.createElement("div");
    copy.className = "privacy-consent__copy";
    copy.innerHTML = `<h2 id="privacy-consent-title">${text.title}</h2><p id="privacy-consent-description">${text.body}</p><a href="${text.path}">${text.privacy}</a>`;

    const actions = document.createElement("div");
    actions.className = "privacy-consent__actions";

    const reject = document.createElement("button");
    reject.type = "button";
    reject.className = "privacy-consent__button";
    reject.textContent = text.reject;

    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "privacy-consent__button";
    accept.textContent = text.accept;

    const choose = (choice) => {
      const wasGranted = currentChoice === "granted";
      saveChoice(choice);
      removeBanner();
      if (choice === "granted") loadAnalytics(config);
      if (wasGranted && choice === "denied") window.location.reload();
    };

    reject.addEventListener("click", () => choose("denied"));
    accept.addEventListener("click", () => choose("granted"));
    actions.append(reject, accept);
    root.append(copy, actions);
    document.body.append(root);
    if (focusChoice) {
      requestAnimationFrame(() => reject.focus({ preventScroll: true }));
    }
  };

  const initialize = async () => {
    let config;
    try {
      const response = await fetch("/analytics-config.json", {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!response.ok) return;
      config = await response.json();
    } catch {
      return;
    }

    if (!config?.enabled || !config.scriptUrl || !config.websiteId) return;

    const openSettings = () =>
      showBanner(config, readChoice(config.consentStorageDays), true);
    createSettingsButton(openSettings);
    document
      .querySelectorAll("[data-open-privacy-settings]")
      .forEach((button) => button.addEventListener("click", openSettings));

    const choice = readChoice(config.consentStorageDays);
    if (choice === "granted") {
      loadAnalytics(config);
      return;
    }
    if (choice === "denied") return;

    const privacySignal =
      navigator.globalPrivacyControl === true ||
      navigator.doNotTrack === "1" ||
      window.doNotTrack === "1";
    if (privacySignal) {
      saveChoice("denied");
      return;
    }
    showBanner(config);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
