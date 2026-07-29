export type Locale = "de" | "en" | "fr";
export type NavKey = "overview" | "quickstart" | "docs" | "faq" | "support";

export const locales: Locale[] = ["de", "en", "fr"];
export const defaultLocale: Locale = "de";

export const site = {
  name: "Filius on iPad",
  origin: "https://filius.app",
  supportEmail: "support@filius.app",
  minimumOS: "iPadOS 17",
  appStore: {
    status: "coming-soon" as "coming-soon" | "available",
    url: "",
    appId: "",
  },
  source: {
    status: "pending-license" as "pending-license" | "available",
    url: "",
  },
  legal: {
    reviewed: false,
    publisherName: "",
    publisherAddress: "",
  },
} as const;

export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function localizedPath(locale: Locale, path = ""): string {
  const normalized =
    path === "/" ? "" : path.replace(/^\//, "").replace(/\/$/, "");
  const prefix = localePrefix(locale);
  return `${prefix}/${normalized}`.replace(/\/+/g, "/") || "/";
}

export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment === "en" || segment === "fr" ? segment : defaultLocale;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "fr") parts.shift();
  const rest = parts.join("/");
  return localizedPath(target, rest);
}
