# Руководство пользователя: Создание лендингов

## Обзор

Эта система позволяет создавать лендинги из готовых секций, настраивая их через JSON конфиги.

## Быстрый старт

### 1. Создайте JSON конфиг

Скопируйте существующий конфиг и измените под свои нужды:

```bash
cp config/landing1-family.json config/landing5-newproject.json
```

### 2. Отредактируйте конфиг

Откройте файл и измените:
- Тексты
- Изображения
- Настройки секций

### 3. Сгенерируйте лендинг

```bash
node generator.js
```

Результат появится в `dist/landing5-newproject/`

---

## Структура JSON конфига

```json
{
  "name": "Название лендинга",
  "output": "landing-name.html",
  "lang": "de",

  "cssVariables": {
    "--color-bg-primary": "#F5EDE0",
    "--color-bg-secondary": "#EEE3D0"
  },

  "meta": {
    "title": "SEO заголовок",
    "description": "SEO описание",
    "keywords": "ключевые, слова"
  },

  "quiz": { ... },

  "sections": [ ... ]
}
```

---

## Секции

### Доступные секции

| Категория | Шаблоны | Описание |
|-----------|---------|----------|
| Header | `header-v1` | Логотип |
| Hero | `hero-v1`, `hero-banner-v3`, `hero-v4` | Главный экран |
| Content | `content-v1`, `content-v2`, `content-sidebar` | Текст + изображение |
| Gallery | `gallery-slider`, `gallery-single-slider`, `gallery-fullwidth`, `gallery-decorated` | Галереи |
| Features | `features-3col`, `features-grid`, `features-cards-v3` | Преимущества |
| Steps | `steps-4`, `steps-v4` | Шаги процесса |
| CTA | `cta-v1` | Призыв к действию |
| FAQ | `faq-accordion`, `faq-cards`, `faq-v4` | Вопросы-ответы |
| Services | `services-grid`, `services-v4` | Услуги |
| About | `about-v1`, `about-v2` | О фотографе |
| Quiz | `quiz-container` | Контейнер квиза |
| Footer | `footer-v1` | Подвал с картой |

### Формат секции

```json
{
  "template": "content/content-v1.html",
  "data": {
    "title": "Заголовок",
    "text": "Текст",
    "image": "https://example.com/image.jpg",
    "linkText": "Текст кнопки",
    "linkUrl": "quiz-step1.html",
    "linkAsButton": true
  }
}
```

---

## Флаги секций

### Фоны

```json
{
  "template": "steps/steps-4.html",
  "data": {
    "bgClass": "section--bg-primary"
  }
}
```

| Класс | Цвет |
|-------|------|
| `section--bg-primary` | #F5EDE0 (бежевый светлый) |
| `section--bg-secondary` | #EEE3D0 (бежевый тёмный) |

### Скруглённые углы

```json
{
  "data": {
    "rounded": true
  }
}
```

Применяется к: кнопкам, карточкам, изображениям (40px radius)

### Выравнивание

```json
{
  "data": {
    "alignLeft": true
  }
}
```

### Отступы (Landing 3 & 4)

```json
{
  "data": {
    "paddingTop": 0,
    "paddingBottom": 98
  }
}
```

Доступные значения: `0, 56, 72, 80, 86, 88, 89, 96, 98, 103, 104, 106, 115, 120, 137`

---

## Примеры секций

### Hero V1 (Landing 1, 2)

```json
{
  "template": "hero/hero-v1.html",
  "data": {
    "label": "Kostenloses",
    "title": "Familien-Fotoshooting!",
    "subtitle": "<strong>Familienbilder</strong> als Geschenk.",
    "buttonText": "Jetzt sichern",
    "buttonLink": "quiz-step1.html",
    "imageMain": "https://example.com/main.jpg",
    "imageSecondary": "https://example.com/secondary.jpg"
  }
}
```

### Content V1 с кнопкой

```json
{
  "template": "content/content-v1.html",
  "data": {
    "image": "https://example.com/photo.jpg",
    "title": "Заголовок секции",
    "subtitle": "Подзаголовок",
    "text": "Основной текст параграфа.",
    "accentText": "Акцентный текст снизу",
    "linkText": "Текст кнопки",
    "linkUrl": "quiz-step1.html",
    "linkAsButton": true
  }
}
```

### Steps с кнопкой внизу

```json
{
  "template": "steps/steps-4.html",
  "data": {
    "title": "Как это работает?",
    "ctaText": "Начать",
    "ctaLink": "quiz-step1.html",
    "ctaBottom": true,
    "rounded": true,
    "steps": [
      {
        "number": "1",
        "icon": "https://example.com/icon1.svg",
        "title": "Шаг 1",
        "text": "Описание шага"
      }
    ]
  }
}
```

### FAQ аккордеон

```json
{
  "template": "faq/faq-accordion.html",
  "data": {
    "title": "Частые вопросы",
    "questions": [
      {
        "question": "Вопрос?",
        "answer": "Ответ."
      }
    ]
  }
}
```

### Services Grid

```json
{
  "template": "services/services-grid.html",
  "data": {
    "title": "Наши услуги",
    "rounded": true,
    "services": [
      {
        "image": "https://example.com/service1.jpg",
        "title": "Услуга 1",
        "text": "Описание"
      }
    ],
    "ctaText": "Записаться",
    "ctaLink": "quiz-step1.html"
  }
}
```

---

## Квиз-система

### Структура квиза в конфиге

```json
{
  "quiz": {
    "cardStyle": "square",
    "logoText": "Logo",
    "impressumUrl": "#",
    "datenschutzUrl": "#",
    "cookieUrl": "#",
    "mapEmbedUrl": "https://maps.google.com/...",

    "steps": [
      {
        "stepNumber": 1,
        "progress": "3 Fragen bis zum Gutschein",
        "question": "Вопрос?",
        "columns": 4,
        "nextPage": "quiz-step2.html",
        "options": [
          {
            "value": "option1",
            "text": "Вариант 1",
            "image": "https://example.com/opt1.jpg"
          }
        ]
      }
    ],

    "form": {
      "formLabel": "Заголовок",
      "formTitle": "Основной заголовок",
      "formSubtitle": "Подзаголовок",
      "formNote": "Примечание",
      "formImage": "https://example.com/form.jpg",
      "submitButtonText": "Отправить",
      "successPage": "quiz-success.html"
    },

    "success": {
      "successTitle": "Поздравляем!",
      "successSubtitle": "Заявка принята",
      "successTexts": ["Текст 1", "Текст 2"],
      "ctaText": "Выбрать время",
      "ctaLink": "#",
      "aboutName": "Имя фотографа",
      "aboutTagline": "Специализация",
      "aboutTexts": ["О фотографе..."],
      "rounded": true
    }
  }
}
```

### Стили карточек квиза

| Стиль | Использование | Особенности |
|-------|---------------|-------------|
| `square` | Landing 1, 2 | Прямые углы, рамка |
| `rounded` | Landing 3, 4 | Скруглённые углы 20px |

---

## CSS переменные

Переопределяйте в секции `cssVariables`:

```json
{
  "cssVariables": {
    "--color-bg-primary": "#F5EDE0",
    "--color-bg-secondary": "#EEE3D0",
    "--color-button-primary": "#E2C08D",
    "--color-accent": "#D4A574",
    "--color-text-primary": "#3D3D3D"
  }
}
```

---

## Чеклист нового лендинга

- [ ] Создан JSON конфиг
- [ ] Заполнены meta-теги (title, description)
- [ ] Настроены все секции
- [ ] Заполнен квиз (steps, form, success)
- [ ] Указаны URL карты, impressum, datenschutz
- [ ] Запущен `node generator.js`
- [ ] Проверен на десктопе
- [ ] Проверен на мобильных

---

## Частые ошибки

### Кнопка отображается как ссылка
Добавьте `"linkAsButton": true` в data секции.

### Неправильный фон секции
Добавьте `"bgClass": "section--bg-primary"` или `"section--bg-secondary"`.

### Секция без скруглений
Добавьте `"rounded": true` для Landing 3/4.

### Квиз не отображается
Убедитесь, что `quiz-container` добавлен в sections.
