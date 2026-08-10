# Apply the CI fix

Copy the archive contents into the repository root, preserving directories, then run:

```bash
npm ci
npm run validate
npx playwright install chromium
npm test
```

The patch targets GitHub Pages base path:

```text
/asr-sanar-school-website/
```

If the repository is renamed later, update `SITE_BASE_PATH` in `.github/workflows/ci.yml`. Both the validator and smoke test read that environment variable.

Files changed:

- `.github/workflows/ci.yml`
- `scripts/validate.js`
- `tests/smoke.js`

`404.html` does not need another change; its existing project-root-relative URLs are correct for GitHub Pages.
