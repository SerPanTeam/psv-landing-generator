# Спецификация секций лендингов

## Обзор

Этот документ содержит детальное описание каждой секции, которую нужно реализовать.
Для получения точных данных из Figma используйте команды:
- `Figma:get_design_context` — код и структура
- `Figma:get_screenshot` — визуальный референс
- `Figma:get_variable_defs` — CSS переменные

**Figma File Key**: `qGiP8ZP2Ot8Tut1faJDl4p`

---

## 1. HEADER

### Описание
Простой хедер с логотипом. Одинаковый для всех лендингов.

### HTML структура
```html
<header class="header">
  <div class="container">
    <a href="/" class="header__logo">
      <span class="logo-text">{{logoText}}</span>
    </a>
  </div>
</header>
```

### CSS классы
- `.header` — контейнер хедера
- `.header__logo` — логотип (текст "Logo")
- `.logo-text` — стиль текста логотипа

### Переменные для кастомизации
```css
--header-padding: 20px 0;
--logo-font-size: 35px;
--logo-font-weight: 700;
--logo-color: var(--color-text-primary);
```

---

## 2. HERO СЕКЦИИ

### 2.1 Hero V1 (Лендинг 1: Familien-Fotoshooting)

**Figma node**: `1:3`

#### Описание
- Заголовок слева: "Hello, I am a photographer"
- Подзаголовок
- Кнопка CTA
- Большое фото справа

#### HTML структура
```html
<section class="hero hero--v1 section--bg-primary">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <h1 class="heading-1">{{title}}</h1>
        <p class="text-regular">{{subtitle}}</p>
        <a href="#quiz" class="btn-primary">{{buttonText}}</a>
      </div>
      <div class="col-lg-6">
        <div class="hero__image">
          <img src="{{image}}" alt="{{imageAlt}}">
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### 2.2 Hero V2 (Лендинг 2: Familien und Kinder)

**Figma node**: `233:22`

#### Описание
- Две колонки контента
- "Kostenloses Familien und Kinder-Fotoshooting!"
- Боковая панель с дополнительной информацией

#### Особенности
- Более сложный layout
- Sidebar с текстом справа

---

### 2.3 Hero V3 (Лендинг 3: Hunde)

**Figma node**: `369:256`

#### Описание
- "Kostenloses Hunde-Fotoshooting"
- Изображения собак
- Блок "Warum Kostenlos?"

---

### 2.4 Hero V4 (Лендинг 4: Kinder)

**Figma node**: `479:30`

#### Описание
- "Kostenloses Kinder-Fotoshooting"
- 4 изображения в ряд (с наклоном)
- Уникальный визуальный стиль

---

## 3. PROMO СЕКЦИЯ

**Используется в**: Лендинг 1

#### Описание
- Фото слева
- Текст справа: "Willkommen Fotoshooting-Aktion"
- Кнопка перехода к квизу

### HTML структура
```html
<section class="promo section--bg-secondary">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <div class="promo__image">
          <img src="{{image}}" alt="">
        </div>
      </div>
      <div class="col-lg-6">
        <h2 class="heading-2">{{title}}</h2>
        <p class="text-regular">{{description}}</p>
        <a href="#quiz" class="btn-link">{{linkText}} →</a>
      </div>
    </div>
  </div>
</section>
```

---

## 4. FEATURES (3 колонки)

**Используется во всех лендингах**

### Описание
3 карточки с иконкой/изображением и текстом:
- Das Outfit
- Fotolokation  
- Fotos

### HTML структура
```html
<section class="features section--bg-primary">
  <div class="container">
    <div class="row">
      {{#each items}}
      <div class="col-lg-4">
        <div class="feature-card">
          <div class="feature-card__image">
            <img src="{{image}}" alt="">
          </div>
          <h3 class="feature-card__title">{{title}}</h3>
          <p class="feature-card__text">{{description}}</p>
        </div>
      </div>
      {{/each}}
    </div>
  </div>
</section>
```

---

## 5. STEPS (4 шага)

**Используется во всех лендингах**

### Описание
"Wie genau komme ich zum Fotoshooting?"
4 шага с нумерацией и описанием

### HTML структура
```html
<section class="steps section--bg-secondary">
  <div class="container">
    <h2 class="heading-2 text-center">{{title}}</h2>
    <div class="row">
      {{#each steps}}
      <div class="col-lg-6 col-xl-3">
        <div class="step-card">
          <span class="step-card__number">{{number}}</span>
          <h3 class="step-card__title">{{title}}</h3>
          <p class="step-card__text">{{description}}</p>
        </div>
      </div>
      {{/each}}
    </div>
  </div>
</section>
```

---

## 6. FAQ ACCORDION

**Используется во всех лендингах**

### Описание
"Häufige Fragen zum Fotoshooting"
Раскрывающиеся вопросы-ответы

### HTML структура
```html
<section class="faq section--bg-primary">
  <div class="container">
    <h2 class="heading-2">{{title}}</h2>
    <div class="faq__list">
      {{#each questions}}
      <div class="faq__item" data-faq-item>
        <button class="faq__question" data-faq-toggle>
          <span>{{question}}</span>
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>{{answer}}</p>
        </div>
      </div>
      {{/each}}
    </div>
  </div>
</section>
```

### JavaScript
```javascript
// faq.js
document.querySelectorAll('[data-faq-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('[data-faq-item]');
    item.classList.toggle('is-open');
  });
});
```

---

## 7. SERVICES GRID

**Используется во всех лендингах**

### Описание
"Das ganze Jahr über finden immer wieder verschiedene Aktionen..."
4 карточки услуг с изображениями

### HTML структура
```html
<section class="services section--bg-secondary">
  <div class="container">
    <h2 class="heading-2">{{title}}</h2>
    <p class="text-regular">{{subtitle}}</p>
    <div class="row">
      {{#each services}}
      <div class="col-md-6 col-lg-3">
        <div class="service-card">
          <div class="service-card__image">
            <img src="{{image}}" alt="">
          </div>
          <h3 class="service-card__title">{{title}}</h3>
          <p class="service-card__text">{{description}}</p>
        </div>
      </div>
      {{/each}}
    </div>
    <a href="{{ctaLink}}" class="btn-outline">{{ctaText}}</a>
  </div>
</section>
```

---

## 8. ABOUT

**Используется во всех лендингах**

### Описание
"Willkommen bei..." / "Hi, ich bin..."
Информация о фотографе с фото

### HTML структура
```html
<section class="about section--bg-primary">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <h2 class="heading-2">{{title}}</h2>
        <p class="text-accent">{{subtitle}}</p>
        <p class="text-regular">{{description}}</p>
        <div class="about__social">
          {{#each socials}}
          <a href="{{url}}" class="social-icon">
            <img src="{{icon}}" alt="{{name}}">
          </a>
          {{/each}}
        </div>
      </div>
      <div class="col-lg-6">
        <div class="about__image">
          <img src="{{image}}" alt="">
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 9. FOOTER

**Одинаковый для всех лендингов**

### Описание
- Google Maps iframe
- Ссылки: Impressum, Datenschutzerklärung, Cookie Richtlinien

### HTML структура
```html
<footer class="footer">
  <div class="footer__map">
    <iframe 
      src="{{mapEmbedUrl}}" 
      width="100%" 
      height="300" 
      style="border:0;" 
      allowfullscreen="" 
      loading="lazy">
    </iframe>
  </div>
  <div class="footer__bottom">
    <div class="container">
      <nav class="footer__nav">
        <a href="{{impressumUrl}}">Impressum</a>
        <span>·</span>
        <a href="{{datenschutzUrl}}">Datenschutzerklärung</a>
        <span>·</span>
        <a href="{{cookieUrl}}">Cookie Richtlinien</a>
      </nav>
    </div>
  </div>
</footer>
```

---

## 10. QUIZ КОМПОНЕНТЫ

### 10.1 Quiz Step (Универсальный)

### Описание
Шаг квиза с вопросом и вариантами ответа.
Варианты: 2, 3, или 4 карточки.

### HTML структура
```html
<div class="quiz-step" data-quiz-step="{{stepNumber}}">
  <div class="container">
    <div class="quiz-step__header">
      <span class="quiz-step__progress">{{progressText}}</span>
      <h2 class="quiz-step__question">{{question}}</h2>
    </div>
    <div class="quiz-step__options quiz-step__options--{{optionsCount}}">
      {{#each options}}
      <button class="quiz-option {{cardStyle}}" data-quiz-option="{{value}}">
        <div class="quiz-option__image">
          <img src="{{image}}" alt="">
        </div>
        <span class="quiz-option__text">{{text}}</span>
      </button>
      {{/each}}
    </div>
  </div>
</div>
```

### Стили карточек
```css
/* Прямоугольные (Лендинги 1, 2) */
.quiz-option--square {
  border-radius: 0;
  border: 1px solid var(--color-border);
}

/* Скруглённые (Лендинги 3, 4) */
.quiz-option--rounded {
  border-radius: var(--card-border-radius-rounded);
  border: none;
  background: var(--color-white);
}
```

---

### 10.2 Quiz Form

### Описание
Форма сбора контактных данных

### Поля
- Vor- und Nachname (text, required)
- E-Mail Adresse (email, required)
- Telefonnummer (tel, required)
- Erreichbarkeit (select, multiple)
- Datenschutz checkbox (required)

### HTML структура
```html
<div class="quiz-form" data-quiz-step="form">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div class="quiz-form__header">
          <span class="quiz-form__label">{{labelText}}</span>
          <h2 class="quiz-form__title">{{title}}</h2>
          <p class="quiz-form__subtitle">{{subtitle}}</p>
        </div>
        <form class="quiz-form__form" data-quiz-form>
          <div class="form-group">
            <input type="text" name="name" placeholder="Dein Vor- und Nachname" required>
          </div>
          <div class="form-group">
            <input type="email" name="email" placeholder="Deine E-Mail Adresse" required>
          </div>
          <div class="form-group">
            <input type="tel" name="phone" placeholder="Deine Telefonnummer" required>
          </div>
          <div class="form-group">
            <select name="availability" multiple>
              <option value="" disabled selected>Wann seid ihr erreichbar (Mehrfachauswahl)</option>
              <option value="morning">Morgens</option>
              <option value="afternoon">Nachmittags</option>
              <option value="evening">Abends</option>
            </select>
          </div>
          <div class="form-group form-group--checkbox">
            <label>
              <input type="checkbox" name="privacy" required>
              <span>Ich akzeptiere die <a href="#">Datenschutzbestimmungen</a>.</span>
            </label>
          </div>
          <button type="submit" class="btn-primary">{{buttonText}}</button>
        </form>
        <p class="quiz-form__note">{{privacyNote}}</p>
      </div>
      <div class="col-lg-6">
        <div class="quiz-form__image">
          <img src="{{image}}" alt="">
        </div>
        <div class="quiz-form__info">
          <p><strong>{{infoTitle}}</strong></p>
          <p>{{infoText}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### 10.3 Quiz Success

### Описание
Страница благодарности после отправки формы

### HTML структура
```html
<div class="quiz-success" data-quiz-step="success">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <h2 class="quiz-success__title">{{title}}</h2>
        <p class="quiz-success__subtitle"><strong>{{subtitle}}</strong></p>
        <p class="quiz-success__text">{{text}}</p>
        <a href="{{ctaLink}}" class="btn-primary">{{ctaText}}</a>
        <p class="quiz-success__alternative">{{alternativeText}}</p>
        <div class="quiz-success__buttons">
          <a href="tel:{{phone}}" class="btn-outline">Jetzt anrufen</a>
          <a href="mailto:{{email}}" class="btn-outline">Mail uns!</a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="quiz-success__image">
          <img src="{{image}}" alt="">
        </div>
      </div>
    </div>
    
    <!-- About section within success -->
    <div class="quiz-success__about">
      <h3>{{aboutTitle}}</h3>
      <p class="text-accent">{{aboutSubtitle}}</p>
      <p>{{aboutText}}</p>
      <div class="about__social">
        {{#each socials}}
        <a href="{{url}}" class="social-icon">
          <img src="{{icon}}" alt="">
        </a>
        {{/each}}
      </div>
    </div>
  </div>
</div>
```

---

## 11. GALLERY STRIP

**Используется в**: Лендинг 1

### Описание
Полоса из 4+ изображений в ряд

### HTML структура
```html
<section class="gallery-strip section--bg-secondary">
  <div class="gallery-strip__container">
    {{#each images}}
    <div class="gallery-strip__item">
      <img src="{{src}}" alt="{{alt}}">
    </div>
    {{/each}}
  </div>
</section>
```

---

## 12. CTA СЕКЦИЯ

**Используется в**: Лендинги 3, 4

### Описание
Призыв к действию с кнопкой
"Sichert euch jetzt einen Gutschein..."

### HTML структура
```html
<section class="cta section--bg-secondary">
  <div class="container text-center">
    <h2 class="heading-2">{{title}}</h2>
    <p class="text-regular">{{subtitle}}</p>
    <a href="#quiz" class="btn-primary">{{buttonText}}</a>
  </div>
</section>
```

---

## Маппинг секций по лендингам

| Секция | L1 | L2 | L3 | L4 |
|--------|----|----|----|----|
| Header | ✓ | ✓ | ✓ | ✓ |
| Hero V1 | ✓ | | | |
| Hero V2 | | ✓ | | |
| Hero V3 | | | ✓ | |
| Hero V4 | | | | ✓ |
| Promo | ✓ | | | |
| Features 3-col | ✓ | ✓ | ✓ | ✓ |
| Steps 4 | ✓ | ✓ | ✓ | ✓ |
| Gallery Strip | ✓ | | | |
| CTA | | | ✓ | ✓ |
| FAQ | ✓ | ✓ | ✓ | ✓ |
| Services Grid | ✓ | ✓ | ✓ | ✓ |
| About | ✓ | ✓ | ✓ | ✓ |
| Footer | ✓ | ✓ | ✓ | ✓ |
| Quiz (square) | ✓ | ✓ | | |
| Quiz (rounded) | | | ✓ | ✓ |
