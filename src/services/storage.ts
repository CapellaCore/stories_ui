import { supabase } from './supabase';

export interface UploadImageParams {
  file: File;
  storyId: string;
  alt: string;
  position: number;
}

export interface UploadImageResult {
  success: boolean;
  imageData?: {
    id: string;
    src: string;
    alt: string;
    position: number;
    fileName: string;
    fileSize: number;
    mimeType: string;
    storagePath: string;
  };
  error?: string;
}

export const storageService = {
  // Upload image to Supabase storage
  async uploadImage({ file, storyId, alt, position }: UploadImageParams): Promise<UploadImageResult> {
    try {
      // Generate unique filename
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
      
      // Create storage path: stories/{storyId}/{filename}
      const storagePath = `stories/${storyId}/${uniqueFileName}`;
      
      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('story-images') // Your bucket name
        .upload(storagePath, file, {
          cacheControl: 'public, max-age=31536000, immutable',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return {
          success: false,
          error: uploadError.message
        };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('story-images')
        .getPublicUrl(storagePath);

      // Insert image record into database
      const { data: imageData, error: dbError } = await supabase
        .from('story_images')
        .insert({
          story_id: storyId,
          src: urlData.publicUrl,
          alt,
          position,
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          storage_path: storagePath
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error details:', {
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          code: dbError.code
        });
        // Clean up uploaded file if database insert fails
        await supabase.storage
          .from('story-images')
          .remove([storagePath]);
        
        return {
          success: false,
          error: dbError.message
        };
      }

      return {
        success: true,
        imageData: {
          id: imageData.id,
          src: imageData.src,
          alt: imageData.alt,
          position: imageData.position,
          fileName: imageData.file_name,
          fileSize: imageData.file_size,
          mimeType: imageData.mime_type,
          storagePath: imageData.storage_path
        }
      };

    } catch (error) {
      console.error('Storage service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  },

  // Delete image from storage and database
  async deleteImage(imageId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Get image data first
      const { data: imageData, error: fetchError } = await supabase
        .from('story_images')
        .select('storage_path')
        .eq('id', imageId)
        .single();

      if (fetchError) {
        return {
          success: false,
          error: fetchError.message
        };
      }

      // Delete from storage
      if (imageData.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('story-images')
          .remove([imageData.storage_path]);

        if (storageError) {
          console.error('Storage deletion error:', storageError);
          // Continue with database deletion even if storage deletion fails
        }
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('story_images')
        .delete()
        .eq('id', imageId);

      if (dbError) {
        return {
          success: false,
          error: dbError.message
        };
      }

      return { success: true };

    } catch (error) {
      console.error('Delete image error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  },

  // Delete all images for a story
  async deleteStoryImages(storyId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Get all images for the story
      const { data: images, error: fetchError } = await supabase
        .from('story_images')
        .select('storage_path')
        .eq('story_id', storyId);

      if (fetchError) {
        return {
          success: false,
          error: fetchError.message
        };
      }

      // Delete from storage
      if (images && images.length > 0) {
        const storagePaths = images
          .map(img => img.storage_path)
          .filter(path => path) as string[];

        if (storagePaths.length > 0) {
          const { error: storageError } = await supabase.storage
            .from('story-images')
            .remove(storagePaths);

          if (storageError) {
            console.error('Storage deletion error:', storageError);
          }
        }
      }

      // Delete from database (CASCADE should handle this, but explicit deletion is safer)
      const { error: dbError } = await supabase
        .from('story_images')
        .delete()
        .eq('story_id', storyId);

      if (dbError) {
        return {
          success: false,
          error: dbError.message
        };
      }

      return { success: true };

    } catch (error) {
      console.error('Delete story images error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  },

  // Get storage usage for a story
  async getStoryStorageUsage(storyId: string): Promise<{ totalSize: number; imageCount: number }> {
    try {
      const { data: images, error } = await supabase
        .from('story_images')
        .select('file_size')
        .eq('story_id', storyId);

      if (error) {
        console.error('Error fetching storage usage:', error);
        return { totalSize: 0, imageCount: 0 };
      }

      const totalSize = images?.reduce((sum, img) => sum + (img.file_size || 0), 0) || 0;
      const imageCount = images?.length || 0;

      return { totalSize, imageCount };

    } catch (error) {
      console.error('Storage usage error:', error);
      return { totalSize: 0, imageCount: 0 };
    }
  }
}; 