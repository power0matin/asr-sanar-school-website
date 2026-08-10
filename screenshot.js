const { chromium } = require("playwright");
const fs = require("node:fs/promises");
const path = require("node:path");

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const outputDir = process.env.SCREENSHOT_DIR || path.join("docs", "screenshots");

const targets = [
  { name: "desktop-light", viewport: { width: 1440, height: 900 }, theme: "light" },
  { name: "desktop-dark", viewport: { width: 1440, height: 900 }, theme: "dark" },
  { name: "mobile-light", viewport: { width: 390, height: 844 }, theme: "light" },
  { name: "mobile-dark", viewport: { width: 390, height: 844 }, theme: "dark" }
];

(async () => {
  await fs.mkdir(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const target of targets) {
      const context = await browser.newContext({
        viewport: target.viewport,
        colorScheme: target.theme,
        reducedMotion: "reduce"
      });
      const page = await context.newPage();
      await page.addInitScript((theme) => localStorage.setItem("theme", theme), target.theme);
      await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts?.ready);
      await page.screenshot({ path: path.join(outputDir, `${target.name}.png`), fullPage: false });
      await context.close();
    }
  } finally {
    await browser.close();
  }
  console.log(`Screenshots written to ${outputDir}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
