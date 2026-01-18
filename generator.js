/**
 * Landing Generator
 *
 * ГЛАВНЫЙ ПРИНЦИП: Pixel-perfect по Figma с Bootstrap
 * CSS переменные для кастомизации, переиспользование секций
 *
 * Собирает HTML лендинги из шаблонов секций на основе JSON конфигов
 */

const fs = require('fs');
const path = require('path');

// Папки
const SECTIONS_DIR = path.join(__dirname, 'sections');
const CONFIG_DIR = path.join(__dirname, 'config');
const DIST_DIR = path.join(__dirname, 'dist');
const CSS_DIR = path.join(__dirname, 'css');
const JS_DIR = path.join(__dirname, 'js');
const ASSETS_DIR = path.join(__dirname, 'assets');

/**
 * Загружает шаблон секции
 */
function loadSection(sectionPath) {
  const fullPath = path.join(SECTIONS_DIR, sectionPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Section not found: ${sectionPath}`);
    return '';
  }
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Заменяет {{placeholders}} на значения из данных
 */
function replacePlaceholders(template, data) {
  let result = template;

  // 1. Удаляем Handlebars комментарии {{!-- ... --}}
  result = result.replace(/\{\{!--[\s\S]*?--\}\}/g, '');

  // Helper для получения значения по пути (поддержка nested.path)
  function getValueByPath(obj, path) {
    if (path.includes('.')) {
      return path.split('.').reduce((o, k) => o && o[k], obj);
    }
    return obj[path];
  }

  // 2. Сначала обрабатываем ПРОСТЫЕ условия {{#if key}}...{{/if}} (без else)
  // Используем негативный lookahead чтобы не захватывать блоки с {{else}} или вложенными {{#if}}
  // Обрабатываем многократно пока есть совпадения (для вложенных - от внутренних к внешним)
  let prevResult;
  do {
    prevResult = result;
    // Матчим только если между {{#if}} и {{/if}} НЕТ {{else}} и НЕТ вложенных {{#if}}
    // Это обеспечивает обработку от внутренних блоков к внешним
    // Поддержка nested.path в условиях
    const simpleIfRegex = /\{\{#if\s+([\w.]+)\}\}((?:(?!\{\{else\}\})(?!\{\{#if\s)[\s\S])*?)\{\{\/if\}\}/g;
    result = result.replace(simpleIfRegex, (match, key, content) => {
      return getValueByPath(data, key) ? content : '';
    });
  } while (result !== prevResult);

  // 3. Теперь обрабатываем условия с {{else}}: {{#if key}}...{{else}}...{{/if}}
  do {
    prevResult = result;
    const ifElseRegex = /\{\{#if\s+([\w.]+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g;
    result = result.replace(ifElseRegex, (match, key, ifContent, elseContent) => {
      return getValueByPath(data, key) ? ifContent : elseContent;
    });
  } while (result !== prevResult);

  // 4. Обработка циклов {{#each items}}...{{/each}} (с поддержкой вложенных)
  // Обрабатываем снаружи внутрь с передачей контекста
  function processEachRecursive(template, contextData) {
    // Находим {{#each}} с балансировкой скобок
    function findMatchingEnd(str, startPos) {
      let depth = 1;
      let pos = startPos;
      while (pos < str.length && depth > 0) {
        if (str.substring(pos, pos + 8) === '{{#each ') {
          depth++;
          pos += 8;
        } else if (str.substring(pos, pos + 9) === '{{/each}}') {
          depth--;
          if (depth === 0) return pos;
          pos += 9;
        } else {
          pos++;
        }
      }
      return -1;
    }

    let result = template;
    let searchStart = 0;

    while (true) {
      // Найти следующий {{#each ...}}
      const eachStart = result.indexOf('{{#each ', searchStart);
      if (eachStart === -1) break;

      // Найти конец тега открытия
      const tagEnd = result.indexOf('}}', eachStart);
      if (tagEnd === -1) break;

      // Извлечь имя массива
      const arrayPath = result.substring(eachStart + 8, tagEnd).trim();

      // Найти соответствующий {{/each}}
      const contentStart = tagEnd + 2;
      const endPos = findMatchingEnd(result, contentStart);
      if (endPos === -1) break;

      // Извлечь содержимое
      const itemTemplate = result.substring(contentStart, endPos);

      // Получить массив данных
      let items;
      if (arrayPath.includes('.')) {
        items = arrayPath.split('.').reduce((obj, key) => obj && obj[key], contextData);
      } else {
        items = contextData[arrayPath];
      }

      // Заменить блок на развёрнутый контент
      let replacement = '';
      if (Array.isArray(items)) {
        replacement = items.map((item, index) => {
          let itemResult = itemTemplate;

          // Merge item with parent context for nested access
          const itemContext = typeof item === 'object' && item !== null
            ? { ...contextData, ...item }
            : contextData;

          // Рекурсивно обрабатываем вложенные {{#each}}
          itemResult = processEachRecursive(itemResult, itemContext);

          // Если item — примитив, заменяем {{this}}
          if (typeof item !== 'object' || item === null) {
            itemResult = itemResult.replace(/\{\{this\}\}/g, item);
          } else {
            // Если item — объект, заменяем {{this.key}} и {{key}}
            Object.keys(item).forEach(key => {
              const value = item[key];
              if (typeof value === 'string' || typeof value === 'number') {
                itemResult = itemResult.replace(new RegExp(`\\{\\{this\\.${key}\\}\\}`, 'g'), value);
                itemResult = itemResult.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
              }
            });
          }

          // Индекс
          itemResult = itemResult.replace(/\{\{@index\}\}/g, index);
          itemResult = itemResult.replace(/\{\{@number\}\}/g, index + 1);

          // @first
          const isFirst = index === 0;
          itemResult = itemResult.replace(/\{\{#if @first\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, content) => {
            return isFirst ? content : '';
          });

          // @last
          const isLast = index === items.length - 1;
          itemResult = itemResult.replace(/\{\{#if @last\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, content) => {
            return isLast ? content : '';
          });

          return itemResult;
        }).join('\n');
      }

      // Собираем результат
      result = result.substring(0, eachStart) + replacement + result.substring(endPos + 9);
      // Не увеличиваем searchStart, т.к. мы удалили блок и следующий может быть на том же месте
    }

    return result;
  }

  result = processEachRecursive(result, data);

  // 5. Простые плейсхолдеры {{key}} и {{nested.key}}
  // Сначала обрабатываем вложенные пути ({{form.formLabel}}, {{success.title}})
  const nestedPlaceholderRegex = /\{\{(\w+)\.(\w+)\}\}/g;
  result = result.replace(nestedPlaceholderRegex, (match, objKey, propKey) => {
    const obj = data[objKey];
    if (obj && typeof obj === 'object' && (typeof obj[propKey] === 'string' || typeof obj[propKey] === 'number')) {
      return obj[propKey];
    }
    return match; // Оставляем как есть, если не найдено
  });

  // Затем простые плейсхолдеры {{key}}
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (typeof value === 'string' || typeof value === 'number') {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(regex, value);
    }
  });

  return result;
}

/**
 * Собирает секцию с данными
 * @param {object} sectionConfig - Section configuration
 * @param {object} globalConfig - Global landing configuration (for quiz data)
 */
function buildSection(sectionConfig, globalConfig = {}) {
  const template = loadSection(sectionConfig.template);
  if (!template) return '';

  let data = sectionConfig.data || {};

  // If this is quiz-container, merge quiz data
  if (sectionConfig.template === 'quiz/quiz-container.html' && globalConfig.quiz) {
    data = {
      ...data,
      ...globalConfig.quiz,
      steps: globalConfig.quiz.steps || [],
      form: globalConfig.quiz.form || {},
      success: globalConfig.quiz.success || {}
    };
  }

  return replacePlaceholders(template, data);
}

/**
 * Генерирует quiz step страницу
 */
function generateQuizStepPage(stepConfig, quizConfig, globalConfig) {
  const template = loadSection('quiz/quiz-page-step.html');
  if (!template) {
    console.warn('Quiz step template not found');
    return '';
  }

  // Merge data from step, quiz, and global configs
  const data = {
    lang: globalConfig.lang || 'de',
    metaTitle: `${globalConfig.meta?.title || 'Quiz'} - Schritt ${stepConfig.stepNumber}`,
    metaDescription: globalConfig.meta?.description || '',
    logoText: quizConfig.logoText || 'Logo',
    progress: stepConfig.progress,
    question: stepConfig.question,
    columns: stepConfig.columns,
    cardStyle: quizConfig.cardStyle || 'square',
    options: stepConfig.options.map(opt => ({
      ...opt,
      nextPage: stepConfig.nextPage,
      cardStyle: quizConfig.cardStyle || 'square'
    })),
    impressumUrl: quizConfig.impressumUrl || '#',
    datenschutzUrl: quizConfig.datenschutzUrl || '#',
    cookieUrl: quizConfig.cookieUrl || '#',
    stepNumber: stepConfig.stepNumber
  };

  return replacePlaceholders(template, data);
}

/**
 * Генерирует quiz form страницу
 */
function generateQuizFormPage(formConfig, quizConfig, globalConfig) {
  const template = loadSection('quiz/quiz-page-form.html');
  if (!template) {
    console.warn('Quiz form template not found');
    return '';
  }

  const data = {
    lang: globalConfig.lang || 'de',
    metaTitle: `${globalConfig.meta?.title || 'Quiz'} - Formular`,
    metaDescription: globalConfig.meta?.description || '',
    logoText: quizConfig.logoText || 'Logo',
    ...formConfig,
    impressumUrl: quizConfig.impressumUrl || '#',
    datenschutzUrl: quizConfig.datenschutzUrl || '#',
    cookieUrl: quizConfig.cookieUrl || '#',
    mapEmbedUrl: quizConfig.mapEmbedUrl || ''
  };

  return replacePlaceholders(template, data);
}

/**
 * Генерирует quiz success страницу
 */
function generateQuizSuccessPage(successConfig, quizConfig, globalConfig) {
  const template = loadSection('quiz/quiz-page-success.html');
  if (!template) {
    console.warn('Quiz success template not found');
    return '';
  }

  const data = {
    lang: globalConfig.lang || 'de',
    metaTitle: `${globalConfig.meta?.title || 'Quiz'} - Erfolg`,
    metaDescription: globalConfig.meta?.description || '',
    logoText: quizConfig.logoText || 'Logo',
    ...successConfig,
    impressumUrl: quizConfig.impressumUrl || '#',
    datenschutzUrl: quizConfig.datenschutzUrl || '#',
    cookieUrl: quizConfig.cookieUrl || '#',
    mapEmbedUrl: quizConfig.mapEmbedUrl || ''
  };

  return replacePlaceholders(template, data);
}

/**
 * Генерирует все quiz страницы для лендинга
 */
function generateQuizPages(config, landingDir) {
  const quizConfig = config.quiz;
  if (!quizConfig) {
    console.log('  No quiz config found, skipping quiz pages');
    return;
  }

  const destDir = path.join(DIST_DIR, landingDir);

  // Generate step pages
  if (quizConfig.steps && Array.isArray(quizConfig.steps)) {
    quizConfig.steps.forEach((step, index) => {
      const html = generateQuizStepPage(step, quizConfig, config);
      const fileName = `quiz-step${index + 1}.html`;
      fs.writeFileSync(path.join(destDir, fileName), html, 'utf-8');
      console.log(`  ✓ Generated: ${fileName}`);
    });
  }

  // Generate form page
  if (quizConfig.form) {
    const html = generateQuizFormPage(quizConfig.form, quizConfig, config);
    fs.writeFileSync(path.join(destDir, 'quiz-form.html'), html, 'utf-8');
    console.log('  ✓ Generated: quiz-form.html');
  }

  // Generate success page
  if (quizConfig.success) {
    const html = generateQuizSuccessPage(quizConfig.success, quizConfig, config);
    fs.writeFileSync(path.join(destDir, 'quiz-success.html'), html, 'utf-8');
    console.log('  ✓ Generated: quiz-success.html');
  }
}

/**
 * Генерирует HTML страницу
 */
function generatePage(config) {
  const sections = config.sections.map(section => buildSection(section, config)).join('\n\n');

  // Базовый HTML шаблон
  const html = `<!DOCTYPE html>
<html lang="${config.lang || 'de'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${config.meta?.description || ''}">
  <meta name="keywords" content="${config.meta?.keywords || ''}">
  <title>${config.meta?.title || 'Fotoshooting'}</title>

  <!-- Open Graph -->
  <meta property="og:title" content="${config.meta?.title || ''}">
  <meta property="og:description" content="${config.meta?.description || ''}">
  <meta property="og:type" content="website">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/sections.css">
  <link rel="stylesheet" href="css/quiz.css">
  <link rel="stylesheet" href="css/responsive.css">
  ${config.customCss ? `<link rel="stylesheet" href="${config.customCss}">` : ''}
</head>
<body>
  ${sections}

  <!-- Bootstrap 5 JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Custom JS -->
  <script src="js/faq.js"></script>
  <script src="js/quiz.js"></script>
  <script src="js/gallery-slider.js"></script>
  <script src="js/analytics.js"></script>
</body>
</html>`;

  return html;
}

/**
 * Рекурсивно копирует папку
 */
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

/**
 * Копирует CSS, JS и assets в папку конкретного лендинга
 */
function copyAssetsToLanding(landingDir) {
  const destDir = path.join(DIST_DIR, landingDir);

  // Создаём папки
  const dirs = ['css', 'js', 'assets', 'assets/images', 'assets/icons'];
  dirs.forEach(dir => {
    const fullPath = path.join(destDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });

  // Копируем CSS
  if (fs.existsSync(CSS_DIR)) {
    fs.readdirSync(CSS_DIR).forEach(file => {
      if (file.endsWith('.css')) {
        fs.copyFileSync(
          path.join(CSS_DIR, file),
          path.join(destDir, 'css', file)
        );
      }
    });
  }

  // Копируем JS
  if (fs.existsSync(JS_DIR)) {
    fs.readdirSync(JS_DIR).forEach(file => {
      if (file.endsWith('.js')) {
        fs.copyFileSync(
          path.join(JS_DIR, file),
          path.join(destDir, 'js', file)
        );
      }
    });
  }

  // Копируем assets
  copyDirRecursive(path.join(ASSETS_DIR, 'images'), path.join(destDir, 'assets', 'images'));
  copyDirRecursive(path.join(ASSETS_DIR, 'icons'), path.join(destDir, 'assets', 'icons'));
}

/**
 * Генерирует кастомные CSS переменные для лендинга
 */
function generateCustomVariables(config, landingDir) {
  const variablesPath = path.join(CSS_DIR, 'variables.css');
  if (!fs.existsSync(variablesPath)) return;

  let variablesContent = fs.readFileSync(variablesPath, 'utf-8');
  const customVars = config.cssVariables || {};

  // Заменяем значения переменных из конфига
  for (const [varName, value] of Object.entries(customVars)) {
    // Регулярка для поиска --var-name: value;
    const regex = new RegExp(`(${varName}:\\s*)[^;]+`, 'g');
    variablesContent = variablesContent.replace(regex, `$1${value}`);
  }

  // Сохраняем кастомизированные переменные
  const destPath = path.join(DIST_DIR, landingDir, 'css', 'variables.css');
  fs.writeFileSync(destPath, variablesContent, 'utf-8');
}

/**
 * Собирает один лендинг в отдельную папку
 */
function buildLanding(configFile) {
  const configPath = path.join(CONFIG_DIR, configFile);
  if (!fs.existsSync(configPath)) {
    console.error(`Config not found: ${configFile}`);
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  // Имя папки лендинга (без .html)
  const landingDir = (config.output || 'landing').replace('.html', '');

  // Создаём папку лендинга
  const landingPath = path.join(DIST_DIR, landingDir);
  if (!fs.existsSync(landingPath)) {
    fs.mkdirSync(landingPath, { recursive: true });
  }

  // Копируем ресурсы в папку лендинга
  copyAssetsToLanding(landingDir);

  // Генерируем кастомные CSS переменные
  generateCustomVariables(config, landingDir);

  // Генерируем HTML
  const html = generatePage(config);

  // Сохраняем как index.html в папке лендинга
  const outputFile = path.join(landingPath, 'index.html');
  fs.writeFileSync(outputFile, html, 'utf-8');

  console.log(`✓ Built: ${landingDir}/index.html`);

  // Генерируем quiz страницы
  generateQuizPages(config, landingDir);
}

/**
 * Создаёт index.html с навигацией
 */
function createIndexPage(landings) {
  const landingCards = landings.map((landing, index) => {
    // Ссылка на папку лендинга (без .html)
    const landingDir = (landing.output || 'landing').replace('.html', '');
    return `
      <a href="${landingDir}/" class="landing-card">
        <span class="landing-card__number">Landing ${index + 1}</span>
        <h2 class="landing-card__title">${landing.meta?.title?.split('|')[0]?.trim() || landing.name}</h2>
        <p class="landing-card__description">${landing.meta?.description?.substring(0, 100) || ''}...</p>
        <span class="landing-card__arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </a>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PSV Landing Generator - Fotoshooting Landingpages</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: linear-gradient(180deg, #F5EDE0 0%, #EEE3D0 100%); color: #3D3D3D; min-height: 100vh; display: flex; flex-direction: column; }
    .header { background: #3D3D3D; color: white; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; }
    .header__logo { font-size: 24px; font-weight: 700; letter-spacing: 2px; }
    .header__badge { background: #E2C08D; color: #3D3D3D; padding: 6px 14px; font-size: 12px; font-weight: 700; border-radius: 20px; }
    .main { flex: 1; padding: 60px 20px; }
    .container { max-width: 1100px; margin: 0 auto; }
    .hero { text-align: center; margin-bottom: 60px; }
    .hero__title { font-size: 48px; font-weight: 700; margin-bottom: 16px; line-height: 1.2; }
    .hero__title span { color: #E2C08D; }
    .hero__subtitle { font-size: 20px; color: #666; max-width: 600px; margin: 0 auto; }
    .landings { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
    .landing-card { background: white; border-radius: 16px; padding: 32px; transition: transform 0.3s, box-shadow 0.3s; text-decoration: none; color: inherit; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .landing-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #E2C08D, #D4A574); }
    .landing-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
    .landing-card__number { display: inline-block; background: #F5EDE0; color: #3D3D3D; padding: 6px 12px; font-size: 12px; font-weight: 700; border-radius: 6px; margin-bottom: 16px; }
    .landing-card__title { font-size: 22px; font-weight: 700; margin-bottom: 12px; line-height: 1.3; }
    .landing-card__description { font-size: 15px; color: #666; line-height: 1.5; }
    .landing-card__arrow { position: absolute; bottom: 28px; right: 28px; width: 40px; height: 40px; background: #F5EDE0; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.3s, transform 0.3s; }
    .landing-card:hover .landing-card__arrow { background: #E2C08D; transform: translateX(4px); }
    .landing-card__arrow svg { width: 16px; height: 16px; }
    .footer { background: #3D3D3D; color: white; padding: 30px; text-align: center; }
    .footer__author { font-size: 14px; opacity: 0.8; margin-bottom: 8px; }
    .footer__copyright { font-size: 12px; opacity: 0.5; }
    .footer a { color: #E2C08D; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
    @media (max-width: 768px) {
      .landings { grid-template-columns: 1fr; }
      .hero__title { font-size: 32px; }
      .hero__subtitle { font-size: 16px; }
      .header { flex-direction: column; gap: 12px; text-align: center; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header__logo">PSV LANDING</div>
    <span class="header__badge">v1.0</span>
  </header>
  <main class="main">
    <div class="container">
      <div class="hero">
        <h1 class="hero__title">Landing <span>Generator</span></h1>
        <p class="hero__subtitle">Professionelle Fotoshooting-Landingpages mit Quiz-System und Bootstrap 5</p>
      </div>
      <div class="landings">
        ${landingCards}
      </div>
    </div>
  </main>
  <footer class="footer">
    <p class="footer__author">Created by <a href="https://github.com/SerPanTeam" target="_blank">Panchenko Serhii</a></p>
    <p class="footer__copyright">© 2025 PSV Landing Generator. Built with Bootstrap 5.</p>
  </footer>
</body>
</html>`;

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html, 'utf-8');
  console.log('✓ Created: index.html');

  // Создаём .nojekyll для GitHub Pages
  fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '', 'utf-8');
}

/**
 * Собирает все лендинги
 */
function buildAll() {
  console.log('\n🚀 Building all landings...\n');

  // Создаём dist папку
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Собираем все конфиги (ресурсы копируются в каждую папку лендинга)
  const landings = [];
  if (fs.existsSync(CONFIG_DIR)) {
    fs.readdirSync(CONFIG_DIR)
      .filter(file => file.endsWith('.json'))
      .forEach(configFile => {
        const configPath = path.join(CONFIG_DIR, configFile);
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        landings.push(config);
        buildLanding(configFile);
      });
  }

  // Создаём index.html
  createIndexPage(landings);

  console.log('\n✅ Build complete!\n');
}

/**
 * Собирает конкретный лендинг по номеру
 */
function buildByNumber(num) {
  const configs = {
    1: 'landing1-family.json',
    2: 'landing2-family-kids.json',
    3: 'landing3-dogs.json',
    4: 'landing4-kids.json'
  };

  if (!configs[num]) {
    console.error(`Unknown landing number: ${num}`);
    return;
  }

  // Создаём dist папку
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Ресурсы копируются внутри buildLanding
  buildLanding(configs[num]);
}

// CLI
const args = process.argv.slice(2);
const landingArg = args.find(arg => arg.startsWith('--landing='));

if (landingArg) {
  const num = parseInt(landingArg.split('=')[1]);
  buildByNumber(num);
} else {
  buildAll();
}
