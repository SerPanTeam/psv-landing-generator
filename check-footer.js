const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const htmlPath = path.join(__dirname, 'dist', 'landing1-family', 'index.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

  const footerData = await page.evaluate(() => {
    function rgbToHex(rgb) {
      const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return rgb;
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`.toUpperCase();
    }

    const footer = document.querySelector('.footer');
    if (!footer) return { error: 'footer not found' };

    const results = [];

    // Check footer itself
    results.push({
      selector: '.footer',
      bg: rgbToHex(window.getComputedStyle(footer).backgroundColor)
    });

    // Check all direct children and important elements
    const selectors = [
      '.footer > .container',
      '.footer__nav',
      '.footer__map',
      '.footer__bottom',
      '.footer__links',
      '.footer__map-wrapper',
      '.footer iframe'
    ];

    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        results.push({
          selector: sel,
          bg: rgbToHex(window.getComputedStyle(el).backgroundColor)
        });
      }
    });

    return results;
  });

  console.log('\nFOOTER ELEMENT BACKGROUNDS:\n');
  footerData.forEach(item => {
    console.log(`${item.selector.padEnd(30)} ${item.bg}`);
  });

  // Take screenshot of footer only
  const footerEl = await page.$('.footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'test-results/footer-current.png' });
    console.log('\nFooter screenshot saved to test-results/footer-current.png');
  }

  await browser.close();
})();
