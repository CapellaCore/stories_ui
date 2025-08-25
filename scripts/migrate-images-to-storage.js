const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY; // Use service role key for admin operations

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateImagesToStorage() {
  try {
    console.log('Starting image migration to Supabase storage...');

    // 1. Get all stories with their images
    const { data: stories, error: storiesError } = await supabase
      .from('stories')
      .select(`
        id,
        slug,
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        )
      `);

    if (storiesError) {
      console.error('Error fetching stories:', storiesError);
      return;
    }

    console.log(`Found ${stories.length} stories to process`);

    for (const story of stories) {
      console.log(`\nProcessing story: ${story.slug} (${story.id})`);
      
      if (!story.story_images || story.story_images.length === 0) {
        console.log('  No images found for this story');
        continue;
      }

      for (const image of story.story_images) {
        console.log(`  Processing image: ${image.src}`);
        
        // Skip if already migrated (has storage_path)
        if (image.storage_path) {
          console.log('    Already migrated, skipping...');
          continue;
        }

        // Extract filename from src
        const srcPath = image.src;
        const fileName = path.basename(srcPath);
        
        // Check if file exists in public/images
        const publicImagePath = path.join(__dirname, '../public/images', fileName);
        
        if (!fs.existsSync(publicImagePath)) {
          console.log(`    File not found: ${publicImagePath}`);
          continue;
        }

        try {
          // Read file
          const fileBuffer = fs.readFileSync(publicImagePath);
          const fileStats = fs.statSync(publicImagePath);
          
          // Generate unique filename
          const fileExtension = path.extname(fileName);
          const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
          
          // Create storage path
          const storagePath = `stories/${story.id}/${uniqueFileName}`;
          
          // Upload to Supabase storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('story-images')
            .upload(storagePath, fileBuffer, {
              contentType: getMimeType(fileExtension),
              cacheControl: 'public, max-age=31536000, immutable',
              upsert: false
            });

          if (uploadError) {
            console.error(`    Upload error:`, uploadError);
            continue;
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from('story-images')
            .getPublicUrl(storagePath);

          // Update database record
          const { error: updateError } = await supabase
            .from('story_images')
            .update({
              src: urlData.publicUrl,
              file_name: fileName,
              file_size: fileStats.size,
              mime_type: getMimeType(fileExtension),
              storage_path: storagePath
            })
            .eq('id', image.id);

          if (updateError) {
            console.error(`    Database update error:`, updateError);
            // Clean up uploaded file
            await supabase.storage
              .from('story-images')
              .remove([storagePath]);
            continue;
          }

          console.log(`    Successfully migrated: ${fileName} -> ${storagePath}`);

        } catch (error) {
          console.error(`    Error processing ${fileName}:`, error);
        }
      }
    }

    console.log('\nMigration completed!');

  } catch (error) {
    console.error('Migration failed:', error);
  }
}

function getMimeType(extension) {
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  
  return mimeTypes[extension.toLowerCase()] || 'image/jpeg';
}

// Run migration
migrateImagesToStorage(); 