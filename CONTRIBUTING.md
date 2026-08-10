# Contributing

Thanks for helping improve the Asr Sanat Technical School website project.

## Before you start

This repository is publicly visible but is **not open-source licensed**. See [LICENSE](LICENSE). Pull requests and issue reports are welcome, but public access does not grant permission to reuse the design, branding, content, or assets elsewhere.

## Reporting a problem

Open a GitHub issue and include:

- a clear description
- steps to reproduce
- browser and device/viewport
- expected vs. actual behavior
- screenshots when useful

Do not publish private student, parent, or staff information in issues.

## Development workflow

```bash
git checkout -b fix/short-description
npm ci
npx playwright install chromium
npm run validate
npm test
```

Then make the change, rerun validation/tests, and open a focused pull request.

## Content rules

Do not add school-specific claims unless they are current and verifiable. This includes:

- staff names and roles
- student/teacher counts
- success or acceptance percentages
- testimonials
- exact addresses when sources conflict
- email addresses or opening hours
- admissions dates and capacity

Update [`assets/data/school.json`](assets/data/school.json) and [`SOURCES.md`](SOURCES.md) when authoritative school information changes.

## Code guidelines

- Keep the production site framework-free and dependency-free at runtime.
- Prefer semantic HTML and native browser APIs.
- Preserve Persian RTL behavior.
- Keep keyboard interactions and ARIA state synchronized.
- Respect `prefers-reduced-motion`.
- Avoid inline styles and inline event handlers.
- Avoid unnecessary external scripts and trackers.
- Keep mobile layouts free of horizontal overflow from 320px upward.

## Commit style

Use concise Conventional Commit-style subjects where practical, for example:

```text
fix: restore lightbox scroll state
feat: improve program page navigation
docs: sync Persian and English README files
```
