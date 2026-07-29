import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const requiredRoutes = [
  "index.astro",
  "quickstart.astro",
  "faq.astro",
  "support.astro",
  "privacy.astro",
  "imprint.astro",
  "accessibility.astro",
  "licenses.astro",
];
const locales = ["en", "fr"];
const docsRoot = "src/content/docs";
const requiredDocs = [
  "index.md",
  "getting-started.md",
  "interface.md",
  "devices.md",
  "design.md",
  "simulation.md",
  "networking.md",
  "applications.md",
  "compatibility.md",
  "troubleshooting.md",
  "about.md",
];
const failures = [];

for (const route of requiredRoutes) {
  if (!existsSync(join("src/pages", route)))
    failures.push(`Missing German route: ${route}`);
  for (const locale of locales)
    if (!existsSync(join("src/pages", locale, route)))
      failures.push(`Missing ${locale} route: ${route}`);
}
for (const doc of requiredDocs) {
  if (!existsSync(join(docsRoot, "docs", doc)))
    failures.push(`Missing German doc: ${doc}`);
  for (const locale of locales)
    if (!existsSync(join(docsRoot, locale, "docs", doc)))
      failures.push(`Missing ${locale} doc: ${doc}`);
}

const sourceFiles = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (/\.(astro|ts|md|mjs|json)$/.test(entry.name))
      sourceFiles.push(path);
  }
}
walk("src");
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  if (/github\.com\/Borega\/swiftson/i.test(text))
    failures.push(`Private development URL leaked in ${file}`);
  if (/TODO_RELEASE_OWNER|TODO_PRODUCT_OWNER/i.test(text))
    failures.push(`Internal release placeholder leaked in ${file}`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log(
  `Validated ${requiredRoutes.length * 3} marketing/trust routes and ${requiredDocs.length * 3} documentation pages.`,
);
