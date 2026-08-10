import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

const news = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/news",
    generateId: ({ entry, data }) =>
      `${String(data.locale ?? entry.split("/")[0])}-${String(data.slug ?? entry)}`,
  }),
  schema: z.object({
    locale: z.enum(["de", "en", "fr"]),
    translationKey: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    summary: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    kind: z.enum(["development", "preview", "release"]),
    topics: z.array(z.string().min(1)).min(1).max(4),
    readingMinutes: z.number().int().positive(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  news,
};
