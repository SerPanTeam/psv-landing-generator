# Анализ Figma: Бизнес-лендинг с тематическими подлендингами

**File Key:** `SU5A4tONWqzVj80IvLo6oP`
**Дата анализа:** 2026-01-23

---

## Структура проекта

```
Главная (Хаб)
├── Подлендинг: Hochzeit (Свадьбы)
│   └── Квиз Свадьбы (8 шагов)
├── Подлендинг: Familie (Семья)
│   └── Квиз Общий (8 шагов)
├── Подлендинг: Tier (Животные)
│   └── Квиз Общий (8 шагов)
└── Подлендинг: Business (Бизнес)
    └── Квиз Общий (8 шагов)
```

---

## Node IDs

### Страницы

| Страница | Node ID | Название в Figma |
|----------|---------|------------------|
| Главная (Хаб) | 585:30 | Бизнес |
| Подлендинг Свадьбы | 810:30 | Бизнес - свадьбы |
| Подлендинг Семья | 816:116 | Бизнес - Семья |
| Подлендинг Животные | 817:139 | Бизнес - Животные |
| Подлендинг Бизнес | 817:241 | Бизнес - Для бизнеса |

### Квиз Свадьбы

| Шаг | Node ID | Вопрос |
|-----|---------|--------|
| 1 | 823:30 | Welche Momente möchtet ihr festgehalten haben? (Multiselect) |
| 2 | 823:63 | Wie lange wünscht ihr fotografische Begleitung? |
| 3 | 823:84 | Wann ist euer Hochzeitstag? (Date picker) |
| 4 | 823:117 | Hast du bestimmte Wünsche oder Vorstellungen? |
| 5 | 823:131 | Beschreibe hier deine Ideen oder Wünsche. (Textarea) |
| 6 | 823:140 | Kennst du mich bereits? |
| Form | 818:459 | Контактная форма |
| Success | 818:496 | Страница успеха |

### Квиз Общий (Familie, Tier, Business)

| Шаг | Node ID | Вопрос |
|-----|---------|--------|
| 1 | 818:344 | Wo soll das Fotoshooting stattfinden? |
| 2 | 818:366 | Wann wäre ein guter Zeitraum? |
| 3 | 818:387 | Wie dürfen die Bilder verwendet werden? |
| 4 | 818:408 | Hast du bestimmte Wünsche oder Vorstellungen? |
| 5 | 818:423 | Beschreibe hier deine Ideen oder Wünsche. (Textarea) |
| 6 | 818:437 | Kennst du mich bereits? |
| Form | 818:459 | Контактная форма |
| Success | 818:496 | Страница успеха |

---

## Цветовая схема

```css
--color-bg-primary: #F5EDE0
--color-bg-secondary: #EEE3D0
--color-button-primary: #E2C08D
--color-text: #3D3D3D
--color-text-dark: #000000
```

---

## Типографика

| Стиль | Font | Size | Weight |
|-------|------|------|--------|
| Header 2 | Inter Bold | 45px | 700 |
| Text Bold Big | Inter Bold | 28px | 700 |
| Text bold small | Inter Bold | 22px | 700 |
| Text regular small | Inter Medium | 22px | 500 |
| small-comm | Inter Regular | 16px | 400 |

---

## Главная страница (Хаб) - 585:30

### Секции

1. **Header** - Logo слева
2. **Hero** - Большое фото + заголовок + кнопка "Mehr erfahren"
3. **Content** - "Hallo, ich bin Karin Himml..." с фото слева
4. **Services Cards** - "Worauf du dich freuen kannst..." (4 карточки услуг)
   - Hochzeiten
   - Familien-Fotoshooting
   - Tier-Fotoshooting
   - Business-Fotoshooting
5. **CTA Cards** - "Wähle dein Fotoshooting" (4 карточки с изображениями)
6. **CTA Section** - "Kein passendes Fotoshooting gefunden?"
7. **Gallery Banner** - "Nicht nur ein Fotoshooting, sondern ein Erlebnis!"
8. **Features Grid** - "Was du bei mir genießen wirst..." (4 карточки 2x2)
9. **Gallery Slider** - Большой слайдер
10. **About** - "Karin Himml" с фото справа
11. **Map** - Google Maps
12. **Footer** - Ссылки

### Особенности
- Прямые углы (не скруглённые)
- Чередование фонов primary/secondary
- 4 CTA кнопки ведут на подлендинги

---

## Подлендинг Свадьбы - 810:30

### Секции

1. **Header** - Logo
2. **Hero** - "Hochzeitsfotografie – Emotionen für die Ewigkeit!"
   - Подзаголовок: "Am besten mit einem KOSTENLOSEN Probe-Fotoshooting!"
   - CTA: "Kostenloses Probe-Fotoshooting sichern"
3. **Content** - "Eure Liebe, eure Geschichte..." с фото слева
4. **Gallery Slider** - 4 фото разных размеров
5. **Features Cards** - "Was du bei mir genießen wirst..." (4 высокие карточки)
   - Spaß und Wohlfühlen
   - Hohe Qualität zu fairen Preisen
   - Kreativ und zuverlässig
   - Zufriedenheit und vielfältige Möglichkeiten
6. **Gallery Slider** - Большой слайдер
7. **Services List** - "Die Leistungen:" (5 пунктов с иконками)
   - Ausführliche Beratung
   - Rundum-Betreuung
   - Produktgarantie
   - Erstklassige Qualität
   - Die Daten gehören euch
8. **Steps Section** - "In 5 Schritten zum kostenlosen Probe-Fotoshooting!" (6 карточек 2x3)
9. **Gallery Slider**
10. **FAQ** - Accordion
11. **About** - "Über mich"
12. **Map**
13. **Footer**

### Особенности
- Уникальный квиз для свадеб (6 шагов + form + success)
- Секция шагов уникальна для этого лендинга
- Секция "Die Leistungen" уникальна

---

## Подлендинги Familie, Tier, Business - 816:116, 817:139, 817:241

### Общая структура

1. **Header** - Logo
2. **Hero** - Заголовок + описание + CTA к квизу
   - "Quiz starten & 5% Rabatt sichern!"
3. **Content** - CTA справа
4. **Gallery Cards** - 3 карточки с фото
5. **Features Grid** - "Was du bei mir genießen wirst..." (4 карточки 2x2)
6. **Gallery Slider**
7. **FAQ** - Accordion
8. **About** - "Über mich"
9. **Map**
10. **Footer**

### Особенности
- Используют общий квиз (6 шагов + form + success)
- Одинаковая структура, разный контент
- Секция Gallery Cards (3 карточки) - новая

---

## Типы квизов

### Квиз Свадьбы (уникальный)

**Шаг 1** - Multiselect с чекбоксами
- Getting Ready
- Trauung
- Paarshooting
- Feier / Party

**Шаг 2** - 4 карточки с изображениями
- 2-4 Stunden
- 4-6 Stunden
- 6-10 Stunden
- Ganztags (10+ Std)

**Шаг 3** - Date picker
- Поле ввода даты

**Шаг 4** - 2 карточки с изображениями (Ja/Nein)

**Шаг 5** - Textarea

**Шаг 6** - 4 карточки с изображениями (как в общем квизе)

### Квиз Общий

**Шаг 1** - 4 карточки с изображениями
- Im Studio
- Outdoor
- Zuhause, Firma, Location
- Ich bin noch unentschlossen

**Шаг 2** - 4 карточки
- So bald wie möglich
- In den nächsten Wochen
- Ich plane langfristig
- Noch offen

**Шаг 3** - 4 карточки
- Nur privat
- Online (Website, Social Media)
- Für geschäftliche Zwecke
- Noch nicht entschieden

**Шаг 4** - 2 карточки (Ja/Nein)

**Шаг 5** - Textarea

**Шаг 6** - 4 карточки

### Форма (общая для всех квизов) — Node 818:459

**Фон:** #F5EDE0 (primary)
**Layout:** 2 колонки

**ЛЕВАЯ колонка (форма):**
- "Lass uns mal telefonieren!" (22px Medium)
- "Du bist fast am Ziel!" (45px Bold)
- "Dann fehlt nur noch der letzte Schritt, damit ich mich mit dir in Verbindung setzen kann." (22px Medium)
- Форма:
  1. "Dein Vor- und Nachname" (text input, border, rounded 15px)
  2. "Deine E-Mail Adresse" (email input)
  3. "Deine Telefonnummer" (tel input)
  4. "Wann seid ihr erreichbar (Mehrfachauswahl)" (dropdown, часовые интервалы 8:00-19:00)
  5. Checkbox: "Ich habe die Datenschutzhinweise gelesen und verstanden."
  6. Кнопка "Absenden" (bg #E2C08D, white text, rounded 10px)
- "Deine Sicherheit ist mein größtes Anliegen – Vertraue mir und schütze deine Privatsphäre!"

**ПРАВАЯ колонка (описание):**
- "Frage dein Fotoshooting an" (28px Bold, black)
- "Ich freue mich darauf, eure besonderen Momente in unvergessliche Bilder zu verwandeln." (22px Medium, #E2C08D — золотой)
- Описательный текст (22px Medium, black):
  "Fülle einfach das Kontaktformular aus. Ich werde mich umgehend mit dir in Verbindung setzen, um alle Details zu besprechen und einen Termin zu vereinbaren..."
- Фото (549x516px, rounded 15px)

**Под формой (белый фон):**
- Google Maps встраивание

**Footer:** Impressum · Datenschutzerklärung · Cookie Richtlinien

### Success (общая для всех квизов) — Node 818:496

**Секция 1 — Благодарность (фон #F5EDE0, primary):**

ЛЕВАЯ колонка:
- "Super, vielen Dank!" (45px Bold)
- "- Deine Anfrage wurde erfolgreich vermerkt -" (22px Bold)
- Текст: "Ich habe deine Informationen erhalten und werde mich in Kürze bei dir melden..." (22px Medium, 3 абзаца)
- CTA: "Jetzt Termin wählen & sichern!" (bg #E2C08D, white text, rounded 10px, 369px)
- Контакт-кнопки (outline, border black, rounded 15px):
  - "Jetzt anrufen"
  - "WhatsApp"
  - "Mail uns!"

ПРАВАЯ колонка:
- Фото (550x529px, rounded 15px)

**Секция 2 — About/Контакты (фон #EEE3D0, secondary):**

ЛЕВАЯ колонка:
- "Karin Himml Fotografie" (35px Bold)
- "Offene Fragen? Kontaktiere mich direkt!" (22px Bold)
- Часы работы (22px Medium):
  "Montag bis Freitag von 10:00 bis 19:00 Uhr – nur nach Terminvereinbarung.
   Samstags ebenfalls nach Terminvereinbarung."
- Social icons (50x50px): Facebook, Instagram, WWW

ПРАВАЯ колонка:
- Фото (550x529px, rounded 15px)

**Секция 3 — Map (белый фон):**
- Google Maps встраивание

**Footer:** Impressum · Datenschutzerklärung · Cookie Richtlinien

---

## Ключевые выводы из анализа референса

### Общий квиз ИДЕНТИЧЕН для Familie, Tier, Business
Все 3 подлендинга используют абсолютно одинаковый квиз:
- Одинаковые вопросы и варианты ответов
- Одинаковые изображения в карточках
- Отличие только в тематическом фото на странице формы

### Условная навигация
Единственный условный переход: Шаг 4 (Ja/Nein) → Шаг 5 (textarea)
- "Ja" → показать textarea → перейти к Шагу 6
- "Nein" → пропустить textarea, перейти сразу к Шагу 6

### Подробный анализ UI
См. файл [quiz-reference-analysis.md](quiz-reference-analysis.md)
