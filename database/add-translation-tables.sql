-- Migration script to add missing translation tables to existing database
-- Run this if you already have the basic tables but need to add translation support

-- 1. Create locales table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS locales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(5) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create story_translation table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS story_translation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  language VARCHAR(5) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  reading_time INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, language)
);

-- 3. Create tag_translation table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS tag_translation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  language VARCHAR(5) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tag_id, language)
);

-- 4. Add missing columns to story_images table (if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'story_images' AND column_name = 'file_name') THEN
        ALTER TABLE story_images ADD COLUMN file_name VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'story_images' AND column_name = 'file_size') THEN
        ALTER TABLE story_images ADD COLUMN file_size INTEGER;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'story_images' AND column_name = 'mime_type') THEN
        ALTER TABLE story_images ADD COLUMN mime_type VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'story_images' AND column_name = 'storage_path') THEN
        ALTER TABLE story_images ADD COLUMN storage_path VARCHAR(500);
    END IF;
END $$;

-- 5. Create essential indexes for translation tables
CREATE INDEX IF NOT EXISTS idx_story_translation_language ON story_translation(language);
CREATE INDEX IF NOT EXISTS idx_story_translation_story_id ON story_translation(story_id);
CREATE INDEX IF NOT EXISTS idx_tag_translation_language ON tag_translation(language);
CREATE INDEX IF NOT EXISTS idx_tag_translation_tag_id ON tag_translation(tag_id);
CREATE INDEX IF NOT EXISTS idx_locales_code ON locales(code);
CREATE INDEX IF NOT EXISTS idx_locales_active ON locales(is_active);

-- 6. Create composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_story_translation_story_language ON story_translation(story_id, language);
CREATE INDEX IF NOT EXISTS idx_tag_translation_tag_language ON tag_translation(tag_id, language);

-- 7. Add triggers for updated_at columns
CREATE TRIGGER IF NOT EXISTS update_story_translation_updated_at 
  BEFORE UPDATE ON story_translation 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_tag_translation_updated_at 
  BEFORE UPDATE ON tag_translation 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_locales_updated_at 
  BEFORE UPDATE ON locales 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Enable RLS on new tables
ALTER TABLE story_translation ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_translation ENABLE ROW LEVEL SECURITY;
ALTER TABLE locales ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for new tables
CREATE POLICY IF NOT EXISTS "Public story translations are viewable by everyone" ON story_translation
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public tag translations are viewable by everyone" ON tag_translation
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public locales are viewable by everyone" ON locales
  FOR SELECT USING (true);

-- 10. Insert default locales (if they don't exist)
INSERT INTO locales (code, name, is_active) VALUES 
  ('en', 'English', true),
  ('pl', 'Polish', true)
ON CONFLICT (code) DO NOTHING;

-- 11. Migrate existing data to translation tables (if needed)
-- This will create English translations for existing stories
INSERT INTO story_translation (story_id, language, title, description, content, reading_time)
SELECT 
  id,
  'en',
  title,
  description,
  content,
  reading_time
FROM stories
WHERE NOT EXISTS (
  SELECT 1 FROM story_translation 
  WHERE story_translation.story_id = stories.id 
  AND story_translation.language = 'en'
);

-- Migrate existing tags to translation table
INSERT INTO tag_translation (tag_id, language, name, description)
SELECT 
  id,
  'en',
  name,
  description
FROM tags
WHERE NOT EXISTS (
  SELECT 1 FROM tag_translation 
  WHERE tag_translation.tag_id = tags.id 
  AND tag_translation.language = 'en'
);

-- 12. Add comments to new tables
COMMENT ON TABLE locales IS 'Поддерживаемые языки приложения';
COMMENT ON TABLE story_translation IS 'Переводы сказок на разные языки';
COMMENT ON TABLE tag_translation IS 'Переводы названий и описаний категорий';

-- 13. Verify the migration
SELECT 'Migration completed successfully!' as status;
SELECT 'Tables created:' as info;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('locales', 'story_translation', 'tag_translation')
ORDER BY table_name;
