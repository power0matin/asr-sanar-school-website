# Test Report — Gallery & Motion Update

## PASS

- `node --check script.js`
- `node --check scripts/validate.js`
- `node --check tests/smoke.js`
- Static validator with GitHub Pages base path
- HTML parse for `index.html`, `404.html`, and all three program pages
- CSS parse with `tinycss2` (no parser errors)
- No `prefers-reduced-motion` CSS/JS override remains
- No gallery autoplay/toolbar controls remain
- Gallery mosaic contains four interactive images
- Branding copy cleanup is enforced by validator
- 404 base-path favicon validator updated to `favicon.ico`

## Browser smoke test

`tests/smoke.js` was updated for the new desktop mosaic, mobile swipe rail, no-autoplay requirement, logo motion, lightbox, theme, FAQ, program pages, overflow, and custom 404 behavior.

The current execution sandbox blocks browser navigation to both localhost and `file://` URLs (`ERR_BLOCKED_BY_ADMINISTRATOR`), so the interactive browser suite cannot be executed locally here. GitHub Actions will execute the Playwright smoke test after commit/push.
