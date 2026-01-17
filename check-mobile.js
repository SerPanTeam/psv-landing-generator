const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

  const htmlPath = path.join(__dirname, 'dist', 'landing1-family', 'index.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

  // Screenshot 1: Hero section
  await page.screenshot({ path: 'test-results/mobile-hero.png', fullPage: false });
  console.log('Hero screenshot saved');

  // Screenshot 2: Gallery slider
  const gallery = await page.$('.gallery-slider');
  if (gallery) {
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'test-results/mobile-gallery.png', fullPage: false });
    console.log('Gallery screenshot saved');
  }

  // Full page screenshot
  await page.screenshot({ path: 'test-results/mobile-full.png', fullPage: true });
  console.log('Full page screenshot saved');

  await browser.close();
})();
