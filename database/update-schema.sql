-- Обновление схемы базы данных для добавления slug полей

-- Добавление поля slug в таблицу tags (если его еще нет)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tags' AND column_name = 'slug') THEN
        ALTER TABLE tags ADD COLUMN slug VARCHAR(100);
    END IF;
END $$;

-- Создание индекса для slug в tags (если его еще нет)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tags_slug') THEN
        CREATE INDEX idx_tags_slug ON tags(slug);
    END IF;
END $$;

-- Обновление существующих тегов с slug'ами
UPDATE tags SET slug = 'priklyucheniya' WHERE name = 'Приключения';
UPDATE tags SET slug = 'druzhba' WHERE name = 'Дружба';
UPDATE tags SET slug = 'les' WHERE name = 'Лес';
UPDATE tags SET slug = 'zhivotnye' WHERE name = 'Животные';
UPDATE tags SET slug = 'kosmos' WHERE name = 'Космос';
UPDATE tags SET slug = 'fantastika' WHERE name = 'Фантастика';
UPDATE tags SET slug = 'more' WHERE name = 'Море';
UPDATE tags SET slug = 'rusalki' WHERE name = 'Русалки';
UPDATE tags SET slug = 'volshebstvo' WHERE name = 'Волшебство';

-- Делаем поле slug обязательным
ALTER TABLE tags ALTER COLUMN slug SET NOT NULL;
ALTER TABLE tags ADD CONSTRAINT tags_slug_unique UNIQUE (slug); 