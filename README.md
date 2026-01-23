# Landing Generator System

Система генерации лендингов для фотографов на основе Bootstrap 5.

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Генерация всех лендингов
node generator.js

# Результат в папке dist/
```

## Структура проекта

```
landing-generator/
├── config/                 # JSON конфиги лендингов
│   ├── landing1-family.json
│   ├── landing2-family-kids.json
│   ├── landing3-dogs.json
│   └── landing4-kids.json
├── sections/               # HTML шаблоны секций
│   ├── header/
│   ├── hero/
│   ├── content/
│   ├── gallery/
│   ├── features/
│   ├── steps/
│   ├── cta/
│   ├── faq/
│   ├── services/
│   ├── about/
│   ├── quiz/
│   ├── footer/
│   └── _archive/          # Неиспользуемые шаблоны
├── css/
│   ├── variables.css      # CSS переменные
│   ├── base.css           # Базовые стили
│   ├── components.css     # Кнопки, формы
│   ├── sections.css       # Стили секций
│   ├── quiz.css           # Стили квиза
│   └── responsive.css     # Адаптивность
├── js/
│   ├── quiz.js            # Логика квиза
│   └── faq.js             # FAQ аккордеон
├── assets/
│   └── icons/             # SVG иконки
├── dist/                  # Сгенерированные лендинги
├── docs/                  # Документация
├── generator.js           # Скрипт сборки
└── CLAUDE.md              # Инструкции для AI
```

## Документация

| Документ | Для кого | Описание |
|----------|----------|----------|
| [README.md](README.md) | Разработчики | Этот файл - обзор системы |
| [docs/USER-GUIDE.md](docs/USER-GUIDE.md) | Пользователи | Как создавать новые лендинги |
| [docs/EDITING-GUIDE.md](docs/EDITING-GUIDE.md) | Редакторы | Как править готовые HTML |
| [docs/FIGMA_SETUP.md](docs/FIGMA_SETUP.md) | Разработчики | Настройка Figma MCP |
| [SECTIONS-USAGE.md](SECTIONS-USAGE.md) | Все | Какие секции где используются |
| [CLAUDE.md](CLAUDE.md) | AI | Инструкции для Claude |

## Технологии

- **Bootstrap 5** - сетка и утилиты
- **Handlebars** - шаблонизация
- **Vanilla JS** - без фреймворков
- **CSS Variables** - кастомизация

## Лендинги

| # | Название | Конфиг | Особенности |
|---|----------|--------|-------------|
| 1 | Familien-Fotoshooting | `landing1-family.json` | Рождественская тема |
| 2 | Familien und Kinder | `landing2-family-kids.json` | Бесплатное предложение |
| 3 | Hunde-Fotoshooting | `landing3-dogs.json` | Скруглённые углы, единый фон |
| 4 | Kinder-Fotoshooting | `landing4-kids.json` | Уникальные компоненты |

## Команды

```bash
# Сборка всех лендингов
node generator.js

# Локальный сервер (нужен http-server)
npx http-server dist -p 8080
```

## Разработка

### Добавление новой секции

1. Создать HTML шаблон в `sections/[тип]/[название].html`
2. Добавить CSS стили в `css/sections.css`
3. Добавить адаптивные стили в `css/responsive.css`
4. Использовать в JSON конфиге

### Создание нового лендинга

1. Создать `config/landing[N]-[name].json`
2. Добавить в `generator.js` массив конфигов
3. Запустить `node generator.js`

Подробнее: [docs/USER-GUIDE.md](docs/USER-GUIDE.md)

### Переменные шаблонов

Шаблоны используют Handlebars синтаксис:

```html
<h1>{{title}}</h1>
{{#if subtitle}}<p>{{subtitle}}</p>{{/if}}
{{#each items}}<li>{{this}}</li>{{/each}}
```

## Figma

**File Key:** `qGiP8ZP2Ot8Tut1faJDl4p`

Подробнее: [docs/FIGMA_SETUP.md](docs/FIGMA_SETUP.md)

## License

Private - All rights reserved
