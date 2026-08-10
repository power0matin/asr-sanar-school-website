# Apply this update

Extract the archive over the repository root and replace existing files.

Then remove any paths listed in `DELETE_FILES.txt` if they still exist.

Recommended checks:

```bash
npm ci
npm run validate
npx playwright install --with-deps chromium
npm test
```

Commit with the message in `COMMIT_MESSAGE.txt`.
