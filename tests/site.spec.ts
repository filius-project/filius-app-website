import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const marketingPages = [
  "/",
  "/en/",
  "/fr/",
  "/quickstart/",
  "/faq/",
  "/support/",
  "/news/",
  "/en/news/",
  "/fr/news/",
  "/news/ipad-remote-link/",
  "/en/news/ipad-remote-link/",
  "/fr/news/ipad-remote-link/",
  "/news/java-ipad-parity/",
  "/en/news/java-ipad-parity/",
  "/fr/news/java-ipad-parity/",
  "/news/custom-java-applications-ipad/",
  "/en/news/custom-java-applications-ipad/",
  "/fr/news/custom-java-applications-ipad/",
  "/news/guided-tour-first-ping/",
  "/en/news/guided-tour-first-ping/",
  "/fr/news/guided-tour-first-ping/",
  "/en/support/",
  "/fr/support/",
];

for (const path of marketingPages) {
  test(`${path} has a clear page structure`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page).toHaveTitle(/Filius on iPad/);
  });

  test(`${path} has no automatically detectable serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}

test("homepage navigation uses canonical trailing-slash URLs", async ({
  page,
}) => {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href): href is string => Boolean(href?.startsWith("/"))),
    );

  for (const href of [
    "/quickstart/",
    "/docs/",
    "/news/",
    "/faq/",
    "/support/",
    "/privacy/",
    "/imprint/",
  ]) {
    expect(hrefs).toContain(href);
  }
  expect(
    hrefs.filter((href) => href !== "/").every((href) => href.endsWith("/")),
  ).toBe(true);
});

test("homepages link the public iPad and Java FILIUS repositories", async ({
  page,
}) => {
  for (const path of ["/", "/en/", "/fr/"]) {
    await page.goto(path);
    await expect(
      page.locator('a[href="https://github.com/filius-project/filius-ipad"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('a[href="https://gitlab.com/filius1/filius"]'),
    ).toHaveCount(1);
    await expect(page.locator("main")).not.toContainText(
      /legal approvals? remain|rechtliche Freigaben stehen aus|validations juridiques en attente/i,
    );
  }
});

test("documentation search and navigation load", async ({ page }) => {
  await page.goto("/docs/");
  await expect(page.locator("h1")).toContainText("Dokumentation");
  await expect(
    page.getByRole("main").getByRole("link", {
      name: "Oberfläche und Bedienelemente",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: "Geräte und Verbindungen", exact: true }),
  ).toBeVisible();
});

test("expanded documentation includes app pictures and detailed sections", async ({
  page,
}) => {
  await page.goto("/docs/applications/");
  await expect(page.locator("h1")).toContainText("Simulierte Anwendungen");
  await expect(page.locator(".doc-app-icon")).toHaveCount(14);
  await expect(
    page.getByRole("heading", { name: "DHCP-Server" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Gnutella" })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Mehrere Websites mit virtuellen Hosts",
    }),
  ).toBeVisible();

  await page.goto("/docs/networking/");
  await expect(
    page.getByRole("heading", {
      name: "Webadministration auf Router und Gateway",
    }),
  ).toBeVisible();
  await expect(page.locator("code", { hasText: "MX" }).first()).toBeVisible();
  await expect(page.locator("code", { hasText: "NS" }).first()).toBeVisible();

  await page.goto("/docs/simulation/");
  await expect(
    page.getByRole("heading", { name: "Gezielten Paketverlust simulieren" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Detailbericht exportieren" }),
  ).toBeVisible();

  await page.goto("/docs/design/");
  await expect(
    page.getByRole("heading", {
      name: "Beschriftung aus IP- und MAC-Adresse ableiten",
    }),
  ).toBeVisible();

  await page.goto("/docs/devices/");
  await expect(page.locator(".doc-device")).toHaveCount(7);
  await expect(
    page.getByRole("heading", { name: "Remote Link" }),
  ).toBeVisible();
});

test("expanded documentation is available in all supported languages", async ({
  page,
}) => {
  await page.goto("/en/docs/networking/");
  await expect(page.locator("h1")).toContainText("Networking features");
  await expect(
    page.getByRole("heading", {
      name: "Web administration on routers and gateways",
    }),
  ).toBeVisible();

  await page.goto("/fr/docs/applications/");
  await expect(page.locator("h1")).toContainText("Applications simulées");
  await expect(
    page.getByRole("heading", {
      name: "Servir plusieurs sites avec des hôtes virtuels",
    }),
  ).toBeVisible();

  await page.goto("/fr/docs/simulation/");
  await expect(
    page.getByRole("heading", { name: "Exporter un rapport détaillé" }),
  ).toBeVisible();
});

test("mobile navigation exposes all primary destinations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".mobile-nav summary").click();
  await expect(page.locator(".mobile-panel")).toBeVisible();
  await expect(
    page.locator(".mobile-panel").getByRole("link", { name: "Schnellstart" }),
  ).toBeVisible();
  await expect(
    page.locator(".mobile-panel").getByRole("link", { name: "Dokumentation" }),
  ).toBeVisible();
  await expect(
    page.locator(".mobile-panel").getByRole("link", { name: "Neuigkeiten" }),
  ).toBeVisible();
});

test("the development journal is localized and labels preview content", async ({
  page,
}) => {
  for (const [path, heading, featuredPath] of [
    ["/news/", "Neues aus der Werkstatt.", "/news/guided-tour-first-ping/"],
    [
      "/en/news/",
      "Notes from the workshop.",
      "/en/news/guided-tour-first-ping/",
    ],
    [
      "/fr/news/",
      "Nouvelles de l’atelier.",
      "/fr/news/guided-tour-first-ping/",
    ],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    await expect(page.locator("[data-news-card]")).toHaveCount(7);
    await expect(page.locator("[data-news-card]").first()).toHaveAttribute(
      "href",
      featuredPath,
    );
  }

  await page.goto("/en/news/learning-materials-preview/");
  await expect(
    page.getByText(
      "Preview: details may still change during development, review, and release preparation.",
    ),
  ).toBeVisible();
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="de"]'),
  ).toHaveAttribute("href", /\/news\/learning-materials-preview\/$/);

  await page.goto("/en/news/ipad-remote-link/");
  await expect(
    page.getByRole("heading", {
      name: "Two iPads, one simulated network: Remote Link over the local network",
    }),
  ).toBeVisible();
  await expect(page.getByText("Development status")).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="fr"]'),
  ).toHaveAttribute("href", /\/fr\/news\/ipad-remote-link\/$/);

  await page.goto("/en/news/java-ipad-parity/");
  await expect(
    page.getByRole("heading", {
      name: "From the Java reference to iPad: closing the next parity gap",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("One release gate remains deliberately closed"),
  ).toBeVisible();
  await expect(page.getByText(/two physical iPads/).first()).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="de"]'),
  ).toHaveAttribute("href", /\/news\/java-ipad-parity\/$/);

  await page.goto("/en/news/guided-tour-first-ping/");
  await expect(
    page.getByRole("heading", {
      name: "The first ping, one clear step at a time",
    }),
  ).toBeVisible();
  await expect(page.getByText("A complete first network")).toBeVisible();
  await expect(page.getByText("Real actions, safe practice")).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="de"]'),
  ).toHaveAttribute("href", /\/news\/guided-tour-first-ping\/$/);

  await page.goto("/en/news/custom-java-applications-ipad/");
  await expect(
    page.getByRole("heading", {
      name: "Custom applications on iPad: why we do not simply run the Java code",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Why the iPad builder remains experimental"),
  ).toBeVisible();
  await expect(page.getByText("How we may move forward")).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="fr"]'),
  ).toHaveAttribute("href", /\/fr\/news\/custom-java-applications-ipad\/$/);
});

test("the contact form is data-minimizing and available in every language", async ({
  page,
}) => {
  for (const [path, heading] of [
    ["/support/", "Direkt aus dem Browser schreiben"],
    ["/en/support/", "Write directly from your browser"],
    ["/fr/support/", "Écrire directement depuis le navigateur"],
  ] as const) {
    await page.goto(path);
    const form = page.locator("form[data-contact-form]");
    await expect(form).toHaveCount(1);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    await expect(form.locator('input[type="file"]')).toHaveCount(0);
    await expect(form.locator('[name="email"]')).toHaveAttribute(
      "required",
      "",
    );
    await expect(form.locator('[name="message"]')).toHaveAttribute(
      "maxlength",
      "4000",
    );
    await expect(form.locator('a[href*="privacy"]')).toHaveCount(1);
  }
});

test("the contact form submits to the same-origin service and reports success", async ({
  page,
}) => {
  let submission: URLSearchParams | undefined;
  await page.route("**/api/contact", async (route) => {
    submission = new URLSearchParams(route.request().postData() ?? "");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Thank you. Your message was sent to support.",
      }),
    });
  });

  await page.goto("/en/support/");
  const form = page.locator("form[data-contact-form]");
  await form.locator('[name="name"]').fill("Ada Learner");
  await form.locator('[name="email"]').fill("ada@example.org");
  await form.locator('[name="category"]').selectOption("support");
  await form
    .locator('[name="message"]')
    .fill("The simulated DNS request never receives a response.");
  await form.getByRole("button", { name: "Send message" }).click();

  await expect(form.locator("[data-form-status]")).toHaveText(
    "Thank you. Your message was sent to support.",
  );
  expect(submission?.get("locale")).toBe("en");
  expect(submission?.get("email")).toBe("ada@example.org");
  expect(submission?.get("message")).toContain("simulated DNS request");
  await expect(form.locator('[name="email"]')).toHaveValue("");
});

const analyticsConfig = {
  enabled: true,
  provider: "Umami",
  scriptUrl: "/mock-analytics.js",
  websiteId: "playwright-test-site",
  domains: "127.0.0.1",
  consentStorageDays: 180,
};

test("analytics is not loaded until the visitor opts in", async ({ page }) => {
  let analyticsRequests = 0;
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "doNotTrack", {
      configurable: true,
      value: "0",
    });
    Object.defineProperty(navigator, "globalPrivacyControl", {
      configurable: true,
      value: false,
    });
    Object.defineProperty(window, "doNotTrack", {
      configurable: true,
      value: "0",
    });
  });
  await page.route("**/*", async (route) => {
    const pathname = new URL(route.request().url()).pathname.replace(/\/$/, "");
    if (pathname === "/analytics-config.json") {
      await route.fulfill({ json: analyticsConfig });
      return;
    }
    if (pathname === "/mock-analytics.js") {
      analyticsRequests += 1;
      await route.fulfill({
        contentType: "application/javascript",
        body: "window.__filiusAnalyticsLoaded = true;",
      });
      return;
    }
    await route.continue();
  });

  await page.goto("/en/");
  const banner = page.locator("#privacy-consent-root");
  await expect(banner).toBeVisible();
  await expect(
    banner.getByRole("button", { name: "Necessary storage only" }),
  ).toHaveClass(/privacy-consent__button/);
  await expect(
    banner.getByRole("button", { name: "Allow analytics" }),
  ).toHaveClass(/privacy-consent__button/);
  expect(analyticsRequests).toBe(0);
  await expect(
    page.evaluate(() =>
      Boolean(Reflect.get(window, "__filiusAnalyticsLoaded")),
    ),
  ).resolves.toBe(false);

  await banner.getByRole("button", { name: "Necessary storage only" }).click();
  await expect(banner).toBeHidden();
  expect(analyticsRequests).toBe(0);

  await page.getByRole("button", { name: "Privacy settings" }).click();
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Allow analytics" }).click();
  await expect
    .poll(() => analyticsRequests, { message: "analytics script request" })
    .toBe(1);
  await expect
    .poll(() =>
      page.evaluate(() =>
        Boolean(Reflect.get(window, "__filiusAnalyticsLoaded")),
      ),
    )
    .toBe(true);

  await page.reload();
  await expect(banner).toBeHidden();
  await expect
    .poll(() => analyticsRequests, { message: "analytics after reload" })
    .toBe(2);
});

test("a privacy signal keeps optional analytics disabled", async ({ page }) => {
  let analyticsRequests = 0;
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "globalPrivacyControl", {
      configurable: true,
      value: true,
    });
  });
  await page.route("**/*", async (route) => {
    const pathname = new URL(route.request().url()).pathname.replace(/\/$/, "");
    if (pathname === "/analytics-config.json") {
      await route.fulfill({ json: analyticsConfig });
      return;
    }
    if (pathname === "/mock-analytics.js") {
      analyticsRequests += 1;
      await route.fulfill({ body: "" });
      return;
    }
    await route.continue();
  });

  await page.goto("/");
  await expect(page.locator("#privacy-consent-root")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Datenschutzeinstellungen" }),
  ).toBeVisible();
  expect(analyticsRequests).toBe(0);
});

test("crawler and security disclosure files are published", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  const robotsBody = await robots.text();
  expect(robotsBody).toContain("Sitemap: https://filius.app/sitemap-index.xml");
  expect(robotsBody).toContain("User-agent: GPTBot");
  expect(robotsBody).toContain("Disallow: /analytics-config.json");

  const security = await request.get("/.well-known/security.txt");
  expect(security.ok()).toBe(true);
  const securityBody = await security.text();
  expect(securityBody).toContain("Contact: mailto:support@filius.app");
  expect(securityBody).toContain("Policy: https://filius.app/security/");
});

test("draft iPad learning materials are not published by the website", async ({
  request,
}) => {
  for (const path of [
    "/learning/",
    "/learning/FiliusPad-Lernheft.pdf",
    "/learning/FiliusPad-Lernpfad-SCORM-1.2.zip",
    "/learning/FiliusPad-Fragenbank-Moodle.xml",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

for (const path of [
  "/privacy/",
  "/imprint/",
  "/security/",
  "/en/privacy/",
  "/en/imprint/",
  "/en/security/",
  "/fr/privacy/",
  "/fr/imprint/",
  "/fr/security/",
]) {
  test(`${path} publishes a readable legal or trust page`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
}

test("privacy notice documents the approved contact service and is indexable", async ({
  page,
}) => {
  await page.goto("/en/privacy/");
  await expect(page.locator("main")).toContainText(
    "Oracle Cloud Infrastructure",
  );
  await expect(page.locator("main")).toContainText("Cloudflare, Inc.");
  await expect(page.locator("main")).toContainText("eu-frankfurt-1");
  await expect(page.locator("main")).toContainText(
    "the configured mailbox provider",
  );
  await expect(page.locator("main")).not.toContainText(
    "Cloudflare Email Routing receives",
  );
  await expect(page.locator("main")).toContainText(
    "separate contact service validates the submission",
  );
  await expect(page.locator("main")).toContainText(
    "does not accept attachments or store requests in its own database",
  );
  await expect(page.locator("main")).toContainText("no more than 15 minutes");
  await expect(page.locator("main")).toContainText("no later than 180 days");
  await expect(page.locator("main")).not.toContainText(
    "personal Gmail mailbox",
  );
  await expect(page.locator("main")).toContainText(
    "EU Standard Contractual Clauses",
  );
  await expect(page.locator("main")).toContainText("approximately 35 days");
  await expect(page.locator("main")).toContainText("approximately 77 days");
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test("legal notice publishes the individual operator details without inapplicable register placeholders", async ({
  page,
}) => {
  await page.goto("/en/imprint/");
  await expect(page.locator("main")).toContainText("Sören Schröder");
  await expect(page.locator("main")).toContainText(
    "Max-Brauer-Allee 167f, 22765 Hamburg, Deutschland",
  );
  await expect(page.locator("main")).toContainText(
    "Service provider pursuant to section 5 DDG",
  );
  await expect(page.locator("main")).toContainText(
    "Filius on iPad” is the designation of this offering",
  );
  await expect(page.locator("main")).toContainText(
    "neither willing nor obliged to participate",
  );
  await expect(page.locator("main")).not.toContainText(
    "Editorial responsibility",
  );
  await expect(page.locator("main")).not.toContainText("External-link notice");
  await expect(page.locator("main")).not.toContainText("To be completed");
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test("license pages link all public source repositories without draft treatment", async ({
  page,
}) => {
  for (const path of ["/licenses/", "/en/licenses/", "/fr/licenses/"]) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator(".draft-notice")).toHaveCount(0);
    await expect(
      page.locator('a[href="https://github.com/filius-project/filius-ipad"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('a[href="https://gitlab.com/filius1/filius"]'),
    ).toHaveCount(1);
    await expect(
      page.locator(
        'a[href="https://github.com/filius-project/filius-app-website"]',
      ),
    ).toHaveCount(1);
  }
});
