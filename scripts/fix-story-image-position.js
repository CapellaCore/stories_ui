const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Create Supabase client with service role key
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

async function fixStoryImagePosition() {
  try {
    console.log('🔧 Fixing image position for "Супер щенок Макс"...\n');

    // 1. Find the story
    console.log('1. Finding the story...');
    const { data: story, error: storyError } = await supabase
      .from('stories')
      .select('*')
      .eq('title', 'Супер щенок Макс')
      .single();

    if (storyError || !story) {
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

    console.log(`✅ Found ${images?.length || 0} images`);

    if (!images || images.length === 0) {
      console.log('❌ No images found');
      return;
    }

    // 3. Find the image with the lowest position (should be the first image)
    const firstImage = images.reduce((lowest, current) => 
      current.position < lowest.position ? current : lowest
    );

    console.log(`\n3. First image found:`);
    console.log(`   ID: ${firstImage.id}`);
    console.log(`   Alt: ${firstImage.alt || 'No alt text'}`);
    console.log(`   Current Position: ${firstImage.position}`);
    console.log(`   Should be: 0`);

    // 4. Update the position to 0
    if (firstImage.position !== 0) {
      console.log('\n4. Updating position to 0...');
      
      const { error: updateError } = await supabase
        .from('story_images')
        .update({ position: 0 })
        .eq('id', firstImage.id);

      if (updateError) {
        console.log('❌ Error updating position:', updateError.message);
        return;
      }

      console.log('✅ Position updated successfully!');
    } else {
      console.log('✅ Position is already correct (0)');
    }

    // 5. Verify the fix
    console.log('\n5. Verifying the fix...');
    const { data: updatedImages, error: verifyError } = await supabase
      .from('story_images')
      .select('*')
      .eq('story_id', story.id)
      .order('position');

    if (verifyError) {
      console.log('❌ Error verifying:', verifyError.message);
      return;
    }

    console.log('\n📸 Updated image positions:');
    updatedImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.alt || 'No alt text'} (Position: ${img.position})`);
    });

    const newFirstImage = updatedImages.find(img => img.position === 0);
    if (newFirstImage) {
      console.log('\n✅ Fix successful!');
      console.log(`First image (position 0): ${newFirstImage.alt || 'No alt text'}`);
      console.log(`Source: ${newFirstImage.src}`);
    } else {
      console.log('\n❌ Fix failed - no image with position 0');
    }

  } catch (error) {
    console.error('❌ Fix failed:', error.message);
  }
}

fixStoryImagePosition(); 