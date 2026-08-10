# Official School Branding Integration

Date: 2026-08-10

## Source asset

The logo supplied for this update is preserved byte-for-byte as:

`assets/images/school-logo-original.png`

SHA-256:

`0fd5aece41999cd244380ba01144299bef75d569155da22c168d076d3d032089`

The hash matches the uploaded source file exactly.

`assets/images/school-logo.png` only removes unused transparent canvas and adds transparent safety padding. The logo artwork itself is not redrawn or replaced.

## Production integration

The official logo is now used in:

- site header
- home hero identity card
- site footer
- all three program page headers
- all three program page identity badges
- custom 404 page
- README files
- favicon
- Apple touch icon
- 192×192 and 512×512 application icons
- Open Graph / social-share cover
- JSON-LD structured-data `logo`

## Removed generated branding

The previous generic `ع` brand mark is no longer used.

The following generated/stale assets should be removed:

- `assets/images/favicon.svg`
- `assets/images/gallery/gallery-placeholder.svg`
- `honarestan-asr-sanaat.png` if still present in the repository

The fifth placeholder gallery slide was removed instead of replacing a real-school photo with generated artwork.

## Validation

- JavaScript syntax checks: PASS
- CSS parse with `tinycss2`: PASS
- Static validator with branding assertions: PASS
- Desktop branding render (1440×900): PASS
- Mobile branding render (390×844): PASS
- Light theme render: PASS
- Dark theme render: PASS
- No horizontal overflow in the reviewed responsive layouts: PASS
- README screenshots regenerated from the branded version: PASS

The execution environment blocks direct local HTTP/file navigation in Chromium, so the visual captures were produced from an equivalent self-contained render of the final HTML/CSS and exact logo assets. GitHub Actions retains the full project-path Playwright smoke suite for post-commit verification.
