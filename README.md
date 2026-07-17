# ASR Sanar School Website

A modern, responsive website for **Asr Sanat Technical School** (هنرستان عصر صنعت) — a private vocational high school for boys in Fardis, Alborz, Iran. Built with vanilla HTML, CSS, and JavaScript with full RTL support.

## Features

- **Dark / Light Mode** — persistent toggle via `localStorage`
- **RTL Layout** — native right-to-left direction with Vazirmatn Persian font
- **Responsive Design** — mobile-first, works across all screen sizes
- **Scroll Reveal Animations** — IntersectionObserver-powered section transitions
- **Glassmorphism Header** — sticky header with backdrop blur
- **Image Lightbox** — click-to-zoom gallery with navigation and keyboard support
- **Staff Directory** — filterable cards by department (Engineering, Arts, Management)
- **Contact Form** — with validation and toast notifications
- **FAQ Accordion** — collapsible frequently asked questions
- **News Modal** — expandable news/announcement cards
- **SEO Optimized** — Open Graph tags, Twitter Card, JSON-LD structured data
- **Scroll Progress Bar** — visual indicator of page scroll position
- **Animated Hero** — gradient background animation with floating image effect

## Programs

| Program | Description |
|---------|-------------|
| Network & Software | Programming, computer networking, web development, IT skills |
| Accounting | Accounting principles, financial management, accounting software |
| Electronics & Electrical | Electronic circuits, industrial electrical systems, technical skills |

## Project Structure

```
.
├── index.html                  # Main page
├── style.css                   # All styles (CSS custom properties, responsive)
├── script.js                   # All interactivity (dark mode, lightbox, etc.)
├── honarestan-asr-sanaat.png   # School logo
├── programs/
│   ├── network.html            # Network & Software program page
│   ├── accounting.html         # Accounting program page
│   └── electronics.html        # Electronics program page
└── assets/
    ├── fonts/
    │   └── vazirmatn/          # Vazirmatn Persian font files
    └── images/
        ├── school.webp         # School photo
        ├── gallery/            # Gallery images
        └── staff/              # Staff photos
```

## Tech Stack

- **HTML5** — semantic markup with accessibility attributes (`aria-label`, `aria-expanded`, `role`)
- **CSS3** — custom properties, CSS Grid, `backdrop-filter`, `color-mix()`, `clamp()`, keyframe animations
- **JavaScript (ES6+)** — vanilla JS with `IntersectionObserver`, event delegation, `localStorage`

## Getting Started

This is a static website with no build step required.

1. Clone the repository:
   ```bash
   git clone https://github.com/power0matin/asr-sanar-school-website.git
   ```

2. Open `index.html` in a browser, or serve locally:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .
   ```

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties
- CSS Grid
- `backdrop-filter`
- IntersectionObserver API

## Contact

- **Address**: Fardis, Alborz, Iran (between Canal and Fleke-3, 29th New Street)
- **Phone**: 026-000000
- **Email**: info@school.ir
- **Hours**: Saturday to Wednesday, 8:00 - 16:00

## License

All rights reserved. &copy; Asr Sanat Technical School
