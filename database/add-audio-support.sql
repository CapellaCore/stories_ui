-- Add audio support to bedtime stories application
-- This script adds the story_audio table and related functionality

-- Create table for story audio files
CREATE TABLE story_audio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  language VARCHAR(5) NOT NULL, -- 'en', 'pl', 'ru'
  audio_url VARCHAR(500) NOT NULL,
  file_name VARCHAR(255),
  file_size INTEGER,
  duration INTEGER, -- duration in seconds
  mime_type VARCHAR(100) DEFAULT 'audio/mpeg',
  storage_path VARCHAR(500),
  narrator_name VARCHAR(255), -- optional narrator info
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, language) -- One audio per story per language
);

-- Add indexes for performance
CREATE INDEX idx_story_audio_story_id ON story_audio(story_id);
CREATE INDEX idx_story_audio_language ON story_audio(language);
CREATE INDEX idx_story_audio_storage_path ON story_audio(storage_path);

-- Create trigger for automatic updated_at
CREATE TRIGGER update_story_audio_updated_at 
  BEFORE UPDATE ON story_audio 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE story_audio ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public story audio is viewable by everyone" ON story_audio
  FOR SELECT USING (true);

-- Add comment
COMMENT ON TABLE story_audio IS 'Audio files for stories in different languages';
