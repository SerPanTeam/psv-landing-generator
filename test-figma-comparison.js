/**
 * Figma Comparison Test Script
 *
 * Compares implementation with Figma specifications.
 * Run with: node test-figma-comparison.js
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 FIGMA COMPARISON TEST - Landing 1\n');
console.log('=' .repeat(60) + '\n');

// Read files
const html = fs.readFileSync(path.join(__dirname, 'dist/landing1-family/index.html'), 'utf8');
const sectionsCss = fs.readFileSync(path.join(__dirname, 'css/sections.css'), 'utf8');
const responsiveCss = fs.readFileSync(path.join(__dirname, 'css/responsive.css'), 'utf8');
const variablesCss = fs.readFileSync(path.join(__dirname, 'css/variables.css'), 'utf8');

let passed = 0;
let failed = 0;
let warnings = 0;

function check(name, condition, expected, actual) {
  if (condition) {
    console.log(`  ✅ ${name}`);
    passed++;
  } else {
    console.log(`  ❌ ${name}`);
    console.log(`     Expected: ${expected}`);
    console.log(`     Actual: ${actual || 'not found'}`);
    failed++;
  }
}

function warn(name, message) {
  console.log(`  ⚠️  ${name}: ${message}`);
  warnings++;
}

// FIGMA SPECIFICATIONS FOR LANDING 1
const figmaSpecs = {
  colors: {
    bgPrimary: '#F5EDE0',
    bgSecondary: '#EEE3D0',
    textPrimary: '#3D3D3D',
    button: '#E2C08D',
    accent: '#E2C08D',
    white: '#FFFFFF',
  },
  fonts: {
    family: 'Inter',
    h1: '55px',
    h2: '45px',
    h3: '35px',
    textLg: '28px',
    text: '22px',
    small: '16px',
  },
  hero: {
    height: '634px',
    mainImage: { width: '428px', height: '394px' },
    secondaryImage: { width: '306px', height: '290px' },
    button: { width: '286px', height: '70px' },
  },
  promo: {
    image: { width: '428px', height: '440px' }, // short version
    divider: '588px',
  },
  features: {
    icon: { width: '150px', height: '150px' },
    divider: '158px',
  },
  gallery: {
    slides: { width: '400px', height: '400px' },
    gap: '22px',
    viewport: '1244px',
  },
  steps: {
    ctaButton: { width: '500px', height: '60px' },
    divider: '521px',
  },
  services: {
    cardImage: { width: '300px', height: '300px' },
    stagger: [86, 56, 26, 0], // margin-top values
    ctaButton: { width: '448px', height: '60px' },
  },
  faq: {
    listWidth: '1214px',
    icon: { width: '30px', height: '30px' },
  },
  about: {
    image: { width: '466px', height: '560px' },
    divider: '471px',
  },
  footer: {
    mapHeight: '534px',
  },
};

// ============================================
// TEST: CSS VARIABLES
// ============================================
console.log('📦 CSS Variables Check:\n');

check('Background primary',
  variablesCss.includes('#F5EDE0') || variablesCss.includes('#f5ede0'),
  figmaSpecs.colors.bgPrimary, 'Variable defined');

check('Background secondary',
  variablesCss.includes('#EEE3D0') || variablesCss.includes('#eee3d0'),
  figmaSpecs.colors.bgSecondary, 'Variable defined');

check('Text color',
  variablesCss.includes('#3D3D3D') || variablesCss.includes('#3d3d3d'),
  figmaSpecs.colors.textPrimary, 'Variable defined');

check('Button color',
  variablesCss.includes('#E2C08D') || variablesCss.includes('#e2c08d'),
  figmaSpecs.colors.button, 'Variable defined');

check('Font size H1 (55px)',
  variablesCss.includes('55px'),
  figmaSpecs.fonts.h1, 'Found in variables');

check('Font size H2 (45px)',
  variablesCss.includes('45px'),
  figmaSpecs.fonts.h2, 'Found in variables');

check('Font size H3 (35px)',
  variablesCss.includes('35px'),
  figmaSpecs.fonts.h3, 'Found in variables');

// ============================================
// TEST: HERO SECTION
// ============================================
console.log('\n🦸 Hero Section Check:\n');

check('Hero min-height 634px',
  sectionsCss.includes('min-height: 634px'),
  figmaSpecs.hero.height, sectionsCss.match(/\.hero\s*\{[^}]*min-height:\s*([^;]+)/)?.[1]);

check('Hero main image 428x394px',
  sectionsCss.includes('width: 428px') && sectionsCss.includes('height: 394px'),
  '428x394px', 'Found in CSS');

check('Hero secondary image 306x290px',
  sectionsCss.includes('width: 306px') && sectionsCss.includes('height: 290px'),
  '306x290px', 'Found in CSS');

check('Hero button 286x70px',
  sectionsCss.includes('width: 286px') && sectionsCss.includes('height: 70px'),
  '286x70px', 'Found in CSS');

// ============================================
// TEST: PROMO SECTION
// ============================================
console.log('\n📢 Promo Section Check:\n');

check('Promo image height 440px (short)',
  sectionsCss.includes('height: 440px'),
  figmaSpecs.promo.image.height, 'Found in CSS');

check('Promo divider 588px',
  sectionsCss.includes('width: 588px'),
  figmaSpecs.promo.divider, 'Found in CSS');

// ============================================
// TEST: FEATURES SECTION
// ============================================
console.log('\n⭐ Features Section Check:\n');

check('Feature icon 150x150px',
  sectionsCss.includes('width: 150px') && sectionsCss.includes('height: 150px'),
  '150x150px', 'Found in CSS');

check('Feature divider 158px',
  sectionsCss.includes('width: 158px'),
  figmaSpecs.features.divider, 'Found in CSS');

// ============================================
// TEST: GALLERY SLIDER
// ============================================
console.log('\n🖼️ Gallery Slider Check:\n');

check('Gallery slide 400x400px (desktop)',
  sectionsCss.includes('flex: 0 0 400px') || sectionsCss.includes('width: 400px'),
  '400x400px', 'Found in CSS');

check('Gallery gap 22px',
  sectionsCss.includes('gap: 22px'),
  figmaSpecs.gallery.gap, 'Found in CSS');

check('Gallery viewport responsive',
  responsiveCss.includes('.gallery-slider__viewport') && responsiveCss.includes('calc(100%'),
  'calc(100% - 80px)', 'Responsive override');

// ============================================
// TEST: STEPS SECTION
// ============================================
console.log('\n📋 Steps Section Check:\n');

check('Steps CTA button 500x60px',
  sectionsCss.includes('width: 500px'),
  figmaSpecs.steps.ctaButton.width, 'Found in CSS');

check('Steps divider 521px',
  sectionsCss.includes('width: 521px'),
  figmaSpecs.steps.divider, 'Found in CSS');

check('Steps header responsive',
  responsiveCss.includes('.steps__header') && responsiveCss.includes('flex-direction: column'),
  'flex-direction: column', 'Found in responsive CSS');

// ============================================
// TEST: SERVICES SECTION
// ============================================
console.log('\n🛠️ Services Section Check:\n');

check('Service card image 300x300px',
  sectionsCss.includes('width: 300px') && sectionsCss.match(/service-card__image[^}]*height:\s*300px/),
  '300x300px', 'Found in CSS');

check('Services stagger layout',
  sectionsCss.includes('margin-top: 86px') &&
  sectionsCss.includes('margin-top: 56px') &&
  sectionsCss.includes('margin-top: 26px'),
  'Stagger values: 86, 56, 26, 0', 'Found in CSS');

check('Services stagger removed on mobile',
  responsiveCss.includes('.service-card:nth-child') && responsiveCss.includes('margin-top: 0'),
  'margin-top: 0 on mobile', 'Found in responsive CSS');

check('Services CTA 448x60px',
  sectionsCss.includes('width: 448px'),
  figmaSpecs.services.ctaButton.width, 'Found in CSS');

// ============================================
// TEST: FAQ SECTION
// ============================================
console.log('\n❓ FAQ Section Check:\n');

check('FAQ list width 1214px',
  sectionsCss.includes('max-width: 1214px'),
  figmaSpecs.faq.listWidth, 'Found in CSS');

check('FAQ icon 30x30px',
  sectionsCss.includes('width: 30px') && sectionsCss.includes('height: 30px'),
  '30x30px', 'Found in CSS');

// ============================================
// TEST: ABOUT SECTION
// ============================================
console.log('\n👤 About Section Check:\n');

check('About image 466x560px',
  sectionsCss.includes('width: 466px') && sectionsCss.includes('height: 560px'),
  '466x560px', 'Found in CSS');

check('About divider 471px',
  sectionsCss.includes('width: 471px'),
  figmaSpecs.about.divider, 'Found in CSS');

// ============================================
// TEST: RESPONSIVE CSS
// ============================================
console.log('\n📱 Responsive CSS Check:\n');

check('Tablet breakpoint (991.98px)',
  responsiveCss.includes('max-width: 991.98px'),
  '991.98px', 'Found');

check('Mobile breakpoint (767.98px)',
  responsiveCss.includes('max-width: 767.98px'),
  '767.98px', 'Found');

check('Small mobile breakpoint (575.98px)',
  responsiveCss.includes('max-width: 575.98px'),
  '575.98px', 'Found');

check('Gallery fullwidth responsive height',
  responsiveCss.includes('.gallery-fullwidth__image') && responsiveCss.includes('aspect-ratio'),
  'aspect-ratio: 16/9', 'Found');

check('Hero images responsive',
  responsiveCss.includes('.hero--v1 .hero__image-main') && responsiveCss.includes('max-width'),
  'max-width defined', 'Found');

// ============================================
// TEST: HTML STRUCTURE
// ============================================
console.log('\n📄 HTML Structure Check:\n');

check('Header section exists',
  html.includes('<header class="header">'),
  'header.header', 'Found in HTML');

check('Hero V1 section exists',
  html.includes('class="hero hero--v1'),
  'hero--v1', 'Found in HTML');

check('Promo section exists',
  html.includes('class="promo'),
  'promo', 'Found in HTML');

check('Content section exists',
  html.includes('class="content-section'),
  'content-section', 'Found in HTML');

check('Gallery slider exists',
  html.includes('class="gallery-slider'),
  'gallery-slider', 'Found in HTML');

check('Features section exists',
  html.includes('class="features'),
  'features', 'Found in HTML');

check('Steps section exists',
  html.includes('class="steps'),
  'steps', 'Found in HTML');

check('Gallery fullwidth exists',
  html.includes('class="gallery-fullwidth'),
  'gallery-fullwidth', 'Found in HTML');

check('FAQ section exists',
  html.includes('class="faq'),
  'faq', 'Found in HTML');

check('Services section exists',
  html.includes('class="services'),
  'services', 'Found in HTML');

check('About section exists',
  html.includes('class="about'),
  'about', 'Found in HTML');

check('Footer exists',
  html.includes('class="footer'),
  'footer', 'Found in HTML');

// ============================================
// SUMMARY
// ============================================
console.log('\n' + '=' .repeat(60));
console.log('\n📊 SUMMARY:\n');
console.log(`  ✅ Passed: ${passed}`);
console.log(`  ❌ Failed: ${failed}`);
console.log(`  ⚠️  Warnings: ${warnings}`);
console.log(`\n  Total: ${passed + failed} checks`);
console.log(`  Success rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

if (failed === 0) {
  console.log('\n🎉 ALL FIGMA SPECIFICATIONS MATCH!\n');
} else {
  console.log(`\n⚠️  ${failed} specifications need attention.\n`);
}

process.exit(failed > 0 ? 1 : 0);
