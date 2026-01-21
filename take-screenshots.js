/**
 * Mobile Screenshot Script
 * Takes screenshots of the landing page at different mobile viewports
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function takeScreenshots() {
  console.log('Starting browser...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone 12
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const htmlPath = path.join(__dirname, 'dist', 'landing1-family', 'index.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  console.log(`Opening: ${fileUrl}\n`);

  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait for page to render
  await page.waitForTimeout(1000);

  // Take full page screenshot
  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: path.join(screenshotsDir, 'mobile-375-fullpage.png'),
    fullPage: true
  });

  // Check for horizontal scroll
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  console.log(`\nHorizontal scroll: ${hasHorizontalScroll ? 'YES (PROBLEM!)' : 'NO (OK)'}`);

  if (hasHorizontalScroll) {
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`  Document width: ${scrollWidth}px`);
    console.log(`  Viewport width: ${clientWidth}px`);
    console.log(`  Overflow: ${scrollWidth - clientWidth}px`);

    // Find overflowing elements
    const overflowing = await page.evaluate(() => {
      const vw = window.innerWidth;
      const elements = document.querySelectorAll('*');
      const result = [];

      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > vw + 5 && rect.width > 0) {
          let selector = el.tagName.toLowerCase();
          if (el.className && typeof el.className === 'string') {
            selector += '.' + el.className.split(' ').filter(c => c).slice(0, 2).join('.');
          }
          result.push({
            selector: selector.slice(0, 60),
            right: Math.round(rect.right),
            overflow: Math.round(rect.right - vw)
          });
        }
      });

      // Deduplicate and limit
      const unique = [];
      const seen = new Set();
      for (const item of result) {
        if (!seen.has(item.selector)) {
          seen.add(item.selector);
          unique.push(item);
        }
        if (unique.length >= 10) break;
      }

      return unique;
    });

    if (overflowing.length > 0) {
      console.log('\n  Overflowing elements:');
      overflowing.forEach(el => {
        console.log(`    - ${el.selector} (overflow: ${el.overflow}px)`);
      });
    }
  }

  // Take section screenshots
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
          path: path.join(screenshotsDir, `mobile-${section.name}.png`)
        });
        console.log(`  ✓ ${section.name}`);
      } else {
        console.log(`  ✗ ${section.name} (not found)`);
      }
    } catch (e) {
      console.log(`  ✗ ${section.name} (error: ${e.message})`);
    }
  }

  // Additional viewport tests
  console.log('\nTesting other viewports...');

  const viewports = [
    { name: 'mobile-small', width: 320, height: 568 },
    { name: 'mobile-lg', width: 576, height: 800 },
    { name: 'tablet', width: 768, height: 1024 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(300);

    const hasScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    await page.screenshot({
      path: path.join(screenshotsDir, `${vp.name}-${vp.width}.png`),
      fullPage: true
    });

    console.log(`  ${vp.name} (${vp.width}px): ${hasScroll ? 'SCROLL ISSUE' : 'OK'}`);
  }

  await browser.close();

  console.log(`\nScreenshots saved to: ${screenshotsDir}`);
  console.log('Done!\n');
}

takeScreenshots().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
