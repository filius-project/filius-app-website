export type Locale = "de" | "en" | "fr";
export type NavKey = "overview" | "quickstart" | "docs" | "faq" | "support";

export const locales: Locale[] = ["de", "en", "fr"];
export const defaultLocale: Locale = "de";

const env = import.meta.env;
const envText = (name: string, fallback = "") => {
  const value = String(env[name] ?? "").trim();
  return value || fallback;
};
const envFlag = (name: string, fallback = false) => {
  const value = envText(name);
  return value ? value.toLowerCase() === "true" : fallback;
};
const envDays = (name: string, fallback: number) => {
  const value = Number.parseInt(envText(name), 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

const emailProviderModeValue = envText(
  "PUBLIC_EMAIL_PROVIDER_MODE",
  "consumer-gmail",
);
const emailProviderMode = ["consumer-gmail", "google-workspace"].includes(
  emailProviderModeValue,
)
  ? (emailProviderModeValue as "consumer-gmail" | "google-workspace")
  : null;

const analyticsScriptUrl = envText("PUBLIC_UMAMI_SCRIPT_URL");
const analyticsWebsiteId = envText("PUBLIC_UMAMI_WEBSITE_ID");
const analyticsAllowedUrl = (() => {
  if (!analyticsScriptUrl) return false;
  if (analyticsScriptUrl.startsWith("/")) return true;
  try {
    return (
      new URL(analyticsScriptUrl).origin === "https://analytics.filius.app"
    );
  } catch {
    return false;
  }
})();

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
    reviewed: envFlag("PUBLIC_LEGAL_REVIEWED"),
    controllerName: envText("PUBLIC_LEGAL_CONTROLLER_NAME", "Sören Schröder"),
    controllerAddress: envText(
      "PUBLIC_LEGAL_CONTROLLER_ADDRESS",
      "Max-Brauer-Allee 167f, 22765 Hamburg, Germany",
    ),
    controllerEmail: envText(
      "PUBLIC_LEGAL_CONTROLLER_EMAIL",
      "support@filius.app",
    ),
    controllerPhone: envText("PUBLIC_LEGAL_CONTROLLER_PHONE"),
    vatId: envText("PUBLIC_LEGAL_VAT_ID"),
    registerEntry: envText("PUBLIC_LEGAL_REGISTER_ENTRY"),
    hostingProviderName: envText(
      "PUBLIC_HOSTING_PROVIDER_NAME",
      "Oracle Cloud Infrastructure (Oracle Deutschland B.V. & Co. KG)",
    ),
    hostingProviderAddress: envText(
      "PUBLIC_HOSTING_PROVIDER_ADDRESS",
      "Riesstraße 25, 80992 München",
    ),
    hostingCountry: envText("PUBLIC_HOSTING_COUNTRY", "Germany"),
    hostingRegion: envText("PUBLIC_HOSTING_REGION", "eu-frankfurt-1"),
    cloudflareProxyEnabled: envFlag("PUBLIC_CLOUDFLARE_PROXY_ENABLED", true),
    accessLogRetentionDays: envDays("PUBLIC_ACCESS_LOG_RETENTION_DAYS", 35),
    errorLogRetentionDays: envDays("PUBLIC_ERROR_LOG_RETENTION_DAYS", 77),
    emailProviderName: envText(
      "PUBLIC_EMAIL_PROVIDER_NAME",
      "Google Ireland Limited",
    ),
    emailProviderAddress: envText(
      "PUBLIC_EMAIL_PROVIDER_ADDRESS",
      "Gordon House, Barrow Street, Dublin 4",
    ),
    emailProviderCountry: envText("PUBLIC_EMAIL_PROVIDER_COUNTRY", "Ireland"),
    emailProviderMode,
    analyticsRetentionDays: envDays("PUBLIC_ANALYTICS_RETENTION_DAYS", 180),
    privacyNoticeDate: envText("PUBLIC_PRIVACY_NOTICE_DATE", "29 July 2026"),
  },
  analytics: {
    enabled: analyticsAllowedUrl && Boolean(analyticsWebsiteId),
    provider: "Umami",
    scriptUrl: analyticsAllowedUrl ? analyticsScriptUrl : "",
    websiteId: analyticsAllowedUrl ? analyticsWebsiteId : "",
    domains: envText("PUBLIC_UMAMI_DOMAINS", "filius.app,www.filius.app"),
    consentStorageDays: 180,
  },
} as const;

export const legalNoticeReady = Boolean(
  site.legal.reviewed &&
  site.legal.controllerName &&
  site.legal.controllerAddress &&
  site.legal.controllerEmail,
);

export const privacyNoticeReady = Boolean(
  legalNoticeReady &&
  site.legal.hostingProviderName &&
  site.legal.hostingProviderAddress,
);

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
