/**
 * Comprehensive Visual Testing System v2
 *
 * Tests both desktop (Figma compliance) and mobile (responsiveness)
 * Includes overlap detection and text truncation checks
 * Run with: node test-comprehensive.js
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Figma specifications for Landing 1
const FIGMA_SPECS = {
  colors: {
    bgPrimary: '#F5EDE0',
    bgSecondary: '#EEE3D0',
    bgWhite: '#FFFFFF',
    textPrimary: '#3D3D3D',
    button: '#E2C08D',
  },
  // FIGMA background colors per section
  sectionBackgrounds: {
    '.header': '#F5EDE0',
    '.hero': '#F5EDE0',
    '.promo': '#EEE3D0',
    '.content-section': '#F5EDE0',
    '.gallery-slider': '#EEE3D0',
    '.features': '#F5EDE0',
    '.steps': '#EEE3D0',
    '.gallery-fullwidth': '#EEE3D0',
    '.faq': '#F5EDE0',
    '.services': '#EEE3D0',
    '.about': '#F5EDE0',
    '.footer': '#FFFFFF',
    '.footer__map': '#FFFFFF',  // FIGMA: Map area white
    '.footer__bottom': '#F5EDE0',  // FIGMA: Links below white area, on beige bg
  },
  fonts: {
    h1: 55,
    h2: 45,
    h3: 35,
    textLg: 28,
    text: 22,
    small: 16,
  },
  desktop: {
    width: 1440,
    hero: { height: 634 },
    heroImageMain: { width: 428, height: 394 },
    heroImageSecondary: { width: 306, height: 290 },
    heroButton: { width: 286, height: 70 },
    promoImage: { width: 428, height: 440 },
    featureIcon: { width: 150, height: 150 },
    gallerySlide: { width: 400, height: 400 },
    galleryViewport: { width: 1244 },
    serviceCardImage: { width: 300, height: 300 },
    aboutImage: { width: 466, height: 560 },
  }
};

// Viewports to test
const VIEWPORTS = [
  { name: 'desktop-xl', width: 1440, height: 900, type: 'desktop' },
  { name: 'desktop', width: 1200, height: 800, type: 'desktop' },
  { name: 'tablet', width: 768, height: 1024, type: 'tablet' },
  { name: 'mobile', width: 375, height: 812, type: 'mobile' },
  { name: 'mobile-small', width: 320, height: 568, type: 'mobile' },
];

// Sections to test
const SECTIONS = [
  'header', 'hero', 'promo', 'content-section', 'gallery-slider',
  'features', 'steps', 'gallery-fullwidth', 'faq', 'services', 'about', 'footer'
];

// Critical element pairs to check for overlaps
const OVERLAP_CHECKS = [
  { name: 'Hero subtitle vs button', el1: '.hero__subtitle', el2: '.hero .btn-primary' },
  { name: 'Hero title vs subtitle', el1: '.hero__title', el2: '.hero__subtitle' },
  { name: 'Promo title vs text', el1: '.promo__title', el2: '.promo__text' },
  { name: 'FAQ question vs answer', el1: '.faq__question', el2: '.faq__answer' },
  { name: 'Step title vs text', el1: '.step-card__title', el2: '.step-card__text' },
  { name: 'Service title vs text', el1: '.service-card__title', el2: '.service-card__text' },
];

// Figma spacing checks (element pairs with expected gaps)
const SPACING_CHECKS = [
  { name: 'Hero title → subtitle', el1: '.hero__title', el2: '.hero__subtitle', expectedGap: 36, tolerance: 10 },
  { name: 'Hero subtitle → button', el1: '.hero__subtitle', el2: '.hero .btn-primary', expectedGap: 31, tolerance: 10 },
];

// Elements to check for text truncation
const TRUNCATION_CHECKS = [
  '.hero__title',
  '.hero__subtitle',
  '.promo__title',
  '.promo__text',
  '.feature-card__title',
  '.step-card__title',
  '.step-card__text',
  '.faq__question-text',
  '.service-card__title',
  '.about__title',
  '.about__text',
];

class ComprehensiveTest {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: []
    };
    this.screenshotsDir = path.join(__dirname, 'test-results');
  }

  log(type, message, details = null) {
    const icons = { pass: '✓', fail: '✗', warn: '⚠', info: '•' };
    console.log(`  ${icons[type] || '•'} ${message}`);
    if (details) console.log(`    ${details}`);

    this.results.details.push({ type, message, details });
    if (type === 'pass') this.results.passed++;
    if (type === 'fail') this.results.failed++;
    if (type === 'warn') this.results.warnings++;
  }

  async run() {
    console.log('\n' + '='.repeat(60));
    console.log('  COMPREHENSIVE VISUAL TEST v2 - Landing 1');
    console.log('='.repeat(60) + '\n');

    // Setup
    if (!fs.existsSync(this.screenshotsDir)) {
      fs.mkdirSync(this.screenshotsDir, { recursive: true });
    }

    const browser = await chromium.launch({ headless: true });
    const htmlPath = path.join(__dirname, 'dist', 'landing1-family', 'index.html');
    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

    try {
      // Test each viewport
      for (const vp of VIEWPORTS) {
        console.log(`\n[${vp.name.toUpperCase()}] Testing at ${vp.width}x${vp.height}...\n`);

        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: vp.type === 'mobile' ? 2 : 1,
        });
        const page = await context.newPage();
        await page.goto(fileUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);

        // Test 1: Horizontal Scroll
        await this.testHorizontalScroll(page, vp);

        // Test 2: Element Overlaps (NEW!)
        await this.testElementOverlaps(page, vp);

        // Test 3: Text Truncation (NEW!)
        await this.testTextTruncation(page, vp);

        // Test 4: Desktop Figma Compliance
        if (vp.type === 'desktop' && vp.width >= 1440) {
          await this.testFigmaCompliance(page, vp);
          await this.testFigmaSpacing(page, vp);
        }

        // Test 5: Mobile Responsiveness
        if (vp.type === 'mobile') {
          await this.testMobileResponsiveness(page, vp);
        }

        // Test 6: Touch Targets (mobile/tablet)
        if (vp.type !== 'desktop') {
          await this.testTouchTargets(page, vp);
        }

        // Test 7: Visual Spacing (NEW!)
        await this.testVisualSpacing(page, vp);

        // Take full page screenshot
        await page.screenshot({
          path: path.join(this.screenshotsDir, `${vp.name}-fullpage.png`),
          fullPage: true
        });

        // Take section screenshots for desktop
        if (vp.width >= 1440) {
          await this.takeSectionScreenshots(page, vp.name);
        }

        await context.close();
      }

      // Print summary
      this.printSummary();

      // Save results
      this.saveResults();

    } finally {
      await browser.close();
    }

    return this.results.failed === 0;
  }

  async testHorizontalScroll(page, vp) {
    const hasScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    if (hasScroll) {
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - document.documentElement.clientWidth;
      });
      this.log('fail', `Horizontal scroll detected (overflow: ${overflow}px)`);

      // Find overflowing elements
      const overflowing = await page.evaluate(() => {
        const vw = window.innerWidth;
        const elements = document.querySelectorAll('*');
        const result = [];
        elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > vw + 5 && rect.width > 0) {
            let selector = el.className && typeof el.className === 'string'
              ? '.' + el.className.split(' ').filter(c => c).slice(0, 2).join('.')
              : el.tagName.toLowerCase();
            result.push({ selector, overflow: Math.round(rect.right - vw) });
          }
        });
        return result.slice(0, 5);
      });

      overflowing.forEach(el => {
        this.log('info', `  Overflowing: ${el.selector} (+${el.overflow}px)`);
      });
    } else {
      this.log('pass', 'No horizontal scroll');
    }
  }

  // NEW: Test for element overlaps
  async testElementOverlaps(page, vp) {
    const overlaps = await page.evaluate((checks) => {
      const results = [];

      for (const check of checks) {
        const el1 = document.querySelector(check.el1);
        const el2 = document.querySelector(check.el2);

        if (!el1 || !el2) continue;

        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        // Check if elements are visible
        const style1 = getComputedStyle(el1);
        const style2 = getComputedStyle(el2);
        if (style1.display === 'none' || style2.display === 'none') continue;
        if (rect1.width === 0 || rect2.width === 0) continue;

        // Check for vertical overlap
        const verticalOverlap = !(rect1.bottom <= rect2.top || rect2.bottom <= rect1.top);
        const horizontalOverlap = !(rect1.right <= rect2.left || rect2.right <= rect1.left);

        if (verticalOverlap && horizontalOverlap) {
          // Calculate overlap amount
          const overlapY = Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top);
          const overlapX = Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left);

          if (overlapY > 5 && overlapX > 5) { // Ignore tiny overlaps
            results.push({
              name: check.name,
              overlapY: Math.round(overlapY),
              overlapX: Math.round(overlapX),
              el1Bottom: Math.round(rect1.bottom),
              el2Top: Math.round(rect2.top)
            });
          }
        }
      }

      return results;
    }, OVERLAP_CHECKS);

    if (overlaps.length === 0) {
      this.log('pass', 'No element overlaps detected');
    } else {
      overlaps.forEach(o => {
        this.log('fail', `OVERLAP: ${o.name} (${o.overlapY}px vertical, ${o.overlapX}px horizontal)`);
      });
    }
  }

  // NEW: Test for text truncation
  async testTextTruncation(page, vp) {
    const truncated = await page.evaluate((selectors) => {
      const results = [];

      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((el, index) => {
          const style = getComputedStyle(el);
          if (style.display === 'none') return;

          // Check for text-overflow: ellipsis being applied
          const hasEllipsis = style.textOverflow === 'ellipsis' &&
                             style.overflow === 'hidden' &&
                             el.scrollWidth > el.clientWidth;

          // Check for vertical truncation (content cut off)
          const isVerticallyTruncated = el.scrollHeight > el.clientHeight + 5;

          // Check if text is visually cut (element has less height than needed)
          const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
          const lines = el.innerText.split('\n').length;
          const expectedMinHeight = lineHeight * lines * 0.8; // 80% tolerance

          if (hasEllipsis || isVerticallyTruncated) {
            results.push({
              selector: selector + (index > 0 ? `[${index}]` : ''),
              type: hasEllipsis ? 'ellipsis' : 'overflow',
              scrollHeight: Math.round(el.scrollHeight),
              clientHeight: Math.round(el.clientHeight),
              text: el.innerText.substring(0, 50) + '...'
            });
          }
        });
      }

      return results;
    }, TRUNCATION_CHECKS);

    if (truncated.length === 0) {
      this.log('pass', 'No text truncation detected');
    } else {
      truncated.forEach(t => {
        this.log('warn', `Text truncation: ${t.selector} (${t.type})`);
        this.log('info', `  "${t.text}"`);
      });
    }
  }

  // NEW: Test visual spacing between elements
  async testVisualSpacing(page, vp) {
    const spacingIssues = await page.evaluate(() => {
      const issues = [];

      // Check key element pairs for proper spacing
      const spacingChecks = [
        { parent: '.hero__content', children: ['.hero__title', '.hero__subtitle', '.btn-primary'], minGap: 10 },
        { parent: '.promo__content', children: ['.promo__title', '.promo__text'], minGap: 10 },
        { parent: '.step-card', children: ['.step-card__title', '.step-card__text'], minGap: 5 },
      ];

      for (const check of spacingChecks) {
        const parent = document.querySelector(check.parent);
        if (!parent) continue;

        const children = check.children.map(sel => parent.querySelector(sel)).filter(Boolean);

        for (let i = 0; i < children.length - 1; i++) {
          const rect1 = children[i].getBoundingClientRect();
          const rect2 = children[i + 1].getBoundingClientRect();

          // Check if element 2 is below element 1
          if (rect2.top < rect1.bottom) {
            const overlap = rect1.bottom - rect2.top;
            if (overlap > 0) {
              issues.push({
                location: `${check.children[i]} → ${check.children[i + 1]}`,
                issue: 'overlap',
                amount: Math.round(overlap)
              });
            }
          } else {
            const gap = rect2.top - rect1.bottom;
            if (gap < check.minGap) {
              issues.push({
                location: `${check.children[i]} → ${check.children[i + 1]}`,
                issue: 'too close',
                amount: Math.round(gap)
              });
            }
          }
        }
      }

      return issues;
    });

    if (spacingIssues.length === 0) {
      this.log('pass', 'Visual spacing OK');
    } else {
      spacingIssues.forEach(s => {
        if (s.issue === 'overlap') {
          this.log('fail', `SPACING: ${s.location} - overlapping by ${s.amount}px`);
        } else {
          this.log('warn', `SPACING: ${s.location} - gap only ${s.amount}px`);
        }
      });
    }
  }

  // NEW: Test Figma spacing values
  async testFigmaSpacing(page, vp) {
    const spacingResults = await page.evaluate((checks) => {
      const results = [];

      for (const check of checks) {
        const el1 = document.querySelector(check.el1);
        const el2 = document.querySelector(check.el2);

        if (!el1 || !el2) continue;

        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        const actualGap = rect2.top - rect1.bottom;

        results.push({
          name: check.name,
          expectedGap: check.expectedGap,
          actualGap: Math.round(actualGap),
          tolerance: check.tolerance,
          ok: Math.abs(actualGap - check.expectedGap) <= check.tolerance
        });
      }

      return results;
    }, SPACING_CHECKS);

    for (const result of spacingResults) {
      if (result.ok) {
        this.log('pass', `Spacing ${result.name}: ${result.actualGap}px (expected: ${result.expectedGap}px)`);
      } else {
        this.log('fail', `Spacing ${result.name}: ${result.actualGap}px (expected: ${result.expectedGap}px ±${result.tolerance})`);
      }
    }
  }

  async testFigmaCompliance(page, vp) {
    console.log('\n  Figma Compliance Checks:');

    // Check Hero section dimensions
    const heroHeight = await page.evaluate(() => {
      const hero = document.querySelector('.hero');
      return hero ? hero.getBoundingClientRect().height : 0;
    });

    if (heroHeight >= FIGMA_SPECS.desktop.hero.height - 50) {
      this.log('pass', `Hero height: ${Math.round(heroHeight)}px (min: ${FIGMA_SPECS.desktop.hero.height}px)`);
    } else {
      this.log('fail', `Hero height: ${Math.round(heroHeight)}px (expected min: ${FIGMA_SPECS.desktop.hero.height}px)`);
    }

    // Check Hero images
    const heroImages = await page.evaluate(() => {
      const main = document.querySelector('.hero__image-main');
      const secondary = document.querySelector('.hero__image-secondary');
      return {
        main: main ? {
          width: main.getBoundingClientRect().width,
          height: main.getBoundingClientRect().height,
          visible: getComputedStyle(main).display !== 'none'
        } : null,
        secondary: secondary ? {
          width: secondary.getBoundingClientRect().width,
          height: secondary.getBoundingClientRect().height,
          visible: getComputedStyle(secondary).display !== 'none'
        } : null
      };
    });

    if (heroImages.main && heroImages.main.visible) {
      const mainOk = Math.abs(heroImages.main.width - FIGMA_SPECS.desktop.heroImageMain.width) < 10;
      if (mainOk) {
        this.log('pass', `Hero main image: ${Math.round(heroImages.main.width)}x${Math.round(heroImages.main.height)}px`);
      } else {
        this.log('warn', `Hero main image: ${Math.round(heroImages.main.width)}x${Math.round(heroImages.main.height)}px (expected: 428x394px)`);
      }
    }

    if (heroImages.secondary && heroImages.secondary.visible) {
      this.log('pass', `Hero secondary image visible: ${Math.round(heroImages.secondary.width)}x${Math.round(heroImages.secondary.height)}px`);
    } else {
      this.log('fail', 'Hero secondary image not visible on desktop');
    }

    // Check Gallery Slider
    const gallerySlides = await page.evaluate(() => {
      const slides = document.querySelectorAll('.gallery-slider__slide');
      if (slides.length === 0) return null;
      const firstSlide = slides[0].getBoundingClientRect();
      return {
        count: slides.length,
        width: firstSlide.width,
        height: firstSlide.height
      };
    });

    if (gallerySlides) {
      const slideOk = Math.abs(gallerySlides.width - FIGMA_SPECS.desktop.gallerySlide.width) < 20;
      if (slideOk) {
        this.log('pass', `Gallery slides: ${gallerySlides.count} slides, ${Math.round(gallerySlides.width)}x${Math.round(gallerySlides.height)}px`);
      } else {
        this.log('warn', `Gallery slides: ${Math.round(gallerySlides.width)}px wide (expected: 400px)`);
      }
    }

    // Check Services stagger layout
    const servicesStagger = await page.evaluate(() => {
      const cards = document.querySelectorAll('.service-card');
      if (cards.length < 4) return null;
      const tops = Array.from(cards).map(c => c.getBoundingClientRect().top);
      return {
        hasStagger: tops[0] > tops[3], // First card should be lower than last
        values: tops.map((t, i) => Math.round(t - tops[3])) // Relative to last card
      };
    });

    if (servicesStagger && servicesStagger.hasStagger) {
      this.log('pass', `Services stagger layout: offsets [${servicesStagger.values.join(', ')}]`);
    } else if (servicesStagger) {
      this.log('fail', 'Services stagger layout not working');
    }

    // Check Section Backgrounds
    await this.testSectionBackgrounds(page);
  }

  async testSectionBackgrounds(page) {
    console.log('\n  Section Background Checks:');

    const backgrounds = await page.evaluate((expectedBgs) => {
      const results = [];

      for (const [selector, expected] of Object.entries(expectedBgs)) {
        const el = document.querySelector(selector);
        if (!el) {
          results.push({ selector, expected, actual: null, found: false });
          continue;
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

        results.push({ selector, expected: expected.toUpperCase(), actual: hex, found: true });
      }

      return results;
    }, FIGMA_SPECS.sectionBackgrounds);

    let allMatch = true;
    const mismatches = [];

    for (const { selector, expected, actual, found } of backgrounds) {
      if (!found) {
        continue; // Skip missing elements
      }
      if (actual === expected) {
        // Don't log each success to keep output clean
      } else {
        allMatch = false;
        mismatches.push({ selector, expected, actual });
      }
    }

    if (allMatch) {
      this.log('pass', `All ${backgrounds.filter(b => b.found).length} section backgrounds match Figma`);
    } else {
      for (const m of mismatches) {
        this.log('fail', `Background ${m.selector}: ${m.actual} (expected: ${m.expected})`);
      }
    }
  }

  async testMobileResponsiveness(page, vp) {
    console.log('\n  Mobile Responsiveness Checks:');

    // Check Hero order (image should come before text on mobile)
    const heroOrder = await page.evaluate(() => {
      const imageWrapper = document.querySelector('.hero__image-wrapper');
      const content = document.querySelector('.hero__content');
      if (!imageWrapper || !content) return null;

      const imageRect = imageWrapper.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();

      return {
        imageTop: imageRect.top,
        contentTop: contentRect.top,
        imageFirst: imageRect.top < contentRect.top
      };
    });

    if (heroOrder && heroOrder.imageFirst) {
      this.log('pass', 'Hero: Image appears before text (correct mobile order)');
    } else if (heroOrder) {
      this.log('fail', 'Hero: Text appears before image (should be image first on mobile)');
    }

    // Check that secondary image is hidden on mobile
    const secondaryHidden = await page.evaluate(() => {
      const secondary = document.querySelector('.hero__image-secondary');
      if (!secondary) return true;
      const style = getComputedStyle(secondary);
      return style.display === 'none' || style.visibility === 'hidden';
    });

    if (secondaryHidden) {
      this.log('pass', 'Hero: Secondary image hidden on mobile');
    } else {
      this.log('warn', 'Hero: Secondary image should be hidden on mobile');
    }

    // Check Gallery Slider shows 1 slide
    const gallerySlides = await page.evaluate(() => {
      const viewport = document.querySelector('.gallery-slider__viewport');
      const slides = document.querySelectorAll('.gallery-slider__slide');
      if (!viewport || slides.length === 0) return null;

      const vpRect = viewport.getBoundingClientRect();
      let visibleCount = 0;
      slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        if (rect.left >= vpRect.left - 10 && rect.right <= vpRect.right + 10) {
          visibleCount++;
        }
      });

      return { visible: visibleCount, total: slides.length };
    });

    if (gallerySlides) {
      if (gallerySlides.visible <= 2) {
        this.log('pass', `Gallery: ${gallerySlides.visible} slide(s) visible on mobile`);
      } else {
        this.log('warn', `Gallery: ${gallerySlides.visible} slides visible (should be 1-2 on mobile)`);
      }
    }

    // Check Services cards are stacked (no stagger)
    const servicesStacked = await page.evaluate(() => {
      const cards = document.querySelectorAll('.service-card');
      if (cards.length < 2) return null;

      const firstRect = cards[0].getBoundingClientRect();
      const secondRect = cards[1].getBoundingClientRect();

      // On mobile, cards should be stacked vertically (second card below first)
      return secondRect.top > firstRect.bottom - 10;
    });

    if (servicesStacked) {
      this.log('pass', 'Services: Cards stacked vertically on mobile');
    } else if (servicesStacked === false) {
      this.log('warn', 'Services: Cards may not be properly stacked on mobile');
    }
  }

  async testTouchTargets(page, vp) {
    const MIN_TOUCH_SIZE = 44;

    const smallTargets = await page.evaluate((minSize) => {
      const buttons = document.querySelectorAll('button, a.btn, .btn, .faq__question');
      const small = [];

      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          if (rect.height < minSize) {
            small.push({
              selector: btn.className ? '.' + btn.className.split(' ')[0] : btn.tagName,
              height: Math.round(rect.height)
            });
          }
        }
      });

      return small.slice(0, 3);
    }, MIN_TOUCH_SIZE);

    if (smallTargets.length === 0) {
      this.log('pass', 'Touch targets: All buttons >= 44px');
    } else {
      this.log('warn', `Touch targets: ${smallTargets.length} element(s) < 44px height`);
      smallTargets.forEach(t => {
        this.log('info', `  ${t.selector}: ${t.height}px`);
      });
    }
  }

  async takeSectionScreenshots(page, viewportName) {
    for (const section of SECTIONS) {
      try {
        const element = await page.$(`.${section}`);
        if (element) {
          await element.screenshot({
            path: path.join(this.screenshotsDir, `${viewportName}-${section}.png`)
          });
        }
      } catch (e) {
        // Ignore errors for missing sections
      }
    }
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('  TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`\n  ✓ Passed:   ${this.results.passed}`);
    console.log(`  ✗ Failed:   ${this.results.failed}`);
    console.log(`  ⚠ Warnings: ${this.results.warnings}`);
    console.log(`\n  Total: ${this.results.passed + this.results.failed + this.results.warnings} checks`);

    if (this.results.failed === 0) {
      console.log('\n  🎉 ALL CRITICAL TESTS PASSED!\n');
    } else {
      console.log(`\n  ⚠️  ${this.results.failed} issue(s) need attention.\n`);
    }
  }

  saveResults() {
    const resultsPath = path.join(this.screenshotsDir, 'test-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));
    console.log(`  Results saved to: ${resultsPath}`);
    console.log(`  Screenshots saved to: ${this.screenshotsDir}\n`);
  }
}

// Run tests
const test = new ComprehensiveTest();
test.run().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
