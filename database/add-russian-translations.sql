-- Add Russian locale and translations
-- This script adds Russian (ru) locale and creates Russian translations for existing content

-- First, add Russian locale to the locales table
INSERT INTO locales (code, name, native_name, flag_emoji, is_active, created_at, updated_at)
VALUES ('ru', 'Russian', 'Русский', '🇷🇺', true, NOW(), NOW())
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  native_name = EXCLUDED.native_name,
  flag_emoji = EXCLUDED.flag_emoji,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Add Russian translations for existing tags
INSERT INTO tag_translation (tag_id, language, name, description, created_at, updated_at)
SELECT 
  t.id,
  'ru',
  CASE 
    WHEN t.slug = 'animals' THEN 'Животные'
    WHEN t.slug = 'classic' THEN 'Классика'
    WHEN t.slug = 'originals' THEN 'Оригинальные'
    ELSE '[RU] ' || t.name
  END,
  CASE 
    WHEN t.slug = 'animals' THEN 'Истории о животных и их приключениях'
    WHEN t.slug = 'classic' THEN 'Временные истории, которые любимы поколениями'
    WHEN t.slug = 'originals' THEN 'Оригинальные истории, созданные специально для Time to Sleep'
    ELSE '[RU] ' || COALESCE(t.description, '')
  END,
  NOW(),
  NOW()
FROM tags t
WHERE NOT EXISTS (
  SELECT 1 FROM tag_translation tt 
  WHERE tt.tag_id = t.id AND tt.language = 'ru'
);

-- Add Russian translations for existing stories
-- This will add placeholder Russian translations with [RU] prefix
INSERT INTO story_translation (story_id, language, title, description, content, reading_time, created_at, updated_at)
SELECT 
  s.id,
  'ru',
  '[RU] ' || COALESCE(st_en.title, 'Untitled Story'),
  '[RU] ' || COALESCE(st_en.description, 'No description available'),
  '[RU] ' || COALESCE(st_en.content, 'Content not yet translated to Russian'),
  COALESCE(st_en.reading_time, 5),
  NOW(),
  NOW()
FROM stories s
LEFT JOIN story_translation st_en ON s.id = st_en.story_id AND st_en.language = 'en'
WHERE NOT EXISTS (
  SELECT 1 FROM story_translation st_ru 
  WHERE st_ru.story_id = s.id AND st_ru.language = 'ru'
);

-- Verify the results
SELECT 'Locales' as table_name, code, name, native_name FROM locales WHERE code = 'ru'
UNION ALL
SELECT 'Tag Translations' as table_name, language, COUNT(*)::text, '' FROM tag_translation WHERE language = 'ru' GROUP BY language
UNION ALL
SELECT 'Story Translations' as table_name, language, COUNT(*)::text, '' FROM story_translation WHERE language = 'ru' GROUP BY language;

-- Show summary
SELECT 
  'Summary' as info,
  'Russian locale and translations added successfully' as message,
  (SELECT COUNT(*) FROM locales WHERE code = 'ru') as locales_count,
  (SELECT COUNT(*) FROM tag_translation WHERE language = 'ru') as tag_translations_count,
  (SELECT COUNT(*) FROM story_translation WHERE language = 'ru') as story_translations_count;
