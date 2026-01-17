/**
 * Background Color Comparison Test
 *
 * Compares section background colors with Figma design
 *
 * IMPORTANT: Check ALL elements that could have backgrounds:
 * - Main sections
 * - Sub-sections (like .footer__bottom inside .footer)
 * - Nested containers
 *
 * When adding new sections, verify in Figma:
 * 1. What is the background color?
 * 2. Are there nested elements with DIFFERENT backgrounds?
 * 3. Check pixel positions - elements might be OUTSIDE their parent's bounds
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Expected backgrounds from Figma (node 1:3)
// Extracted from Figma design context
const FIGMA_BACKGROUNDS = {
  'Header':           '#F5EDE0',  // Primary bg
  'Hero':             '#F5EDE0',  // Primary bg (node 4:43)
  'Promo':            '#EEE3D0',  // Secondary bg (node 6:6)
  'Content':          '#F5EDE0',  // Primary bg (node 7:15)
  'Gallery Slider':   '#EEE3D0',  // Secondary bg (node 7:30)
  'Features':         '#F5EDE0',  // Primary bg (node 7:43)
  'Steps':            '#EEE3D0',  // Secondary bg (node 7:66)
  'Gallery Fullwidth': '#EEE3D0', // Part of steps area
  'FAQ':              '#F5EDE0',  // Primary bg (node 7:113)
  'Services':         '#EEE3D0',  // Secondary bg (node 7:130)
  'About':            '#F5EDE0',  // Primary bg (node 7:153)
  'Footer':           '#FFFFFF',  // White bg (node 313:163)
  'Footer Map':       '#FFFFFF',  // White bg - map area
  'Footer Bottom':    '#F5EDE0',  // FIGMA: Links on beige bg (below white area)
};

const SECTION_SELECTORS = [
  { name: 'Header', selector: '.header' },
  { name: 'Hero', selector: '.hero' },
  { name: 'Promo', selector: '.promo' },
  { name: 'Content', selector: '.content-section' },
  { name: 'Gallery Slider', selector: '.gallery-slider' },
  { name: 'Features', selector: '.features' },
  { name: 'Steps', selector: '.steps' },
  { name: 'Gallery Fullwidth', selector: '.gallery-fullwidth' },
  { name: 'FAQ', selector: '.faq' },
  { name: 'Services', selector: '.services' },
  { name: 'About', selector: '.about' },
  { name: 'Footer', selector: '.footer' },
  { name: 'Footer Map', selector: '.footer__map' },
  { name: 'Footer Bottom', selector: '.footer__bottom' }
];

async function checkBackgrounds() {
  console.log('\n' + '='.repeat(60));
  console.log('  BACKGROUND COLOR COMPARISON TEST');
  console.log('='.repeat(60) + '\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const htmlPath = path.join(__dirname, 'dist', 'landing1-family', 'index.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  let passed = 0;
  let failed = 0;
  const issues = [];

  // Get background colors
  const results = await page.evaluate((selectors) => {
    return selectors.map(({ name, selector }) => {
      const el = document.querySelector(selector);
      if (!el) {
        return { name, selector, bg: null, found: false };
      }

      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;

      // Convert rgb/rgba to hex
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      let hex = null;
      if (match) {
        const r = parseInt(match[1]).toString(16).padStart(2, '0');
        const g = parseInt(match[2]).toString(16).padStart(2, '0');
        const b = parseInt(match[3]).toString(16).padStart(2, '0');
        hex = `#${r}${g}${b}`.toUpperCase();
      }

      return { name, selector, bg: hex, found: true };
    });
  }, SECTION_SELECTORS);

  console.log('Section'.padEnd(20) + 'Expected'.padEnd(12) + 'Actual'.padEnd(12) + 'Status');
  console.log('-'.repeat(56));

  results.forEach(({ name, bg, found }) => {
    const expected = FIGMA_BACKGROUNDS[name];

    if (!found) {
      console.log(`${name.padEnd(20)}${expected.padEnd(12)}${'N/A'.padEnd(12)}⚠ Not found`);
      return;
    }

    if (!bg) {
      console.log(`${name.padEnd(20)}${expected.padEnd(12)}${'transparent'.padEnd(12)}⚠ No bg`);
      return;
    }

    const expectedNorm = expected.toUpperCase();
    const actualNorm = bg.toUpperCase();

    if (expectedNorm === actualNorm) {
      console.log(`${name.padEnd(20)}${expected.padEnd(12)}${bg.padEnd(12)}✓`);
      passed++;
    } else {
      console.log(`${name.padEnd(20)}${expected.padEnd(12)}${bg.padEnd(12)}✗ MISMATCH`);
      failed++;
      issues.push({ name, expected, actual: bg });
    }
  });

  // SCAN FOR UNCHECKED ELEMENTS WITH BACKGROUNDS
  // This catches elements we might have missed
  console.log('\n' + '-'.repeat(56));
  console.log('Scanning for unchecked elements with backgrounds...');

  const unchecked = await page.evaluate((checkedSelectors) => {
    const found = [];
    const checkedSet = new Set(checkedSelectors);

    // Common section/container classes to check
    const patterns = [
      '[class*="__"]',  // BEM child elements like .footer__bottom
      'section',
      '[class*="section"]',
      '[class*="wrapper"]',
      '[class*="container"]'
    ];

    patterns.forEach(pattern => {
      document.querySelectorAll(pattern).forEach(el => {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          // Build a selector for this element
          let selector = el.tagName.toLowerCase();
          if (el.className) {
            const mainClass = el.className.split(' ')[0];
            if (mainClass) selector = '.' + mainClass;
          }

          if (!checkedSet.has(selector)) {
            const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            let hex = bg;
            if (match) {
              const r = parseInt(match[1]).toString(16).padStart(2, '0');
              const g = parseInt(match[2]).toString(16).padStart(2, '0');
              const b = parseInt(match[3]).toString(16).padStart(2, '0');
              hex = `#${r}${g}${b}`.toUpperCase();
            }
            found.push({ selector, bg: hex });
          }
        }
      });
    });

    // Deduplicate
    const unique = [];
    const seen = new Set();
    found.forEach(item => {
      const key = item.selector + item.bg;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    });

    return unique;
  }, SECTION_SELECTORS.map(s => s.selector));

  if (unchecked.length > 0) {
    console.log('\n⚠ UNCHECKED ELEMENTS WITH BACKGROUNDS:');
    unchecked.forEach(item => {
      console.log(`  ${item.selector.padEnd(30)} ${item.bg}`);
    });
    console.log('\n  → Add these to SECTION_SELECTORS if they should be verified!');
  } else {
    console.log('  ✓ No unchecked elements with backgrounds found');
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('  SUMMARY');
  console.log('='.repeat(60));
  console.log(`\n  ✓ Matched:  ${passed}`);
  console.log(`  ✗ Mismatch: ${failed}`);

  if (issues.length > 0) {
    console.log('\n  FIXES NEEDED:');
    issues.forEach((issue, i) => {
      console.log(`\n  ${i + 1}. ${issue.name}`);
      console.log(`     Change: ${issue.actual} → ${issue.expected}`);
    });
  }

  // Save report
  const reportPath = path.join(__dirname, 'test-results', 'background-comparison.json');
  fs.writeFileSync(reportPath, JSON.stringify({ passed, failed, issues }, null, 2));
  console.log(`\n  Report saved to: ${reportPath}\n`);

  return failed === 0;
}

checkBackgrounds().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
