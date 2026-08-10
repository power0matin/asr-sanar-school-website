# Test Report — Simplified Program Switcher

## PASS

- `network.html`, `accounting.html`, and `electronics.html` parse successfully.
- Each program page contains exactly one compact `.program-switcher`.
- Each switcher contains exactly three program links.
- Each page has exactly one `aria-current="page"` active tab pointing to itself.
- Removed helper copy: `بین رشته‌ها جابه‌جا شو`.
- Removed redundant switcher title, subtitles, icons, arrows, and `رشته آموزشی` kicker.
- Removed the `program-switcher.js` include; the component is CSS-only.
- Static site validator passes with the GitHub Pages base path when unchanged binary assets are allowed from the existing repository checkout.
- Existing metadata, RTL structure, breadcrumbs, footer, and school-data checks remain valid.

## Visual intent

The switcher is now a compact segmented navigation control: three text-only tabs, a clear blue active state with a subtle school-gold accent, and horizontal overflow only when a narrow viewport cannot fit all three labels.
