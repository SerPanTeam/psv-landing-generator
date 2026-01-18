# Конфигурация лендингов

Каждый файл `landingX-*.json` содержит полную конфигурацию лендинга.

## Структура конфига

### Основные поля

| Поле | Описание |
|------|----------|
| `name` | Название лендинга (для внутреннего использования) |
| `output` | Имя выходного HTML файла |
| `lang` | Язык страницы (`de`, `en`, `ru`) |

### CSS переменные (`cssVariables`)

```json
"cssVariables": {
  "--color-bg-primary": "#F5EDE0",    // Основной цвет фона
  "--color-bg-secondary": "#EEE3D0",  // Вторичный цвет фона
  "--color-button-primary": "#E2C08D", // Цвет кнопок
  "--color-accent": "#D4A574"          // Акцентный цвет
}
```

### Meta теги (`meta`)

```json
"meta": {
  "title": "Заголовок страницы для SEO",
  "description": "Описание страницы для SEO",
  "keywords": "ключевые, слова, через, запятую"
}
```

---

## Секции лендинга (`sections`)

Каждая секция состоит из:
- `template` - путь к HTML шаблону
- `data` - данные для шаблона

### Header (header/header-v1.html)

```json
{
  "template": "header/header-v1.html",
  "data": {
    "logoText": "Logo"  // Текст логотипа
  }
}
```

### Hero секции

#### hero-v1.html (Лендинги 1, 2)
```json
{
  "template": "hero/hero-v1.html",
  "data": {
    "label": "Kostenloses",           // Маленький label сверху (опционально)
    "title": "Заголовок",             // Главный заголовок
    "subtitle": "Подзаголовок",       // Описание
    "buttonText": "Текст кнопки",
    "buttonLink": "quiz-step1.html",
    "imageMain": "URL основного изображения (500x500)",
    "imageSecondary": "URL вторичного изображения (400x380)",
    "imageAlt": "Alt текст"
  }
}
```

#### hero-v3.html (Лендинг 3 - Dogs)
```json
{
  "template": "hero/hero-v3.html",
  "data": {
    "bannerImage": "URL баннера (1400x800)",
    "label": "Kostenloses",
    "title": "Hunde-Fotoshooting",
    "subtitleLines": ["Строка 1", "Строка 2"],
    "buttonText": "Текст кнопки",
    "buttonLink": "quiz-step1.html",
    "sidebarTitle": "Заголовок сайдбара",
    "sidebarTexts": ["Параграф 1", "Параграф 2"],
    "sidebarButtonText": "Текст кнопки сайдбара",
    "sidebarButtonLink": "#",
    "sidebarImage": "URL изображения сайдбара (500x400)",
    "features": [
      {
        "image": "URL (400x300)",
        "title": "Заголовок",
        "text": "Описание"
      }
    ]
  }
}
```

#### hero-v4.html (Лендинг 4 - Kids)
```json
{
  "template": "hero/hero-v4.html",
  "data": {
    "title": "Заголовок",
    "subtitle": "Подзаголовок",
    "buttonText": "Текст кнопки",
    "buttonLink": "quiz-step1.html",
    "galleryImages": [
      { "src": "URL (350x400)", "alt": "Alt" }
    ]
  }
}
```

### Promo (promo/promo-v1.html)

```json
{
  "template": "promo/promo-v1.html",
  "data": {
    "image": "URL изображения (500x600)",
    "shortImage": true,               // Укороченное изображение (440px высота)
    "title": "Заголовок",
    "paragraphs": ["Параграф 1", "Параграф 2"],
    "subtitle": "Подзаголовок (опционально)",
    "extraParagraphs": ["Дополнительный текст"],
    "linkText": "Текст ссылки",
    "linkUrl": "quiz-step1.html",
    "linkAsButton": false,            // true = кнопка, false = ссылка
    "showBottomDivider": true         // Показать разделитель снизу
  }
}
```

### Content (content/content-v1.html)

```json
{
  "template": "content/content-v1.html",
  "data": {
    "image": "URL изображения (500x600)",
    "title": "Заголовок",
    "subtitle": "Подзаголовок",
    "paragraphs": ["Параграф 1", "Параграф 2"],
    "accentText": "Акцентный текст курсивом",
    "linkText": "Текст ссылки",
    "linkUrl": "quiz-step1.html"
  }
}
```

### Gallery секции

#### gallery-slider.html
```json
{
  "template": "gallery/gallery-slider.html",
  "data": {
    "rounded": true,                  // Скруглённые углы (для L3, L4)
    "images": [
      { "src": "URL (400x400)", "alt": "Alt" }
    ]
  }
}
```

#### gallery-fullwidth.html
```json
{
  "template": "gallery/gallery-fullwidth.html",
  "data": {
    "image": "URL полноширинного изображения (1400x700)",
    "alt": "Alt текст"
  }
}
```

#### gallery-decorated.html (только L3)
```json
{
  "template": "gallery/gallery-decorated.html",
  "data": {
    "image": "URL основного (1300x700)",
    "alt": "Alt",
    "decorTopRight": "URL декоративного (350x250)",
    "decorBottomLeft": "URL декоративного (350x250)"
  }
}
```

### Features секции

#### features-3col.html
```json
{
  "template": "features/features-3col.html",
  "data": {
    "sectionTitle": "Заголовок секции (опционально)",
    "items": [
      {
        "image": "URL иконки (120x120)",
        "title": "Заголовок",
        "text": "Описание"
      }
    ]
  }
}
```

#### features-grid.html (только L3)
```json
{
  "template": "features/features-grid.html",
  "data": {
    "items": [
      { "image": "URL (120x120)", "text": "Текст" }
    ]
  }
}
```

### Steps (steps/steps-4.html)

```json
{
  "template": "steps/steps-4.html",
  "data": {
    "bgClass": "section--bg-primary",  // Цвет фона (опционально)
    "rounded": true,                   // Скруглённые углы
    "title": "Заголовок секции",
    "ctaText": "Текст CTA кнопки",
    "ctaLink": "quiz-step1.html",
    "ctaTop": true,                    // CTA сверху
    "ctaBottom": false,                // CTA снизу
    "steps": [
      {
        "number": "1",
        "icon": "URL иконки (80x80)",
        "title": "1. Заголовок",
        "text": "Описание шага"
      }
    ]
  }
}
```

### FAQ секции

#### faq-accordion.html (L1, L2)
```json
{
  "template": "faq/faq-accordion.html",
  "data": {
    "title": "Häufige Fragen",
    "questions": [
      {
        "question": "Вопрос?",
        "answer": "Ответ на вопрос."
      }
    ]
  }
}
```

#### faq-cards.html (L3)
```json
{
  "template": "faq/faq-cards.html",
  "data": {
    "title": "Häufige Fragen",
    "questions": [...],
    "ctaText": "Текст кнопки",
    "ctaLink": "quiz-step1.html"
  }
}
```

### Services (services/services-grid.html)

```json
{
  "template": "services/services-grid.html",
  "data": {
    "bgClass": "section--bg-primary",  // Цвет фона
    "rounded": true,                   // Скруглённые углы
    "primaryButton": true,             // Залитая кнопка (false = контурная)
    "title": "Заголовок",
    "services": [
      {
        "image": "URL (350x350)",
        "title": "Название услуги",
        "text": "Описание"
      }
    ],
    "ctaText": "Текст кнопки",
    "ctaLink": "quiz-step1.html"
  }
}
```

### About (about/about-v1.html)

```json
{
  "template": "about/about-v1.html",
  "data": {
    "rounded": true,                   // Скруглённые углы
    "compact": true,                   // Компактный вариант (без divider)
    "image": "URL фото (500x600)",
    "label": "Willkommen bei",
    "name": "Имя Фотографа",
    "paragraphs": ["Параграф 1", "Параграф 2", "Параграф 3"],
    "texts": ["Альтернатива paragraphs"],
    "socials": []                      // Массив соцсетей (опционально)
  }
}
```

### CTA (cta/cta-v1.html)

```json
{
  "template": "cta/cta-v1.html",
  "data": {
    "bgClass": "section--bg-primary",
    "rounded": true,
    "layoutRow": true,                 // Row layout: текст слева, кнопка справа
    "title": "Заголовок",
    "subtitle": "Подзаголовок",
    "buttonText": "Текст кнопки",
    "buttonLink": "quiz-step1.html"
  }
}
```

### Footer (footer/footer-v1.html)

```json
{
  "template": "footer/footer-v1.html",
  "data": {
    "mapEmbedUrl": "Google Maps embed URL",
    "impressumUrl": "#",
    "datenschutzUrl": "#",
    "cookieUrl": "#"
  }
}
```

---

## Quiz конфигурация (`quiz`)

```json
"quiz": {
  "cardStyle": "square",              // "square" для L1/L2, "rounded" для L3/L4
  "logoText": "Logo",
  "impressumUrl": "#",
  "datenschutzUrl": "#",
  "cookieUrl": "#",
  "mapEmbedUrl": "Google Maps URL",

  "steps": [...],                     // Шаги квиза (см. ниже)
  "form": {...},                      // Форма (см. ниже)
  "success": {...}                    // Страница успеха (см. ниже)
}
```

### Quiz Step

```json
{
  "stepNumber": 1,
  "progress": "Текст прогресса",
  "question": "Вопрос?",
  "columns": 4,                       // Количество колонок (2, 3, 4)
  "nextPage": "quiz-step2.html",
  "options": [
    {
      "value": "option_id",
      "text": "Текст опции",
      "image": "URL (200x200)"
    }
  ]
}
```

### Quiz Form

```json
"form": {
  "formLabel": "Klasse, jetzt zum Gutschein",
  "formTitle": "Заголовок формы",
  "formSubtitle": "Подзаголовок",
  "formNote": "Примечание",
  "formImage": "URL изображения (450x550)",
  "formImageAlt": "Alt",
  "successPage": "quiz-success.html",
  "placeholderName": "Placeholder имени",
  "placeholderEmail": "Placeholder email",
  "placeholderPhone": "Placeholder телефона",
  "placeholderAvailability": "Placeholder доступности",
  "availabilityOptions": [
    { "value": "morgens", "label": "Morgens" }
  ],
  "privacyText": "Текст приватности",
  "privacyLinkText": "Текст ссылки",
  "submitButtonText": "Текст кнопки отправки",
  "privacyNote": "Примечание о приватности",
  "infoTitle": "Заголовок информации",
  "infoText": "Текст информации"
}
```

### Quiz Success

```json
"success": {
  "successTitle": "Herzlichen Glückwunsch!",
  "successSubtitle": "Подзаголовок",
  "successTexts": ["Параграф 1", "Параграф 2"],
  "successImage": "URL (450x550)",
  "successImageAlt": "Alt",
  "ctaText": "Текст CTA",
  "ctaLink": "#",
  "alternativeText": "Альтернативный текст",
  "callButtonText": "Jetzt anrufen",
  "emailButtonText": "Mail uns!",
  "phoneNumber": "+49123456789",
  "email": "info@example.com",
  "aboutName": "Имя фотографа",
  "aboutTagline": "Слоган",
  "aboutTexts": ["Параграф 1", "Параграф 2"],
  "showSocial": true,
  "facebookUrl": "#",
  "instagramUrl": "#",
  "websiteUrl": "#"
}
```

---

## Размеры изображений

| Секция | Размер | Примечание |
|--------|--------|------------|
| Hero main | 500x500 | Основное изображение |
| Hero secondary | 400x380 | Вторичное изображение |
| Hero banner (v3) | 1400x800 | Баннер на всю ширину |
| Promo | 500x600 | Вертикальное изображение |
| Gallery slider | 400x400 | Квадратные изображения |
| Gallery fullwidth | 1400x700 | Полноширинное |
| Services card | 350x350 | Карточки услуг |
| About | 500x600 | Фото фотографа |
| Features icon | 120x120 | Иконки фич |
| Steps icon | 80x80 | Иконки шагов |
| Quiz option | 200x200 | Опции квиза |
| Quiz form image | 450x550 | Изображение в форме |

---

## Команды сборки

```bash
# Собрать все лендинги
node generator.js

# Собрать конкретный лендинг
node generator.js --landing=1
node generator.js --landing=2
node generator.js --landing=3
node generator.js --landing=4
```
