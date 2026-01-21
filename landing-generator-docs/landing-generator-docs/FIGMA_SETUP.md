# Настройка Figma MCP для Claude Code

## Что такое Figma MCP?

MCP (Model Context Protocol) позволяет Claude Code напрямую получать данные из Figma:
- Скриншоты элементов
- Код и структуру компонентов
- CSS переменные
- Метаданные

## Как подключить

### Шаг 1: Настройка в Claude Code

1. Откройте Claude Code
2. Перейдите в настройки (Settings)
3. Найдите раздел "Integrations" или "MCP Servers"
4. Добавьте Figma интеграцию
5. Авторизуйтесь через Figma аккаунт

### Шаг 2: Проверка подключения

После настройки выполните команду:
```
Figma:whoami
```

Должен вернуться ваш email и информация об аккаунте.

## Основные команды

### Получить дизайн-контекст (код)
```
Figma:get_design_context fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
```

### Получить скриншот
```
Figma:get_screenshot fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
```

### Получить CSS переменные
```
Figma:get_variable_defs fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
```

### Получить метаданные (структуру)
```
Figma:get_metadata fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
```

## Figma File Key

**File Key для этого проекта:** `qGiP8ZP2Ot8Tut1faJDl4p`

Как найти File Key:
- URL: `https://www.figma.com/design/qGiP8ZP2Ot8Tut1faJDl4p/...`
- File Key находится между `/design/` и следующим `/`

## Node ID

Node ID можно найти:
1. В URL Figma: `?node-id=1-3` → nodeId = `1:3`
2. Через DevTools в Figma
3. Через команду `get_metadata`

**Важно:** В URL используется `-`, в API нужно использовать `:`
- URL: `node-id=137-51`
- API: `nodeId=137:51`

## Все Node ID проекта

### Лендинг 1: Familien-Fotoshooting
| Экран | Node ID |
|-------|---------|
| Главная | 1:3 |
| Quiz Step 1 | 137:51 |
| Quiz Step 2 | 137:159 |
| Quiz Step 3 | 137:71 |
| Quiz Step 4 | 137:179 |
| Quiz Form | 137:111 |
| Quiz Success | 137:84 |

### Лендинг 2: Familien und Kinder
| Экран | Node ID |
|-------|---------|
| Главная | 233:22 |
| Quiz Step 1 | 313:26 |
| Quiz Step 2 | 313:82 |
| Quiz Step 3 | 313:47 |
| Quiz Step 4 | 313:68 |
| Quiz Form | 313:100 |
| Quiz Success | 313:135 |

### Лендинг 3: Hunde-Fotoshooting
| Экран | Node ID |
|-------|---------|
| Главная | 369:256 |
| Quiz Step 1 | 370:441 |
| Quiz Step 2 | 370:460 |
| Quiz Step 3 | 370:479 |
| Quiz Step 4 | 370:503 |
| Quiz Form | 370:526 |
| Quiz Success | 370:560 |

### Лендинг 4: Kinder-Fotoshooting
| Экран | Node ID |
|-------|---------|
| Главная | 479:30 |
| Quiz Step 1 | 483:63 |
| Quiz Step 2 | 483:85 |
| Quiz Step 3 | 483:100 |
| Quiz Step 4 | 483:122 |
| Quiz Form | 483:144 |
| Quiz Success | 483:180 |

## Примеры использования

### Получить Hero секцию лендинга 1
```
Figma:get_design_context fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
Figma:get_screenshot fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=1:3
```

### Получить квиз шаг 1 лендинга 3 (собаки)
```
Figma:get_design_context fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=370:441
Figma:get_screenshot fileKey=qGiP8ZP2Ot8Tut1faJDl4p nodeId=370:441
```

## Troubleshooting

### Ошибка доступа
- Проверьте, что Figma файл доступен вашему аккаунту
- Убедитесь, что авторизация прошла успешно

### Node не найден
- Проверьте правильность nodeId (используйте `:` вместо `-`)
- Убедитесь, что элемент существует в файле

### Таймаут
- Попробуйте запросить меньший элемент
- Используйте `get_metadata` для получения структуры
