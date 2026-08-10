# Production Hardening Test Report

Date: 2026-08-10
Target: `power0matin/asr-sanar-school-website` (`main` baseline reviewed before the changes)

## Stage results

| Stage | Work | Result |
| --- | --- | --- |
| 1 | Remove fake/placeholder school claims and replace them with defensible public information | PASS |
| 2 | Remove the fake-success contact form and use real telephone contact | PASS |
| 3 | Remove non-functional fake news UI and consolidate the lightbox lifecycle | PASS |
| 4 | Add `assets/data/school.json` and synchronize public school data | PASS |
| 5 | Production SEO: canonical, OG/Twitter, JSON-LD, robots, sitemap, manifest, favicon, 404 | PASS |
| 6 | Accessibility: skip link, focus-visible, ARIA state, contrast, reduced motion, lightbox focus | PASS |
| 7 | Rebuild all three program pages with shared navigation/theme/footer and metadata | PASS |
| 8 | Performance hardening: remove forced skeleton delay, CSS-only hero, lazy gallery images, content visibility | PASS |
| 9 | Gallery input hardening: keyboard, swipe/pointer, pause/resume autoplay, visibility/reduced-motion handling | PASS |
| 10 | Remove stale JS/CSS paths and duplicate legacy feature logic | PASS |
| 11 | Stop referencing SVG content through misleading `.jpg` placeholder paths; add deletion manifest | PASS |
| 12 | Portable package/screenshot tooling and static validator | PASS |
| 13 | Synchronize English/Persian docs; add sources, contribution rules, and explicit license | PASS |
| 14 | Add GitHub Actions validation + browser smoke-test workflow | PASS |
| 15 | Chromium regression pass and visual review at desktop/mobile in light/dark modes | PASS |
| 16 | Integrate the official school logo across site identity, favicon/app icons, OG preview, program pages, 404, docs and CI branding checks | PASS |

## Automated checks executed locally

- HTML structural checks with BeautifulSoup
- Duplicate-ID and ARIA-target checks
- CSS parsing with `tinycss2`
- JavaScript syntax checks with Node.js 22
- WCAG contrast calculations for primary text tokens
- Static project validation with `scripts/validate.js` (missing unchanged repository assets allowed in the patch-only workspace)
- Chromium interaction tests using Playwright with the final HTML/CSS/JS inlined because the execution environment blocks local HTTP/file navigation
- Desktop viewport: 1440×900
- Mobile viewport: 390×844
- FAQ interaction and `aria-expanded`
- Theme toggle
- Gallery autoplay pause state
- Lightbox open/close, body scroll lock, and scroll restoration
- All three program pages
- Desktop/mobile horizontal overflow checks
- Visual screenshots in light and dark themes

## Browser regression result

- Desktop layout: PASS
- FAQ + ARIA: PASS
- Theme toggle: PASS
- Gallery + lightbox: PASS
- Program pages: PASS
- Mobile navigation + overflow: PASS
- Four responsive screenshots: PASS
- Official logo integrity (original upload SHA-256 preserved): PASS
- Official logo in Header / Hero / Footer / program pages / 404: PASS
- Legacy generated mark and gallery placeholder references removed: PASS
- Favicon / PWA icons / Open Graph cover derived from the official logo: PASS

## Environment limitation

The sandbox cannot reach the npm registry, so a fresh `npm ci` could not be executed locally. `package.json` and `package-lock.json` were validated structurally, and the browser suite was executed with the Playwright Python package and system Chromium already available in the environment. GitHub Actions is configured to run `npm ci`, install Chromium, run the strict validator, and execute the repository's Node Playwright smoke suite on every pull request and push to `main`.

## Deletions

Apply the paths listed in `DELETE_FILES.txt` after copying the replacement files into the repository. Those files are stale screenshot artifacts or placeholder assets that are no longer referenced.
