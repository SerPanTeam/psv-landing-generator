# Использование секций в лендингах

## Обзор

Документ описывает какие шаблоны секций используются в каждом из 4 лендингов.

**Последнее обновление:** 2026-01-22

---

## Сводная таблица

| Шаблон | L1 Family | L2 Family-Kids | L3 Dogs | L4 Kids | Quiz |
|--------|:---------:|:--------------:|:-------:|:-------:|:----:|
| **Header** |
| header/header-v1.html | ✓ | ✓ | ✓ | - | ✓ |
| **Hero** |
| hero/hero-v1.html | ✓ | ✓ | - | - | - |
| hero/hero-banner-v3.html | - | - | ✓ | - | - |
| hero/hero-v4.html | - | - | - | ✓ | - |
| **Promo** |
| promo/promo-v1.html | ✓ | ✓ | - | - | - |
| **Content** |
| content/content-v1.html | ✓ | ✓ | - | - | - |
| content/content-v2.html | - | - | - | ✓ | - |
| content/content-sidebar.html | - | - | ✓ | - | - |
| **Gallery** |
| gallery/gallery-slider.html | ✓ | ✓ | - | - | - |
| gallery/gallery-single-slider.html | - | - | ✓ | ✓ | - |
| gallery/gallery-fullwidth.html | ✓ | ✓ | - | ✓ | - |
| gallery/gallery-decorated.html | - | - | ✓ | - | - |
| **Features** |
| features/features-3col.html | ✓ | ✓ | - | - | - |
| features/features-grid.html | - | - | ✓ | - | - |
| features/features-cards-v3.html | - | - | ✓ | - | - |
| **Steps** |
| steps/steps-4.html | ✓ | ✓ | ✓ | - | - |
| steps/steps-v4.html | - | - | - | ✓ | - |
| **CTA** |
| cta/cta-v1.html | - | - | ✓ | ✓ | - |
| **FAQ** |
| faq/faq-accordion.html | ✓ | ✓ | - | - | - |
| faq/faq-cards.html | - | - | ✓ | - | - |
| faq/faq-v4.html | - | - | - | ✓ | - |
| **Services** |
| services/services-grid.html | ✓ | ✓ | ✓ | - | - |
| services/services-v4.html | - | - | - | ✓ | - |
| **About** |
| about/about-v1.html | ✓ | ✓ | ✓ | - | ✓ |
| about/about-v2.html | - | - | - | ✓ | - |
| **Quiz** |
| quiz/quiz-container.html | ✓ | ✓ | ✓ | ✓ | - |
| quiz/quiz-page-step.html | - | - | - | - | ✓ |
| quiz/quiz-page-form.html | - | - | - | - | ✓ |
| quiz/quiz-page-success.html | - | - | - | - | ✓ |
| **Footer** |
| footer/footer-v1.html | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Детали по лендингам

### Landing 1 - Familien-Fotoshooting (Weihnachten)

**Файл конфига:** `config/landing1-family.json`

**Секции (в порядке появления):**
1. `header/header-v1.html`
2. `hero/hero-v1.html`
3. `promo/promo-v1.html`
4. `content/content-v1.html`
5. `gallery/gallery-slider.html`
6. `features/features-3col.html`
7. `steps/steps-4.html`
8. `gallery/gallery-fullwidth.html`
9. `faq/faq-accordion.html`
10. `services/services-grid.html`
11. `about/about-v1.html`
12. `quiz/quiz-container.html`
13. `footer/footer-v1.html`

---

### Landing 2 - Familien und Kinder (Kostenlos)

**Файл конфига:** `config/landing2-family-kids.json`

**Секции (в порядке появления):**
1. `header/header-v1.html`
2. `hero/hero-v1.html`
3. `promo/promo-v1.html`
4. `content/content-v1.html`
5. `gallery/gallery-slider.html`
6. `features/features-3col.html`
7. `steps/steps-4.html`
8. `gallery/gallery-fullwidth.html`
9. `faq/faq-accordion.html`
10. `services/services-grid.html`
11. `about/about-v1.html`
12. `quiz/quiz-container.html`
13. `footer/footer-v1.html`

---

### Landing 3 - Hunde-Fotoshooting

**Файл конфига:** `config/landing3-dogs.json`

**Секции (в порядке появления):**
1. `header/header-v1.html`
2. `hero/hero-banner-v3.html` - баннер с оверлеем
3. `content/content-sidebar.html` - боковая панель
4. `features/features-cards-v3.html` - карточки 3 в ряд
5. `gallery/gallery-single-slider.html` - слайдер с 1 большой картинкой
6. `cta/cta-v1.html` - с `layoutRow: true`
7. `steps/steps-4.html` - с `rounded: true`
8. `features/features-grid.html` - 2x2 сетка
9. `gallery/gallery-decorated.html` - с декоративными элементами
10. `faq/faq-cards.html` - статичные карточки 2x2
11. `services/services-grid.html` - с `rounded: true`
12. `about/about-v1.html` - с `compact: true`
13. `quiz/quiz-container.html`
14. `footer/footer-v1.html`

**Особенности:**
- Все фоны `section--bg-primary`
- Скруглённые углы (`rounded: true`)
- Кнопки с `border-radius: 30px`

---

### Landing 4 - Kinder-Fotoshooting

**Файл конфига:** `config/landing4-kids.json`

**Секции (в порядке появления):**
1. `hero/hero-v4.html` - тёмный фон, лого внутри секции
2. `content/content-v2.html` - 2 колонки, кнопка слева
3. `cta/cta-v1.html` - с `alignLeft: true`
4. `steps/steps-v4.html` - 3 шага + картинка справа
5. `faq/faq-v4.html` - 2 колонки + кнопка
6. `gallery/gallery-single-slider.html`
7. `services/services-v4.html` - горизонтальные карточки
8. `gallery/gallery-fullwidth.html`
9. `about/about-v2.html` - компактный вариант
10. `quiz/quiz-container.html`
11. `footer/footer-v1.html`

**Особенности:**
- Нет отдельного header (лого в hero)
- Чередование фонов primary/secondary
- Уникальные компоненты (steps-v4, faq-v4, services-v4, about-v2)

---

## Quiz-система

Quiz-страницы генерируются автоматически из данных в JSON конфигах.

**Шаблоны:**
- `quiz/quiz-page-step.html` - шаги квиза (step1-4)
- `quiz/quiz-page-form.html` - форма сбора данных
- `quiz/quiz-page-success.html` - страница успеха

**Общие компоненты на quiz-страницах:**
- Header с логотипом
- Footer с навигацией
- About секция (только на success)

---

## Архивные секции

Неиспользуемые шаблоны перемещены в `sections/_archive/`:

| Шаблон | Причина архивации |
|--------|-------------------|
| `map-v1.html` | Не используется |
| `hero-v3.html` | Заменён на `hero-banner-v3.html` |
| `gallery-slider-v4.html` | Заменён на `gallery-single-slider.html` |
| `gallery-strip.html` | Не используется |

---

## Статистика

| Категория | Активных | В архиве |
|-----------|:--------:|:--------:|
| Header | 1 | 0 |
| Hero | 3 | 1 |
| Promo | 1 | 0 |
| Content | 3 | 0 |
| Gallery | 4 | 2 |
| Features | 3 | 0 |
| Steps | 2 | 0 |
| CTA | 1 | 0 |
| FAQ | 3 | 0 |
| Services | 2 | 0 |
| About | 2 | 0 |
| Quiz | 3 | 0 |
| Footer | 1 | 0 |
| Map | 0 | 1 |
| **Итого** | **29** | **4** |
