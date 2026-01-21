/**
 * COMPREHENSIVE MOBILE QUIZ TEST - Landing 1
 *
 * Tests all quiz pages at multiple mobile viewports
 * Looking for: overflow, touch targets, text truncation, layout issues
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = [
  { name: 'iPhone SE', width: 320, height: 568 },
  { name: 'iPhone 12', width: 375, height: 812 },
  { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
  { name: 'Samsung Galaxy', width: 360, height: 740 },
  { name: 'Tablet', width: 768, height: 1024 },
];

const QUIZ_PAGES = [
  'quiz-step1.html',
  'quiz-step2.html',
  'quiz-step3.html',
  'quiz-step4.html',
  'quiz-form.html',
  'quiz-success.html'
];

async function testMobileQuiz() {
  console.log('\n' + '='.repeat(70));
  console.log('  COMPREHENSIVE MOBILE QUIZ TEST - LANDING 1');
  console.log('='.repeat(70) + '\n');

  const browser = await chromium.launch({ headless: true });
  const distPath = path.join(__dirname, 'dist', 'landing1-family');

  let totalPassed = 0;
  let totalFailed = 0;
  const allIssues = [];

  for (const viewport of VIEWPORTS) {
    console.log(`\n${'─'.repeat(70)}`);
    console.log(`📱 ${viewport.name} (${viewport.width}x${viewport.height})`);
    console.log('─'.repeat(70));

    const page = await browser.newPage({ viewport });

    for (const quizPage of QUIZ_PAGES) {
      const filePath = path.join(distPath, quizPage);
      if (!fs.existsSync(filePath)) continue;

      await page.goto(`file:///${filePath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });

      console.log(`\n  📄 ${quizPage}`);

      // ========== CHECK 1: Horizontal Scroll ==========
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.body.scrollWidth > window.innerWidth;
      });
      if (hasHorizontalScroll) {
        const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
        console.log(`    ✗ HORIZONTAL SCROLL: ${overflow}px overflow`);
        totalFailed++;
        allIssues.push({ viewport: viewport.name, page: quizPage, issue: 'Horizontal scroll', overflow });
      } else {
        console.log(`    ✓ No horizontal scroll`);
        totalPassed++;
      }

      // ========== CHECK 2: Elements Overflow ==========
      const overflowElements = await page.evaluate(() => {
        const found = [];
        const viewportWidth = window.innerWidth;
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > viewportWidth + 5) { // 5px tolerance
            const classes = el.className || el.tagName;
            if (!found.some(f => f.classes === classes)) {
              found.push({
                classes: typeof classes === 'string' ? classes.split(' ')[0] : el.tagName,
                overflow: Math.round(rect.right - viewportWidth)
              });
            }
          }
        });
        return found.slice(0, 5); // Top 5
      });
      if (overflowElements.length > 0) {
        console.log(`    ✗ ELEMENTS OVERFLOW:`);
        overflowElements.forEach(el => {
          console.log(`      - .${el.classes}: +${el.overflow}px`);
        });
        totalFailed++;
        allIssues.push({ viewport: viewport.name, page: quizPage, issue: 'Elements overflow', elements: overflowElements });
      } else {
        console.log(`    ✓ No element overflow`);
        totalPassed++;
      }

      // ========== CHECK 3: Touch Targets (min 44px) ==========
      const smallTouchTargets = await page.evaluate(() => {
        const found = [];
        const interactive = document.querySelectorAll('a, button, input, select, .quiz-option');
        interactive.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.height < 44 || rect.width < 44) {
              found.push({
                element: el.className?.split(' ')[0] || el.tagName,
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              });
            }
          }
        });
        return found.slice(0, 5);
      });
      if (smallTouchTargets.length > 0) {
        console.log(`    ⚠ SMALL TOUCH TARGETS (<44px):`);
        smallTouchTargets.forEach(el => {
          console.log(`      - .${el.element}: ${el.width}x${el.height}px`);
        });
        // Warning, not failure
      } else {
        console.log(`    ✓ Touch targets OK (≥44px)`);
        totalPassed++;
      }

      // ========== CHECK 4: Text Truncation ==========
      const truncatedText = await page.evaluate(() => {
        const found = [];
        const textElements = document.querySelectorAll('h1, h2, h3, p, span, .quiz-option__text, .quiz-page__question, .quiz-page__progress');
        textElements.forEach(el => {
          if (el.scrollWidth > el.clientWidth + 5) {
            found.push({
              element: el.className?.split(' ')[0] || el.tagName,
              text: el.textContent?.slice(0, 30) + '...'
            });
          }
        });
        return found.slice(0, 3);
      });
      if (truncatedText.length > 0) {
        console.log(`    ⚠ TEXT TRUNCATION:`);
        truncatedText.forEach(el => {
          console.log(`      - .${el.element}: "${el.text}"`);
        });
        allIssues.push({ viewport: viewport.name, page: quizPage, issue: 'Text truncation', elements: truncatedText });
      } else {
        console.log(`    ✓ No text truncation`);
        totalPassed++;
      }

      // ========== CHECK 5: Logo Visibility ==========
      const logoInfo = await page.evaluate(() => {
        const logo = document.querySelector('.logo-text');
        if (!logo) return null;
        const rect = logo.getBoundingClientRect();
        const style = window.getComputedStyle(logo);
        return {
          visible: rect.width > 0 && rect.height > 0,
          fontSize: style.fontSize,
          top: rect.top
        };
      });
      if (logoInfo && logoInfo.visible) {
        console.log(`    ✓ Logo visible (${logoInfo.fontSize})`);
        totalPassed++;
      } else {
        console.log(`    ✗ LOGO NOT VISIBLE`);
        totalFailed++;
        allIssues.push({ viewport: viewport.name, page: quizPage, issue: 'Logo not visible' });
      }

      // ========== CHECK 6: Quiz Options Layout ==========
      if (quizPage.includes('step')) {
        const optionsInfo = await page.evaluate(() => {
          const options = document.querySelectorAll('.quiz-option');
          if (options.length === 0) return null;

          const rects = Array.from(options).map(el => el.getBoundingClientRect());
          const viewportWidth = window.innerWidth;

          // Check if any option is cut off
          const cutOff = rects.filter(r => r.right > viewportWidth || r.left < 0);

          // Check option widths
          const widths = rects.map(r => Math.round(r.width));

          // Check if stacked vertically on small screens
          const firstTop = rects[0]?.top;
          const allSameRow = rects.every(r => Math.abs(r.top - firstTop) < 10);

          return {
            count: options.length,
            cutOff: cutOff.length,
            widths,
            allSameRow,
            viewportWidth
          };
        });

        if (optionsInfo) {
          if (optionsInfo.cutOff > 0) {
            console.log(`    ✗ OPTIONS CUT OFF: ${optionsInfo.cutOff} option(s)`);
            totalFailed++;
            allIssues.push({ viewport: viewport.name, page: quizPage, issue: 'Options cut off', count: optionsInfo.cutOff });
          } else {
            console.log(`    ✓ Options layout OK (${optionsInfo.count} options, widths: ${optionsInfo.widths.join(', ')}px)`);
            totalPassed++;
          }
        }
      }

      // ========== CHECK 7: Form Fields (form page only) ==========
      if (quizPage === 'quiz-form.html') {
        const formInfo = await page.evaluate(() => {
          const inputs = document.querySelectorAll('input, select');
          const viewportWidth = window.innerWidth;
          const issues = [];

          inputs.forEach(input => {
            const rect = input.getBoundingClientRect();
            if (rect.width > viewportWidth - 40) { // 20px padding each side
              // OK, full width
            } else if (rect.right > viewportWidth) {
              issues.push({
                name: input.name || input.placeholder || 'input',
                overflow: Math.round(rect.right - viewportWidth)
              });
            }
          });

          return { total: inputs.length, issues };
        });

        if (formInfo.issues.length > 0) {
          console.log(`    ✗ FORM FIELDS OVERFLOW:`);
          formInfo.issues.forEach(i => console.log(`      - ${i.name}: +${i.overflow}px`));
          totalFailed++;
          allIssues.push({ viewport: viewport.name, page: quizPage, issue: 'Form fields overflow', fields: formInfo.issues });
        } else {
          console.log(`    ✓ Form fields OK (${formInfo.total} fields)`);
          totalPassed++;
        }
      }

      // ========== CHECK 8: Social Icons (success page only) ==========
      if (quizPage === 'quiz-success.html') {
        const socialInfo = await page.evaluate(() => {
          const icons = document.querySelectorAll('.quiz-success__social .social-icon');
          const rects = Array.from(icons).map(el => el.getBoundingClientRect());
          const viewportWidth = window.innerWidth;

          return {
            count: icons.length,
            sizes: rects.map(r => ({ w: Math.round(r.width), h: Math.round(r.height) })),
            overflow: rects.some(r => r.right > viewportWidth)
          };
        });

        if (socialInfo.overflow) {
          console.log(`    ✗ SOCIAL ICONS OVERFLOW`);
          totalFailed++;
          allIssues.push({ viewport: viewport.name, page: quizPage, issue: 'Social icons overflow' });
        } else {
          console.log(`    ✓ Social icons OK (${socialInfo.count} icons, ${socialInfo.sizes.map(s => `${s.w}x${s.h}`).join(', ')}px)`);
          totalPassed++;
        }
      }

      // ========== CHECK 9: Footer Links ==========
      const footerInfo = await page.evaluate(() => {
        const footer = document.querySelector('.quiz-page__footer, .quiz-page__nav');
        if (!footer) return null;

        const links = footer.querySelectorAll('a');
        const rect = footer.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        return {
          visible: rect.height > 0,
          linksCount: links.length,
          overflow: rect.right > viewportWidth
        };
      });

      if (footerInfo) {
        if (footerInfo.overflow) {
          console.log(`    ⚠ Footer overflow`);
        } else if (footerInfo.visible) {
          console.log(`    ✓ Footer OK (${footerInfo.linksCount} links)`);
          totalPassed++;
        }
      }

      // ========== CHECK 10: Buttons Accessibility ==========
      const buttonsInfo = await page.evaluate(() => {
        const buttons = document.querySelectorAll('.btn, button[type="submit"]');
        const issues = [];
        const viewportWidth = window.innerWidth;

        buttons.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          const style = window.getComputedStyle(btn);

          if (rect.right > viewportWidth) {
            issues.push({ text: btn.textContent?.trim().slice(0, 20), issue: 'overflow' });
          }
          if (rect.height < 44) {
            issues.push({ text: btn.textContent?.trim().slice(0, 20), issue: 'too short', height: rect.height });
          }
        });

        return { total: buttons.length, issues };
      });

      if (buttonsInfo.issues.length > 0) {
        console.log(`    ⚠ BUTTON ISSUES:`);
        buttonsInfo.issues.forEach(b => console.log(`      - "${b.text}": ${b.issue}`));
      }

      // Take screenshot
      const screenshotDir = path.join(__dirname, 'test-results', 'mobile-quiz');
      if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
      await page.screenshot({
        path: path.join(screenshotDir, `${viewport.name.replace(/\s+/g, '-')}-${quizPage.replace('.html', '')}.png`),
        fullPage: true
      });
    }

    await page.close();
  }

  await browser.close();

  // ========== SUMMARY ==========
  console.log('\n' + '='.repeat(70));
  console.log('  SUMMARY');
  console.log('='.repeat(70));
  console.log(`\n  ✓ Passed:  ${totalPassed}`);
  console.log(`  ✗ Failed:  ${totalFailed}`);

  if (allIssues.length > 0) {
    console.log(`\n  🔴 CRITICAL ISSUES FOUND: ${allIssues.length}`);
    console.log('\n  Issues by viewport:');

    const byViewport = {};
    allIssues.forEach(issue => {
      if (!byViewport[issue.viewport]) byViewport[issue.viewport] = [];
      byViewport[issue.viewport].push(issue);
    });

    Object.entries(byViewport).forEach(([vp, issues]) => {
      console.log(`\n  📱 ${vp}:`);
      issues.forEach(i => {
        console.log(`    - ${i.page}: ${i.issue}`);
      });
    });
  } else {
    console.log('\n  🎉 NO CRITICAL ISSUES FOUND!');
  }

  // Save report
  const reportPath = path.join(__dirname, 'test-results', 'mobile-quiz-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({ passed: totalPassed, failed: totalFailed, issues: allIssues }, null, 2));
  console.log(`\n  Report: ${reportPath}`);
  console.log(`  Screenshots: test-results/mobile-quiz/\n`);

  return totalFailed === 0;
}

testMobileQuiz().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
