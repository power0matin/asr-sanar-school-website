# Apply this update

This package is based on commit:

`af83204683d1f9a993d7d172af2d3fce0653f506`

Copy these files over the repository root:

- `programs/network.html`
- `programs/accounting.html`
- `programs/electronics.html`
- `program-switcher.css`
- `program-switcher.js`

No files need to be deleted.

Recommended checks after copying:

```bash
node --check program-switcher.js
npm run validate
npm test
```

The existing `style.css` is intentionally left untouched. The switcher styles are isolated in
`program-switcher.css` so this change does not risk regressions in the main site layout.
