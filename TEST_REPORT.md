# Program Switcher Test Report

Baseline: `af83204683d1f9a993d7d172af2d3fce0653f506`

## Changes verified

- All three program pages contain exactly three program navigation links.
- Each page has exactly one active program.
- Active link uses both `.is-active` and `aria-current="page"`.
- The active link points to the page currently being viewed.
- The old `program-school-identity` block is removed from all three pages.
- Links to Network & Software, Accounting, and Electrotechnics exist on every program page.
- Existing breadcrumb navigation remains intact.
- Shared `style.css` and `script.js` remain in use.
- New switcher CSS and helper JavaScript are loaded only by program pages.
- Mobile switcher preserves program order and automatically centers the active item.
- CSS parsing completed without parser errors.
- `node --check program-switcher.js` passed.

## Responsive behavior

Desktop:
- three equal program cards are visible side by side;
- current program uses the school's blue/gold visual language;
- hover motion is limited to transform/shadow.

Mobile:
- switcher becomes a horizontal scroll-snap rail;
- scrollbar is hidden;
- active program is centered automatically;
- all programs remain reachable by swipe/touch;
- tab ordering remains consistent across pages.

## Accessibility

- switcher is a real `<nav>` with an accessible label;
- current page uses `aria-current="page"`;
- links remain native keyboard-focusable anchors;
- existing global `:focus-visible` styling continues to apply.
