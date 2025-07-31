const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Create Supabase client with service role key
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

async function deleteUnmigratedImages() {
  try {
    console.log('Deleting unmigrated images...\n');

    // 1. Get unmigrated images
    console.log('1. Finding unmigrated images...');
    const { data: unmigratedImages, error: unmigratedError } = await supabase
      .from('story_images')
      .select('id, src, alt, story_id')
      .is('storage_path', null);

    if (unmigratedError) {
      console.log('❌ Error finding unmigrated images:', unmigratedError.message);
      return;
    }

    if (!unmigratedImages || unmigratedImages.length === 0) {
      console.log('✅ No unmigrated images found');
      return;
    }

    console.log(`Found ${unmigratedImages.length} unmigrated images to delete`);

    // 2. Show what will be deleted
    console.log('\nImages to be deleted:');
    unmigratedImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.alt || img.src} (ID: ${img.id})`);
    });

    // 3. Confirm deletion
    console.log('\n⚠️  WARNING: This will permanently delete these database records.');
    console.log('   The original image files are already missing from the public folder.');
    console.log('   This operation cannot be undone.');
    
    // For safety, we'll just show what would be deleted
    console.log('\n📋 To delete these records, run this SQL in Supabase SQL Editor:');
    console.log('DELETE FROM story_images WHERE storage_path IS NULL;');
    
    console.log('\nOr uncomment the deletion code in this script and run it again.');

    // 4. Uncomment the following code to actually delete the records
    /*
    console.log('\n3. Deleting unmigrated images...');
    const { error: deleteError } = await supabase
      .from('story_images')
      .delete()
      .is('storage_path', null);

    if (deleteError) {
      console.log('❌ Error deleting unmigrated images:', deleteError.message);
      return;
    }

    console.log(`✅ Successfully deleted ${unmigratedImages.length} unmigrated images`);
    */

    console.log('\n✅ Cleanup analysis completed!');

  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

deleteUnmigratedImages(); 