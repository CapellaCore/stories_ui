-- Обновление базы данных для добавления slug полей
-- Выполните этот скрипт в Supabase SQL Editor

-- 1. Добавление поля slug в таблицу tags (если его еще нет)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tags' AND column_name = 'slug') THEN
        ALTER TABLE tags ADD COLUMN slug VARCHAR(100);
    END IF;
END $$;

-- 2. Создание индекса для slug в tags (если его еще нет)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tags_slug') THEN
        CREATE INDEX idx_tags_slug ON tags(slug);
    END IF;
END $$;

-- 3. Обновление существующих тегов с slug'ами
UPDATE tags SET slug = 'priklyucheniya' WHERE name = 'Приключения';
UPDATE tags SET slug = 'druzhba' WHERE name = 'Дружба';
UPDATE tags SET slug = 'les' WHERE name = 'Лес';
UPDATE tags SET slug = 'zhivotnye' WHERE name = 'Животные';
UPDATE tags SET slug = 'kosmos' WHERE name = 'Космос';
UPDATE tags SET slug = 'fantastika' WHERE name = 'Фантастика';
UPDATE tags SET slug = 'more' WHERE name = 'Море';
UPDATE tags SET slug = 'rusalki' WHERE name = 'Русалки';
UPDATE tags SET slug = 'volshebstvo' WHERE name = 'Волшебство';

-- 4. Делаем поле slug обязательным
ALTER TABLE tags ALTER COLUMN slug SET NOT NULL;

-- 5. Добавляем уникальное ограничение для slug в tags
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tags_slug_unique') THEN
        ALTER TABLE tags ADD CONSTRAINT tags_slug_unique UNIQUE (slug);
    END IF;
END $$;

-- 6. Проверяем, что все сказки имеют slug
SELECT 'Проверка сказок без slug:' as message;
SELECT id, title FROM stories WHERE slug IS NULL OR slug = '';

-- 7. Проверяем, что все теги имеют slug
SELECT 'Проверка тегов без slug:' as message;
SELECT id, name FROM tags WHERE slug IS NULL OR slug = '';

-- 8. Показываем итоговую структуру
SELECT 'Структура таблицы stories:' as message;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'stories' 
ORDER BY ordinal_position;

SELECT 'Структура таблицы tags:' as message;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'tags' 
ORDER BY ordinal_position; 