const { chromium } = require("playwright");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.TEST_PORT || 4173);
const host = "127.0.0.1";
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".webp":"image/webp", ".woff2":"font/woff2", ".json":"application/json", ".xml":"application/xml" };

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://${host}:${port}`).pathname);
  let rel = urlPath.replace(/^\/+/, "") || "index.html";
  if (rel.endsWith("/")) rel += "index.html";
  const full = path.resolve(root, rel);
  if (!full.startsWith(root) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }); res.end("Not found"); return;
  }
  res.writeHead(200, { "content-type": mime[path.extname(full)] || "application/octet-stream" });
  fs.createReadStream(full).pipe(res);
});

const check = (condition, message) => { if (!condition) throw new Error(message); };

(async () => {
  await new Promise((resolve) => server.listen(port, host, resolve));
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));
    await page.goto(`http://${host}:${port}/`, { waitUntil: "networkidle" });
    check(await page.title() === "هنرستان عصر صنعت فردیس | رشته‌های فنی‌وحرفه‌ای", "Unexpected home title");
    check(await page.locator("#programs .program-card").count() === 3, "Expected 3 program cards");
    check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "Desktop horizontal overflow");

    await page.locator(".faq-question").first().click();
    check(await page.locator(".faq-question").first().getAttribute("aria-expanded") === "true", "FAQ aria-expanded not updated");
    check(!(await page.locator("#faq-answer-1").getAttribute("hidden")), "FAQ answer did not open");

    await page.locator("#themeToggle").click();
    check(await page.locator("html").getAttribute("data-theme") === "dark", "Theme toggle failed");
    await page.reload({ waitUntil: "domcontentloaded" });
    check(await page.locator("html").getAttribute("data-theme") === "dark", "Theme persistence failed");

    await page.locator(".gallery-slide").first().click();
    check(!(await page.locator("#lightbox").getAttribute("hidden")), "Lightbox did not open");
    check(await page.evaluate(() => getComputedStyle(document.body).overflow === "hidden"), "Lightbox did not lock body scroll");
    await page.locator("[data-lightbox-close]").click();
    check(await page.locator("#lightbox").getAttribute("hidden") !== null, "Lightbox did not close");
    check(await page.evaluate(() => getComputedStyle(document.body).overflow !== "hidden"), "Lightbox left body scroll locked");

    for (const route of ["programs/network.html", "programs/accounting.html", "programs/electronics.html"]) {
      await page.goto(`http://${host}:${port}/${route}`, { waitUntil: "domcontentloaded" });
      check(await page.locator("h1").count() === 1, `${route}: expected one h1`);
      check(await page.locator("footer.site-footer").count() === 1, `${route}: footer missing`);
    }
    check(pageErrors.length === 0, `Page errors: ${pageErrors.join(" | ")}`);
    await page.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto(`http://${host}:${port}/`, { waitUntil: "domcontentloaded" });
    check(await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "Mobile horizontal overflow");
    await mobile.locator("#menuToggle").click();
    check(await mobile.locator("#menuToggle").getAttribute("aria-expanded") === "true", "Mobile menu aria-expanded failed");
    check(await mobile.locator("#siteNav").getAttribute("data-open") === "true", "Mobile menu did not open");
    await mobile.locator("#siteNav a").first().click();
    check(await mobile.locator("#menuToggle").getAttribute("aria-expanded") === "false", "Mobile menu did not close after navigation");
    await mobile.close();

    console.log("Smoke tests passed: desktop, mobile, theme, FAQ, lightbox, program pages, overflow.");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); server.close(() => process.exit(1)); });
