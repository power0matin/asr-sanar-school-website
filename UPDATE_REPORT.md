# Gallery & Motion Update

## What changed

- Rebuilt the gallery as a clean asymmetric mosaic on desktop.
- Switched the mobile gallery to a native horizontal swipe rail with CSS scroll snap.
- Removed autoplay, pause/resume, gallery arrows, toolbar, and pagination-dot controls.
- Kept click/keyboard access to the lightbox and its previous/next navigation.
- Simplified visible Persian copy across the home page and program pages.
- Replaced stiff branding copy such as «نشان رسمی هنرستان» with natural school-facing language.
- Added lightweight transform/opacity motion to the hero, logo, cards, header, links, buttons, gallery images, and lightbox.
- Removed the `prefers-reduced-motion` override and its JavaScript dependency as requested.
- Updated validator and smoke tests for the new gallery and animation behavior.
- Corrected the custom 404 favicon assertion to the current `favicon.ico` branding asset.

## Performance approach

Motion uses compositing-friendly `transform`/`opacity` for the main effects. Gallery image hover uses a small transform with a restrained filter adjustment. No animation framework or runtime dependency was added.
