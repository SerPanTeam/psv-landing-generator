# Маппинг секций: Бизнес-лендинг

## Существующие секции в проекте

| Категория | Файл | Использование |
|-----------|------|---------------|
| header | header-v1.html | Все лендинги |
| hero | hero-v1.html | L1, L2 |
| hero | hero-v4.html | L4 (лого внутри) |
| hero | hero-banner-v3.html | L3 |
| content | content-v1.html | L1, L2 |
| content | content-v2.html | L4 |
| content | content-sidebar.html | L3 |
| content | content-gallery-v4.html | L4 |
| gallery | gallery-slider.html | L1, L2 (3 видимых) |
| gallery | gallery-single-slider.html | L3, L4 (1 большая) |
| gallery | gallery-fullwidth.html | L1, L2, L4 |
| gallery | gallery-decorated.html | L3 |
| features | features-3col.html | L1, L2 |
| features | features-grid.html | L3 |
| features | features-cards-v3.html | L3 |
| steps | steps-4.html | L1, L2, L3 |
| steps | steps-v4.html | L4 |
| faq | faq-accordion.html | L1, L2 |
| faq | faq-cards.html | L3 |
| faq | faq-v4.html | L4 |
| services | services-grid.html | L1, L2, L3 |
| services | services-v4.html | L4 |
| about | about-v1.html | L1, L2, L3, Quiz |
| about | about-v2.html | L4 |
| cta | cta-v1.html | L4 |
| promo | promo-v1.html | L1 |
| footer | footer-v1.html | Все |
| quiz | quiz-container.html | Контейнер на главной |
| quiz | quiz-page-step.html | Шаги квиза |
| quiz | quiz-page-form.html | Форма |
| quiz | quiz-page-success.html | Успех |

---

## Секции для нового Бизнес-лендинга

### Главная страница (Хаб)

| Секция | Готова | Шаблон | Примечание |
|--------|--------|--------|------------|
| Header | ✅ | header-v1.html | Без изменений |
| Hero | ⚠️ | hero-v1.html | Адаптировать под новый layout |
| Content (About intro) | ✅ | content-v1.html | Фото слева, текст справа |
| Services Cards (4 высокие) | ❌ | **НОВАЯ: services-cards-v5.html** | 4 карточки услуг с описанием |
| CTA Cards (4 с фото) | ❌ | **НОВАЯ: cta-cards-v5.html** | 4 карточки с изображениями и CTA |
| CTA Section | ✅ | cta-v1.html | Адаптировать layout |
| Gallery Banner | ✅ | gallery-fullwidth.html | Полноширинное изображение |
| Features Grid (2x2) | ✅ | features-grid.html | 4 карточки с иконками |
| Gallery Slider | ✅ | gallery-single-slider.html | Большой слайдер |
| About | ✅ | about-v1.html | Фото справа |
| Map | ❌ | **НОВАЯ: map-v5.html** | Google Maps встраивание |
| Footer | ✅ | footer-v1.html | Без изменений |

### Подлендинг Свадьбы

| Секция | Готова | Шаблон | Примечание |
|--------|--------|--------|------------|
| Header | ✅ | header-v1.html | |
| Hero + CTA | ⚠️ | hero-v1.html | Добавить подзаголовок с цветом |
| Content | ✅ | content-v1.html | |
| Gallery Collage | ❌ | **НОВАЯ: gallery-collage-v5.html** | 4 фото разных размеров |
| Features Cards (4 высокие) | ⚠️ | features-cards-v3.html | Адаптировать высоту |
| Gallery Slider | ✅ | gallery-single-slider.html | |
| Services List | ❌ | **НОВАЯ: services-list-v5.html** | Список с иконками слева |
| Steps 6 (2x3) | ❌ | **НОВАЯ: steps-6.html** | 6 карточек в 2 колонки |
| Gallery Slider | ✅ | gallery-single-slider.html | |
| FAQ | ✅ | faq-accordion.html | |
| About | ✅ | about-v1.html | |
| Map | ❌ | map-v5.html | |
| Footer | ✅ | footer-v1.html | |

### Подлендинги Familie / Tier / Business

| Секция | Готова | Шаблон | Примечание |
|--------|--------|--------|------------|
| Header | ✅ | header-v1.html | |
| Hero + CTA | ⚠️ | hero-v1.html | С призывом к квизу |
| Content + CTA | ✅ | content-v1.html | CTA справа |
| Gallery 3 Cards | ❌ | **НОВАЯ: gallery-cards-v5.html** | 3 карточки с фото |
| Features Grid | ✅ | features-grid.html | 4 карточки 2x2 |
| Gallery Slider | ✅ | gallery-single-slider.html | |
| FAQ | ✅ | faq-accordion.html | |
| About | ✅ | about-v1.html | |
| Map | ❌ | map-v5.html | |
| Footer | ✅ | footer-v1.html | |

---

## Новые секции для создания

### 1. services-cards-v5.html
**Назначение:** 4 высокие карточки услуг для хаб-страницы
**Layout:** 4 колонки
**Содержимое карточки:**
- Изображение (160px)
- Заголовок (28px bold)
- Подзаголовок (16px bold)
- Описание (16px regular)

### 2. cta-cards-v5.html
**Назначение:** 4 карточки с изображениями и CTA
**Layout:** 4 колонки
**Содержимое карточки:**
- Изображение сверху (195px)
- Заголовок (22px bold)
- Описание/CTA (16px)

### 3. gallery-collage-v5.html
**Назначение:** Галерея из 4 фото разных размеров
**Layout:** Центральное большое + 2 по бокам + 1 маленькое
**Кнопки:** Стрелки навигации + "Mehr erfahren"

### 4. gallery-cards-v5.html
**Назначение:** 3 карточки с большими фото
**Layout:** 3 колонки
**Содержимое:** Изображение в карточке с тенью

### 5. services-list-v5.html
**Назначение:** Список услуг с иконками
**Layout:** 2 колонки (текст + изображение)
**Содержимое:** 5 пунктов с иконками слева

### 6. steps-6.html
**Назначение:** 6 шагов в виде карточек
**Layout:** 2 колонки, 3 ряда
**Содержимое карточки:**
- Номер шага в круге
- Текст шага

### 7. map-v5.html
**Назначение:** Секция с Google Maps
**Layout:** Полноширинная карта с закруглёнными углами

---

## Расширение системы квизов

### Новые типы шагов

| Тип | Файл | Описание |
|-----|------|----------|
| Multiselect | quiz-page-multiselect.html | Чекбоксы для множественного выбора |
| Date | quiz-page-date.html | Выбор даты |
| Textarea | quiz-page-textarea.html | Поле для свободного текста |

### Обновления существующих

| Файл | Изменения |
|------|-----------|
| quiz-page-step.html | Добавить поддержку 2 колонок (для Ja/Nein) |
| quiz-page-form.html | Полностью новый layout: 2 колонки (форма слева, описание+фото справа), multiselect таймслотов (часовые 8:00-19:00), Maps под формой |
| quiz-page-success.html | 3 секции: благодарность+CTA+контакт-кнопки (с фото справа), About+social (secondary bg, фото справа), Maps |

### Финальные решения по конфигурации

| Вопрос | Решение |
|--------|---------|
| Фото в общих квизах | Тематические (разные для Familie/Tier/Business на шагах 1-3, общие для 4-6) |
| Таймслоты формы | Часовые интервалы 8:00-19:00 (12 слотов + "Keine Slot") |
| Layout формы | Следуем Figma: форма СЛЕВА, описание+фото СПРАВА |
| Success page | Полная: благодарность + About + Map + Social + контакт-кнопки |
| Цветовая схема | Тёплая из Figma (#F5EDE0, #EEE3D0, #E2C08D), НЕ холодная из референса |

---

## Универсальные секции

Следующие секции можно переиспользовать без изменений:

1. **header-v1.html** - для всех страниц
2. **footer-v1.html** - для всех страниц
3. **about-v1.html** - для подлендингов и success
4. **faq-accordion.html** - для всех подлендингов
5. **gallery-single-slider.html** - для галерей
6. **features-grid.html** - для секций преимуществ

---

## Порядок квизов по контексту

### Квиз Свадьбы (6 шагов)
1. Какие моменты (multiselect)
2. Длительность съёмки (4 варианта)
3. Дата свадьбы (date picker)
4. Есть ли пожелания (Ja/Nein)
5. Описание пожеланий (textarea) - условный
6. Знакомы ли вы со мной (4 варианта)
→ Форма → Success

### Квиз Общий - Familie/Tier/Business (6 шагов)
1. Место съёмки (4 варианта)
2. Когда планируете (4 варианта)
3. Использование фото (4 варианта)
4. Есть ли пожелания (Ja/Nein)
5. Описание пожеланий (textarea) - условный
6. Знакомы ли вы со мной (4 варианта)
→ Форма → Success
