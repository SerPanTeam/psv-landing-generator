# Landing Generator

Система генерации лендингов для фотографов на основе Bootstrap 5 с квиз-функциональностью.

## Возможности

- 🎨 **Pixel-perfect** дизайн из Figma
- 🔧 **CSS переменные** для кастомизации
- ♻️ **Переиспользуемые секции**
- 📱 **Адаптивный дизайн** (mobile-first)
- 🧩 **Квиз-система** с формой сбора лидов
- 📊 **Готовность к аналитике**
- 🚀 **GitHub Pages** деплой

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Сборка всех лендингов
npm run build:all

# Локальный сервер
npm run serve

# Разработка (сборка + сервер)
npm run dev
```

## Структура проекта

```
landing-generator/
├── sections/           # HTML шаблоны секций
├── assets/            # Изображения и иконки
├── css/               # Стили
│   ├── variables.css  # CSS переменные (кастомизация)
│   ├── base.css       # Базовые стили
│   ├── components.css # Компоненты
│   ├── sections.css   # Стили секций
│   └── responsive.css # Адаптивность
├── js/                # JavaScript
├── config/            # JSON конфиги лендингов
├── dist/              # Готовые HTML файлы
└── generator.js       # Скрипт сборки
```

## Кастомизация

### 1. Цвета и типографика

Откройте `css/variables.css` и измените значения:

```css
:root {
  --color-bg-primary: #F5EDE0;
  --color-button-primary: #E2C08D;
  --font-family-primary: 'Inter', sans-serif;
  /* ... */
}
```

### 2. Контент лендинга

Создайте JSON конфиг в `config/`:

```json
{
  "meta": {
    "title": "Familien-Fotoshooting | Yvonne Jadke",
    "description": "...",
    "lang": "de"
  },
  "sections": [
    {
      "type": "hero",
      "variant": "v1",
      "data": {
        "title": "Hello, I am a photographer",
        "buttonText": "Zur Aktion →"
      }
    }
  ]
}
```

### 3. Квиз

Настройте шаги квиза в JSON конфиге:

```json
{
  "quiz": {
    "cardStyle": "square",  // или "rounded"
    "steps": [
      {
        "progress": "4 Fragen bis zum Gutschein",
        "question": "Kennst du mich bereits?",
        "options": [
          {"text": "Ja, na klar!", "value": "yes_sure"},
          {"text": "Nein, noch nicht", "value": "no"}
        ]
      }
    ]
  }
}
```

## Лендинги

| # | Название | Файл | Тема |
|---|----------|------|------|
| 1 | Familien-Fotoshooting | `landing1.html` | Рождественская акция |
| 2 | Familien und Kinder | `landing2.html` | Бесплатная акция |
| 3 | Hunde-Fotoshooting | `landing3.html` | Фотосессия собак |
| 4 | Kinder-Fotoshooting | `landing4.html` | Детская фотосессия |

## Деплой на GitHub Pages

```bash
# Сборка и деплой
npm run deploy
```

Или настройте GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:all
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Аналитика

Откройте `js/analytics.js` и настройте:

```javascript
const AnalyticsConfig = {
  ga4: {
    enabled: true,
    measurementId: 'G-XXXXXXXXXX'
  },
  facebook: {
    enabled: true,
    pixelId: 'XXXXXXXXXXXXXXXX'
  }
};
```

## Figma

Исходные макеты: [Figma File](https://www.figma.com/design/qGiP8ZP2Ot8Tut1faJDl4p/)

### Как получить данные из Figma (Claude Code)

```
Figma:get_design_context fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
Figma:get_screenshot fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
Figma:get_variable_defs fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
```

## Технологии

- Bootstrap 5.3
- Vanilla JavaScript (ES6+)
- CSS Custom Properties
- Google Fonts (Inter)

## Лицензия

ISC
