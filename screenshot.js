/**
 * Screenshot Script using Playwright
 * Takes screenshots of generated landing pages
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function takeScreenshot(options = {}) {
  const {
    landing = 'landing3-dogs',
    pageName = 'index.html',
    width = 1440,
    height = 900,
    fullPage = true,
    output = null
  } = options;

  const distPath = path.join(__dirname, 'dist', landing, pageName);

  if (!fs.existsSync(distPath)) {
    console.error(`File not found: ${distPath}`);
    process.exit(1);
  }

  const fileUrl = `file:///${distPath.replace(/\\/g, '/')}`;
  const screenshotsDir = path.join(__dirname, 'screenshots');

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const outputFile = output || path.join(screenshotsDir, `${landing}-${pageName.replace('.html', '')}-${width}x${height}.png`);

  console.log(`Taking screenshot of: ${landing}/${pageName}`);
  console.log(`Viewport: ${width}x${height}`);
  console.log(`Full page: ${fullPage}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: outputFile,
    fullPage: fullPage
  });

  console.log(`Screenshot saved: ${outputFile}`);

  await browser.close();

  return outputFile;
}

// CLI usage
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--landing' || arg === '-l') {
    options.landing = args[++i];
  } else if (arg === '--page' || arg === '-p') {
    options.pageName = args[++i];
  } else if (arg === '--width' || arg === '-w') {
    options.width = parseInt(args[++i]);
  } else if (arg === '--height' || arg === '-h') {
    options.height = parseInt(args[++i]);
  } else if (arg === '--no-fullpage') {
    options.fullPage = false;
  } else if (arg === '--mobile') {
    options.width = 375;
    options.height = 812;
  } else if (arg === '--tablet') {
    options.width = 768;
    options.height = 1024;
  } else if (arg === '--output' || arg === '-o') {
    options.output = args[++i];
  } else if (arg === '--help') {
    console.log(`
Usage: node screenshot.js [options]

Options:
  --landing, -l   Landing folder name (default: landing3-dogs)
  --page, -p      Page file name (default: index.html)
  --width, -w     Viewport width (default: 1440)
  --height, -h    Viewport height (default: 900)
  --no-fullpage   Don't capture full page
  --mobile        Use mobile viewport (375x812)
  --tablet        Use tablet viewport (768x1024)
  --output, -o    Output file path

Examples:
  node screenshot.js --landing landing3-dogs --mobile
  node screenshot.js -l landing4-kids -p quiz-step1.html
  node screenshot.js --landing landing3-dogs --width 1920 --height 1080
`);
    process.exit(0);
  }
}

takeScreenshot(options).catch(console.error);
