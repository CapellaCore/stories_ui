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

-- Создание таблицы сказок
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  reading_time INTEGER NOT NULL, -- в минутах
  age_group VARCHAR(10) NOT NULL CHECK (age_group IN ('3-5', '6-8', '9-12')),
  slug VARCHAR(255) NOT NULL UNIQUE, -- для URL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы изображений сказок
CREATE TABLE story_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  src VARCHAR(500) NOT NULL,
  alt VARCHAR(255) NOT NULL,
  position INTEGER NOT NULL, -- позиция в тексте
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание связующей таблицы для тегов и сказок (many-to-many)
CREATE TABLE story_tags (
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (story_id, tag_id)
);

-- Создание индексов для оптимизации
CREATE INDEX idx_stories_slug ON stories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_stories_age_group ON stories(age_group);
CREATE INDEX idx_story_images_story_id ON story_images(story_id);
CREATE INDEX idx_story_images_position ON story_images(position);
CREATE INDEX idx_story_tags_story_id ON story_tags(story_id);
CREATE INDEX idx_story_tags_tag_id ON story_tags(tag_id);

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

-- Включение Row Level Security (RLS)
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_tags ENABLE ROW LEVEL SECURITY;

-- Создание политик для публичного доступа (только чтение)
CREATE POLICY "Public stories are viewable by everyone" ON stories
  FOR SELECT USING (true);

CREATE POLICY "Public tags are viewable by everyone" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Public story images are viewable by everyone" ON story_images
  FOR SELECT USING (true);

CREATE POLICY "Public story tags are viewable by everyone" ON story_tags
  FOR SELECT USING (true); 