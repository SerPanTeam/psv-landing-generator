const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 600, height: 812 },
  });
  const page = await context.newPage();
  await page.goto('file:///C:/repositories/psv-figma-landing-generator/dist/landing3-dogs/index.html');
  await page.waitForTimeout(500);

  const buttons = [
    { name: 'Hero Banner', selector: '.hero-banner__btn' },
    { name: 'Content Sidebar', selector: '.content-sidebar__btn' },
    { name: 'CTA', selector: '.cta__btn' },
    { name: 'Steps', selector: '.steps__cta-bottom .btn' },
    { name: 'Services', selector: '.services__cta .btn' },
    { name: 'Quiz Form', selector: '.quiz-form button[type=submit]' },
  ];

  console.log('Button Font Sizes at 375px viewport:');
  console.log('=====================================');

  for (const btn of buttons) {
    const el = await page.$(btn.selector);
    if (el) {
      const fontSize = await page.evaluate(e => window.getComputedStyle(e).fontSize, el);
      const text = await el.textContent();
      console.log(btn.name.padEnd(18) + ': ' + fontSize.padEnd(6) + ' | ' + text.trim().substring(0, 40));
    } else {
      console.log(btn.name.padEnd(18) + ': NOT FOUND');
    }
  }

  await browser.close();
})();
