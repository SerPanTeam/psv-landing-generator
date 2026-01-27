# Claude Code Instructions: Landing Generator System

## Обзор проекта

Система генерации лендингов для фотографов на Bootstrap 5. Генерирует HTML из JSON конфигов и Handlebars шаблонов.

**Команда сборки:** `node generator.js`

---

## Структура проекта

```
├── config/           # JSON конфиги лендингов
├── sections/         # HTML шаблоны секций
├── css/              # Стили (variables, base, components, sections, responsive)
├── js/               # JavaScript (quiz, faq)
├── dist/             # Сгенерированные лендинги
├── generator.js      # Скрипт сборки
└── docs/             # Документация
```

---

## Figma

**File Key (L1-L4):** `qGiP8ZP2Ot8Tut1faJDl4p`
**File Key (L5):** `SU5A4tONWqzVj80IvLo6oP`

### Node IDs

| Landing | Главная | Quiz Step 1-4 | Form | Success |
|---------|---------|---------------|------|---------|
| 1 Family | 1:3 | 137:51, 137:159, 137:71, 137:179 | 137:111 | 137:84 |
| 2 Family-Kids | 233:22 | 313:26, 313:82, 313:47, 313:68 | 313:100 | 313:135 |
| 3 Dogs | 369:256 | 370:441, 370:460, 370:479, 370:503 | 370:526 | 370:560 |
| 4 Kids | 479:30 | 483:63, 483:85, 483:100, 483:122 | 483:144 | 483:180 |
| **5 Business Hub** | 585:30 | — | — | — |

### Figma MCP команды

```
mcp__figma-desktop__get_design_context nodeId=1:3
mcp__figma-desktop__get_screenshot nodeId=1:3
```

---

## Лендинги: особенности

| # | Конфиг | Углы | Фоны | Header |
|---|--------|------|------|--------|
| 1 | landing1-family.json | Прямые | Чередование | Отдельный |
| 2 | landing2-family-kids.json | Прямые | Чередование | Отдельный |
| 3 | landing3-dogs.json | Скруглённые 40px | Все primary | Отдельный |
| 4 | landing4-kids.json | Скруглённые 40px | Чередование | Внутри hero |

---

## Флаги шаблонов

### Общие флаги

| Флаг | Тип | Описание |
|------|-----|----------|
| `bgClass` | string | Переопределение фона: `section--bg-primary` или `section--bg-secondary` |
| `rounded` | boolean | Скруглённые углы (40px) |
| `alignLeft` | boolean | Левое выравнивание |
| `paddingTop` | number | Отступ сверху (px) - только Landing 3/4 |
| `paddingBottom` | number | Отступ снизу (px) - только Landing 3/4 |

### Флаги секций

| Секция | Флаг | Описание |
|--------|------|----------|
| content-v1 | `linkAsButton: true` | Ссылка как кнопка с рамкой |
| steps-4 | `ctaBottom: true` | Кнопка внизу секции |
| steps-4 | `ctaTop: true` | Кнопка вверху секции |
| cta-v1 | `layoutRow: true` | Горизонтальный layout |
| faq-accordion | `cardStyle: "rounded"` | Скруглённые карточки |
| about-v1 | `compact: true` | Компактный вариант |
| about-v1 | `imagesRight: true` | Изображение справа |
| quiz-success | `aboutBgClass` | Фон About секции |

---

## Дефолтные фоны секций

| Шаблон | Default | Для другого фона |
|--------|---------|------------------|
| hero-v1/v2/v3 | primary | — |
| hero-v4 | dark #3D3D3D | — |
| cta-v1 | **secondary** | `bgClass: "section--bg-primary"` |
| steps-4 | **secondary** | `bgClass: "section--bg-primary"` |
| steps-v4 | primary | — |
| faq-accordion | primary | `bgClass: "section--bg-secondary"` |
| services-grid | **secondary** | `bgClass: "section--bg-primary"` |
| about-v1 | primary | — |

---

## Мобильные breakpoints

| Название | Размер | Шрифты |
|----------|--------|--------|
| Desktop | ≥992px | h1: 55px, body: 22px |
| Tablet | 768-991px | h1: 36px, body: 18px |
| Mobile | <768px | h1: 26px, body: 15px |
| Small | <576px | h1: 22px, body: 14px |

### Кнопки на мобильных

```css
@media (max-width: 767.98px) {
  .btn {
    width: 100%;
    white-space: normal;
    min-height: 55px;
  }
}
```

---

## Чеклист перед изменениями

### 1. Фоны
- [ ] Проверить фон секции в Figma (screenshot)
- [ ] Сравнить с дефолтом шаблона
- [ ] Добавить `bgClass` если отличается

### 2. Скругления
- [ ] Landing 3/4: добавить `rounded: true`
- [ ] Проверить изображения, кнопки, карточки

### 3. Кнопки
- [ ] Проверить тип: `btn-primary` или `btn-outline`
- [ ] Проверить выравнивание: left/center
- [ ] Для ссылки-кнопки: `linkAsButton: true`

### 4. Тексты
- [ ] Копировать ДОСЛОВНО из Figma
- [ ] Проверить переносы строк

### 5. Мобильная версия
- [ ] Кнопки 100% width
- [ ] Тексты читаемы
- [ ] Нет горизонтального скролла

---

## Активные шаблоны

См. файл [SECTIONS-USAGE.md](SECTIONS-USAGE.md) для полного списка.

### Header
- `header/header-v1.html` — все лендинги кроме L4

### Hero
- `hero/hero-v1.html` — L1, L2
- `hero/hero-banner-v3.html` — L3
- `hero/hero-v4.html` — L4 (лого внутри)

### Content
- `content/content-v1.html` — L1, L2
- `content/content-v2.html` — L4
- `content/content-sidebar.html` — L3

### Gallery
- `gallery/gallery-slider.html` — L1, L2 (3 видимых)
- `gallery/gallery-single-slider.html` — L3, L4 (1 большая)
- `gallery/gallery-fullwidth.html` — L1, L2, L4
- `gallery/gallery-decorated.html` — L3

### Features
- `features/features-3col.html` — L1, L2
- `features/features-grid.html` — L3
- `features/features-cards-v3.html` — L3

### Steps
- `steps/steps-4.html` — L1, L2, L3
- `steps/steps-v4.html` — L4

### FAQ
- `faq/faq-accordion.html` — L1, L2 (раскрывающийся)
- `faq/faq-cards.html` — L3 (статичные карточки)
- `faq/faq-v4.html` — L4

### Services
- `services/services-grid.html` — L1, L2, L3
- `services/services-v4.html` — L4

### About
- `about/about-v1.html` — L1, L2, L3, Quiz
- `about/about-v2.html` — L4

### Quiz
- `quiz/quiz-container.html` — контейнер на главной
- `quiz/quiz-page-step.html` — шаги квиза
- `quiz/quiz-page-form.html` — форма
- `quiz/quiz-page-success.html` — успех

### Footer
- `footer/footer-v1.html` — все лендинги

---

## Архивные шаблоны

Перемещены в `sections/_archive/`:
- `map-v1.html`
- `hero-v3.html`
- `gallery-slider-v4.html`
- `gallery-strip.html`

---

## Типичные ошибки

| Проблема | Причина | Решение |
|----------|---------|---------|
| Кнопка как ссылка | Нет `linkAsButton` | Добавить `linkAsButton: true` |
| Неправильный фон | Дефолт ≠ Figma | Добавить `bgClass` |
| Острые углы в L3/L4 | Нет `rounded` | Добавить `rounded: true` |
| Текст обрезается | Длинный текст | Проверить мобильные стили |
| Заголовок не показан | Нет флага CTA | Добавить `ctaBottom: true` |

---

## Правила работы

1. **ВСЕГДА** проверять Figma перед изменениями
2. **ВСЕГДА** запускать `node generator.js` после изменений
3. **ВСЕГДА** проверять мобильную версию
4. **НИКОГДА** не хардкодить значения (использовать CSS переменные)
5. **НИКОГДА** не угадывать тексты (копировать из Figma)
