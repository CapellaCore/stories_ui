-- Complete database schema for Time to Sleep bedtime stories application
-- This includes all tables that the application code expects

-- Создание таблицы локалей (языков)
CREATE TABLE locales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(5) NOT NULL UNIQUE, -- 'en', 'pl', etc.
  name VARCHAR(50) NOT NULL, -- 'English', 'Polish', etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы тегов
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE, -- для URL
  description TEXT,
  color VARCHAR(7) NOT NULL, -- hex color code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы переводов тегов
CREATE TABLE tag_translation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  language VARCHAR(5) NOT NULL, -- 'en', 'pl', etc.
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tag_id, language) -- Один перевод на тег на язык
);

-- Создание таблицы сказок
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL, -- Fallback title (обычно английский)
  description TEXT NOT NULL, -- Fallback description
  content TEXT NOT NULL, -- Fallback content
  reading_time INTEGER NOT NULL, -- в минутах
  age_group VARCHAR(10) NOT NULL CHECK (age_group IN ('3-5', '6-8', '9-12')),
  slug VARCHAR(255) NOT NULL UNIQUE, -- для URL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы переводов сказок
CREATE TABLE story_translation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  language VARCHAR(5) NOT NULL, -- 'en', 'pl', etc.
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  reading_time INTEGER NOT NULL, -- в минутах
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, language) -- Один перевод на сказку на язык
);

-- Создание таблицы изображений сказок
CREATE TABLE story_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  src VARCHAR(500) NOT NULL,
  alt VARCHAR(255) NOT NULL,
  position INTEGER NOT NULL, -- позиция в тексте
  file_name VARCHAR(255),
  file_size INTEGER,
  mime_type VARCHAR(100),
  storage_path VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание связующей таблицы для тегов и сказок (many-to-many)
CREATE TABLE story_tags (
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (story_id, tag_id)
);

-- Создание таблицы контактных запросов
CREATE TABLE contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'archived')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов для оптимизации производительности
-- Основные индексы
CREATE INDEX idx_stories_slug ON stories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_stories_age_group ON stories(age_group);
CREATE INDEX idx_story_images_story_id ON story_images(story_id);
CREATE INDEX idx_story_images_position ON story_images(position);
CREATE INDEX idx_story_tags_story_id ON story_tags(story_id);
CREATE INDEX idx_story_tags_tag_id ON story_tags(tag_id);

-- Индексы для переводов
CREATE INDEX idx_story_translation_language ON story_translation(language);
CREATE INDEX idx_story_translation_story_id ON story_translation(story_id);
CREATE INDEX idx_tag_translation_language ON tag_translation(language);
CREATE INDEX idx_tag_translation_tag_id ON tag_translation(tag_id);

-- Индексы для локалей
CREATE INDEX idx_locales_code ON locales(code);
CREATE INDEX idx_locales_active ON locales(is_active);

-- Индексы для изображений (Supabase Storage)
CREATE INDEX idx_story_images_storage_path ON story_images(storage_path);

-- Индексы для контактных запросов
CREATE INDEX idx_contact_requests_status ON contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at);

-- Составные индексы для частых запросов
CREATE INDEX idx_stories_created_at_desc ON stories(created_at DESC);
CREATE INDEX idx_story_translation_story_language ON story_translation(story_id, language);
CREATE INDEX idx_tag_translation_tag_language ON tag_translation(tag_id, language);

-- Создание функции для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Создание триггеров для автоматического обновления updated_at
CREATE TRIGGER update_stories_updated_at 
  BEFORE UPDATE ON stories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at 
  BEFORE UPDATE ON tags 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_story_translation_updated_at 
  BEFORE UPDATE ON story_translation 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tag_translation_updated_at 
  BEFORE UPDATE ON tag_translation 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locales_updated_at 
  BEFORE UPDATE ON locales 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_requests_updated_at 
  BEFORE UPDATE ON contact_requests 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Включение Row Level Security (RLS)
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_translation ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_translation ENABLE ROW LEVEL SECURITY;
ALTER TABLE locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Создание политик для публичного доступа (только чтение)
CREATE POLICY "Public stories are viewable by everyone" ON stories
  FOR SELECT USING (true);

CREATE POLICY "Public tags are viewable by everyone" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Public story images are viewable by everyone" ON story_images
  FOR SELECT USING (true);

CREATE POLICY "Public story tags are viewable by everyone" ON story_tags
  FOR SELECT USING (true);

CREATE POLICY "Public story translations are viewable by everyone" ON story_translation
  FOR SELECT USING (true);

CREATE POLICY "Public tag translations are viewable by everyone" ON tag_translation
  FOR SELECT USING (true);

CREATE POLICY "Public locales are viewable by everyone" ON locales
  FOR SELECT USING (true);

-- Политики для контактных запросов (только вставка для публики)
CREATE POLICY "Anyone can create contact requests" ON contact_requests
  FOR INSERT WITH CHECK (true);

-- Вставка базовых данных
INSERT INTO locales (code, name, is_active) VALUES 
  ('en', 'English', true),
  ('pl', 'Polish', true);

-- Комментарии к таблицам
COMMENT ON TABLE locales IS 'Поддерживаемые языки приложения';
COMMENT ON TABLE tags IS 'Категории сказок';
COMMENT ON TABLE tag_translation IS 'Переводы названий и описаний категорий';
COMMENT ON TABLE stories IS 'Основная таблица сказок (fallback данные)';
COMMENT ON TABLE story_translation IS 'Переводы сказок на разные языки';
COMMENT ON TABLE story_images IS 'Изображения для сказок';
COMMENT ON TABLE story_tags IS 'Связь между сказками и категориями (many-to-many)';
COMMENT ON TABLE contact_requests IS 'Запросы через контактную форму';
