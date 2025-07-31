-- Update story_images table to better support Supabase storage
ALTER TABLE story_images 
ADD COLUMN IF NOT EXISTS file_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS file_size INTEGER,
ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS storage_path VARCHAR(500);

-- Add index for storage path
CREATE INDEX IF NOT EXISTS idx_story_images_storage_path ON story_images(storage_path);

-- Add comment to explain the new structure
COMMENT ON COLUMN story_images.src IS 'Full URL to the image in Supabase storage';
COMMENT ON COLUMN story_images.storage_path IS 'Path within the storage bucket (e.g., stories/{story_id}/{filename})';
COMMENT ON COLUMN story_images.file_name IS 'Original filename of the uploaded image';
COMMENT ON COLUMN story_images.file_size IS 'File size in bytes';
COMMENT ON COLUMN story_images.mime_type IS 'MIME type of the image file'; 