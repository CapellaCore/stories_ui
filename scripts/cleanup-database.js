const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Create Supabase client with service role key
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

async function cleanupDatabase() {
  try {
    console.log('Cleaning up database...\n');

    // 1. Find images that weren't migrated (no storage_path)
    console.log('1. Finding unmigrated images...');
    const { data: unmigratedImages, error: unmigratedError } = await supabase
      .from('story_images')
      .select('id, src, alt, story_id')
      .is('storage_path', null);

    if (unmigratedError) {
      console.log('❌ Error finding unmigrated images:', unmigratedError.message);
      return;
    }

    console.log(`Found ${unmigratedImages?.length || 0} unmigrated images`);

    if (unmigratedImages && unmigratedImages.length > 0) {
      console.log('\nUnmigrated images:');
      unmigratedImages.forEach(img => {
        console.log(`  - ${img.alt || img.src} (ID: ${img.id})`);
      });

      // Ask if user wants to delete unmigrated images
      console.log('\n⚠️  These images reference files that no longer exist.');
      console.log('   They should be deleted to clean up the database.');
      
      // For now, we'll just log them. You can manually delete them if needed
      console.log('\nTo delete these records, run this SQL in Supabase:');
      console.log('DELETE FROM story_images WHERE storage_path IS NULL;');
    }

    // 2. Find duplicate or test records
    console.log('\n2. Finding potential duplicate/test records...');
    const { data: testRecords, error: testError } = await supabase
      .from('story_images')
      .select('id, src, alt, position, story_id')
      .or('position.eq.9999,alt.eq.Test image,src.like.%test%');

    if (testError) {
      console.log('❌ Error finding test records:', testError.message);
    } else {
      console.log(`Found ${testRecords?.length || 0} potential test records`);
      
      if (testRecords && testRecords.length > 0) {
        console.log('\nTest records found:');
        testRecords.forEach(record => {
          console.log(`  - ${record.alt} (Position: ${record.position}, ID: ${record.id})`);
        });
      }
    }

    // 3. Check storage usage
    console.log('\n3. Checking storage usage...');
    const { data: allImages, error: imagesError } = await supabase
      .from('story_images')
      .select('file_size, storage_path')
      .not('storage_path', 'is', null);

    if (imagesError) {
      console.log('❌ Error checking storage usage:', imagesError.message);
    } else {
      const totalSize = allImages?.reduce((sum, img) => sum + (img.file_size || 0), 0) || 0;
      const totalImages = allImages?.length || 0;
      
      console.log(`Total migrated images: ${totalImages}`);
      console.log(`Total storage used: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    }

    // 4. Check for orphaned storage files
    console.log('\n4. Checking for orphaned storage files...');
    const { data: storageFiles, error: storageError } = await supabase.storage
      .from('story-images')
      .list('', { limit: 100 });

    if (storageError) {
      console.log('❌ Error listing storage files:', storageError.message);
    } else {
      console.log(`Total files in storage: ${storageFiles?.length || 0}`);
      
      // Check if all storage files have corresponding database records
      if (storageFiles && storageFiles.length > 0) {
        const storagePaths = storageFiles.map(file => file.name);
        const { data: dbRecords, error: dbError } = await supabase
          .from('story_images')
          .select('storage_path')
          .not('storage_path', 'is', null);

        if (!dbError && dbRecords) {
          const dbPaths = dbRecords.map(record => record.storage_path);
          const orphanedFiles = storagePaths.filter(path => !dbPaths.includes(path));
          
          if (orphanedFiles.length > 0) {
            console.log(`\n⚠️  Found ${orphanedFiles.length} orphaned storage files:`);
            orphanedFiles.forEach(file => console.log(`  - ${file}`));
          } else {
            console.log('✅ All storage files have corresponding database records');
          }
        }
      }
    }

    console.log('\n✅ Database cleanup analysis completed!');
    console.log('\n📋 Summary:');
    console.log('- Check for unmigrated images that need to be deleted');
    console.log('- Review test records if any were found');
    console.log('- Monitor storage usage');
    console.log('- Clean up orphaned storage files if needed');

  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

cleanupDatabase(); 