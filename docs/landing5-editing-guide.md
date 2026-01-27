# Landing 5 - Business Hub: Руководство по редактированию

## Figma

**File:** [Шаблон сайта 23-01-2026](https://www.figma.com/design/SU5A4tONWqzVj80IvLo6oP/)

| Страница | Node ID | Ссылка |
|----------|---------|--------|
| Hub | `585:30` | [Открыть](https://www.figma.com/design/SU5A4tONWqzVj80IvLo6oP/?node-id=585-30&m=dev) |
| Hochzeit | TBD | — |
| Familie | TBD | — |
| Tier | TBD | — |
| Business | TBD | — |

---

## Обзор структуры

Landing 5 состоит из:
- **Главная страница (Hub)** - `config/landing5-business-hub.json`
- **4 подлендинга**:
  - Hochzeit (Свадьбы) - `config/landing5-hochzeit.json`
  - Familie (Семья) - `config/landing5-familie.json`
  - Tier (Животные) - `config/landing5-tier.json`
  - Business (Бизнес) - `config/landing5-business.json`

## Выходная структура после сборки

```
dist/landing5-business/
├── index.html           # Hub страница
├── hochzeit/
│   ├── index.html       # Подлендинг свадьбы
│   └── quiz-*.html      # Квиз страницы (8 шт)
├── familie/
│   ├── index.html
│   └── quiz-*.html
├── tier/
│   ├── index.html
│   └── quiz-*.html
├── business/
│   ├── index.html
│   └── quiz-*.html
├── css/                 # Общие стили
├── js/                  # Общие скрипты
└── assets/              # Изображения
```

---

## Цветовая схема

Цвета определены в `css/variables.css`:

| Переменная | Цвет | Использование |
|------------|------|---------------|
| `--color-bg-primary` | #F5EDE0 | Основной фон (бежевый) |
| `--color-bg-secondary` | #EEE3D0 | Вторичный фон (темнее) |
| `--color-bg-white` | #FFFFFF | Белый фон (карта) |
| `--color-button-primary` | #E2C08D | Цвет кнопок (золотой) |
| `--color-accent` | #D4A574 | Акцентный цвет |
| `--color-text-primary` | #3D3D3D | Основной текст |

### Чередование фонов секций (Hub страница)

| # | Секция | Фон | bgClass |
|---|--------|-----|---------|
| 1 | Header | primary | - (default) |
| 2 | Hero | primary | - (default) |
| 3 | Content | primary | - (default) |
| 4 | Services Cards | **secondary** | `"bgClass": "section--bg-secondary"` |
| 5 | CTA Cards | primary | - (default) |
| 6 | CTA | **secondary** | - (default для cta-v1) |
| 7 | Gallery Fullwidth | **secondary** | `"bgClass": "section--bg-secondary"` |
| 8 | Features Grid | primary | - (default) |
| 9 | Gallery Slider | **secondary** | `"bgClass": "section--bg-secondary"` |
| 10 | About | primary | - (default) |
| 11 | Footer (с картой) | white | - (default) |

---

## Редактирование Hub страницы

### Файл: `config/landing5-business-hub.json`

### 1. Meta информация (SEO)

```json
"meta": {
  "title": "Karin Himml Fotografie | Professionelle Fotoshootings",
  "description": "Описание для поисковиков (макс. 160 символов)",
  "keywords": "ключевые, слова, через, запятую"
}
```

### 2. Подлендинги (ссылки на подстраницы)

```json
"sublandings": [
  "landing5-hochzeit.json",   // → hochzeit/
  "landing5-familie.json",    // → familie/
  "landing5-tier.json",       // → tier/
  "landing5-business.json"    // → business/
]
```

### 3. Hero секция (Главный баннер)

```json
{
  "template": "hero/hero-v1.html",
  "data": {
    "label": "Надпись над заголовком",
    "title": "Главный заголовок",
    "subtitle": "Подзаголовок с описанием",
    "buttonText": "Текст кнопки",
    "buttonLink": "#services",        // Якорь или URL
    "imageMain": "URL большой картинки (428x394px)",
    "imageSecondary": "URL маленькой картинки (306x290px)",
    "imageAlt": "Alt текст для изображения"
  }
}
```

**Размеры изображений Hero:**
- Главное: 428x394px
- Вторичное: 306x290px

### 4. Services Cards (4 карточки услуг)

```json
{
  "template": "services/services-cards-v5.html",
  "data": {
    "sectionId": "services",              // Якорь для ссылки #services
    "bgClass": "section--bg-secondary",   // Фон секции
    "title": "Заголовок секции",
    "cards": [
      {
        "image": "URL (300x400px)",
        "imageAlt": "Описание картинки",
        "title": "Название услуги",
        "text": "Описание услуги (1-2 предложения)"
      }
      // ... ещё 3 карточки
    ]
  }
}
```

**Размер изображений карточек:** 300x400px (вертикальные)

### 5. CTA Cards (4 карточки с ссылками на подлендинги)

```json
{
  "template": "cta/cta-cards-v5.html",
  "data": {
    "title": "Заголовок секции",
    "cards": [
      {
        "image": "URL (400x300px)",
        "imageAlt": "Описание",
        "title": "Название",
        "text": "Краткое описание",
        "linkText": "Текст ссылки →",
        "linkUrl": "hochzeit/"            // Путь к подлендингу
      }
      // ... ещё 3 карточки
    ]
  }
}
```

**Размер изображений:** 400x300px (горизонтальные)

### 6. Gallery Slider (Слайдер с большими фото)

```json
{
  "template": "gallery/gallery-single-slider.html",
  "data": {
    "bgClass": "section--bg-secondary",
    "images": [
      { "src": "URL (1233x746px)", "alt": "Описание" }
      // ... ещё фото
    ]
  }
}
```

**Размер изображений:** 1233x746px

### 7. About (О фотографе)

```json
{
  "template": "about/about-v1.html",
  "data": {
    "showDivider": true,                  // Декоративная линия
    "image": "URL фото фотографа (466x560px)",
    "label": "Надпись над именем",
    "name": "Имя Фамилия",
    "paragraphs": [
      "Первый абзац текста.",
      "Второй абзац текста.",
      "Третий абзац текста."
    ]
  }
}
```

### 8. Footer (Подвал с картой)

```json
{
  "template": "footer/footer-v1.html",
  "data": {
    "mapEmbedUrl": "https://maps.google.com/maps?q=АДРЕС&...",
    "impressumUrl": "/impressum.html",
    "datenschutzUrl": "/datenschutz.html",
    "cookieUrl": "/cookie.html"
  }
}
```

**Как получить URL карты:**
1. Откройте Google Maps
2. Найдите адрес
3. Нажмите "Поделиться" → "Встроить карту"
4. Скопируйте src из iframe

---

## Редактирование подлендингов

### Особенности подлендингов

1. **logoLink: "../"** - ссылка в хедере ведёт на Hub
2. **Quiz** - каждый подлендинг имеет свой квиз
3. **Hochzeit** - уникальный квиз с multiselect и date picker
4. **Familie/Tier/Business** - общий шаблон квиза

### Структура квиза

```json
"quiz": {
  "cardStyle": "square",              // Стиль карточек опций
  "logoText": "Karin Himml",
  "impressumUrl": "#",
  "datenschutzUrl": "#",
  "cookieUrl": "#",
  "mapEmbedUrl": "URL карты",

  "steps": [...],                     // Шаги квиза (см. ниже)
  "form": {...},                      // Форма контактов
  "success": {...}                    // Страница успеха
}
```

### Типы шагов квиза

#### 1. Options (Выбор одного варианта)

```json
{
  "stepNumber": 1,
  "type": "options",                  // или не указывать (default)
  "progress": "Schritt 1 von 6",
  "question": "Текст вопроса?",
  "columns": 4,                       // 2 или 4 колонки
  "nextPage": "quiz-step2.html",
  "options": [
    {
      "value": "outdoor",
      "text": "Outdoor / Natur",
      "image": "URL (300x300px)"
    }
    // ... ещё опции
  ]
}
```

#### 2. Multiselect (Множественный выбор)

```json
{
  "stepNumber": 1,
  "type": "multiselect",
  "progress": "Schritt 1 von 6",
  "question": "Welche Momente?",
  "subtitle": "Mehrfachauswahl möglich",
  "columns": 4,
  "continueText": "Weiter",
  "nextPage": "quiz-step2.html",
  "options": [...]
}
```

#### 3. Date (Выбор даты)

```json
{
  "stepNumber": 3,
  "type": "date",
  "progress": "Schritt 3 von 6",
  "question": "Wann ist euer Hochzeitstag?",
  "placeholder": "Datum auswählen",
  "continueText": "Weiter",
  "nextPage": "quiz-step4.html",
  "image": "URL бокового изображения (450x400px)",
  "imageAlt": "Описание"
}
```

#### 4. Textarea (Свободный текст)

```json
{
  "stepNumber": 5,
  "type": "textarea",
  "progress": "Schritt 5 von 6",
  "question": "Beschreibe deine Wünsche",
  "placeholder": "Ваш текст...",
  "continueText": "Weiter",
  "nextPage": "quiz-step6.html",
  "image": "URL (450x400px)",
  "imageAlt": "Описание"
}
```

#### 5. Условная навигация (Ja/Nein)

```json
{
  "stepNumber": 4,
  "type": "options",
  "question": "Hast du besondere Wünsche?",
  "columns": 2,
  "options": [
    {
      "value": "ja",
      "text": "Ja",
      "image": "...",
      "nextPage": "quiz-step5.html"      // → textarea
    },
    {
      "value": "nein",
      "text": "Nein",
      "image": "...",
      "nextPage": "quiz-step6.html"      // → skip textarea
    }
  ]
}
```

### Форма контактов (Form V5)

```json
"form": {
  "templateVersion": "v5",
  "formLabel": "Lass uns telefonieren!",
  "formTitle": "Du bist fast am Ziel!",
  "formDescription": "Описание формы",
  "formImage": "URL (549x516px)",
  "formImageAlt": "Описание",
  "successPage": "quiz-success.html",

  "placeholderName": "Имя",
  "placeholderEmail": "Email",
  "placeholderPhone": "Телефон",

  "showAvailability": true,
  "availabilityLabel": "Когда вам удобно?",
  "timeslots": [
    { "value": "8-9", "label": "8:00 - 9:00" }
    // ...
  ],

  "privacyText": "Ich akzeptiere die",
  "privacyLinkText": "Datenschutzbestimmungen",
  "submitButtonText": "Absenden",

  "rightTitle": "Заголовок справа",
  "rightSubtitle": "Подзаголовок",
  "rightDescription": "Описание"
}
```

### Страница успеха (Success V5)

```json
"success": {
  "templateVersion": "v5",
  "successTitle": "Super, vielen Dank!",
  "successSubtitle": "Подзаголовок",
  "successTexts": ["Текст 1", "Текст 2"],
  "successImage": "URL (550x529px)",

  "ctaText": "Текст CTA кнопки",
  "ctaLink": "#",

  "callButtonText": "Anrufen",
  "whatsappText": "WhatsApp",
  "whatsappUrl": "https://wa.me/49123456789",
  "emailButtonText": "Mail",
  "phoneNumber": "+49123456789",
  "email": "info@example.de",

  "aboutName": "Имя Фамилия",
  "aboutQuestion": "Offene Fragen?",
  "workingHours": ["Mo-Fr: 9-18", "Sa: по договорённости"],
  "aboutTexts": ["Текст"],
  "aboutImage": "URL (500x500px)",

  "showSocial": true,
  "facebookUrl": "#",
  "instagramUrl": "#",
  "websiteUrl": "#"
}
```

---

## Размеры изображений (сводка)

| Элемент | Размер | Формат |
|---------|--------|--------|
| Hero main | 428x394 | jpg/webp |
| Hero secondary | 306x290 | jpg/webp |
| Services card | 300x400 | jpg/webp |
| CTA card | 400x300 | jpg/webp |
| Gallery slider | 1233x746 | jpg/webp |
| Gallery fullwidth | 1440x656 | jpg/webp |
| About photo | 466x560 | jpg/webp |
| Features icon | 120x120 | jpg/webp |
| Quiz option | 300x300 | jpg/webp |
| Quiz side image | 450x400 | jpg/webp |
| Form image | 549x516 | jpg/webp |
| Success image | 550x529 | jpg/webp |

**Unsplash параметры:** `?w=WIDTH&h=HEIGHT&fit=crop`

---

## Мобильная адаптивность

Система автоматически адаптируется:

| Breakpoint | Ширина | Изменения |
|------------|--------|-----------|
| Desktop | ≥992px | Полный layout |
| Tablet | 768-991px | 2 колонки вместо 4 |
| Mobile | <768px | 1 колонка, кнопки 100% |
| Small | <576px | Уменьшенные отступы |

**Кнопки на мобильных:**
- Ширина: 100% (max-width: 320px)
- Текст переносится (white-space: normal)
- Минимальная высота: 55px

---

## Сборка проекта

```bash
# Собрать только Landing 5
node generator.js 5

# Собрать все лендинги
node generator.js
```

Результат: `dist/landing5-business/`

---

## Частые ошибки

| Проблема | Причина | Решение |
|----------|---------|---------|
| Картинка обрезана | Неправильные пропорции | Используйте указанные размеры |
| Текст за кнопкой | Слишком длинный текст | Сократите до 25 символов |
| Фон не тот | Нет bgClass | Добавьте `"bgClass": "section--bg-secondary"` |
| Якорь не работает | Нет sectionId | Добавьте `"sectionId": "services"` |
| Logo ведёт не туда | Неверный logoLink | Hub: "/", Sublandings: "../" |
