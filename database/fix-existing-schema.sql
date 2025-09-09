-- Fix existing database schema to match application expectations
-- Run this script to add missing constraints, indexes, and fix table structure

-- 1. Fix locales table structure
-- Add missing columns and constraints
ALTER TABLE public.locales 
ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Set primary key for locales
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'locales_pkey') THEN
        ALTER TABLE public.locales ADD CONSTRAINT locales_pkey PRIMARY KEY (id);
    END IF;
END $$;

-- Add unique constraint for code
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'locales_code_unique') THEN
        ALTER TABLE public.locales ADD CONSTRAINT locales_code_unique UNIQUE (code);
    END IF;
END $$;

-- 2. Fix story_translation table
-- Add unique constraint to prevent duplicate translations
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'story_translation_story_language_unique') THEN
        ALTER TABLE public.story_translation 
        ADD CONSTRAINT story_translation_story_language_unique UNIQUE (story_id, language);
    END IF;
END $$;

-- 3. Fix tag_translation table
-- Add missing columns
ALTER TABLE public.tag_translation 
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Fix column name (should be tag_id, not tags_id)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tag_translation' AND column_name = 'tags_id') THEN
        -- Rename the column
        ALTER TABLE public.tag_translation RENAME COLUMN tags_id TO tag_id;
    END IF;
END $$;

-- Add unique constraint to prevent duplicate tag translations
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tag_translation_tag_language_unique') THEN
        ALTER TABLE public.tag_translation 
        ADD CONSTRAINT tag_translation_tag_language_unique UNIQUE (tag_id, language);
    END IF;
END $$;

-- 4. Create essential indexes for performance
-- Story translation indexes
CREATE INDEX IF NOT EXISTS idx_story_translation_language ON public.story_translation(language);
CREATE INDEX IF NOT EXISTS idx_story_translation_story_id ON public.story_translation(story_id);
CREATE INDEX IF NOT EXISTS idx_story_translation_story_language ON public.story_translation(story_id, language);

-- Tag translation indexes
CREATE INDEX IF NOT EXISTS idx_tag_translation_language ON public.tag_translation(language);
CREATE INDEX IF NOT EXISTS idx_tag_translation_tag_id ON public.tag_translation(tag_id);
CREATE INDEX IF NOT EXISTS idx_tag_translation_tag_language ON public.tag_translation(tag_id, language);

-- Locales indexes
CREATE INDEX IF NOT EXISTS idx_locales_code ON public.locales(code);
CREATE INDEX IF NOT EXISTS idx_locales_active ON public.locales(is_active);

-- Story images storage indexes
CREATE INDEX IF NOT EXISTS idx_story_images_storage_path ON public.story_images(storage_path);

-- Contact requests indexes
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON public.contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON public.contact_requests(created_at);

-- 5. Add triggers for updated_at columns
-- Create the function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for tables that have updated_at columns
CREATE TRIGGER IF NOT EXISTS update_story_translation_updated_at 
  BEFORE UPDATE ON public.story_translation 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_tag_translation_updated_at 
  BEFORE UPDATE ON public.tag_translation 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_locales_updated_at 
  BEFORE UPDATE ON public.locales 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Enable Row Level Security (RLS) on translation tables
ALTER TABLE public.story_translation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tag_translation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locales ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for translation tables
CREATE POLICY IF NOT EXISTS "Public story translations are viewable by everyone" 
  ON public.story_translation FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public tag translations are viewable by everyone" 
  ON public.tag_translation FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public locales are viewable by everyone" 
  ON public.locales FOR SELECT USING (true);

-- 8. Insert default locales if they don't exist
INSERT INTO public.locales (code, name, is_active) VALUES 
  ('en', 'English', true),
  ('pl', 'Polish', true)
ON CONFLICT (code) DO NOTHING;

-- 9. Migrate existing data to translation tables (if needed)
-- This will create English translations for existing stories that don't have them
INSERT INTO public.story_translation (story_id, language, title, description, content, reading_time)
SELECT 
  id,
  'en',
  title,
  description,
  content,
  reading_time
FROM public.stories
WHERE NOT EXISTS (
  SELECT 1 FROM public.story_translation 
  WHERE story_translation.story_id = stories.id 
  AND story_translation.language = 'en'
);

-- Migrate existing tags to translation table
INSERT INTO public.tag_translation (tag_id, language, name, description)
SELECT 
  id,
  'en',
  name,
  description
FROM public.tags
WHERE NOT EXISTS (
  SELECT 1 FROM public.tag_translation 
  WHERE tag_translation.tag_id = tags.id 
  AND tag_translation.language = 'en'
);

-- 10. Add comments to tables
COMMENT ON TABLE public.locales IS 'Поддерживаемые языки приложения';
COMMENT ON TABLE public.story_translation IS 'Переводы сказок на разные языки';
COMMENT ON TABLE public.tag_translation IS 'Переводы названий и описаний категорий';

-- 11. Verify the fixes
SELECT 'Schema fixes completed successfully!' as status;

-- Show the updated table structure
SELECT 'Updated table structures:' as info;
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('locales', 'story_translation', 'tag_translation')
ORDER BY table_name, ordinal_position;

-- Show indexes
SELECT 'Created indexes:' as info;
SELECT indexname, tablename, indexdef
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('locales', 'story_translation', 'tag_translation')
ORDER BY tablename, indexname;
