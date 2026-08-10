const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const allowMissing = process.env.ALLOW_MISSING_ASSETS === "1";
const siteBasePath = normalizeBasePath(process.env.SITE_BASE_PATH || "/asr-sanar-school-website/");
const failures = [];
const htmlFiles = [
  "index.html",
  "404.html",
  "programs/network.html",
  "programs/accounting.html",
  "programs/electronics.html",
];

function normalizeBasePath(value) {
  let normalized = String(value || "/").trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (!normalized.endsWith("/")) normalized = `${normalized}/`;
  return normalized.replace(/\/{2,}/g, "/");
}

const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));
const fail = (message) => failures.push(message);

function resolveLocalReference(sourceFile, ref) {
  let pathname = ref;

  // GitHub Pages project URLs are rooted at /<repository-name>/ rather than
  // at the repository filesystem root. Strip that deployment prefix before
  // checking the corresponding file in the checkout.
  if (pathname === siteBasePath.slice(0, -1) || pathname.startsWith(siteBasePath)) {
    pathname = pathname === siteBasePath.slice(0, -1)
      ? ""
      : pathname.slice(siteBasePath.length);
    if (!pathname || pathname.endsWith("/")) pathname += "index.html";
  } else if (pathname.startsWith("/")) {
    fail(`${sourceFile}: root-relative reference is outside SITE_BASE_PATH ${siteBasePath}: ${ref}`);
    return null;
  } else {
    pathname = path.join(path.dirname(sourceFile), pathname);
  }

  const resolved = path.normalize(pathname);
  const absolute = path.resolve(root, resolved);
  const relativeToRoot = path.relative(root, absolute);
  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    fail(`${sourceFile}: local reference escapes repository root: ${ref}`);
    return null;
  }

  return relativeToRoot || "index.html";
}

for (const file of htmlFiles) {
  if (!exists(file)) {
    fail(`Missing HTML file: ${file}`);
    continue;
  }

  const html = read(file);
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);

  if (dupes.length) fail(`${file}: duplicate id(s): ${[...new Set(dupes)].join(", ")}`);
  if (!/<html[^>]+lang=["']fa["'][^>]+dir=["']rtl["']/.test(html)) fail(`${file}: missing fa/rtl html attributes`);
  if (!/<meta[^>]+name=["']viewport["']/.test(html)) fail(`${file}: missing viewport meta`);

  if (file !== "404.html") {
    if (!/<meta[^>]+name=["']description["']/.test(html)) fail(`${file}: missing meta description`);
    if (!/<link[^>]+rel=["']canonical["']/.test(html)) fail(`${file}: missing canonical`);
  }

  const localRefs = [...html.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)].map((m) => m[1]);
  for (const ref of localRefs) {
    if (/^(https?:|tel:|mailto:|data:|javascript:)/.test(ref)) continue;
    const resolved = resolveLocalReference(file, ref);
    if (resolved && !exists(resolved) && !allowMissing) {
      fail(`${file}: broken local reference ${ref} -> ${resolved}`);
    }
  }
}

// 404.html is intentionally project-root-relative so it still resolves assets
// when GitHub Pages serves the custom 404 for a nested missing URL.
const notFound = read("404.html");
for (const requiredRef of [
  `${siteBasePath}style.css`,
  `${siteBasePath}assets/images/favicon.svg`,
  siteBasePath,
]) {
  if (!notFound.includes(requiredRef)) {
    fail(`404.html: expected GitHub Pages base-path reference missing: ${requiredRef}`);
  }
}

const index = read("index.html");
const script = read("script.js");
const css = read("style.css");
const school = JSON.parse(read("assets/data/school.json"));

for (const forbidden of ["026-000000", "info@school.ir", "/api/contact", "+۳۰۰", "+۲۵", "مدرسه آینده سازان"]) {
  if (index.includes(forbidden) || script.includes(forbidden)) {
    fail(`Forbidden placeholder/stale content found: ${forbidden}`);
  }
}

for (const required of [school.phone_display, school.location_fa, ...school.programs]) {
  if (!index.includes(required)) fail(`index.html not synced with school.json: ${required}`);
}

if (!css.includes(":focus-visible")) fail("style.css: focus-visible styles missing");
if (!css.includes("prefers-reduced-motion")) fail("style.css: reduced motion handling missing");
if (!script.includes('setAttribute("aria-expanded"')) fail("script.js: dynamic aria-expanded updates missing");
if (!exists("robots.txt") || !exists("sitemap.xml") || !exists("site.webmanifest")) fail("SEO support files missing");

if (failures.length) {
  console.error(`Validation failed (${failures.length}):`);
  failures.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log(
  `Validation passed: ${htmlFiles.length} HTML pages + GitHub Pages base path (${siteBasePath}) + metadata + accessibility + school-data sync.`,
);
