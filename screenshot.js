const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  // Load the page
  await page.goto('http://127.0.0.1:5501', { waitUntil: 'networkidle' });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  // Toggle dark mode
  await page.click('#themeToggle');
  await page.waitForTimeout(500);

  // Scroll through the entire page to trigger lazy loading
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });

  // Wait for all images and animations to settle
  await page.waitForTimeout(3000);

  // Take full page screenshot
  await page.screenshot({
    path: 'full-page-screenshot-dark.png',
    fullPage: true
  });

  console.log('Dark mode screenshot saved: full-page-screenshot-dark.png');
  await browser.close();
})();
