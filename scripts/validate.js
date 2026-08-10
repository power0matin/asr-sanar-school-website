const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const allowMissing = process.env.ALLOW_MISSING_ASSETS === "1";
const failures = [];
const htmlFiles = ["index.html", "404.html", "programs/network.html", "programs/accounting.html", "programs/electronics.html"];

const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));
const fail = (message) => failures.push(message);

for (const file of htmlFiles) {
  if (!exists(file)) { fail(`Missing HTML file: ${file}`); continue; }
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
    const resolved = path.normalize(path.join(path.dirname(file), ref));
    if (!exists(resolved) && !allowMissing) fail(`${file}: broken local reference ${ref} -> ${resolved}`);
  }
}

const index = read("index.html");
const script = read("script.js");
const css = read("style.css");
const school = JSON.parse(read("assets/data/school.json"));
for (const forbidden of ["026-000000", "info@school.ir", "/api/contact", "+۳۰۰", "+۲۵", "مدرسه آینده سازان"]) {
  if (index.includes(forbidden) || script.includes(forbidden)) fail(`Forbidden placeholder/stale content found: ${forbidden}`);
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
console.log(`Validation passed: ${htmlFiles.length} HTML pages + metadata + accessibility + school-data sync.`);
