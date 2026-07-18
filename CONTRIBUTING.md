# Contributing

Thank you for your interest in contributing to the ASR Sanar School Website.

## How to Contribute

### Reporting Issues

- Use the [GitHub Issues](https://github.com/power0matin/asr-sanar-school-website/issues) page
- Include a clear description of the issue
- Mention your browser and device
- If possible, include screenshots

### Suggesting Features

- Open an issue with the **feature request** label
- Describe the feature and its use case
- Explain why it would benefit the school

### Submitting Changes

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Test on multiple devices and browsers
5. Commit with a clear message:
   ```bash
   git commit -m "Add: description of your change"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request

## Development Guidelines

### Code Style

- Use semantic HTML5 elements
- Follow CSS custom property naming conventions
- Write vanilla JavaScript (ES6+)
- Keep the site dependency-free

### RTL Support

- All text content should be in Persian (Farsi)
- Use `dir="rtl"` on HTML elements
- Test layout in both LTR and RTL modes

### Accessibility

- Add `aria-label` to interactive elements
- Use `role` attributes where appropriate
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG 2.1 AA)

### Responsive Design

- Mobile-first approach
- Use `clamp()` for fluid typography
- Test on screens from 320px to 1920px+

## Project Structure

```
index.html          # Main page
style.css           # All styles
script.js           # All interactivity
programs/           # Program detail pages
assets/
  fonts/            # Vazirmatn Persian font
  images/           # School images
```

## Questions?

Open an issue or contact the school directly at info@school.ir.
