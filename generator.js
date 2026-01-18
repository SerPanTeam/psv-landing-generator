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

  // 2. Сначала обрабатываем ПРОСТЫЕ условия {{#if key}}...{{/if}} (без else)
  // Используем негативный lookahead чтобы не захватывать блоки с {{else}} или вложенными {{#if}}
  // Обрабатываем многократно пока есть совпадения (для вложенных - от внутренних к внешним)
  let prevResult;
  do {
    prevResult = result;
    // Матчим только если между {{#if}} и {{/if}} НЕТ {{else}} и НЕТ вложенных {{#if}}
    // Это обеспечивает обработку от внутренних блоков к внешним
    const simpleIfRegex = /\{\{#if\s+(\w+)\}\}((?:(?!\{\{else\}\})(?!\{\{#if\s)[\s\S])*?)\{\{\/if\}\}/g;
    result = result.replace(simpleIfRegex, (match, key, content) => {
      return data[key] ? content : '';
    });
  } while (result !== prevResult);

  // 3. Теперь обрабатываем условия с {{else}}: {{#if key}}...{{else}}...{{/if}}
  do {
    prevResult = result;
    const ifElseRegex = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g;
    result = result.replace(ifElseRegex, (match, key, ifContent, elseContent) => {
      return data[key] ? ifContent : elseContent;
    });
  } while (result !== prevResult);

  // 4. Обработка циклов {{#each items}}...{{/each}}
  const eachRegex = /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g;
  result = result.replace(eachRegex, (match, arrayName, itemTemplate) => {
    const items = data[arrayName];
    if (!Array.isArray(items)) return '';

    return items.map((item, index) => {
      let itemResult = itemTemplate;

      // Если item — примитив (строка, число), заменяем {{this}}
      if (typeof item !== 'object' || item === null) {
        itemResult = itemResult.replace(/\{\{this\}\}/g, item);
      } else {
        // Если item — объект, заменяем {{this.key}} и {{key}}
        Object.keys(item).forEach(key => {
          const value = item[key];
          itemResult = itemResult.replace(new RegExp(`\\{\\{this\\.${key}\\}\\}`, 'g'), value);
          itemResult = itemResult.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
        });
      }

      // Индекс
      itemResult = itemResult.replace(/\{\{@index\}\}/g, index);
      itemResult = itemResult.replace(/\{\{@number\}\}/g, index + 1);

      // @first - показываем контент только для первого элемента
      const isFirst = index === 0;
      itemResult = itemResult.replace(/\{\{#if @first\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, content) => {
        return isFirst ? content : '';
      });

      // @last - показываем контент только для последнего элемента
      const isLast = index === items.length - 1;
      itemResult = itemResult.replace(/\{\{#if @last\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, content) => {
        return isLast ? content : '';
      });

      return itemResult;
    }).join('\n');
  });

  // 5. Простые плейсхолдеры {{key}}
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
 */
function buildSection(sectionConfig) {
  const template = loadSection(sectionConfig.template);
  if (!template) return '';

  return replacePlaceholders(template, sectionConfig.data || {});
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
  const sections = config.sections.map(buildSection).join('\n\n');

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
        <p class="landing-card__number">Лендинг ${index + 1}</p>
        <h2 class="landing-card__title">${landing.meta?.title?.split('|')[0]?.trim() || landing.name}</h2>
        <p class="landing-card__description">${landing.meta?.description?.substring(0, 100) || ''}...</p>
      </a>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Generator - Fotoshooting</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #F5EDE0; color: #3D3D3D; min-height: 100vh; padding: 60px 20px; }
    .container { max-width: 1000px; margin: 0 auto; }
    h1 { font-size: 45px; font-weight: 700; margin-bottom: 16px; text-align: center; }
    .subtitle { font-size: 22px; text-align: center; margin-bottom: 60px; color: #666; }
    .landings { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
    @media (max-width: 768px) { .landings { grid-template-columns: 1fr; } h1 { font-size: 32px; } }
    .landing-card { background: white; border: 1px solid #3D3D3D; padding: 30px; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; color: inherit; }
    .landing-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.1); }
    .landing-card__number { font-size: 14px; color: #E2C08D; margin-bottom: 8px; }
    .landing-card__title { font-size: 24px; font-weight: 700; margin-bottom: 12px; }
    .landing-card__description { font-size: 16px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Landing Generator</h1>
    <p class="subtitle">Fotoshooting Landingpages für Fotografen</p>
    <div class="landings">
      ${landingCards}
    </div>
  </div>
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
