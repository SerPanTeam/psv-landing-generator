# Руководство по редактированию готовых лендингов

Это руководство для тех, кто будет редактировать уже сгенерированные HTML файлы в папке `dist/`.

## Структура папки dist/

```
dist/
├── landing1-family/
│   ├── index.html           # Главная страница
│   ├── quiz-step1.html      # Шаг 1 квиза
│   ├── quiz-step2.html      # Шаг 2 квиза
│   ├── quiz-step3.html      # Шаг 3 квиза
│   ├── quiz-step4.html      # Шаг 4 квиза
│   ├── quiz-form.html       # Форма квиза
│   ├── quiz-success.html    # Страница успеха
│   ├── css/                 # CSS файлы
│   └── js/                  # JavaScript файлы
├── landing2-family-kids/
├── landing3-dogs/
├── landing4-kids/
└── index.html               # Индекс всех лендингов
```

---

## Редактирование текстов

### Заголовки и параграфы

Найдите нужный текст в HTML и измените:

```html
<!-- До -->
<h1 class="hero__title">Kostenloses Familien-Fotoshooting!</h1>

<!-- После -->
<h1 class="hero__title">Ваш новый заголовок!</h1>
```

### Кнопки

```html
<!-- Текст кнопки -->
<a href="quiz-step1.html" class="btn btn-primary">
  Jetzt Termin sichern
</a>
```

**Изменить можно:**
- Текст между тегами
- Ссылку в `href`

---

## Редактирование изображений

### Замена изображения

```html
<!-- До -->
<img src="https://images.unsplash.com/photo-xxx?w=500" alt="Описание">

<!-- После -->
<img src="https://your-domain.com/your-image.jpg" alt="Новое описание">
```

### Рекомендуемые размеры

| Место | Размер | Формат |
|-------|--------|--------|
| Hero главное | 500x500px | JPG/WebP |
| Hero второстепенное | 400x380px | JPG/WebP |
| Gallery slider | 400x400px | JPG/WebP |
| Gallery fullwidth | 1400x600px | JPG/WebP |
| Service card | 350x350px | JPG/WebP |
| About photo | 500x600px | JPG/WebP |
| Quiz option | 200x200px | JPG/WebP |
| Quiz form | 450x600px | JPG/WebP |

---

## Редактирование ссылок

### Ссылки на квиз

```html
<a href="quiz-step1.html" class="btn btn-primary">Начать</a>
```

### Внешние ссылки

```html
<!-- Соцсети -->
<a href="https://instagram.com/your-account" class="social-icon">

<!-- Телефон -->
<a href="tel:+491234567890">Позвонить</a>

<!-- Email -->
<a href="mailto:info@example.com">Написать</a>
```

### Footer ссылки

```html
<a href="https://your-site.com/impressum">Impressum</a>
<a href="https://your-site.com/datenschutz">Datenschutzerklärung</a>
<a href="https://your-site.com/cookies">Cookie Richtlinien</a>
```

---

## Редактирование Google Maps

Найдите iframe с картой в footer:

```html
<iframe
  src="https://maps.google.com/maps?q=YOUR+ADDRESS&t=&z=15&ie=UTF8&iwloc=&output=embed"
  width="100%"
  height="300">
</iframe>
```

**Как получить новую ссылку:**
1. Откройте Google Maps
2. Найдите нужный адрес
3. Нажмите "Поделиться" → "Встроить карту"
4. Скопируйте URL из `src="..."`

---

## Редактирование формы

### Поля формы

```html
<input type="text" name="name" placeholder="Ваше имя" required>
<input type="email" name="email" placeholder="Email" required>
<input type="tel" name="phone" placeholder="Телефон" required>
```

### Checkbox согласия

```html
<label>
  <input type="checkbox" name="privacy" required>
  <span>Я принимаю <a href="#">условия</a></span>
</label>
```

### Кнопка отправки

```html
<button type="submit" class="btn btn-primary">Отправить заявку</button>
```

---

## Подключение аналитики

### Google Analytics 4

Добавьте перед `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Facebook Pixel

Добавьте перед `</head>`:

```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## Подключение формы к backend

### Webhook (Zapier, Make)

В файле `js/quiz.js` найдите и измените:

```javascript
// Найдите секцию отправки формы
const webhookUrl = 'https://hooks.zapier.com/hooks/catch/xxx/xxx';

fetch(webhookUrl, {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

### Email через Formspree

Измените атрибут `action` формы:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## CSS классы для стилизации

### Фоны секций

| Класс | Описание |
|-------|----------|
| `section--bg-primary` | Светло-бежевый #F5EDE0 |
| `section--bg-secondary` | Тёмно-бежевый #EEE3D0 |

### Кнопки

| Класс | Описание |
|-------|----------|
| `btn-primary` | Золотая кнопка с заливкой |
| `btn-outline` | Кнопка с рамкой |
| `btn--rounded` | Скруглённые углы |

### Текст

| Класс | Описание |
|-------|----------|
| `text-center` | По центру |
| `text-accent` | Акцентный цвет |

---

## Важные предупреждения

### Не удаляйте

- Атрибуты `data-*` на элементах квиза
- Классы `is-active`, `is-open`
- Скрипты в конце `<body>`

### Не меняйте

- Структуру вложенности HTML (div внутри div)
- Имена классов (ломает CSS)
- ID элементов (ломает JS)

### Тестируйте после изменений

1. Проверьте на десктопе (1920px, 1440px, 1280px)
2. Проверьте на планшете (768px)
3. Проверьте на мобильном (375px, 320px)
4. Проверьте работу квиза
5. Проверьте отправку формы

---

## Частые проблемы

### Сломался layout
Проверьте, не удалили ли вы закрывающие теги `</div>`.

### Не работает квиз
Проверьте консоль браузера (F12) на ошибки JavaScript.

### Изображение не отображается
Проверьте URL и доступность изображения.

### Форма не отправляется
Проверьте, что все required поля заполнены.

---

## Контакты для помощи

При возникновении сложностей обращайтесь к разработчику.
