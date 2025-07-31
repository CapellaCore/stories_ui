const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Create Supabase client with service role key
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

async function debugStoryImages() {
  try {
    console.log('🔍 Debugging story images for "Супер щенок Макс"...\n');

    // 1. Find the story by title
    console.log('1. Finding the story...');
    const { data: story, error: storyError } = await supabase
      .from('stories')
      .select('*')
      .eq('title', 'Супер щенок Макс')
      .single();

    if (storyError) {
      console.log('❌ Error finding story:', storyError.message);
      return;
    }

    if (!story) {
      console.log('❌ Story not found');
      return;
    }

    console.log(`✅ Found story: ${story.title} (ID: ${story.id})`);

    // 2. Get all images for this story
    console.log('\n2. Fetching story images...');
    const { data: images, error: imagesError } = await supabase
      .from('story_images')
      .select('*')
      .eq('story_id', story.id)
      .order('position');

    if (imagesError) {
      console.log('❌ Error fetching images:', imagesError.message);
      return;
    }

    console.log(`✅ Found ${images?.length || 0} images for the story`);

    if (images && images.length > 0) {
      console.log('\n📸 Story images details:');
      images.forEach((img, index) => {
        console.log(`${index + 1}. ${img.alt || 'No alt text'} (ID: ${img.id})`);
        console.log(`   Position: ${img.position}`);
        console.log(`   Source: ${img.src}`);
        console.log(`   Storage Path: ${img.storage_path || 'N/A'}`);
        console.log(`   File Name: ${img.file_name || 'N/A'}`);
        console.log(`   File Size: ${img.file_size ? (img.file_size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'}`);
        console.log(`   Created: ${img.created_at}`);
        console.log('');
      });

      // 3. Check if first image (position 0) exists
      const firstImage = images.find(img => img.position === 0);
      if (firstImage) {
        console.log('✅ First image (position 0) found:');
        console.log(`   Alt: ${firstImage.alt || 'No alt text'}`);
        console.log(`   Source: ${firstImage.src}`);
        console.log(`   Storage Path: ${firstImage.storage_path || 'N/A'}`);
        
        // 4. Test if the image URL is accessible
        console.log('\n3. Testing image URL accessibility...');
        try {
          const response = await fetch(firstImage.src);
          if (response.ok) {
            console.log('✅ Image URL is accessible');
            console.log(`   Status: ${response.status}`);
            console.log(`   Content-Type: ${response.headers.get('content-type')}`);
          } else {
            console.log('❌ Image URL is not accessible');
            console.log(`   Status: ${response.status}`);
            console.log(`   Status Text: ${response.statusText}`);
          }
        } catch (error) {
          console.log('❌ Error testing image URL:', error.message);
        }
      } else {
        console.log('❌ No first image (position 0) found');
        console.log('Available positions:', images.map(img => img.position).join(', '));
      }
    } else {
      console.log('❌ No images found for this story');
    }

    // 5. Check storage bucket for this story's images
    console.log('\n4. Checking storage bucket for story images...');
    const storyFolder = `stories/${story.id}`;
    const { data: storageFiles, error: storageError } = await supabase.storage
      .from('story-images')
      .list(storyFolder, { limit: 100 });

    if (storageError) {
      console.log('❌ Error listing storage files:', storageError.message);
    } else {
      console.log(`✅ Found ${storageFiles?.length || 0} files in storage for story ${story.id}`);
      
      if (storageFiles && storageFiles.length > 0) {
        console.log('\n📁 Storage files:');
        storageFiles.forEach((file, index) => {
          console.log(`${index + 1}. ${file.name}`);
          console.log(`   Size: ${file.metadata?.size ? (file.metadata.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'}`);
          console.log(`   Created: ${file.created_at}`);
          console.log('');
        });
      }
    }

    // 6. Compare database records with storage files
    console.log('\n5. Comparing database records with storage files...');
    if (images && storageFiles) {
      const dbPaths = images.map(img => img.storage_path).filter(Boolean);
      const storagePaths = storageFiles.map(file => `${storyFolder}/${file.name}`);
      
      console.log(`Database paths: ${dbPaths.length}`);
      console.log(`Storage paths: ${storagePaths.length}`);
      
      const missingInStorage = dbPaths.filter(path => !storagePaths.includes(path));
      const missingInDb = storagePaths.filter(path => !dbPaths.includes(path));
      
      if (missingInStorage.length > 0) {
        console.log('❌ Database records missing in storage:');
        missingInStorage.forEach(path => console.log(`   ${path}`));
      }
      
      if (missingInDb.length > 0) {
        console.log('❌ Storage files missing in database:');
        missingInDb.forEach(path => console.log(`   ${path}`));
      }
      
      if (missingInStorage.length === 0 && missingInDb.length === 0) {
        console.log('✅ Database and storage are in sync');
      }
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugStoryImages(); 