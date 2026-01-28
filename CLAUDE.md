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

### Node IDs (L1-L4)

| Landing | Главная | Quiz Step 1-4 | Form | Success |
|---------|---------|---------------|------|---------|
| 1 Family | 1:3 | 137:51, 137:159, 137:71, 137:179 | 137:111 | 137:84 |
| 2 Family-Kids | 233:22 | 313:26, 313:82, 313:47, 313:68 | 313:100 | 313:135 |
| 3 Dogs | 369:256 | 370:441, 370:460, 370:479, 370:503 | 370:526 | 370:560 |
| 4 Kids | 479:30 | 483:63, 483:85, 483:100, 483:122 | 483:144 | 483:180 |

### Node IDs (L5 Business)

| Страница | Node ID | Описание |
|----------|---------|----------|
| Hub (главная) | 585:30 | Выбор типа фотосессии |
| Hochzeit (свадьба) | 810:30 | Подлендинг свадьбы |
| Familie (семья) | — | Подлендинг семьи |
| Tier (животные) | — | Подлендинг животных |
| Business (бизнес) | — | Подлендинг бизнеса |
| Quiz Form V5 | 818:459 | Форма квиза (2 колонки) |
| Quiz Success V5 | 818:496 | Страница успеха |

### Figma MCP команды

```
mcp__figma-desktop__get_design_context nodeId=1:3
mcp__figma-desktop__get_screenshot nodeId=1:3
```

---

## L5 Hochzeit - Структура страницы

**Важно:** Подлендинги L5 НЕ имеют отдельного header - логотип внутри hero-v5!

| # | Секция | Шаблон | Фон | Особенности |
|---|--------|--------|-----|-------------|
| 1 | Hero | hero-v5.html | gray (image) | Logo внутри, description, широкая кнопка 511px |
| 2 | Content | content-v1.html | primary | variant:v5, imageLeft:true, БЕЗ кнопки |
| 3 | Gallery Slider | gallery-slider.html | secondary | variant:v5, центр с рамкой, + CTA |
| 4 | Features Cards | features-cards-v3.html | primary | 4 карточки, title, subtitle, CTA |
| 5 | Gallery Slider | gallery-single-slider.html | secondary | — |
| 6 | Services List | services-list-v5.html | primary | + sideImage справа |
| 7 | Steps 6 | steps-6.html | secondary | 6 карточек 2x3 |
| 8 | Gallery Slider | gallery-single-slider.html | secondary | + CTA "Kontakt aufnehmen" |
| 9 | FAQ | faq-accordion.html | primary | + CTA |
| 10 | About | about-v1.html | secondary | imageRight: true |
| 11 | Footer | footer-v1.html | white | Map |

### Ключевые отличия L5 подлендингов

1. **Нет отдельного header** - логотип в hero-v5
2. **hero-v5** поддерживает: logoText, title (triple braces для `<br>`), subtitle, description (triple braces), button
3. **content-v1 с variant:"v5"** - одно изображение + декоративная подложка (::after), одинаково для hub и sublandings
4. **Content без CTA** - в Figma нет кнопки
5. **gallery-slider с variant:"v5"** - центральный слайд с белой рамкой, боковые меньше, ctaText/ctaLink
6. **gallery-single-slider** поддерживает ctaText/ctaLink, default bg=primary, `smallRadius: true` для 15px (vs 50px default)
   - Структура: section (full-width bg) → __inner (max-width 1440px) → arrows + container
7. **services-list-v5** поддерживает sideImage (картинка справа)
8. **features-cards-v3** поддерживает title, subtitle, ctaText/ctaLink
   - Карточки: 300x637px, white bg, radius 15px, padding 35px
   - Изображения: 230x160px, radius 15px, centered
   - Заголовок карточки: 22px Bold
   - Текст карточки: 16px Regular (НЕ 22px!)
   - Section padding: 70px top/bottom
9. **steps-6** - сетка 2x3 (2 колонки, 3 ряда)
   - Карточки: белые, radius 15px, padding 24px
   - Номер: круг 80x80px с bg-secondary, шрифт h3 bold, цвет accent
   - Заголовок секции: слева (не center!)
10. **services-list-v5** размеры по Figma:
    - Иконки: 62x62px, простые серые прямоугольники (#7F7F7F) - placeholder'ы
    - Заголовок секции (h2): 45px Bold, margin-bottom: 50px
    - Заголовок пункта: 22px Bold, line-height: 1
    - Текст пункта: 22px Medium, margin-top: 8px (отступ от заголовка!)
    - Gap между пунктами: 24px
    - Gap между иконкой и текстом: 36px
    - Рамка изображения: padding 60px 53px
    - Layout: flex с gap 52px между текстом и картинкой
11. **about-v1 с variant:"v5"** - декоративная подложка за изображением
    - Изображение: 581x450px
    - Декор: 595x383px, left -63px, top 241px
    - `nameUnderImage: true` - имя и tagline под изображением (только Hochzeit)

### Проверка фонов L5 по Figma

| Секция | Figma Node | Цвет | CSS класс |
|--------|------------|------|-----------|
| Hero | — | image | — |
| Content | — | #F5EDE0 | primary (default) |
| Gallery Slider V5 | 810:175 | #EEE3D0 | section--bg-secondary |
| Features Cards | — | #F5EDE0 | primary (default) |
| Gallery Single | 811:34 | #EEE3D0 | section--bg-secondary |
| Services List | — | #F5EDE0 | section--bg-primary |
| Steps 6 | 812:64 | #EEE3D0 | section--bg-secondary |
| Gallery Single 2 | 812:64 | #EEE3D0 | section--bg-secondary |
| FAQ | — | #F5EDE0 | primary (default) |
| About | — | #EEE3D0 | section--bg-secondary |
| Footer | — | white | — |

**Правило чередования L5:** Primary (#F5EDE0) → Secondary (#EEE3D0) → Primary → ...
**Исключение:** Steps 6 + Gallery Single 2 делят ОДИН фон (Rectangle 812:64 spanning y=5394-7142)

---

## Лендинги: особенности

| # | Конфиг | Углы | Фоны | Header |
|---|--------|------|------|--------|
| 1 | landing1-family.json | Прямые | Чередование | Отдельный |
| 2 | landing2-family-kids.json | Прямые | Чередование | Отдельный |
| 3 | landing3-dogs.json | Скруглённые 40px | Все primary | Отдельный |
| 4 | landing4-kids.json | Скруглённые 40px | Чередование | Внутри hero |
| 5 | landing5-business-hub.json | Скруглённые 10px (кнопки) | #F5EDE0/#EEE3D0 | Внутри hero-v5 |

### L5: CSS переменные и наследование

**Важно:** Подлендинги НЕ наследуют `cssVariables` от хаб-конфига. Каждый sublanding должен иметь свой блок `cssVariables`.

L5 cssVariables (одинаковы для hub и всех sublandings):
```json
"cssVariables": {
  "--color-bg-primary": "#F5EDE0",
  "--color-bg-secondary": "#EEE3D0",
  "--color-button-primary": "#E2C08D",
  "--color-accent": "#D4A574",
  "--button-border-radius": "10px"
}
```

**Кнопки L5:** `border-radius: 10px` (через `--button-border-radius`). L1-L4 используют `0` (прямые углы).

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
| content-v1 | `variant: "v5"` | L5 стиль: декоративная подложка вместо белой рамки |
| content-v1 | `imageLeft: true` | Изображение слева (default: справа) |
| content-v1 | `imageSecondary` | (опционально) Второе реальное изображение вместо ::after подложки |
| content-v1 | `linkAsButton: true` | Ссылка как кнопка с рамкой |
| gallery-slider | `variant: "v5"` | L5 стиль: центральный слайд с белой рамкой, боковые меньше |
| gallery-slider | `ctaText/ctaLink` | CTA кнопка под слайдером |
| about-v1 | `variant: "v5"` | L5 стиль: декоративная подложка за изображением (581x450) |
| about-v1 | `nameUnderImage: true` | Имя и tagline под изображением (для Hochzeit) |
| about-v1 | `imageRight: true` | Изображение справа |
| steps-6 | (default) | Сетка 2x3 (2 колонки), заголовок слева, карточки с номером-кругом |
| services-list | `sideImage` | Изображение справа с декоративной рамкой |
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
| steps-6 | primary | `bgClass: "section--bg-secondary"` |
| steps-v4 | primary | — |
| faq-accordion | primary | `bgClass: "section--bg-secondary"` |
| services-grid | **secondary** | `bgClass: "section--bg-primary"` |
| services-list-v5 | **secondary** | `bgClass: "section--bg-primary"` |
| gallery-slider | primary | `bgClass: "section--bg-secondary"` |
| gallery-single-slider | primary | `bgClass: "section--bg-secondary"` |
| gallery-fullwidth | primary | `bgClass: "section--bg-secondary"` |
| features-cards-v3 | primary | `bgClass: "section--bg-secondary"` |
| about-v1 | primary | `bgClass: "section--bg-secondary"` |

**L5 важно:** Многие секции L5 требуют `bgClass: "section--bg-secondary"` т.к. дефолт primary не соответствует Figma!

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
| Вложенный `{{#if}}` не работает | Handlebars limitation | Упростить: `{{title}}` вместо вложенных условий |
| `{{each}}` показывает section title | Scope issue | Использовать `{{this.title}}` внутри `{{#each}}` |
| HTML `<br>` не рендерится | Double braces | Использовать triple braces: `{{{title}}}` |
| Заголовок вплотную к контенту | Не проверен margin | В Figma text box может быть больше текста - проверять y-координаты |
| Элементы списка слипаются | Нет gap/margin | Проверять отступы между title и text внутри item (margin-top) |
| Нет декоративной подложки | Элемент скрыт под фото | Проверять Figma metadata на наличие rectangle ПОД изображением (z-index ниже) |
| Подложка не видна (сливается) | Цвет совпадает с фоном | Цвет подложки должен КОНТРАСТИРОВАТЬ с фоном секции |

---

## Pixel-perfect верификация по Figma

### Алгоритм проверки секции

1. **get_metadata** для родительской страницы → найти node ID секции
2. **get_design_context** для секции → получить точные значения (шрифты, цвета, размеры, координаты)
3. **get_screenshot** → визуальная верификация
4. Сравнить каждое CSS свойство с Figma значениями
5. Применить fix → `node generator.js` → проверить

### Типичные расхождения и как их находить

| Что проверять | Как найти в Figma | Частые ошибки |
|---------------|-------------------|---------------|
| **font-size** | `text-[Npx]` в design_context | L5 использует 16px для body (не 22px как L1-L4) |
| **section padding** | Позиция контента относительно секции | L5 features-cards-v3: 70px top/bottom |
| **card dimensions** | `w-[N]px h-[N]px` | L5 cards: 300x637px, radius 15px, white bg |
| **image in card** | Размеры image элемента | L5: 230x160px, radius 15px, centered |
| **font-weight** | `font-bold`/`font-normal` | Regular(400) vs Medium(500) vs Bold(700) |
| **text-align** | `text-center`/`text-left` | Заголовки секций: center в L1-L4, left в L5 |
| **gap (grid)** | Разница координат между элементами | Вычислять: `element2.x - (element1.x + element1.width)` |
| **margin-bottom** | Разница Y между bounding boxes | **ЛОВУШКА:** см. "Bounding Box vs Visual" ниже |
| **border-radius** | `rounded-[Npx]` | L3: 40-50px, L5: 10-15px |
| **padding** | Позиция первого/последнего дочернего элемента внутри родителя | `child.y - parent.y` = padding-top |
| **max-width** | Ширина элемента | Grid max-width может ограничивать карточки |
| **hidden decorations** | Проверить metadata на прямоугольники под/за изображением | Подложки (backdrop) часто скрыты под фото |

### КРИТИЧНО: Скрытые декоративные элементы

**Проблема:** В Figma могут быть прямоугольники/элементы, которые находятся ПОД изображениями или другими элементами и не видны на первый взгляд на скриншоте.

**Как найти:**
1. Использовать `get_metadata` для родительского фрейма
2. Искать `rounded-rectangle` или `rectangle` с координатами, пересекающимися с изображением
3. Если rectangle.y > image.y но rectangle.y < image.y + image.height - это подложка
4. Использовать `get_design_context` для этого rectangle чтобы узнать цвет

**Пример (About V5):**
```
Image:     x=793, y=8005, 581x450
Backdrop:  x=730, y=8246, 595x383
→ Backdrop на 63px левее и 241px ниже верха фото
→ CSS: position: absolute; left: -63px; top: 241px;
```

**Цветовая инверсия:**
- Если секция имеет `bg-primary` → подложка `bg-secondary`
- Если секция имеет `bg-secondary` → подложка `bg-primary`
- Подложка должна КОНТРАСТИРОВАТЬ с фоном секции!

### КРИТИЧНО: Figma Bounding Box vs CSS Visual Height

**Проблема:** В Figma высота текстового узла (bounding box) ≠ визуальной высоте текста.

**Пример:**
- Figma: заголовок 45px, bounding box height = 63px (18px лишних)
- CSS line-height: 1 → line box = 45px

**Формула расчёта gap:**
```
visual_text_height = lines × font_size × line_height
extra_space = bounding_box_height - visual_text_height
real_gap = figma_gap + extra_space / 2
```

**Правило:** Если `margin-bottom` из прямого расчёта координат даёт маленькое значение (< 10px),
а на скриншоте виден заметный отступ — нужно учесть разницу bounding box.

### Scoping L5-специфичных стилей

L5 делит шаблоны с L1-L4. Для изоляции L5 стилей используем CSS `:has()`:

| Секция | Скоупинг через | Пример |
|--------|----------------|--------|
| features-grid | `:has(.feature-item--card)` | `.features__grid:has(.feature-item--card) { gap: 32px 27px; }` |
| about-v1 | `:has(.about__tagline)` | `.about:has(.about__tagline) .about__name { font-size: 45px; }` |
| gallery-single-slider | `.section--bg-secondary` | `.gallery-single-slider.section--bg-secondary .gallery-single-slider__image { border-radius: 15px; }` |
| content-v1 | `.content-section--{{variant}}` | `.content-section--v5 .content-section__image { ... }` |

### Декоративные подложки (::after pseudo-elements)

**Проблема:** `z-index: -1` помещает псевдоэлемент ЗА фон секции → не виден.

**Решение:**
```css
.parent {
  position: relative;
  z-index: 1;        /* создаёт stacking context */
  overflow: visible;  /* подложка может выходить за границы */
}
.parent::after {
  z-index: 1;        /* за изображением, но видим */
}
.parent img {
  position: relative;
  z-index: 2;        /* над подложкой */
}
/* Также overflow: visible на row и col- контейнерах */
```

---

## Методология проверки: Отступы, Шрифты, Цвета

### 1. Получить данные из Figma

```bash
# 1. Сначала получить metadata секции
mcp__figma-desktop__get_metadata nodeId=810:30

# 2. Найти node ID нужного элемента (text, image, etc)

# 3. Получить design_context для элемента
mcp__figma-desktop__get_design_context nodeId=xxx:xxx
```

### 2. Что искать для ШРИФТОВ

| Figma свойство | CSS эквивалент | Пример |
|----------------|----------------|--------|
| `text-[N]px` | `font-size` | `text-45px` → `font-size: 45px` |
| `font-bold` | `font-weight: 700` | Bold заголовки |
| `font-medium` | `font-weight: 500` | Medium для body |
| `font-normal` | `font-weight: 400` | Regular для мелких текстов |
| `leading-[N]` | `line-height` | `leading-[120%]` → `line-height: 1.2` |
| `text-left/center/right` | `text-align` | — |

**Цвета текста:**
- `text-black` → `--color-text-primary` (#3D3D3D)
- `text-[#XXXXXX]` → соответствующий цвет
- Проверять что CSS переменная равна Figma значению!

### 3. Что искать для ОТСТУПОВ (margins, gaps)

**Формула расчёта вертикального gap:**
```
gap = element2.y - (element1.y + element1.height)
```

**Пример:**
```
Имя "Karin Himml": y=8485, height=55 → нижний край = 8540
Tagline: y=8565
Gap = 8565 - 8540 = 25px → margin-top: 25px
```

**ВАЖНО: Bounding box ловушка!**
- Figma text bounding box может быть больше визуального текста
- Если расчётный gap кажется слишком маленьким — учитывать extra space
- Формула: `real_gap = calculated_gap + (bbox_height - visual_height) / 2`

### 4. Что искать для РАЗМЕРОВ

| Элемент | Figma | CSS |
|---------|-------|-----|
| Изображение | `w-[N]px h-[N]px` | `width: Npx; height: Npx` |
| Контейнер | `bounding box` | `max-width`, `padding` |
| Карточка | размеры + radius | `width`, `height`, `border-radius` |

### 5. Чеклист для КАЖДОГО элемента секции

- [ ] **Текст:** font-size, font-weight, color, line-height, text-align
- [ ] **Отступы:** margin-top, margin-bottom, gap
- [ ] **Размеры:** width, height, padding
- [ ] **Скругления:** border-radius
- [ ] **Фон/границы:** background-color, border

### 6. Частые ошибки при верификации

| Симптом | Причина | Как проверить |
|---------|---------|---------------|
| Отступ больше/меньше | Bounding box ≠ visual | Сравнить font-size с bbox height |
| Шрифт слишком жирный/тонкий | Неправильный weight | Проверить `font-bold` vs `font-medium` vs `font-normal` |
| Текст не того цвета | CSS variable ≠ Figma | Проверить hex значение переменной |
| Элемент не на месте | Неправильный margin/padding | Вычислить gap по координатам |
| Элемент невидим | z-index или overflow | Проверить stacking context |

### 7. Примеры реальных фиксов

**Fix 1: Tagline margin (About V5)**
```
Figma: Karin Himml y=8485+55=8540, Tagline y=8565
Gap = 25px
CSS before: margin-top: 10px
CSS after: margin-top: 25px
```

**Fix 2: Card text font-size (Features Cards V3)**
```
Figma: text-16px font-normal
CSS before: font-size: var(--font-size-text) /* 22px */
CSS after: font-size: 16px
```

**Fix 3: Section title alignment (Steps 6)**
```
Figma: text-left
CSS before: text-align: center
CSS after: text-align: left
```

### Проверенные секции хаба (585:30)

| Секция | Node | Статус |
|--------|------|--------|
| Hero V5 | — | ✅ |
| Content V1 (v5) | — | ✅ |
| Services Cards V5 | 585:194 | ✅ |
| CTA Cards V5 | 585:195 | ✅ |
| CTA V1 | 585:67 | ✅ |
| Gallery Fullwidth | 592:32 | ✅ |
| Features Grid | 592:35 | ✅ |
| Gallery Single Slider | 585:144 | ✅ |
| About V1 | 585:48 | ✅ |
| Footer V1 | 585:58 | ⚠️ Нужны template changes для map sizing |

### Фоны секций L5 Business Hub

**Цвета:** primary=#F5EDE0 (светлый), secondary=#EEE3D0 (темнее)

| Секция | Figma BG | Template Default | bgClass в конфиге |
|--------|----------|------------------|-------------------|
| Hero V5 | gray (image) | — | — |
| Content V1 | primary | primary | — |
| Services Cards V5 | secondary | secondary | `section--bg-secondary` |
| **CTA Cards V5** | **primary** | **secondary** | **`section--bg-primary`** ← обязательно! |
| CTA V1 | secondary | secondary | — |
| Gallery Fullwidth | primary | primary | `section--bg-primary` |
| Features Grid | secondary | primary | `section--bg-secondary` |
| Gallery Slider | primary | primary | `section--bg-primary` |
| About V1 | primary | primary | — |

**Правило:** Если template default ≠ Figma, добавить `bgClass` в конфиг.

---

## Landing 5 Mobile: Кнопки на всю ширину контента

### Проблема
L5 кнопки конфликтовали с общими правилами в responsive.css (`max-width: 280px`).

### Решение
Добавлены `!important` переопределения в конец responsive.css:

```css
/* responsive.css - в самом конце */
@media (max-width: 767.98px) {
  .hero--v5 .hero__btn {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .cta--with-image .cta__btn {
    width: 100% !important;
    max-width: 100% !important;
  }
}
```

### Паттерн для L5 кнопок
1. Контейнер кнопки (`.hero__content`, `.cta__text`, `.about__content`) имеет `padding: 16px`
2. Кнопка внутри `width: 100%` заполняет контейнер
3. **НЕ использовать** `calc(100% - 32px)` + `margin: 16px` — это дублирует отступы

---

## Правила работы

1. **ВСЕГДА** проверять Figma перед изменениями
2. **ВСЕГДА** запускать `node generator.js` после изменений
3. **ВСЕГДА** проверять мобильную версию
4. **НИКОГДА** не хардкодить значения (использовать CSS переменные)
5. **НИКОГДА** не угадывать тексты (копировать из Figma)
