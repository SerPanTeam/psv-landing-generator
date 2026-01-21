/**
 * Desktop Screenshot Script
 * Takes screenshots at desktop viewport for Figma comparison
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function takeDesktopScreenshots() {
  console.log('Starting browser for desktop screenshots...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }, // Figma desktop width
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const htmlPath = path.join(__dirname, 'dist', 'landing1-family', 'index.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  console.log(`Opening: ${fileUrl}\n`);

  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Full page screenshot
  console.log('Taking full page screenshot at 1440px...');
  await page.screenshot({
    path: path.join(screenshotsDir, 'desktop-1440-fullpage.png'),
    fullPage: true
  });

  // Section screenshots
  const sections = [
    { name: 'header', selector: '.header' },
    { name: 'hero', selector: '.hero' },
    { name: 'promo', selector: '.promo' },
    { name: 'content-section', selector: '.content-section' },
    { name: 'gallery-slider', selector: '.gallery-slider' },
    { name: 'features', selector: '.features' },
    { name: 'steps', selector: '.steps' },
    { name: 'gallery-fullwidth', selector: '.gallery-fullwidth' },
    { name: 'faq', selector: '.faq' },
    { name: 'services', selector: '.services' },
    { name: 'about', selector: '.about' },
    { name: 'footer', selector: '.footer' },
  ];

  console.log('\nTaking section screenshots...');

  for (const section of sections) {
    try {
      const element = await page.$(section.selector);
      if (element) {
        await element.screenshot({
          path: path.join(screenshotsDir, `desktop-${section.name}.png`)
        });
        console.log(`  ✓ ${section.name}`);
      }
    } catch (e) {
      console.log(`  ✗ ${section.name} (error)`);
    }
  }

  await browser.close();
  console.log(`\nScreenshots saved to: ${screenshotsDir}`);
}

takeDesktopScreenshots().catch(console.error);
