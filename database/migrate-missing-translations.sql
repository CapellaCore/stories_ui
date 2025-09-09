-- Migration script to add missing story translations
-- This script only migrates stories that don't have records in story_translation table

-- First, let's see what we're working with
SELECT 'Current state before migration:' as info;

-- Count total stories
SELECT 'Total stories in database:' as info, COUNT(*) as count FROM stories;

-- Count stories with English translations
SELECT 'Stories with English translations:' as info, COUNT(*) as count 
FROM stories s 
WHERE EXISTS (
  SELECT 1 FROM story_translation st 
  WHERE st.story_id = s.id AND st.language = 'en'
);

-- Count stories with Polish translations
SELECT 'Stories with Polish translations:' as info, COUNT(*) as count 
FROM stories s 
WHERE EXISTS (
  SELECT 1 FROM story_translation st 
  WHERE st.story_id = s.id AND st.language = 'pl'
);

-- Show stories missing English translations
SELECT 'Stories missing English translations:' as info;
SELECT s.slug, s.title, t.slug as category
FROM stories s
LEFT JOIN story_tags st ON s.id = st.story_id
LEFT JOIN tags t ON st.tag_id = t.id
WHERE NOT EXISTS (
  SELECT 1 FROM story_translation st2 
  WHERE st2.story_id = s.id AND st2.language = 'en'
)
ORDER BY t.slug, s.slug;

-- Show stories missing Polish translations
SELECT 'Stories missing Polish translations:' as info;
SELECT s.slug, s.title, t.slug as category
FROM stories s
LEFT JOIN story_tags st ON s.id = st.story_id
LEFT JOIN tags t ON st.tag_id = t.id
WHERE NOT EXISTS (
  SELECT 1 FROM story_translation st2 
  WHERE st2.story_id = s.id AND st2.language = 'pl'
)
ORDER BY t.slug, s.slug;

-- ===========================================
-- MIGRATION: Add missing English translations
-- ===========================================
INSERT INTO story_translation (story_id, language, title, description, content, reading_time)
SELECT 
  s.id,
  'en',
  s.title,
  s.description,
  s.content,
  s.reading_time
FROM stories s
WHERE NOT EXISTS (
  SELECT 1 FROM story_translation st 
  WHERE st.story_id = s.id AND st.language = 'en'
);

-- ===========================================
-- MIGRATION: Add missing Polish translations
-- ===========================================
INSERT INTO story_translation (story_id, language, title, description, content, reading_time)
SELECT 
  s.id,
  'pl',
  '[PL] ' || s.title,  -- Prefix to indicate Polish version (replace with actual translations)
  '[PL] ' || s.description,
  '[PL] ' || s.content,
  s.reading_time
FROM stories s
WHERE NOT EXISTS (
  SELECT 1 FROM story_translation st 
  WHERE st.story_id = s.id AND st.language = 'pl'
);

-- ===========================================
-- VERIFICATION: Check results after migration
-- ===========================================
SELECT 'Results after migration:' as info;

-- Count stories with English translations
SELECT 'Stories with English translations:' as info, COUNT(*) as count 
FROM stories s 
WHERE EXISTS (
  SELECT 1 FROM story_translation st 
  WHERE st.story_id = s.id AND st.language = 'en'
);

-- Count stories with Polish translations
SELECT 'Stories with Polish translations:' as info, COUNT(*) as count 
FROM stories s 
WHERE EXISTS (
  SELECT 1 FROM story_translation st 
  WHERE st.story_id = s.id AND st.language = 'pl'
);

-- Show final breakdown by category
SELECT 'Final breakdown by category:' as info;
SELECT 
  t.slug as category,
  COUNT(s.id) as total_stories,
  COUNT(CASE WHEN st_en.story_id IS NOT NULL THEN 1 END) as english_translations,
  COUNT(CASE WHEN st_pl.story_id IS NOT NULL THEN 1 END) as polish_translations
FROM stories s
LEFT JOIN story_tags st ON s.id = st.story_id
LEFT JOIN tags t ON st.tag_id = t.id
LEFT JOIN story_translation st_en ON s.id = st_en.story_id AND st_en.language = 'en'
LEFT JOIN story_translation st_pl ON s.id = st_pl.story_id AND st_pl.language = 'pl'
GROUP BY t.slug, t.name
ORDER BY t.slug;

-- Show all stories with their translation status
SELECT 'All stories with translation status:' as info;
SELECT 
  s.slug,
  s.title,
  t.slug as category,
  CASE WHEN st_en.story_id IS NOT NULL THEN '✅' ELSE '❌' END as english,
  CASE WHEN st_pl.story_id IS NOT NULL THEN '✅' ELSE '❌' END as polish
FROM stories s
LEFT JOIN story_tags st ON s.id = st.story_id
LEFT JOIN tags t ON st.tag_id = t.id
LEFT JOIN story_translation st_en ON s.id = st_en.story_id AND st_en.language = 'en'
LEFT JOIN story_translation st_pl ON s.id = st_pl.story_id AND st_pl.language = 'pl'
ORDER BY t.slug, s.slug;
