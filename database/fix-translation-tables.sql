-- Fix translation tables for proper multi-language support
-- This script adds missing constraints and sample data

-- Add unique constraints to prevent duplicate translations
ALTER TABLE story_translation 
ADD CONSTRAINT unique_story_language UNIQUE (story_id, language);

ALTER TABLE tag_translation 
ADD CONSTRAINT unique_tag_language UNIQUE (tag_id, language);

-- Add missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_story_translation_story_language 
ON story_translation (story_id, language);

CREATE INDEX IF NOT EXISTS idx_tag_translation_tag_language 
ON tag_translation (tag_id, language);

-- Insert sample locales if they don't exist
INSERT INTO locales (code, name, is_active) 
VALUES 
  ('en', 'English', true),
  ('pl', 'Polish', true)
ON CONFLICT (code) DO NOTHING;

-- Sample data migration: Create English translations for existing stories
-- This assumes you have existing stories without translations
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

-- Sample data migration: Create English translations for existing tags
INSERT INTO tag_translation (tag_id, language, name, description)
SELECT 
  t.id,
  'en',
  t.name,
  COALESCE(t.description, '')
FROM tags t
WHERE NOT EXISTS (
  SELECT 1 FROM tag_translation tt 
  WHERE tt.tag_id = t.id AND tt.language = 'en'
);

-- Add some sample Polish translations (you can modify these)
-- Note: You'll need to replace these with actual Polish translations
INSERT INTO story_translation (story_id, language, title, description, content, reading_time)
SELECT 
  s.id,
  'pl',
  '[PL] ' || s.title,  -- Prefix to indicate Polish version
  '[PL] ' || s.description,
  '[PL] ' || s.content,
  s.reading_time
FROM stories s
WHERE NOT EXISTS (
  SELECT 1 FROM story_translation st 
  WHERE st.story_id = s.id AND st.language = 'pl'
)
LIMIT 2; -- Only create 2 Polish translations as examples

INSERT INTO tag_translation (tag_id, language, name, description)
SELECT 
  t.id,
  'pl',
  '[PL] ' || t.name,
  '[PL] ' || COALESCE(t.description, '')
FROM tags t
WHERE NOT EXISTS (
  SELECT 1 FROM tag_translation tt 
  WHERE tt.tag_id = t.id AND tt.language = 'pl'
)
LIMIT 2; -- Only create 2 Polish translations as examples

-- Verify the data
SELECT 'Stories with translations:' as info;
SELECT s.slug, st.language, st.title 
FROM stories s 
JOIN story_translation st ON s.id = st.story_id 
ORDER BY s.slug, st.language;

SELECT 'Tags with translations:' as info;
SELECT t.slug, tt.language, tt.name 
FROM tags t 
JOIN tag_translation tt ON t.id = tt.tag_id 
ORDER BY t.slug, tt.language;
