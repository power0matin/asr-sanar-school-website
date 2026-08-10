# Apply this update

Extract the archive over the repository root and replace existing files.

Then remove the path listed in `DELETE_FILES.txt`:

```text
program-switcher.js
```

Recommended checks:

```bash
npm run validate
npm test
```
