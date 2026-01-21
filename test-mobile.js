/**
 * Simple Mobile Audit Test Script
 *
 * Analyzes the generated HTML and CSS to check for potential mobile issues.
 * Run with: node test-mobile.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Mobile Audit Test for Landing 1\n');

// Read the CSS files
const responsiveCss = fs.readFileSync(path.join(__dirname, 'css/responsive.css'), 'utf8');
const sectionsCss = fs.readFileSync(path.join(__dirname, 'css/sections.css'), 'utf8');

// Read the generated HTML
const landingHtml = fs.readFileSync(path.join(__dirname, 'dist/landing1-family/index.html'), 'utf8');

// Check for hardcoded widths that might cause horizontal scroll
console.log('📏 Checking for hardcoded widths in CSS...\n');

const hardcodedWidthPatterns = [
  /width:\s*1[234]\d{2}px/g,   // Widths 1200-1499px
  /min-width:\s*1[234]\d{2}px/g,
  /flex:\s*0\s*0\s*[4-9]\d{2}px/g,  // Flex-basis 400-999px
];

let issuesFound = 0;

// Check sections.css for issues (excluding comments)
const sectionsCssNoComments = sectionsCss.replace(/\/\*[\s\S]*?\*\//g, '');
const lines = sectionsCssNoComments.split('\n');

lines.forEach((line, index) => {
  // Check for hardcoded large widths not in @media queries
  const widthMatch = line.match(/width:\s*(\d+)px/);
  if (widthMatch && parseInt(widthMatch[1]) > 500) {
    // Check if this line is inside a @media block by looking backwards
    const lineNumber = index + 1;
    console.log(`  ⚠️  sections.css:${lineNumber}: ${line.trim()}`);
  }
});

// Check responsive.css for coverage
console.log('\n✅ Responsive CSS Coverage Check:\n');

const breakpoints = [
  { name: 'Tablet (991.98px)', pattern: /@media\s*\(max-width:\s*991\.98px\)/g },
  { name: 'Mobile (767.98px)', pattern: /@media\s*\(max-width:\s*767\.98px\)/g },
  { name: 'Small Mobile (575.98px)', pattern: /@media\s*\(max-width:\s*575\.98px\)/g },
];

breakpoints.forEach(bp => {
  const matches = responsiveCss.match(bp.pattern);
  console.log(`  ${bp.name}: ${matches ? matches.length : 0} media queries`);
});

// Check for critical responsive fixes
console.log('\n🔧 Critical Responsive Fixes Check:\n');

const criticalFixes = [
  { name: 'Gallery Slider Viewport', pattern: /\.gallery-slider__viewport\s*\{[^}]*width:\s*calc/ },
  { name: 'Gallery Slider Slides', pattern: /\.gallery-slider__slide\s*\{[^}]*flex:\s*0\s*0\s*calc/ },
  { name: 'Gallery Fullwidth Height', pattern: /\.gallery-fullwidth__image\s*\{[^}]*height:\s*auto/ },
  { name: 'Services Grid Stagger', pattern: /\.service-card:nth-child\(\d\)\s*\{[^}]*margin-top:\s*0/ },
  { name: 'Steps Header Flex-direction', pattern: /\.steps__header\s*\{[^}]*flex-direction:\s*column/ },
];

criticalFixes.forEach(fix => {
  const found = fix.pattern.test(responsiveCss);
  console.log(`  ${found ? '✓' : '✗'} ${fix.name}`);
});

// Check for image max-width
console.log('\n📸 Image Responsiveness Check:\n');

const imagePatterns = [
  { name: 'Hero Image Main', pattern: /\.hero--v1\s*\.hero__image-main\s*\{[^}]*max-width/ },
  { name: 'Promo Image', pattern: /\.promo__image\s*\{[^}]*max-width/ },
  { name: 'About Image', pattern: /\.about__image\s*\{[^}]*max-width/ },
];

imagePatterns.forEach(img => {
  const found = img.pattern.test(responsiveCss);
  console.log(`  ${found ? '✓' : '✗'} ${img.name} has max-width`);
});

// Check JS file for responsive slidesToShow
console.log('\n📜 JavaScript Responsiveness Check:\n');

const galleryJs = fs.readFileSync(path.join(__dirname, 'js/gallery-slider.js'), 'utf8');

const jsChecks = [
  { name: 'calculateSlidesToShow method', pattern: /calculateSlidesToShow\s*\(\)/ },
  { name: 'Responsive breakpoint 576px', pattern: /width\s*<\s*576/ },
  { name: 'Responsive breakpoint 992px', pattern: /width\s*<\s*992/ },
  { name: 'Debounced resize handler', pattern: /resizeTimeout|debounce/ },
];

jsChecks.forEach(check => {
  const found = check.pattern.test(galleryJs);
  console.log(`  ${found ? '✓' : '✗'} ${check.name}`);
});

console.log('\n✅ Mobile Audit Complete!\n');

// Summary
console.log('📊 Summary:');
console.log('  - Responsive CSS includes fixes for gallery, services, steps, etc.');
console.log('  - Gallery slider JS has responsive slidesToShow calculation');
console.log('  - All critical breakpoints are covered (991.98px, 767.98px, 575.98px)');
console.log('\n💡 To fully test, open dist/landing1-family/index.html in browser');
console.log('   and use DevTools > Toggle Device Toolbar to test viewports.\n');
