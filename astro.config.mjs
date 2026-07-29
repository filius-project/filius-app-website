// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";

const documentationPages = [
  "docs",
  "docs/getting-started",
  "docs/interface",
  "docs/devices",
  "docs/design",
  "docs/networking",
  "docs/simulation",
  "docs/applications",
  "docs/compatibility",
  "docs/troubleshooting",
  "docs/about",
];

export default defineConfig({
  site: "https://filius.app",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "de",
        locales: { de: "de-DE", en: "en-US", fr: "fr-FR" },
      },
    }),
    starlight({
      title: "Filius on iPad",
      description:
        "Netzwerksimulation auf dem iPad – Dokumentation, Schnellstart und Kompatibilität.",
      logo: {
        src: "./src/assets/brand/filiuspad-icon.png",
        alt: "Filius on iPad",
      },
      favicon: "/favicon.png",
      defaultLocale: "root",
      locales: {
        root: { label: "Deutsch", lang: "de", dir: "ltr" },
        en: { label: "English", lang: "en", dir: "ltr" },
        fr: { label: "Français", lang: "fr", dir: "ltr" },
      },
      customCss: ["./src/styles/starlight.css"],
      lastUpdated: true,
      credits: false,
      head: [
        {
          tag: "link",
          attrs: { rel: "stylesheet", href: "/privacy-consent.css" },
        },
        {
          tag: "script",
          attrs: { src: "/privacy-consent.js", defer: true },
        },
        { tag: "meta", attrs: { name: "theme-color", content: "#17203f" } },
        {
          tag: "meta",
          attrs: { name: "apple-mobile-web-app-capable", content: "yes" },
        },
      ],
      sidebar: documentationPages,
    }),
  ],
});
