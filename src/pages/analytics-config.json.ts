import type { APIRoute } from "astro";

import { site } from "../config";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      enabled: site.analytics.enabled,
      provider: site.analytics.provider,
      scriptUrl: site.analytics.scriptUrl,
      websiteId: site.analytics.websiteId,
      domains: site.analytics.domains,
      consentStorageDays: site.analytics.consentStorageDays,
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
