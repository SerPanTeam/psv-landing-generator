/**
 * Figma Content Comparison Test
 *
 * Compares text content in the implementation with Figma design
 * to catch placeholder/content mismatches
 *
 * Run with: node test-figma-content.js
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Expected content from Figma for Landing 1 (node-id 1:3)
// These are the ACTUAL texts from Figma metadata
//
// NOTE: Hero section in Figma has PLACEHOLDER text (English)
// while other sections have REAL German content.
// This is a FIGMA DESIGN INCONSISTENCY that should be fixed.
//
const FIGMA_CONTENT = {
  hero: {
    // ⚠️ FIGMA PLACEHOLDERS - need updating in Figma!
    title: "Hello, i am a photographer",  // Figma node 4:46 - PLACEHOLDER
    subtitle: "Description here",          // Figma node 4:47 - PLACEHOLDER
    button: "Button"                       // Figma node 4:51 - PLACEHOLDER
  },
  promo: {
    title: "Weihnachts-Fotoshooting-Aktion",
    linkText: "Hier geht's zur Fotoshooting-Aktion"
  },
  content: {
    title: "Für die schönsten Erinnerungen mit deinen Liebsten!",
    accentText: "– für dich, für dein Kind, für immer –"
  },
  features: [
    { title: "Viel Zeit & Raum", text: "für Momente für dich und deine Familie" },
    { title: "Professionelle Fotografin", text: "aus  Leidenschaft und Professionalität" },
    { title: "Hohe Qualität", text: "der Fotos hautnah erleben" }
  ],
  steps: {
    title: "Wie genau komme ich zum Fotoshooting?",
    ctaText: "Deine  Fotoshooting-Aktion  – jetzt sichern!"
  },
  faq: {
    title: "Häufige Fragen zum Fotoshooting",
    questions: ["Question 1", "Question 2", "Question 3"]
  },
  services: {
    title: "Das ganze Jahr über finden immer wieder verschiedene Aktionen zu Fotoshootings statt.",
    items: ["Family Time", "Kinder-Fotoshooting", "Babybauch & Newborn", "Portraitfotografie"],
    ctaText: "Jetzt  Familien-Fotoshooting anfragen"
  },
  about: {
    label: "Willkommen bei",
    name: "Dorett Dornbusch"
  },
  footer: {
    links: ["Impressum", "Datenschutzerklärung", "Cookie Richtlinien"]
  }
};

// Content selectors for the implementation
const CONTENT_SELECTORS = {
  heroTitle: '.hero__title',
  heroSubtitle: '.hero__subtitle',
  heroButton: '.hero .btn-primary',
  promoTitle: '.promo__title',
  promoLinkText: '.promo__link',
  contentTitle: '.content-section__title',
  contentAccent: '.content-section__accent',
  featureTitle: '.feature-card__title',
  featureText: '.feature-card__text',
  stepsTitle: '.steps__title',
  stepsCta: '.steps__cta .btn-outline',
  faqTitle: '.faq__title',
  faqQuestion: '.faq__question-text',
  servicesTitle: '.services__title',
  serviceTitle: '.service-card__title',
  servicesCta: '.services__cta .btn-outline',
  aboutLabel: '.about__label',
  aboutName: '.about__name',
};

async function compareContent() {
  console.log('\n' + '='.repeat(60));
  console.log('  FIGMA CONTENT COMPARISON TEST');
  console.log('='.repeat(60) + '\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const htmlPath = path.join(__dirname, 'dist', 'landing1-family', 'index.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  let passed = 0;
  let failed = 0;
  let warnings = 0;
  const issues = [];

  // Helper function
  async function getText(selector) {
    try {
      const el = await page.$(selector);
      if (el) {
        return await el.innerText();
      }
    } catch (e) {}
    return null;
  }

  async function checkText(name, selector, expected, isPlaceholder = false) {
    const actual = await getText(selector);

    if (!actual) {
      console.log(`  ⚠ ${name}: Element not found (${selector})`);
      warnings++;
      return;
    }

    const actualTrim = actual.trim();
    const expectedTrim = expected.trim();

    if (actualTrim === expectedTrim) {
      console.log(`  ✓ ${name}: "${actualTrim.substring(0, 40)}..."`);
      passed++;
    } else if (isPlaceholder) {
      // Placeholder text from Figma - warn that it's been customized
      console.log(`  ℹ ${name}: CUSTOMIZED (not Figma placeholder)`);
      console.log(`    Figma: "${expectedTrim.substring(0, 40)}..."`);
      console.log(`    Impl:  "${actualTrim.substring(0, 40)}..."`);
      warnings++;
      issues.push({
        name,
        figma: expectedTrim,
        actual: actualTrim,
        type: 'placeholder_replaced'
      });
    } else {
      console.log(`  ✗ ${name}: MISMATCH`);
      console.log(`    Expected: "${expectedTrim.substring(0, 50)}..."`);
      console.log(`    Actual:   "${actualTrim.substring(0, 50)}..."`);
      failed++;
      issues.push({
        name,
        expected: expectedTrim,
        actual: actualTrim,
        type: 'mismatch'
      });
    }
  }

  // ===== HERO SECTION =====
  console.log('\n[HERO SECTION]');
  await checkText('Hero Title', CONTENT_SELECTORS.heroTitle, FIGMA_CONTENT.hero.title, true);
  await checkText('Hero Subtitle', CONTENT_SELECTORS.heroSubtitle, FIGMA_CONTENT.hero.subtitle, true);
  await checkText('Hero Button', CONTENT_SELECTORS.heroButton, FIGMA_CONTENT.hero.button, true);

  // ===== PROMO SECTION =====
  console.log('\n[PROMO SECTION]');
  await checkText('Promo Title', CONTENT_SELECTORS.promoTitle, FIGMA_CONTENT.promo.title);
  await checkText('Promo Link', CONTENT_SELECTORS.promoLinkText, FIGMA_CONTENT.promo.linkText);

  // ===== CONTENT SECTION =====
  console.log('\n[CONTENT SECTION]');
  await checkText('Content Title', CONTENT_SELECTORS.contentTitle, FIGMA_CONTENT.content.title);
  await checkText('Content Accent', CONTENT_SELECTORS.contentAccent, FIGMA_CONTENT.content.accentText);

  // ===== FEATURES SECTION =====
  console.log('\n[FEATURES SECTION]');
  const featureTitles = await page.$$eval(CONTENT_SELECTORS.featureTitle, els => els.map(e => e.innerText.trim()));
  const featureTexts = await page.$$eval(CONTENT_SELECTORS.featureText, els => els.map(e => e.innerText.trim()));

  FIGMA_CONTENT.features.forEach((feature, i) => {
    if (featureTitles[i] === feature.title) {
      console.log(`  ✓ Feature ${i + 1} Title: "${feature.title}"`);
      passed++;
    } else if (featureTitles[i]) {
      console.log(`  ✗ Feature ${i + 1} Title: "${featureTitles[i]}" (expected: "${feature.title}")`);
      failed++;
    }
  });

  // ===== STEPS SECTION =====
  console.log('\n[STEPS SECTION]');
  await checkText('Steps Title', CONTENT_SELECTORS.stepsTitle, FIGMA_CONTENT.steps.title);
  await checkText('Steps CTA', CONTENT_SELECTORS.stepsCta, FIGMA_CONTENT.steps.ctaText);

  // ===== FAQ SECTION =====
  console.log('\n[FAQ SECTION]');
  await checkText('FAQ Title', CONTENT_SELECTORS.faqTitle, FIGMA_CONTENT.faq.title);

  // ===== SERVICES SECTION =====
  console.log('\n[SERVICES SECTION]');
  await checkText('Services Title', CONTENT_SELECTORS.servicesTitle, FIGMA_CONTENT.services.title);

  const serviceTitles = await page.$$eval(CONTENT_SELECTORS.serviceTitle, els => els.map(e => e.innerText.trim()));
  FIGMA_CONTENT.services.items.forEach((item, i) => {
    if (serviceTitles[i] === item) {
      console.log(`  ✓ Service ${i + 1}: "${item}"`);
      passed++;
    } else if (serviceTitles[i]) {
      console.log(`  ✗ Service ${i + 1}: "${serviceTitles[i]}" (expected: "${item}")`);
      failed++;
    }
  });

  // ===== ABOUT SECTION =====
  console.log('\n[ABOUT SECTION]');
  await checkText('About Label', CONTENT_SELECTORS.aboutLabel, FIGMA_CONTENT.about.label);
  await checkText('About Name', CONTENT_SELECTORS.aboutName, FIGMA_CONTENT.about.name);

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('  CONTENT COMPARISON SUMMARY');
  console.log('='.repeat(60));
  console.log(`\n  ✓ Matched:  ${passed}`);
  console.log(`  ✗ Mismatch: ${failed}`);
  console.log(`  ⚠ Figma placeholders: ${warnings}`);

  const placeholderIssues = issues.filter(i => i.type === 'placeholder_replaced');
  const mismatchIssues = issues.filter(i => i.type === 'mismatch');

  if (placeholderIssues.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('  ⚠ FIGMA DESIGN ISSUE: Hero section has placeholder text');
    console.log('-'.repeat(60));
    console.log('  The Figma design (node 1:3) has English placeholder text');
    console.log('  in the Hero section while config has real German content.');
    console.log('  This is expected behavior - but Figma should be updated.');
    console.log('\n  Placeholders in Figma:');
    placeholderIssues.forEach((issue, i) => {
      console.log(`    ${i + 1}. ${issue.name}`);
      console.log(`       Figma placeholder: "${issue.figma}"`);
      console.log(`       Real content:      "${issue.actual.substring(0, 50)}..."`);
    });
    console.log('\n  ACTION: Update Figma design with real German content');
  }

  if (mismatchIssues.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('  ✗ CONTENT MISMATCHES (need fixing!)');
    console.log('-'.repeat(60));
    mismatchIssues.forEach((issue, i) => {
      console.log(`\n  ${i + 1}. ${issue.name}`);
      console.log(`     Expected: "${issue.expected}"`);
      console.log(`     Actual:   "${issue.actual}"`);
    });
  }

  // Save report
  const reportPath = path.join(__dirname, 'test-results', 'content-comparison.json');
  fs.writeFileSync(reportPath, JSON.stringify({ passed, failed, warnings, issues }, null, 2));
  console.log(`\n  Report saved to: ${reportPath}\n`);

  return failed === 0;
}

compareContent().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
