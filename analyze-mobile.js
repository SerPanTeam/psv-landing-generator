/**
 * Mobile Analysis Script
 * Detects overflow issues, button problems, and takes section screenshots
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function analyzeMobile(landing = 'landing3-dogs') {
  console.log(`\n🔍 Analyzing mobile version of ${landing}...\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2, // Retina for better quality
  });

  const page = await context.newPage();

  const distPath = path.join(__dirname, 'dist', landing, 'index.html');
  const fileUrl = `file:///${distPath.replace(/\\/g, '/')}`;

  const screenshotsDir = path.join(__dirname, 'screenshots', 'analysis');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check for horizontal overflow
  console.log('📏 Checking for horizontal overflow...\n');

  const overflowIssues = await page.evaluate(() => {
    const issues = [];
    const viewportWidth = window.innerWidth;

    // Check all elements for overflow
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > viewportWidth + 5) {
        const classes = el.className || 'no-class';
        const tag = el.tagName.toLowerCase();
        issues.push({
          element: `${tag}.${typeof classes === 'string' ? classes.split(' ')[0] : 'no-class'}`,
          overflow: Math.round(rect.right - viewportWidth),
          width: Math.round(rect.width),
          text: el.textContent?.substring(0, 50) || ''
        });
      }
    });

    return issues;
  });

  if (overflowIssues.length > 0) {
    console.log('❌ OVERFLOW ISSUES FOUND:\n');
    // Deduplicate and show unique issues
    const uniqueIssues = [];
    const seen = new Set();
    overflowIssues.forEach(issue => {
      const key = issue.element + issue.overflow;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueIssues.push(issue);
      }
    });

    uniqueIssues.slice(0, 20).forEach(issue => {
      console.log(`  • ${issue.element}`);
      console.log(`    Overflow: ${issue.overflow}px, Width: ${issue.width}px`);
      if (issue.text) console.log(`    Text: "${issue.text.trim().substring(0, 40)}..."`);
      console.log('');
    });
  } else {
    console.log('✅ No horizontal overflow detected\n');
  }

  // Check buttons
  console.log('🔘 Checking buttons...\n');

  const buttonIssues = await page.evaluate(() => {
    const issues = [];
    const buttons = document.querySelectorAll('.btn, button, [class*="btn-"]');

    buttons.forEach((btn, index) => {
      const rect = btn.getBoundingClientRect();
      const styles = window.getComputedStyle(btn);
      const text = btn.textContent?.trim() || '';

      issues.push({
        index: index + 1,
        text: text,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontSize: styles.fontSize,
        whiteSpace: styles.whiteSpace,
        overflow: styles.overflow,
        textOverflow: styles.textOverflow,
        isFullWidth: rect.width >= window.innerWidth - 40,
        isTruncated: btn.scrollWidth > btn.clientWidth
      });
    });

    return issues;
  });

  buttonIssues.forEach(btn => {
    const status = btn.isTruncated ? '❌' : '✅';
    console.log(`  ${status} Button ${btn.index}: "${btn.text.substring(0, 35)}${btn.text.length > 35 ? '...' : ''}"`);
    console.log(`     Size: ${btn.width}x${btn.height}px, Font: ${btn.fontSize}`);
    console.log(`     Full width: ${btn.isFullWidth ? 'Yes' : 'No'}, Truncated: ${btn.isTruncated ? 'YES!' : 'No'}`);
    console.log('');
  });

  // Take section screenshots
  console.log('📸 Taking section screenshots...\n');

  const sections = [
    { name: 'hero', selector: '.hero' },
    { name: 'content', selector: '.content-section' },
    { name: 'cta', selector: '.cta' },
    { name: 'steps', selector: '.steps' },
    { name: 'features', selector: '.features-grid' },
    { name: 'gallery', selector: '.gallery-single-slider, .gallery-decorated' },
    { name: 'faq', selector: '.faq, .faq-cards' },
    { name: 'services', selector: '.services' },
    { name: 'about', selector: '.about' },
  ];

  for (const section of sections) {
    try {
      const element = await page.$(section.selector);
      if (element) {
        const screenshotPath = path.join(screenshotsDir, `${landing}-${section.name}-mobile.png`);
        await element.screenshot({ path: screenshotPath });
        console.log(`  ✓ ${section.name} -> ${section.name}-mobile.png`);
      }
    } catch (e) {
      console.log(`  ✗ ${section.name} (not found or error)`);
    }
  }

  // Check text sizes
  console.log('\n📝 Checking text sizes...\n');

  const textSizes = await page.evaluate(() => {
    const results = [];
    const headings = document.querySelectorAll('h1, h2, h3, h4, .heading-1, .heading-2, .heading-3');

    headings.forEach(h => {
      const styles = window.getComputedStyle(h);
      const rect = h.getBoundingClientRect();
      results.push({
        tag: h.tagName,
        class: h.className?.split(' ')[0] || '',
        text: h.textContent?.trim().substring(0, 40) || '',
        fontSize: styles.fontSize,
        lineHeight: styles.lineHeight,
        width: Math.round(rect.width),
        overflows: h.scrollWidth > h.clientWidth
      });
    });

    return results;
  });

  textSizes.forEach(t => {
    const status = t.overflows ? '❌' : '✅';
    console.log(`  ${status} <${t.tag}> ${t.class}: ${t.fontSize}`);
    console.log(`     "${t.text}${t.text.length >= 40 ? '...' : ''}"`);
    if (t.overflows) console.log(`     ⚠️  TEXT OVERFLOWS!`);
    console.log('');
  });

  await browser.close();

  console.log(`\n📁 Section screenshots saved to: ${screenshotsDir}\n`);
}

const landing = process.argv[2] || 'landing3-dogs';
analyzeMobile(landing).catch(console.error);
