// Screenshot routes at several widths and report console errors and horizontal overflow.
// Usage: node scripts/shoot.mjs [baseUrl] [outDir] [routes...]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? ".shots";
const routes = process.argv.slice(4).length ? process.argv.slice(4) : ["/", "/the-house", "/explore", "/gallery", "/reviews", "/book"];
const widths = (process.env.WIDTHS ?? "1440,390").split(",").map(Number);
const full = process.env.FULL !== "0";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
let problems = 0;
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1 });
  for (const r of routes) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(base + r, { waitUntil: "networkidle" });
    // Scroll through so lazy images and reveals fire, then return to top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const name = `${out}/${w}${r === "/" ? "-home" : r.replaceAll("/", "-")}.png`;
    await page.screenshot({ path: name, fullPage: full });
    const flag = overflow > 0 || errors.length;
    if (flag) problems++;
    console.log(`${flag ? "!!" : "ok"} ${w} ${r} overflow=${overflow} errors=${errors.length}${errors.length ? "\n   " + errors.slice(0, 5).join("\n   ") : ""}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
process.exit(problems ? 1 : 0);
