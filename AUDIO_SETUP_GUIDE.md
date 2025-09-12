# Audio Functionality Setup Guide

This guide will help you set up audio functionality for your bedtime stories application.

## Prerequisites

1. Supabase project with database and storage enabled
2. Environment variables configured
3. Database schema updated (run `database/add-audio-support.sql`)

## Step 1: Create Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Configure the bucket:
   - **Name**: `story-audio`
   - **Public bucket**: ✅ (checked)
   - **File size limit**: 50MB (or your preferred limit)
   - **Allowed MIME types**: `audio/*`

## Step 2: Configure Storage Policies

Create the following RLS policies for your `story-audio` bucket:

### Public Read Policy
```sql
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'story-audio');
```

### Authenticated Upload Policy (if you have authentication)
```sql
CREATE POLICY "Authenticated users can upload audio" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'story-audio' AND auth.role() = 'authenticated');
```

### Authenticated Delete Policy (if you have authentication)
```sql
CREATE POLICY "Authenticated users can delete audio" ON storage.objects 
FOR DELETE USING (bucket_id = 'story-audio' AND auth.role() = 'authenticated');
```

## Step 3: Update Database Schema

Run the SQL script to add audio support:

```bash
# Connect to your Supabase database and run:
\i database/add-audio-support.sql
```

Or execute the SQL directly in the Supabase SQL editor.

## Step 4: Audio File Organization

Organize your audio files in the following structure:

```
story-audio/ (bucket)
├── stories/
│   ├── {story-id-1}/
│   │   ├── en/
│   │   │   └── audio.mp3
│   │   ├── pl/
│   │   │   └── audio.mp3
│   │   └── ru/
│   │       └── audio.mp3
│   └── {story-id-2}/
│       └── en/
│           └── audio.mp3
```

## Step 5: Audio File Requirements

### Recommended Audio Settings:
- **Format**: MP3 (primary), M4A (iOS optimization), OGG (fallback)
- **Bitrate**: 128kbps (standard), 192kbps (high quality), 96kbps (low bandwidth)
- **Sample Rate**: 44.1kHz
- **Channels**: Mono or Stereo
- **Duration**: 3-15 minutes per story

### File Size Guidelines:
- 5-minute story at 128kbps: ~5MB
- 10-minute story at 128kbps: ~10MB
- Maximum recommended: 25MB per file

## Step 6: Adding Audio to Stories

### Manual Database Entry:
```sql
INSERT INTO story_audio (
  story_id,
  language,
  audio_url,
  file_name,
  file_size,
  duration,
  mime_type,
  storage_path,
  narrator_name
) VALUES (
  'your-story-id',
  'en',
  'https://your-supabase-url/storage/v1/object/public/story-audio/stories/your-story-id/en/audio.mp3',
  'audio.mp3',
  5242880, -- 5MB in bytes
  300, -- 5 minutes in seconds
  'audio/mpeg',
  'stories/your-story-id/en/audio.mp3',
  'Narrator Name'
);
```

## Step 7: Testing the Implementation

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to a story page that has audio
3. Verify the audio player appears
4. Test all audio controls:
   - Play/pause
   - Seek/scrub
   - Volume control
   - Speed adjustment
   - Download functionality

## Step 8: Audio Player Features

The implemented audio player includes:

### Core Features:
- ✅ Play/pause controls
- ✅ Progress bar with seeking
- ✅ Volume control
- ✅ Speed adjustment (0.5x, 0.75x, 1x, 1.25x, 1.5x)
- ✅ Download option
- ✅ Keyboard shortcuts (spacebar)

### UX Enhancements:
- ✅ Auto-pause when switching tabs
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Accessibility support

### SEO Features:
- ✅ Audio structured data (Schema.org AudioObject)
- ✅ Meta tags for audio content
- ✅ Social media sharing support

## Step 9: Multilingual Support

The audio system supports multiple languages:

- **English (en)**: Default language
- **Polish (pl)**: Secondary language
- **Russian (ru)**: Additional language

Each story can have audio files in different languages, and the player will only show for stories that have audio in the current language.

## Step 10: Performance Considerations

### Loading Strategy:
- Audio files are lazy-loaded (not auto-downloaded)
- Preload="metadata" for faster seeking
- CDN optimization through Supabase
- Progressive loading support

### Caching:
- Browser caching for audio files
- Service worker caching for offline playback
- Range request support for seeking

## Troubleshooting

### Common Issues:

1. **Audio not playing**: Check file format and browser compatibility
2. **CORS errors**: Verify Supabase storage policies
3. **File not found**: Check storage path and file organization
4. **Large file sizes**: Consider compression or lower bitrates

### Debug Steps:

1. Check browser console for errors
2. Verify audio file URLs are accessible
3. Test with different audio formats
4. Check Supabase storage permissions

## Security Considerations

1. **Public Access**: Audio files are publicly accessible (appropriate for bedtime stories)
2. **File Validation**: Validate file types and sizes on upload
3. **Unique Filenames**: Generated filenames prevent conflicts
4. **Cleanup**: Deleted audio files are removed from both storage and database

## Next Steps

1. **Audio Management Interface**: Create admin interface for uploading audio
2. **Audio Compression**: Implement server-side audio compression
3. **Analytics**: Track audio engagement metrics
4. **Offline Support**: Enhanced offline audio playback
5. **Background Playback**: PWA background audio support

## Support

If you encounter issues:

1. Check the Supabase documentation
2. Review the browser console for errors
3. Verify your environment variables
4. Test with a simple audio file first

For additional help, refer to the Supabase storage documentation: https://supabase.com/docs/guides/storage
