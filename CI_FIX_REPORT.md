# CI Fix Report

## Target

GitHub Actions run `31420959329`, job `93561295411`.

## Root cause

The static validator treated GitHub Pages project-root URLs in `404.html` as repository-relative filesystem paths. For example:

- `/asr-sanar-school-website/style.css` was incorrectly checked as `asr-sanar-school-website/style.css`
- `/asr-sanar-school-website/assets/images/favicon.svg` was incorrectly checked as `asr-sanar-school-website/assets/images/favicon.svg`
- `/asr-sanar-school-website/` was incorrectly checked as a local directory instead of the deployed project root

The URLs in `404.html` are intentionally root-relative to the GitHub Pages project path so they still work when GitHub serves the custom 404 page for nested missing URLs.

## Changes

1. `scripts/validate.js`
   - Added GitHub Pages base-path awareness through `SITE_BASE_PATH`.
   - Project-root URLs are mapped back to repository files before existence checks.
   - Root-relative URLs outside the configured base path now fail explicitly.
   - Added path-traversal protection.
   - Added explicit 404 base-path assertions.

2. `tests/smoke.js`
   - Test server now simulates deployment below `/asr-sanar-school-website/`.
   - Added custom 404 serving with HTTP 404 status.
   - Added browser checks for the 404 stylesheet, favicon, home link, nested missing routes, and return-to-home behavior.
   - Existing desktop/mobile/theme/FAQ/lightbox/program-page/overflow checks remain enabled.

3. `.github/workflows/ci.yml`
   - Added explicit `SITE_BASE_PATH` for CI.
   - Upgraded `actions/checkout` from v4 to v6.
   - Upgraded `actions/setup-node` from v4 to v6.
   - CI runtime changed to Node.js 24.
   - This removes the Node.js 20 action-runtime deprecation warning on current GitHub-hosted runners.

## Verification

- `node --check scripts/validate.js`: PASS
- `node --check tests/smoke.js`: PASS
- `npm run validate`: PASS
- 404 base-path negative/positive resolution checks: PASS
- Workflow YAML structure inspected: PASS

The full Playwright browser run requires the project dev dependency to be installed. GitHub Actions performs `npm ci` and `npx playwright install --with-deps chromium` before `npm test`, so the updated CI will execute the browser smoke suite after validation passes.
