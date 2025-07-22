# Настройка базы данных Supabase

## Шаги для настройки:

### 1. Создание проекта в Supabase
1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Дождитесь завершения инициализации проекта

### 2. Выполнение SQL скриптов

#### Шаг 1: Создание схемы
1. Откройте SQL Editor в вашем проекте Supabase
2. Скопируйте содержимое файла `schema.sql`
3. Выполните скрипт

#### Шаг 2: Заполнение данными
1. В том же SQL Editor скопируйте содержимое файла `seed.sql`
2. Выполните скрипт

### 3. Получение ключей API

После создания базы данных вам понадобятся следующие ключи:

1. **URL проекта** - находится в Settings > API
2. **anon public key** - для клиентских запросов
3. **service_role key** - для серверных запросов (храните в секрете!)

### 4. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Структура базы данных

#### Таблицы:
- **stories** - основная таблица со сказками
- **tags** - теги для категоризации
- **story_images** - изображения сказок
- **story_tags** - связующая таблица (many-to-many)

#### Основные поля:
- `id` - уникальный идентификатор (UUID)
- `slug` - URL-friendly идентификатор сказки
- `title` - заголовок сказки
- `content` - полный текст сказки
- `reading_time` - время чтения в минутах
- `age_group` - возрастная группа (3-5, 6-8, 9-12)

### 6. Проверка данных

После выполнения скриптов проверьте, что данные загружены:

```sql
-- Проверка сказок
SELECT * FROM stories;

-- Проверка тегов
SELECT * FROM tags;

-- Проверка связей
SELECT s.title, t.name 
FROM stories s 
JOIN story_tags st ON s.id = st.story_id 
JOIN tags t ON st.tag_id = t.id;
```

### 7. Настройка Row Level Security (RLS)

RLS уже настроен в схеме для публичного доступа к чтению. Если нужно добавить авторизацию для записи, создайте дополнительные политики.

### 8. Следующие шаги

После настройки базы данных:
1. Установите Supabase клиент: `npm install @supabase/supabase-js`
2. Создайте сервис для работы с API
3. Обновите компоненты для загрузки данных из Supabase

## Полезные запросы

### Получение всех сказок с тегами:
```sql
SELECT 
  s.*,
  array_agg(t.name) as tags
FROM stories s
LEFT JOIN story_tags st ON s.id = st.story_id
LEFT JOIN tags t ON st.tag_id = t.id
GROUP BY s.id;
```

### Получение сказок по тегу:
```sql
SELECT s.*
FROM stories s
JOIN story_tags st ON s.id = st.story_id
JOIN tags t ON st.tag_id = t.id
WHERE t.name = 'Приключения';
``` 