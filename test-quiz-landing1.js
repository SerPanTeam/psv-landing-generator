/**
 * Quiz Content Verification Test for Landing 1
 *
 * Compares quiz texts in generated HTML with Figma design
 * Figma node IDs:
 * - Step 1: 137:51
 * - Step 2: 137:159
 * - Step 3: 137:71
 * - Step 4: 137:179
 * - Form: 137:111
 * - Success: 137:84
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Expected quiz content from Figma
const FIGMA_QUIZ = {
  steps: [
    {
      stepNumber: 1,
      progress: 'Weiter zum Gutschein',
      question: 'Kennst du mich bereits?',
      columns: 4,
      options: [
        'Ja, vom Hören',
        'Ja, na klar!',
        'Schon sehr lang',
        'Nein, noch nicht'
      ]
    },
    {
      stepNumber: 2,
      progress: '4 Fragen bis zum Gutschein',
      question: 'Welches Bild gefällt dir am Besten?',
      columns: 4,
      options: ['1', '2', '3', '4']
    },
    {
      stepNumber: 3,
      progress: '3 Fragen bis zum Gutschein',
      question: 'Schon mal ein Familien- Fotoshooting gehabt?',
      columns: 2,
      options: [
        'Ja, das war der Hammer!',
        'Nein, bisher noch nicht!'
      ]
    },
    {
      stepNumber: 4,
      progress: '2 Fragen bis zum Gutschein',
      question: 'Wer wird mit dabei sein?',
      columns: 3,
      options: [
        'Nur wir als Elternpaar',
        'Eltern und die Kinder',
        'Wir nehmen auch unser Haustier mit'
      ]
    }
  ],
  form: {
    label: 'Klasse, jetzt zum Gutschein',
    title: 'Trage dich jetzt ein und sichere dir dein Platz für ein',
    subtitle: 'Familien-Fotoshooting zu Weihnachten!',
    note: 'Diese Aktion gilt nur bis zum 06.12.25.',
    placeholders: [
      'Dein Vor- und Nachname',
      'Deine E-Mail Adresse',
      'Deine Telefonnummer',
      'Wann seid ihr erreichbar (Mehrfachauswahl)'
    ],
    privacyText: 'Ich akzeptiere die',
    privacyLinkText: 'Datenschutzbestimmungen',
    submitButton: 'Jetzt Gutschein sichern!',
    privacyNote: 'Deine Privatsphäre ist bei mir sicher – ich schätze dein Vertrauen.',
    infoTitle: 'WICHTIG! Bitte halte deinen Termin ein oder informiere mich rechtzeitig über eventuelle Änderungen.'
  },
  success: {
    title: 'Herzlichen Glückwunsch!',
    subtitle: 'Deine Anfrage ist bei uns eingegangen!',
    ctaText: 'Jetzt Termin wählen & sichern!',
    callButton: 'Jetzt anrufen',
    emailButton: 'Mail uns!',
    aboutName: 'Yvonne Jadke – Fotograf Hannover',
    aboutTagline: 'Familienfotos, Businessportraits & Hochzeitsfotografie'
  }
};

async function testQuiz() {
  console.log('\n' + '='.repeat(60));
  console.log('  QUIZ CONTENT VERIFICATION TEST - LANDING 1');
  console.log('='.repeat(60) + '\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // VISUAL LAYOUT CHECKS
  const layoutChecks = [];

  const distPath = path.join(__dirname, 'dist', 'landing1-family');
  let passed = 0;
  let failed = 0;
  const issues = [];

  // First, get logo style from main page for comparison
  const mainPagePath = path.join(distPath, 'index.html');
  await page.goto(`file:///${mainPagePath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  const mainLogoStyle = await page.evaluate(() => {
    const logo = document.querySelector('.logo-text');
    if (!logo) return null;
    const style = window.getComputedStyle(logo);
    return {
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      color: style.color
    };
  });
  console.log('--- LOGO CONSISTENCY CHECK ---');
  console.log(`Main page logo: ${mainLogoStyle?.fontSize}, weight ${mainLogoStyle?.fontWeight}`);

  // Test each quiz step
  for (const step of FIGMA_QUIZ.steps) {
    const stepFile = step.stepNumber === 1 ? 'quiz-step1.html' : `quiz-step${step.stepNumber}.html`;
    const filePath = path.join(distPath, stepFile);

    if (!fs.existsSync(filePath)) {
      console.log(`\n❌ Step ${step.stepNumber}: File not found - ${stepFile}`);
      failed++;
      issues.push({ page: stepFile, issue: 'File not found' });
      continue;
    }

    await page.goto(`file:///${filePath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });

    console.log(`\n--- STEP ${step.stepNumber} ---`);

    // LOGO CONSISTENCY: Compare with main page
    const quizLogoStyle = await page.evaluate(() => {
      const logo = document.querySelector('.logo-text');
      if (!logo) return null;
      const style = window.getComputedStyle(logo);
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color
      };
    });
    if (mainLogoStyle && quizLogoStyle &&
        mainLogoStyle.fontSize === quizLogoStyle.fontSize &&
        mainLogoStyle.fontWeight === quizLogoStyle.fontWeight) {
      console.log(`✓ Logo style matches main page`);
      passed++;
    } else {
      console.log(`✗ Logo style DIFFERS from main page`);
      console.log(`  Main: ${mainLogoStyle?.fontSize}/${mainLogoStyle?.fontWeight}`);
      console.log(`  Quiz: ${quizLogoStyle?.fontSize}/${quizLogoStyle?.fontWeight}`);
      failed++;
      issues.push({ page: stepFile, field: 'logoStyle', expected: mainLogoStyle, actual: quizLogoStyle });
    }

    // Check progress text
    const progressText = await page.$eval('.quiz-page__progress', el => el.textContent.trim()).catch(() => null);
    if (progressText === step.progress) {
      console.log(`✓ Progress: "${step.progress}"`);
      passed++;
    } else {
      console.log(`✗ Progress: Expected "${step.progress}", got "${progressText}"`);
      failed++;
      issues.push({ page: stepFile, field: 'progress', expected: step.progress, actual: progressText });
    }

    // Check question
    const questionText = await page.$eval('.quiz-page__question', el => el.textContent.trim()).catch(() => null);
    if (questionText === step.question) {
      console.log(`✓ Question: "${step.question}"`);
      passed++;
    } else {
      console.log(`✗ Question: Expected "${step.question}", got "${questionText}"`);
      failed++;
      issues.push({ page: stepFile, field: 'question', expected: step.question, actual: questionText });
    }

    // Check options count
    const optionsCount = await page.$$eval('.quiz-option', els => els.length).catch(() => 0);
    if (optionsCount === step.options.length) {
      console.log(`✓ Options count: ${step.options.length}`);
      passed++;
    } else {
      console.log(`✗ Options count: Expected ${step.options.length}, got ${optionsCount}`);
      failed++;
      issues.push({ page: stepFile, field: 'optionsCount', expected: step.options.length, actual: optionsCount });
    }

    // Check each option text
    const optionTexts = await page.$$eval('.quiz-option__text', els => els.map(el => el.textContent.trim())).catch(() => []);
    for (let i = 0; i < step.options.length; i++) {
      if (optionTexts[i] === step.options[i]) {
        console.log(`✓ Option ${i + 1}: "${step.options[i]}"`);
        passed++;
      } else {
        console.log(`✗ Option ${i + 1}: Expected "${step.options[i]}", got "${optionTexts[i]}"`);
        failed++;
        issues.push({ page: stepFile, field: `option${i + 1}`, expected: step.options[i], actual: optionTexts[i] });
      }
    }

    // LAYOUT CHECK: Verify centering for 2col and 3col
    if (step.columns === 2 || step.columns === 3) {
      const isCentered = await page.evaluate(() => {
        const options = document.querySelector('.quiz-page__options');
        if (!options) return false;
        const style = window.getComputedStyle(options);
        return style.marginLeft === style.marginRight || style.margin.includes('auto');
      });
      if (isCentered) {
        console.log(`✓ Layout: ${step.columns}col grid is centered`);
        passed++;
      } else {
        console.log(`✗ Layout: ${step.columns}col grid NOT centered`);
        failed++;
        issues.push({ page: stepFile, field: 'layout', expected: 'centered', actual: 'not centered' });
      }
    }

    // Take screenshot
    await page.screenshot({
      path: path.join(__dirname, 'test-results', `quiz-step${step.stepNumber}.png`),
      fullPage: true
    });
  }

  // Test form page
  const formPath = path.join(distPath, 'quiz-form.html');
  if (fs.existsSync(formPath)) {
    await page.goto(`file:///${formPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });

    console.log(`\n--- FORM ---`);

    // Check form label
    const formLabel = await page.$eval('.quiz-form__label', el => el.textContent.trim()).catch(() => null);
    if (formLabel === FIGMA_QUIZ.form.label) {
      console.log(`✓ Form label: "${FIGMA_QUIZ.form.label}"`);
      passed++;
    } else {
      console.log(`✗ Form label: Expected "${FIGMA_QUIZ.form.label}", got "${formLabel}"`);
      failed++;
      issues.push({ page: 'quiz-form.html', field: 'label', expected: FIGMA_QUIZ.form.label, actual: formLabel });
    }

    // Check submit button
    const submitBtn = await page.$eval('.quiz-form__form button[type="submit"]', el => el.textContent.trim()).catch(() => null);
    if (submitBtn === FIGMA_QUIZ.form.submitButton) {
      console.log(`✓ Submit button: "${FIGMA_QUIZ.form.submitButton}"`);
      passed++;
    } else {
      console.log(`✗ Submit button: Expected "${FIGMA_QUIZ.form.submitButton}", got "${submitBtn}"`);
      failed++;
      issues.push({ page: 'quiz-form.html', field: 'submitButton', expected: FIGMA_QUIZ.form.submitButton, actual: submitBtn });
    }

    // LAYOUT CHECK: Form title should be single line
    const formTitleWrapped = await page.evaluate(() => {
      const title = document.querySelector('.quiz-form__title');
      if (!title) return null;
      const style = window.getComputedStyle(title);
      const lineHeight = parseFloat(style.lineHeight);
      const height = title.getBoundingClientRect().height;
      return height > lineHeight * 1.5; // If height > 1.5 line heights, it's wrapped
    });
    if (formTitleWrapped === false) {
      console.log(`✓ Layout: Form title is single line`);
      passed++;
    } else if (formTitleWrapped === true) {
      console.log(`✗ Layout: Form title is wrapped (should be single line)`);
      failed++;
      issues.push({ page: 'quiz-form.html', field: 'titleWrapping', expected: 'single line', actual: 'wrapped' });
    }

    await page.screenshot({
      path: path.join(__dirname, 'test-results', 'quiz-form.png'),
      fullPage: true
    });
  }

  // Test success page
  const successPath = path.join(distPath, 'quiz-success.html');
  if (fs.existsSync(successPath)) {
    await page.goto(`file:///${successPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });

    console.log(`\n--- SUCCESS ---`);

    // Check success title
    const successTitle = await page.$eval('.quiz-success__title', el => el.textContent.trim()).catch(() => null);
    if (successTitle === FIGMA_QUIZ.success.title) {
      console.log(`✓ Success title: "${FIGMA_QUIZ.success.title}"`);
      passed++;
    } else {
      console.log(`✗ Success title: Expected "${FIGMA_QUIZ.success.title}", got "${successTitle}"`);
      failed++;
      issues.push({ page: 'quiz-success.html', field: 'title', expected: FIGMA_QUIZ.success.title, actual: successTitle });
    }

    // Check CTA button
    const ctaBtn = await page.$eval('.quiz-success__cta', el => el.textContent.trim()).catch(() => null);
    if (ctaBtn === FIGMA_QUIZ.success.ctaText) {
      console.log(`✓ CTA button: "${FIGMA_QUIZ.success.ctaText}"`);
      passed++;
    } else {
      console.log(`✗ CTA button: Expected "${FIGMA_QUIZ.success.ctaText}", got "${ctaBtn}"`);
      failed++;
      issues.push({ page: 'quiz-success.html', field: 'ctaText', expected: FIGMA_QUIZ.success.ctaText, actual: ctaBtn });
    }

    // Check about name
    const aboutName = await page.$eval('.quiz-success__about-name', el => el.textContent.trim()).catch(() => null);
    if (aboutName === FIGMA_QUIZ.success.aboutName) {
      console.log(`✓ About name: "${FIGMA_QUIZ.success.aboutName}"`);
      passed++;
    } else {
      console.log(`✗ About name: Expected "${FIGMA_QUIZ.success.aboutName}", got "${aboutName}"`);
      failed++;
      issues.push({ page: 'quiz-success.html', field: 'aboutName', expected: FIGMA_QUIZ.success.aboutName, actual: aboutName });
    }

    // LAYOUT CHECK: Success title should be single line
    const successTitleWrapped = await page.evaluate(() => {
      const title = document.querySelector('.quiz-success__title');
      if (!title) return null;
      const style = window.getComputedStyle(title);
      const lineHeight = parseFloat(style.lineHeight);
      const height = title.getBoundingClientRect().height;
      return height > lineHeight * 1.5;
    });
    if (successTitleWrapped === false) {
      console.log(`✓ Layout: Success title is single line`);
      passed++;
    } else if (successTitleWrapped === true) {
      console.log(`✗ Layout: Success title is wrapped (should be single line)`);
      failed++;
      issues.push({ page: 'quiz-success.html', field: 'titleWrapping', expected: 'single line', actual: 'wrapped' });
    }

    // VISUAL CHECK: Social icons should be 50x50px (filled style)
    const socialIconsInfo = await page.evaluate(() => {
      const icons = document.querySelectorAll('.quiz-success__social .social-icon img');
      return Array.from(icons).map(img => ({
        src: img.src,
        width: img.getBoundingClientRect().width,
        height: img.getBoundingClientRect().height
      }));
    });
    if (socialIconsInfo.length === 3) {
      console.log(`✓ Social icons: ${socialIconsInfo.length} icons present`);
      passed++;
    } else {
      console.log(`✗ Social icons: Expected 3, got ${socialIconsInfo.length}`);
      failed++;
      issues.push({ page: 'quiz-success.html', field: 'socialIcons', expected: 3, actual: socialIconsInfo.length });
    }

    await page.screenshot({
      path: path.join(__dirname, 'test-results', 'quiz-success.png'),
      fullPage: true
    });
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('  SUMMARY');
  console.log('='.repeat(60));
  console.log(`\n  ✓ Passed:  ${passed}`);
  console.log(`  ✗ Failed:  ${failed}`);

  if (issues.length > 0) {
    console.log('\n  ISSUES FOUND:');
    issues.forEach((issue, i) => {
      console.log(`\n  ${i + 1}. ${issue.page} - ${issue.field || issue.issue}`);
      if (issue.expected) {
        console.log(`     Expected: "${issue.expected}"`);
        console.log(`     Actual:   "${issue.actual}"`);
      }
    });
  } else {
    console.log('\n  All quiz content matches Figma design!');
  }

  // Save report
  const reportPath = path.join(__dirname, 'test-results', 'quiz-verification.json');
  fs.writeFileSync(reportPath, JSON.stringify({ passed, failed, issues }, null, 2));
  console.log(`\n  Report saved to: ${reportPath}\n`);

  return failed === 0;
}

testQuiz().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
