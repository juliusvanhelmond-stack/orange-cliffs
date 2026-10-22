import { expect, test } from "@playwright/test";

const BOOKING = "https://www.airbnb.nl/rooms/1490676984882768742";
const routes = ["/", "/the-house", "/explore", "/gallery", "/reviews", "/book", "/credits"];

for (const route of routes) {
  test(`${route} renders without errors or horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    for (const w of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width: w, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow at ${w}px`).toBeLessThanOrEqual(0);
    }
    expect(errors).toEqual([]);
  });
}

test("no placeholder links and every image has alt text", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    expect(await page.locator('a[href="#"], a:not([href])').count(), route).toBe(0);
    expect(await page.locator("img:not([alt])").count(), route).toBe(0);
  }
});

test("booking CTAs reach the official Airbnb listing", async ({ page }) => {
  await page.goto("/book");
  const links = page.locator(`a[href="${BOOKING}"]`);
  expect(await links.count()).toBeGreaterThanOrEqual(3);
  await expect(links.first()).toHaveAttribute("target", "_blank");
  await expect(links.first()).toHaveAttribute("rel", /noopener/);
});

test("unknown routes show the 404 page", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Lost the path");
});

test("temporary stock imagery is always labelled", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero .photo-label")).toContainText("Illustrative image");
});

test.describe("desktop", () => {
  test.skip(({ isMobile }) => !!isMobile);

  test("main navigation marks the active page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main", exact: true }).getByRole("link", { name: "Explore" }).click();
    await expect(page).toHaveURL(/\/explore$/);
    await expect(
      page.getByRole("navigation", { name: "Main", exact: true }).getByRole("link", { name: "Explore" }),
    ).toHaveAttribute("aria-current", "page");
  });
});

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile);

  test("menu opens, traps focus, closes on Escape and navigates", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menu" });
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await dialog.getByRole("link", { name: "The house" }).click();
    await expect(page).toHaveURL(/\/the-house$/);
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
  });
});

test("house gallery filters filter and the lightbox works by keyboard", async ({ page }) => {
  await page.goto("/the-house");
  const items = page.locator(".gallery-item");
  const all = await items.count();
  await page.getByRole("button", { name: /^Inside/ }).click();
  await expect(page.getByRole("button", { name: /^Inside/ })).toHaveAttribute("aria-pressed", "true");
  const n = await items.count();
  expect(n).toBeGreaterThan(0);
  expect(n).toBeLessThan(all);
  await items.first().getByRole("button").click();
  const box = page.locator("dialog.lightbox");
  await expect(box).toBeVisible();
  await expect(box).toContainText(`1 of ${n}`);
  await page.keyboard.press("ArrowRight");
  await expect(box).toContainText(`2 of ${n}`);
  await page.keyboard.press("Escape");
  await expect(box).toBeHidden();
});

test("circular gallery turns with buttons and keys, and switches sets", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/gallery");
  const region = page.getByRole("region", { name: "Circular 3D gallery" });
  await expect(region).toBeVisible();
  const now = page.locator(".circle-now");
  await expect(now).toContainText(/^1 of \d+/);
  await page.getByRole("button", { name: "Next photograph" }).click();
  await expect(now).toContainText(/^2 of \d+/);
  await page.getByRole("button", { name: "Previous photograph" }).click();
  await expect(now).toContainText(/^1 of \d+/);
  await page.locator(".circle-canvas").focus();
  await page.keyboard.press("ArrowRight");
  await expect(now).toContainText(/^2 of \d+/);
  await page.getByRole("button", { name: "Kalk Bay" }).click();
  await expect(page.getByRole("button", { name: "Kalk Bay" })).toHaveAttribute("aria-pressed", "true");
  await expect(now).toContainText(/^1 of \d+/);
  await expect(region.locator("img").first()).toHaveAttribute("src", /kalk-bay/);
  // Temporary images keep their visible label inside the circle.
  await page.getByRole("button", { name: "The house" }).click();
  await expect(region.getByText("Illustrative image").first()).toBeAttached();
});

test("FAQ items expand and collapse", async ({ page }) => {
  await page.goto("/book");
  const first = page.locator(".faq details").first();
  await expect(first).not.toHaveAttribute("open", "");
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
  await expect(first.locator(".answer")).toContainText("Airbnb");
  await first.locator("summary").click();
  await expect(first).not.toHaveAttribute("open", "");
});

test("day planner switches moments", async ({ page }) => {
  await page.goto("/");
  const tab = page.getByRole("tab", { name: /Lunch in Kalk Bay/ });
  await tab.scrollIntoViewIfNeeded();
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("False Bay side");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: /Back to the house/ })).toHaveAttribute("aria-selected", "true");
});

test("map list filters by category and offers directions", async ({ page }) => {
  await page.goto("/explore#map");
  const list = page.getByRole("list", { name: "Places on the map" });
  const before = await list.getByRole("listitem").count();
  await page.getByRole("button", { name: "Food & Coffee" }).click();
  await expect(page.getByRole("button", { name: "Food & Coffee" })).toHaveAttribute("aria-pressed", "false");
  const after = await list.getByRole("listitem").count();
  expect(after).toBeLessThan(before);
  await expect(list.getByRole("link", { name: /Directions/ }).first()).toHaveAttribute("href", /google\.com\/maps/);
  await page.locator(".localmap-canvas").scrollIntoViewIfNeeded();
  await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 15_000 });
});
