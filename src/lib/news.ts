import { getCollection, type CollectionEntry } from "astro:content";

import type { Locale } from "../config";
import { localizedPath } from "../config";

export type NewsPost = CollectionEntry<"news">;
export type NewsKind = NewsPost["data"]["kind"];

export const newsCopy = {
  de: {
    eyebrow: "Entwicklungsjournal",
    title: "Neues aus der Werkstatt.",
    intro:
      "Fortschritte, technische Einblicke und frühe Vorschauen auf Filius on iPad – nachvollziehbar eingeordnet, ohne aus Entwürfen schon Versprechen zu machen.",
    metaDescription:
      "Entwicklungsnotizen, Vorschauen und Veröffentlichungen rund um Filius on iPad.",
    latest: "Neuester Eintrag",
    archive: "Aus dem Logbuch",
    archiveIntro:
      "Kurze Statusmeldungen und ausführliche Hintergründe aus Produkt, Unterricht und Infrastruktur.",
    readArticle: "Eintrag lesen",
    back: "Zurück zu Neuigkeiten",
    related: "Weitere Einträge",
    topics: "Themen",
    live: "Signal aktiv",
    published: "Veröffentlicht",
    updated: "Aktualisiert",
    readingTime: (minutes: number) => `${minutes} Min. Lesezeit`,
    previewNotice:
      "Vorschau: Details können sich während Entwicklung, Prüfung und Freigabe noch ändern.",
    kinds: {
      development: "Entwicklung",
      preview: "Vorschau",
      release: "Veröffentlichung",
    },
    legend: {
      title: "Was hier erscheint",
      development: "Entscheidungen und Fortschritte",
      preview: "Frühe Blicke auf laufende Arbeit",
      release: "Bestätigte, verfügbare Änderungen",
    },
  },
  en: {
    eyebrow: "Development journal",
    title: "Notes from the workshop.",
    intro:
      "Progress, technical context, and early previews of Filius on iPad—clearly labelled so that a work in progress is never mistaken for a promise.",
    metaDescription:
      "Development notes, previews, and releases from Filius on iPad.",
    latest: "Latest entry",
    archive: "From the logbook",
    archiveIntro:
      "Short status notes and deeper context from product work, teaching, and infrastructure.",
    readArticle: "Read entry",
    back: "Back to news",
    related: "More entries",
    topics: "Topics",
    live: "Live log",
    published: "Published",
    updated: "Updated",
    readingTime: (minutes: number) => `${minutes} min read`,
    previewNotice:
      "Preview: details may still change during development, review, and release preparation.",
    kinds: {
      development: "Development",
      preview: "Preview",
      release: "Release",
    },
    legend: {
      title: "What appears here",
      development: "Decisions and progress",
      preview: "Early looks at active work",
      release: "Confirmed, available changes",
    },
  },
  fr: {
    eyebrow: "Journal de développement",
    title: "Nouvelles de l’atelier.",
    intro:
      "Avancement, contexte technique et premiers aperçus de Filius on iPad — avec des libellés clairs pour ne jamais confondre un chantier et une promesse.",
    metaDescription:
      "Notes de développement, aperçus et publications autour de Filius on iPad.",
    latest: "Dernière publication",
    archive: "Dans le journal de bord",
    archiveIntro:
      "Des points d’étape et des explications détaillées sur le produit, la pédagogie et l’infrastructure.",
    readArticle: "Lire la publication",
    back: "Retour aux actualités",
    related: "Autres publications",
    topics: "Thèmes",
    live: "Journal actif",
    published: "Publié",
    updated: "Mis à jour",
    readingTime: (minutes: number) => `${minutes} min de lecture`,
    previewNotice:
      "Aperçu : certains détails peuvent encore changer pendant le développement, la relecture et la préparation de la publication.",
    kinds: {
      development: "Développement",
      preview: "Aperçu",
      release: "Publication",
    },
    legend: {
      title: "Ce que vous trouverez ici",
      development: "Décisions et avancement",
      preview: "Premiers regards sur le travail en cours",
      release: "Changements confirmés et disponibles",
    },
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    metaDescription: string;
    latest: string;
    archive: string;
    archiveIntro: string;
    readArticle: string;
    back: string;
    related: string;
    topics: string;
    live: string;
    published: string;
    updated: string;
    readingTime: (minutes: number) => string;
    previewNotice: string;
    kinds: Record<NewsKind, string>;
    legend: {
      title: string;
      development: string;
      preview: string;
      release: string;
    };
  }
>;

export async function getNewsPosts(locale: Locale): Promise<NewsPost[]> {
  const posts = await getCollection(
    "news",
    ({ data }) => data.locale === locale && !data.draft,
  );
  return posts.sort(
    (left, right) =>
      right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  );
}

export function newsPostPath(locale: Locale, post: NewsPost | string): string {
  const slug = typeof post === "string" ? post : post.data.slug;
  return localizedPath(locale, `news/${slug}`);
}

export function formatNewsDate(date: Date, locale: Locale): string {
  const language =
    locale === "de" ? "de-DE" : locale === "fr" ? "fr-FR" : "en-US";
  return new Intl.DateTimeFormat(language, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}
