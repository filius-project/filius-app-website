import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const marketingPages = [
  "/",
  "/en/",
  "/fr/",
  "/quickstart/",
  "/faq/",
  "/support/",
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

  await page.goto("/docs/devices/");
  await expect(page.locator(".doc-device")).toHaveCount(7);
  await expect(
    page.getByRole("heading", { name: "Remote Link" }),
  ).toBeVisible();
});

test("expanded documentation is available in all supported languages", async ({
  page,
}) => {
  await page.goto("/en/docs/interface/");
  await expect(page.locator("h1")).toContainText("Interface and controls");
  await page.goto("/fr/docs/applications/");
  await expect(page.locator("h1")).toContainText("Applications simulées");
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
});
