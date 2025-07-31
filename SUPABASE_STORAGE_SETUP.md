# Supabase Storage Setup Guide

This guide will help you set up Supabase storage for your bedtime stories application with per-story folders.

## Prerequisites

1. Supabase project with database and storage enabled
2. Environment variables configured
3. Database schema updated

## Step 1: Create Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Configure the bucket:
   - **Name**: `story-images`
   - **Public bucket**: ✅ (checked)
   - **File size limit**: 5MB (or your preferred limit)
   - **Allowed MIME types**: `image/*`

## Step 2: Configure Storage Policies

Create the following RLS policies for your `story-images` bucket:

### Public Read Policy
```sql
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'story-images');
```

### Authenticated Upload Policy (if you have authentication)
```sql
CREATE POLICY "Authenticated users can upload images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');
```

### Authenticated Delete Policy (if you have authentication)
```sql
CREATE POLICY "Authenticated users can delete images" ON storage.objects 
FOR DELETE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');
```

## Step 3: Update Database Schema

Run the SQL script to add storage-related columns:

```bash
# Connect to your Supabase database and run:
\i database/update-schema-for-storage.sql
```

Or execute the SQL directly in the Supabase SQL editor:

```sql
-- Update story_images table to better support Supabase storage
ALTER TABLE story_images 
ADD COLUMN IF NOT EXISTS file_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS file_size INTEGER,
ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS storage_path VARCHAR(500);

-- Add index for storage path
CREATE INDEX IF NOT EXISTS idx_story_images_storage_path ON story_images(storage_path);
```

## Step 4: Environment Variables

Add these environment variables to your `.env` file:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Important**: The service role key is only needed for the migration script and should not be exposed in the frontend.

## Step 5: Migrate Existing Images

If you have existing images in the `public/images` folder, run the migration script:

```bash
# Install dependencies if not already installed
npm install

# Run the migration script
node scripts/migrate-images-to-storage.js
```

This script will:
1. Read all existing images from `public/images`
2. Upload them to Supabase storage in per-story folders
3. Update the database with new URLs and metadata
4. Preserve the original file structure

## Step 6: Test the Implementation

1. Start your development server:
   ```bash
   npm start
   ```

2. Navigate to a story page and verify images are loading from Supabase storage

3. Test the image upload functionality (if implemented)

## Folder Structure

After migration, your images will be organized as follows:

```
story-images/ (bucket)
├── stories/
│   ├── {story-id-1}/
│   │   ├── 1703123456789-abc123.jpg
│   │   ├── 1703123456790-def456.png
│   │   └── ...
│   ├── {story-id-2}/
│   │   ├── 1703123456791-ghi789.jpg
│   │   └── ...
│   └── ...
```

## Database Schema Changes

The `story_images` table now includes these additional columns:

- `file_name`: Original filename
- `file_size`: File size in bytes
- `mime_type`: MIME type of the image
- `storage_path`: Path within the storage bucket

## Usage Examples

### Upload a new image:
```typescript
import { storageService } from '../services/storage';

const result = await storageService.uploadImage({
  file: imageFile,
  storyId: 'story-uuid',
  alt: 'Image description',
  position: 100
});
```

### Delete an image:
```typescript
const result = await storageService.deleteImage('image-uuid');
```

### Get storage usage:
```typescript
const usage = await storageService.getStoryStorageUsage('story-uuid');
console.log(`Total size: ${usage.totalSize} bytes, Images: ${usage.imageCount}`);
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your Supabase project allows requests from your domain
2. **Permission Denied**: Check that your storage policies are correctly configured
3. **File Not Found**: Verify the bucket name matches exactly (`story-images`)
4. **Upload Fails**: Check file size limits and MIME type restrictions

### Debug Steps:

1. Check browser console for errors
2. Verify environment variables are loaded correctly
3. Test Supabase connection in the dashboard
4. Check storage bucket permissions

## Security Considerations

1. **Public Access**: Since this is a public-facing application, images are publicly accessible
2. **File Validation**: The upload component validates file types and sizes
3. **Unique Filenames**: Generated filenames prevent conflicts
4. **Cleanup**: Deleted images are removed from both storage and database

## Performance Optimization

1. **CDN**: Supabase storage automatically serves images through a CDN
2. **Caching**: Images are cached with appropriate headers
3. **Compression**: Consider implementing image compression before upload
4. **Lazy Loading**: The `StoryImage` component supports lazy loading

## Next Steps

1. Implement image optimization (resizing, compression)
2. Add image management interface for admins
3. Implement image galleries and carousels
4. Add image alt text editing functionality
5. Consider implementing image backup strategies

## Support

If you encounter issues:

1. Check the Supabase documentation
2. Review the browser console for errors
3. Verify your environment variables
4. Test with a simple image upload first

For additional help, refer to the Supabase storage documentation: https://supabase.com/docs/guides/storage 