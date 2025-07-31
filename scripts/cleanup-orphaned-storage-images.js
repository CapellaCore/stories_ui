const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Create Supabase client with service role key
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

async function getAllStorageFiles() {
  const allFiles = [];
  
  // Get root level files and folders
  const { data: rootFiles, error: rootError } = await supabase.storage
    .from('story-images')
    .list('', { limit: 1000 });

  if (rootError) {
    console.log('❌ Error listing root files:', rootError.message);
    return allFiles;
  }

  if (rootFiles) {
    for (const file of rootFiles) {
      if (file.name.includes('.')) {
        // This is a file
        allFiles.push({
          path: file.name,
          size: file.metadata?.size || 0,
          type: 'file'
        });
      } else {
        // This is a folder, explore it
        const { data: subFiles, error: subError } = await supabase.storage
          .from('story-images')
          .list(file.name, { limit: 1000 });

        if (subError) {
          console.log(`❌ Error exploring folder ${file.name}:`, subError.message);
          continue;
        }

        if (subFiles) {
          for (const subFile of subFiles) {
            if (subFile.name.includes('.')) {
              // This is a file in subfolder
              allFiles.push({
                path: `${file.name}/${subFile.name}`,
                size: subFile.metadata?.size || 0,
                type: 'file'
              });
            } else {
              // This is a nested folder, explore it too
              const { data: nestedFiles, error: nestedError } = await supabase.storage
                .from('story-images')
                .list(`${file.name}/${subFile.name}`, { limit: 1000 });

              if (nestedError) {
                console.log(`❌ Error exploring nested folder ${file.name}/${subFile.name}:`, nestedError.message);
                continue;
              }

              if (nestedFiles) {
                for (const nestedFile of nestedFiles) {
                  if (nestedFile.name.includes('.')) {
                    allFiles.push({
                      path: `${file.name}/${subFile.name}/${nestedFile.name}`,
                      size: nestedFile.metadata?.size || 0,
                      type: 'file'
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return allFiles;
}

async function cleanupOrphanedStorageImages() {
  try {
    console.log('🔍 Starting orphaned storage images cleanup...\n');

    // 1. Get all storage paths from the database
    console.log('1. Fetching storage paths from story_images table...');
    const { data: dbImages, error: dbError } = await supabase
      .from('story_images')
      .select('storage_path, src, alt, story_id')
      .not('storage_path', 'is', null);

    if (dbError) {
      console.log('❌ Error fetching database images:', dbError.message);
      return;
    }

    console.log(`✅ Found ${dbImages?.length || 0} images in database with storage paths`);

    // Create a set of valid storage paths for quick lookup
    const validStoragePaths = new Set();
    
    if (dbImages) {
      dbImages.forEach(img => {
        if (img.storage_path) {
          validStoragePaths.add(img.storage_path);
        }
      });
    }

    console.log(`📊 Valid storage paths: ${validStoragePaths.size}`);

    // 2. Get all files from storage bucket (including nested)
    console.log('\n2. Fetching all files from storage bucket (including nested directories)...');
    const allStorageFiles = await getAllStorageFiles();

    console.log(`✅ Found ${allStorageFiles.length} files in storage bucket`);

    if (allStorageFiles.length === 0) {
      console.log('📭 Storage bucket is empty, nothing to clean up');
      return;
    }

    // 3. Identify orphaned files
    console.log('\n3. Identifying orphaned files...');
    const orphanedFiles = [];
    const validFiles = [];

    allStorageFiles.forEach(file => {
      if (validStoragePaths.has(file.path)) {
        validFiles.push(file);
        console.log(`✅ Valid: ${file.path} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      } else {
        orphanedFiles.push(file);
        console.log(`❌ Orphaned: ${file.path} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      }
    });

    console.log(`\n📊 Analysis Results:`);
    console.log(`✅ Valid files: ${validFiles.length}`);
    console.log(`❌ Orphaned files: ${orphanedFiles.length}`);

    if (orphanedFiles.length === 0) {
      console.log('\n🎉 No orphaned files found! Storage is clean.');
      return;
    }

    // 4. Calculate storage usage
    console.log('\n4. Storage usage analysis...');
    let totalOrphanedSize = 0;
    let totalValidSize = 0;

    validFiles.forEach(file => {
      totalValidSize += file.size;
    });

    orphanedFiles.forEach(file => {
      totalOrphanedSize += file.size;
    });

    console.log(`📊 Storage usage:`);
    console.log(`✅ Valid files: ${(totalValidSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`❌ Orphaned files: ${(totalOrphanedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Total: ${((totalValidSize + totalOrphanedSize) / 1024 / 1024).toFixed(2)} MB`);

    // 5. Show orphaned files details
    console.log('\n5. Orphaned files details:');
    orphanedFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.path} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    });

    // 6. Create backup and confirmation
    console.log('\n6. Cleanup confirmation:');
    console.log(`⚠️  Found ${orphanedFiles.length} orphaned files to delete`);
    console.log(`💾 Will free up ${(totalOrphanedSize / 1024 / 1024).toFixed(2)} MB of storage`);
    
    // For safety, we'll create a backup file with the orphaned paths
    const backupFile = `orphaned-files-backup-${Date.now()}.json`;
    const backupData = {
      timestamp: new Date().toISOString(),
      orphanedFiles: orphanedFiles.map(f => f.path),
      totalSize: totalOrphanedSize,
      count: orphanedFiles.length,
      validFiles: validFiles.map(f => f.path)
    };

    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    console.log(`📁 Backup created: ${backupFile}`);

    // 7. Generate SQL for manual deletion
    console.log('\n7. Manual deletion SQL:');
    console.log('You can delete orphaned files manually using these commands:');
    
    orphanedFiles.forEach(file => {
      console.log(`-- Delete: ${file.path} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      console.log(`DELETE FROM storage.objects WHERE name = '${file.path}' AND bucket_id = 'story-images';`);
    });

    console.log('\n✅ Orphaned files analysis completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the orphaned files list above');
    console.log('2. Check the backup file for safety');
    console.log('3. Use the SQL commands for manual deletion');
    console.log('4. Or run with --delete flag to perform automatic deletion');

    return { orphanedFiles, totalOrphanedSize };

  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    return null;
  }
}

// Function to actually perform the deletion
async function performDeletion(orphanedFiles) {
  console.log('\n🗑️  Starting deletion of orphaned files...');
  let deletedCount = 0;
  let errorCount = 0;
  let freedSpace = 0;

  for (const file of orphanedFiles) {
    try {
      const { error } = await supabase.storage
        .from('story-images')
        .remove([file.path]);

      if (error) {
        console.log(`❌ Failed to delete ${file.path}:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Deleted: ${file.path} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        deletedCount++;
        freedSpace += file.size;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.log(`❌ Error deleting ${file.path}:`, err.message);
      errorCount++;
    }
  }

  console.log(`\n🎉 Cleanup completed!`);
  console.log(`✅ Deleted: ${deletedCount} files`);
  console.log(`❌ Errors: ${errorCount} files`);
  console.log(`💾 Freed up: ${(freedSpace / 1024 / 1024).toFixed(2)} MB`);
}

// Check if user wants to perform actual deletion
const args = process.argv.slice(2);
const shouldDelete = args.includes('--delete');

if (shouldDelete) {
  console.log('⚠️  DELETION MODE ENABLED - This will actually delete orphaned files!');
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');
  
  setTimeout(async () => {
    const result = await cleanupOrphanedStorageImages();
    if (result && result.orphanedFiles.length > 0) {
      await performDeletion(result.orphanedFiles);
    }
  }, 5000);
} else {
  cleanupOrphanedStorageImages();
} 