const { chromium } = require("playwright");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.TEST_PORT || 4173);
const host = "127.0.0.1";
const siteBasePath = normalizeBasePath(process.env.SITE_BASE_PATH || "/asr-sanar-school-website/");
const baseUrl = `http://${host}:${port}${siteBasePath}`;
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".xml": "application/xml",
};

function normalizeBasePath(value) {
  let normalized = String(value || "/").trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (!normalized.endsWith("/")) normalized = `${normalized}/`;
  return normalized.replace(/\/{2,}/g, "/");
}

function requestPathToFile(urlPath) {
  if (urlPath === siteBasePath.slice(0, -1)) return "index.html";
  if (!urlPath.startsWith(siteBasePath)) return null;

  let rel = urlPath.slice(siteBasePath.length);
  if (!rel || rel.endsWith("/")) rel += "index.html";

  const full = path.resolve(root, rel);
  const relativeToRoot = path.relative(root, full);
  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) return null;
  return relativeToRoot;
}

function sendFile(res, relativePath, status = 200) {
  const full = path.resolve(root, relativePath);
  if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) return false;

  res.writeHead(status, { "content-type": mime[path.extname(full)] || "application/octet-stream" });
  fs.createReadStream(full).pipe(res);
  return true;
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://${host}:${port}`).pathname);
  const rel = requestPathToFile(urlPath);

  if (rel && sendFile(res, rel)) return;

  // Simulate GitHub Pages custom 404 behavior inside the repository base path.
  if (urlPath === siteBasePath.slice(0, -1) || urlPath.startsWith(siteBasePath)) {
    if (sendFile(res, "404.html", 404)) return;
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

const check = (condition, message) => {
  if (!condition) throw new Error(message);
};

(async () => {
  await new Promise((resolve) => server.listen(port, host, resolve));
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(baseUrl, { waitUntil: "networkidle" });
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

    check(await page.locator(".gallery-mosaic").count() === 1, "Gallery mosaic missing");
    check(await page.locator(".gallery-item").count() === 4, "Expected 4 gallery items");
    check(await page.locator("[data-gallery-play]").count() === 0, "Autoplay control should be removed");
    check(await page.locator(".gallery-toolbar").count() === 0, "Gallery toolbar should be removed");
    check(await page.locator(".hero-school-logo").evaluate((el) => getComputedStyle(el).animationName !== "none"), "Logo motion missing");

    await page.locator(".gallery-item").first().click();
    check(!(await page.locator("#lightbox").getAttribute("hidden")), "Lightbox did not open");
    check(await page.evaluate(() => getComputedStyle(document.body).overflow === "hidden"), "Lightbox did not lock body scroll");
    await page.locator("[data-lightbox-close]").click();
    check(await page.locator("#lightbox").getAttribute("hidden") !== null, "Lightbox did not close");
    check(await page.evaluate(() => getComputedStyle(document.body).overflow !== "hidden"), "Lightbox left body scroll locked");

    for (const route of ["programs/network.html", "programs/accounting.html", "programs/electronics.html"]) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      check(await page.locator("h1").count() === 1, `${route}: expected one h1`);
      check(await page.locator("footer.site-footer").count() === 1, `${route}: footer missing`);
    }

    // Verify the custom 404 under a nested path, including root-relative assets
    // and the home link that previously triggered false validator failures.
    const notFoundResponse = await page.goto(`${baseUrl}missing/nested/page`, { waitUntil: "networkidle" });
    check(notFoundResponse && notFoundResponse.status() === 404, "Custom 404 did not return HTTP 404");
    check(await page.locator(".error-code").textContent() === "404", "Custom 404 content missing");
    check(await page.locator('link[rel="stylesheet"]').getAttribute("href") === `${siteBasePath}style.css`, "404 stylesheet base path is wrong");
    check(await page.locator('link[rel="icon"]').getAttribute("href") === `${siteBasePath}assets/images/favicon.ico`, "404 favicon base path is wrong");
    check(await page.locator(`a[href="${siteBasePath}"]`).count() === 1, "404 home link base path is wrong");
    check(
      await page.evaluate((expected) => [...document.styleSheets].some((sheet) => sheet.href && new URL(sheet.href).pathname === expected), `${siteBasePath}style.css`),
      "404 stylesheet failed to load",
    );

    await page.locator(`a[href="${siteBasePath}"]`).click();
    await page.waitForLoadState("domcontentloaded");
    check(new URL(page.url()).pathname === siteBasePath, "404 home link did not return to project root");

    check(pageErrors.length === 0, `Page errors: ${pageErrors.join(" | ")}`);
    await page.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto(baseUrl, { waitUntil: "domcontentloaded" });
    check(await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "Mobile horizontal overflow");
    await mobile.locator("#menuToggle").click();
    check(await mobile.locator("#menuToggle").getAttribute("aria-expanded") === "true", "Mobile menu aria-expanded failed");
    check(await mobile.locator("#siteNav").getAttribute("data-open") === "true", "Mobile menu did not open");
    await mobile.locator("#siteNav a").first().click();
    check(await mobile.locator("#menuToggle").getAttribute("aria-expanded") === "false", "Mobile menu did not close after navigation");
    const mobileGallery = mobile.locator(".gallery-mosaic");
    check(await mobileGallery.evaluate((el) => getComputedStyle(el).display === "flex"), "Mobile gallery should become a swipe rail");
    check(await mobileGallery.evaluate((el) => el.scrollWidth > el.clientWidth), "Mobile gallery should be horizontally swipeable");
    await mobile.close();

    console.log("Smoke tests passed: GitHub Pages base path, custom 404, gallery mosaic/swipe, motion, desktop, mobile, theme, FAQ, lightbox, program pages, overflow.");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(error);
  server.close(() => process.exit(1));
});
