# Asr Sanat Technical School Website

<div align="center">

### Modern, responsive website for Asr Sanat Technical School

A lightweight bilingual school website built with **HTML, CSS, and vanilla JavaScript** — no frameworks or build tools required.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![RTL](https://img.shields.io/badge/RTL-Supported-blueviolet)](#rtl--persian-support)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-success)](#responsive-design)
[![Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen)](#tech-stack)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)](#license)

[English](README.md) · [فارسی](README.fa.md)

</div>

## Overview

This repository contains the official website project for **Asr Sanat Technical School** (هنرستان عصر صنعت), a vocational and technical school in **Fardis, Alborz, Iran**.

The website is designed to provide students, parents, and visitors with a fast and accessible way to learn about the school, its educational programs, staff, announcements, facilities, and contact information.

The entire project is built without external JavaScript frameworks or build systems, making it easy to maintain, deploy, and host almost anywhere.

## Highlights

- **Zero framework dependencies** — HTML, CSS, and vanilla JavaScript
- **No build process** — clone the repository and run it directly
- **Responsive design** — optimized for desktop, tablet, and mobile devices
- **Native RTL support** — designed for Persian content
- **Dark and light themes** — with persistent user preference
- **Accessible markup** — semantic HTML, keyboard support, and ARIA attributes
- **SEO-friendly structure** — metadata, Open Graph, Twitter Cards, and JSON-LD
- **Lightweight architecture** — suitable for static hosting
- **Custom Persian typography** — using the Vazirmatn font family

## Screenshots

<div align="center">

|                                    Desktop                                    |                                   Mobile                                   |
| :---------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| ![Asr Sanat website on desktop](assets/images/asr-sanat-desktop-1440x900.png) | ![Asr Sanat website on mobile](assets/images/asr-sanat-mobile-390x844.png) |

</div>

> **Note:** The images above are placeholders. Replace them with actual desktop and mobile screenshots of the website when available.

## Features

| Feature                | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| **Dark / Light Mode**  | Theme preference is stored using `localStorage`                 |
| **RTL Support**        | Native right-to-left layout optimized for Persian content       |
| **Responsive Design**  | Adapts to phones, tablets, laptops, and desktop displays        |
| **Scroll Reveal**      | Lightweight reveal animations powered by `IntersectionObserver` |
| **Sticky Header**      | Glass-style navigation with backdrop blur                       |
| **Image Lightbox**     | Enlarged gallery images with keyboard navigation                |
| **Staff Directory**    | Staff cards organized and filterable by department              |
| **Contact Form**       | Client-side validation with user feedback                       |
| **FAQ Accordion**      | Expandable and collapsible FAQ sections                         |
| **News Modal**         | Detailed announcements without leaving the page                 |
| **SEO Metadata**       | Open Graph, Twitter Cards, and structured data                  |
| **Scroll Progress**    | Visual indicator showing page scroll progress                   |
| **Animated Hero**      | Subtle animations and visual effects in the hero section        |
| **Persian Typography** | Local Vazirmatn font assets for consistent rendering            |

## Educational Programs

The website currently includes dedicated pages for the school's main technical programs.

| Program                      | Focus Areas                                                             |
| ---------------------------- | ----------------------------------------------------------------------- |
| **Network & Software**       | Programming, networking, web development, software, and IT              |
| **Accounting**               | Accounting principles, financial management, and accounting software    |
| **Electronics & Electrical** | Electronic circuits, electrical systems, and practical technical skills |

Program pages are available under the [`programs/`](programs/) directory.

## Tech Stack

### HTML5

Used for semantic document structure and accessibility.

Key elements include:

- Semantic sections and navigation
- ARIA attributes
- Accessible buttons and controls
- SEO and social metadata
- Structured data

### CSS3

The interface is implemented entirely with modern CSS.

Technologies and techniques include:

- CSS Custom Properties
- CSS Grid
- Flexbox
- Responsive media queries
- `clamp()`
- `backdrop-filter`
- `color-mix()`
- Keyframe animations
- RTL-aware layouts

### JavaScript

All interactive functionality is implemented with vanilla JavaScript.

Key browser APIs and patterns include:

- `IntersectionObserver`
- `localStorage`
- Event delegation
- DOM APIs
- Keyboard event handling
- Form validation

No JavaScript framework is required.

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
├── honarestan-asr-sanaat.png
│
├── README.md
├── README.fa.md
├── CONTRIBUTING.md
│
├── programs/
│   ├── network.html
│   ├── accounting.html
│   └── electronics.html
│
└── assets/
    ├── fonts/
    │   └── vazirmatn/
    │       └── ...
    │
    └── images/
        ├── school.webp
        ├── gallery/
        │   └── ...
        └── staff/
            └── ...
```

### Main Files

| File                        | Purpose                                                   |
| --------------------------- | --------------------------------------------------------- |
| `index.html`                | Main website and landing page                             |
| `style.css`                 | Global styles, themes, animations, and responsive layouts |
| `script.js`                 | Website interactions and UI behavior                      |
| `honarestan-asr-sanaat.png` | School logo                                               |
| `README.md`                 | English project documentation                             |
| `README.fa.md`              | Persian project documentation                             |
| `programs/`                 | Individual educational program pages                      |
| `assets/fonts/`             | Locally hosted font files                                 |
| `assets/images/`            | Website images, gallery assets, and staff photos          |

## Getting Started

Because this is a static website, there is **no installation or build step**.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Run the Website

You can open `index.html` directly in a modern browser.

For the best development experience, however, running a local HTTP server is recommended.

### Python

```bash
python -m http.server 8000
```

### Node.js

```bash
npx serve .
```

### PHP

```bash
php -S localhost:8000
```

Then open:

```text
http://localhost:8000
```

### VS Code

If you use Visual Studio Code:

1. Install the **Live Server** extension.
2. Open the project directory.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

## Responsive Design

The website follows a mobile-first approach and is designed to work across common screen sizes, including:

- Smartphones
- Tablets
- Laptops
- Desktop monitors

Layouts, navigation, typography, spacing, and interactive components adapt automatically based on the available viewport.

## RTL & Persian Support

Persian is a first-class language in this project.

The interface includes:

- Right-to-left layouts
- RTL-aware spacing and alignment
- Persian-friendly typography
- Local Vazirmatn font files
- Responsive Persian text rendering
- Separate Persian documentation

The Persian README is available here:

**[README.fa.md](README.fa.md)**

## Accessibility

The project aims to provide an accessible experience through:

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard-accessible controls
- Descriptive image alternative text
- Clear focus states
- Accessible navigation
- Proper button semantics
- `aria-expanded` states for collapsible elements

## SEO

The website includes common SEO and social-sharing foundations such as:

- Page titles and descriptions
- Open Graph metadata
- Twitter Card metadata
- Structured data with JSON-LD
- Semantic heading hierarchy
- Descriptive image alternative text
- Search-engine-friendly HTML structure

For production deployment, remember to update metadata with the final:

- Domain name
- Canonical URL
- Social preview image
- Contact details
- School information

## Browser Support

The website targets current versions of major modern browsers.

| Browser            | Support |
| ------------------ | :-----: |
| Google Chrome      |   ✅    |
| Microsoft Edge     |   ✅    |
| Mozilla Firefox    |   ✅    |
| Safari             |   ✅    |
| Chrome for Android |   ✅    |
| Safari on iOS      |   ✅    |

Some visual effects may depend on browser support for features such as:

- CSS Custom Properties
- CSS Grid
- `backdrop-filter`
- `color-mix()`
- `IntersectionObserver`

The core website should remain usable even when non-essential visual effects are unavailable.

## Deployment

Because the project consists entirely of static files, it can be deployed on almost any static hosting platform.

### GitHub Pages

1. Push the project to GitHub.
2. Open the repository **Settings**.
3. Navigate to **Pages**.
4. Select the appropriate branch.
5. Save the configuration.

### Netlify

Deploy by either:

- Connecting the GitHub repository, or
- Uploading the project directory directly.

No build command is required.

### Vercel

Import the GitHub repository and deploy it as a static project.

### Traditional Hosting

Upload the project files using:

- FTP
- SFTP
- SSH
- Hosting control panel

No server-side runtime is required.

## Development

When modifying the project, keep the existing architecture lightweight.

Recommended principles:

- Avoid unnecessary dependencies
- Keep JavaScript modular and readable
- Preserve RTL compatibility
- Test both dark and light themes
- Test desktop and mobile layouts
- Maintain keyboard accessibility
- Optimize images before adding them
- Keep semantic HTML structure
- Avoid unnecessary layout shifts

## Performance

The project is intentionally lightweight and avoids large client-side frameworks.

For production deployments, additional performance improvements can include:

- Compressing images with WebP or AVIF
- Lazy-loading non-critical images
- Minifying CSS and JavaScript
- Enabling HTTP compression
- Configuring browser caching
- Serving assets through a CDN
- Preloading critical local fonts carefully

## Contributing

Contributions, improvements, and bug reports are welcome.

Before contributing, please read:

**[CONTRIBUTING.md](CONTRIBUTING.md)**

When submitting changes:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the website on desktop and mobile.
5. Submit a pull request with a clear description.

## Contact

## About the School

**Asr Sanat Boys Technical School** is a private vocational and technical school located in Fardis, Alborz Province, Iran.

### Educational Programs

- Computer Network & Software
- Accounting
- Electrotechnics

## School Information

| Information  | Details                                     |
| ------------ | ------------------------------------------- |
| **Name**     | Asr Sanat Boys Technical School             |
| **Type**     | Private Boys' Vocational & Technical School |
| **Location** | Fardis, Alborz Province, Iran               |
| **Phone**    | +98 26 3650 8764                            |

## License

**All Rights Reserved.**

Copyright © Asr Sanat Technical School.

The source code, design, content, branding, and associated assets may not be copied, redistributed, modified, or used without permission from the copyright holder.

<div align="center">

**Asr Sanat Technical School · هنرستان عصر صنعت**

Built with HTML, CSS, and JavaScript.

</div>
