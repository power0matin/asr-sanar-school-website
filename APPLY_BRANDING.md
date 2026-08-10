# Apply the Official Branding Update

Copy the contents of this archive over the repository root.

Then remove the stale files listed in `DELETE_FILES.txt`.

Recommended verification:

```bash
npm ci
npx playwright install chromium
npm run validate
npm test
```

After the checks pass, commit the changes using `COMMIT_MESSAGE_BRANDING.txt`.

The official uploaded logo is preserved at:

`assets/images/school-logo-original.png`
