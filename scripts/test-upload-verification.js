const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Create Supabase client with service role key
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

async function testUploadVerification() {
  try {
    console.log('Testing image upload verification...\n');

    // 1. Get current story_images count
    console.log('1. Checking current story_images records...');
    const { data: currentImages, error: countError } = await supabase
      .from('story_images')
      .select('id, story_id, src, alt, position, file_name, file_size, mime_type, storage_path, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (countError) {
      console.log('❌ Error fetching story_images:', countError.message);
      return;
    }

    console.log(`✅ Found ${currentImages?.length || 0} recent story_images records`);
    
    if (currentImages && currentImages.length > 0) {
      console.log('\nRecent story_images records:');
      currentImages.forEach((img, index) => {
        console.log(`${index + 1}. ${img.alt || 'No alt text'} (ID: ${img.id})`);
        console.log(`   Story ID: ${img.story_id}`);
        console.log(`   Position: ${img.position}`);
        console.log(`   File: ${img.file_name || 'N/A'}`);
        console.log(`   Size: ${img.file_size ? (img.file_size / 1024).toFixed(1) + ' KB' : 'N/A'}`);
        console.log(`   Storage Path: ${img.storage_path || 'N/A'}`);
        console.log(`   Created: ${img.created_at}`);
        console.log(`   URL: ${img.src}`);
        console.log('');
      });
    }

    // 2. Check for records with storage_path (migrated images)
    console.log('2. Checking migrated images (with storage_path)...');
    const { data: migratedImages, error: migratedError } = await supabase
      .from('story_images')
      .select('id, story_id, src, alt, position, file_name, file_size, mime_type, storage_path')
      .not('storage_path', 'is', null);

    if (migratedError) {
      console.log('❌ Error fetching migrated images:', migratedError.message);
    } else {
      console.log(`✅ Found ${migratedImages?.length || 0} migrated images`);
    }

    // 3. Check for records without storage_path (unmigrated images)
    console.log('\n3. Checking unmigrated images (without storage_path)...');
    const { data: unmigratedImages, error: unmigratedError } = await supabase
      .from('story_images')
      .select('id, story_id, src, alt, position')
      .is('storage_path', null);

    if (unmigratedError) {
      console.log('❌ Error fetching unmigrated images:', unmigratedError.message);
    } else {
      console.log(`⚠️  Found ${unmigratedImages?.length || 0} unmigrated images`);
      
      if (unmigratedImages && unmigratedImages.length > 0) {
        console.log('\nUnmigrated images (should be cleaned up):');
        unmigratedImages.forEach((img, index) => {
          console.log(`${index + 1}. ${img.alt || 'No alt text'} (ID: ${img.id})`);
        });
      }
    }

    // 4. Check stories with their image counts
    console.log('\n4. Checking stories and their image counts...');
    const { data: stories, error: storiesError } = await supabase
      .from('stories')
      .select(`
        id,
        title,
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          storage_path
        )
      `)
      .order('title');

    if (storiesError) {
      console.log('❌ Error fetching stories:', storiesError.message);
    } else {
      console.log(`✅ Found ${stories?.length || 0} stories`);
      
      if (stories && stories.length > 0) {
        console.log('\nStories and their images:');
        stories.forEach(story => {
          const migratedCount = story.story_images?.filter(img => img.storage_path).length || 0;
          const unmigratedCount = story.story_images?.filter(img => !img.storage_path).length || 0;
          const totalCount = story.story_images?.length || 0;
          
          console.log(`📖 ${story.title}`);
          console.log(`   Total images: ${totalCount}`);
          console.log(`   Migrated: ${migratedCount}`);
          console.log(`   Unmigrated: ${unmigratedCount}`);
          
          if (story.story_images && story.story_images.length > 0) {
            story.story_images.forEach(img => {
              const status = img.storage_path ? '✅' : '❌';
              console.log(`   ${status} ${img.alt || 'No alt'} (pos: ${img.position})`);
            });
          }
          console.log('');
        });
      }
    }

    // 5. Check storage bucket contents
    console.log('5. Checking storage bucket contents...');
    const { data: storageFiles, error: storageError } = await supabase.storage
      .from('story-images')
      .list('', { limit: 100 });

    if (storageError) {
      console.log('❌ Error listing storage files:', storageError.message);
    } else {
      console.log(`✅ Found ${storageFiles?.length || 0} files in storage bucket`);
      
      if (storageFiles && storageFiles.length > 0) {
        // Group by story folder
        const storyFolders = {};
        storageFiles.forEach(file => {
          const pathParts = file.name.split('/');
          if (pathParts.length >= 2) {
            const storyId = pathParts[0];
            if (!storyFolders[storyId]) {
              storyFolders[storyId] = [];
            }
            storyFolders[storyId].push(file.name);
          }
        });

        console.log('\nStorage organization:');
        Object.keys(storyFolders).forEach(storyId => {
          console.log(`📁 ${storyId}: ${storyFolders[storyId].length} files`);
        });
      }
    }

    console.log('\n✅ Upload verification test completed!');
    console.log('\n📋 Summary:');
    console.log('- Check that new uploads create records with storage_path');
    console.log('- Verify that file metadata is properly stored');
    console.log('- Ensure images are organized in story folders');
    console.log('- Clean up any unmigrated records if needed');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testUploadVerification(); 