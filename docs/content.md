# Content and localization

## Reader and outcome

This guide is for maintainers and translators. After reading it, they should be able to update product copy or documentation without breaking locale parity or publishing an unsupported claim.

## Locales

German is the root locale. English and French use URL prefixes. Every top-level marketing and trust page must exist in all three locales.

Documentation uses identical slugs below each locale so language switching can preserve the current topic.

## Marketing copy

Shared product, quick-start, FAQ, support, and trust-page copy is defined in one typed content module. Keep the same shape for all three locales; TypeScript will report missing fields.

When updating product claims:

1. verify the behavior against the current release candidate;
2. update all locales;
3. keep desktop compatibility limits visible;
4. do not claim App Store availability before the listing exists; and
5. do not claim “no data collected” until the privacy owner approves the release evidence.

## Documentation

Starlight content is Markdown. The default and translated directory trees must contain the same nine initial topics:

- documentation overview;
- getting started;
- design mode;
- simulation mode;
- networking features;
- simulated applications;
- compatibility;
- troubleshooting; and
- about and attribution.

Use Starlight callouts for notes, cautions, and release-critical warnings. Keep headings action-oriented and paragraphs short enough to read beside the iPad app.

## Development journal

The public development journal lives in `src/content/news/` and is rendered at `/news/`. Each entry is Markdown with a small frontmatter header. Keep the same `translationKey` and `slug` across German, English, and French files so the language switcher can move between translations. The `slug` must be unique within each locale and should remain stable after publication.

Use one of these statuses:

- `development` for concrete decisions and work in progress;
- `preview` for material that still needs review and may change; and
- `release` only for changes that are confirmed and available.

Preview entries should say clearly that details can change. To publish a new entry, add one Markdown file under each locale directory, set `draft: true` while it is not ready, and set `featured: true` on at most one current entry per locale. Keep dates in ISO format (`YYYY-MM-DD`) and update all three translations before merging.

Example frontmatter:

```yaml
---
locale: en
translationKey: example-entry
slug: example-entry
title: "A clear, specific headline"
summary: "One sentence that works in the archive and social metadata."
publishedAt: 2026-08-10
kind: development
topics:
  - Product
  - Classroom
readingMinutes: 3
draft: true
---
```

## Images

Use real release-candidate screenshots with synthetic content. Record the producing app revision and test scenario before replacing an image. Provide instructional alt text that explains what a learner should notice.

Do not upscale low-resolution legacy icons. Use the app icon for identity and CSS/vector diagrams for large decorative topology elements until additional asset rights are approved.

## Validation

Run:

```bash
npm run validate:content
npm run check
npm run build
```

The content validator checks locale route parity, documentation topic parity, and accidental leakage of private development URLs or internal release placeholders.
