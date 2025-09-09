
import { supabase } from './supabase';

/**
 * SEO-optimized database service for static generation
 * 
 * IMPORTANT: This service ALWAYS prioritizes translation data over base story/tag data.
 * It only returns content that has translations in the requested language.
 * No fallbacks to base story/tag data are used.
 */
export class SEOOptimizedService {
  
  /**
   * Get all stories for a specific language with minimal data for static generation
   * This is optimized for getStaticPaths - only fetches what's needed for URL generation
   */
  async getStoriesForStaticPaths(language: string): Promise<Array<{
    slug: string;
    tags: Array<{ slug: string; name: string }>;
  }>> {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        slug,
        story_tags!inner (
          tags!inner (
            slug,
            name
          )
        ),
        story_translation!inner (
          language
        )
      `)
      .eq('story_translation.language', language);

    if (error) {
      console.error('Error fetching stories for static paths:', error);
      throw error;
    }

    return data?.map(story => ({
      slug: story.slug,
      tags: story.story_tags?.map((st: any) => ({
        slug: st.tags.slug,
        name: st.tags.name
      })) || []
    })) || [];
  }

  /**
   * Get all tags for a specific language with minimal data for static generation
   */
  async getTagsForStaticPaths(language: string): Promise<Array<{ slug: string }>> {
    const { data, error } = await supabase
      .from('tags')
      .select(`
        slug,
        tag_translation!inner (
          language
        )
      `)
      .eq('tag_translation.language', language);

    if (error) {
      console.error('Error fetching tags for static paths:', error);
      throw error;
    }

    return data?.map(tag => ({
      slug: tag.slug
    })) || [];
  }

  /**
   * Get a single story with full data for a specific language
   * Only returns stories that have translations in the requested language
   */
  async getStoryForStaticProps(storySlug: string, language: string): Promise<{
    story: any | null;
    tag: any | null;
  }> {
    // Only get story with translation in the requested language
    const { data: storyData, error: storyError } = await supabase
      .from('stories')
      .select(`
        id,
        slug,
        age_group,
        created_at,
        updated_at,
        story_translation!inner (
          title,
          description,
          content,
          reading_time
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        ),
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        )
      `)
      .eq('slug', storySlug)
      .eq('story_translation.language', language)
      .single();

    if (storyError || !storyData) {
      return { story: null, tag: null };
    }

    // Transform the story data (using ONLY translated content - no fallbacks to base story data)
    // Ensure story_translation is an object, not an array
    const storyTranslation = Array.isArray(storyData.story_translation) ? storyData.story_translation[0] : storyData.story_translation;
    
    const story = {
      id: storyData.id,
      // Always use translated content - no fallbacks to base story data
      title: storyTranslation.title,
      description: storyTranslation.description,
      content: storyTranslation.content,
      readingTime: storyTranslation.reading_time,
      ageGroup: storyData.age_group,
      slug: storyData.slug,
      tags: storyData.story_tags?.map((st: any) => st.tags.name) || [],
      images: storyData.story_images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        position: img.position,
        fileName: img.file_name,
        fileSize: img.file_size,
        mimeType: img.mime_type,
        storagePath: img.storage_path
      })) || [],
      createdAt: storyData.created_at,
      updatedAt: storyData.updated_at
    };

    // Get the first tag (assuming stories have at least one tag)
    const firstTagData = storyData.story_tags?.[0]?.tags;
    const firstTag = Array.isArray(firstTagData) ? firstTagData[0] : firstTagData;
    const tag = firstTag ? {
      id: firstTag.id,
      name: firstTag.name,
      slug: firstTag.slug,
      description: firstTag.description,
      color: firstTag.color
    } : null;

    return { story, tag };
  }

  /**
   * Get stories for a specific tag and language
   * Only returns tags and stories that have translations in the requested language
   */
  async getStoriesByTagForStaticProps(tagSlug: string, language: string): Promise<{
    tag: any | null;
    stories: any[];
  }> {
    // Get the tag with translation in the requested language only
    const { data: tagData, error: tagError } = await supabase
      .from('tags')
      .select(`
        id,
        name,
        slug,
        description,
        color,
        tag_translation!inner (
          name,
          description
        )
      `)
      .eq('slug', tagSlug)
      .eq('tag_translation.language', language)
      .single();

    if (tagError || !tagData) {
      return { tag: null, stories: [] };
    }

    const tagTranslation = Array.isArray(tagData.tag_translation) ? tagData.tag_translation[0] : tagData.tag_translation;
    const tag = {
      id: tagData.id,
      // Always use translated content - no fallbacks to base tag data
      name: tagTranslation.name,
      description: tagTranslation.description,
      slug: tagData.slug,
      color: tagData.color
    };

    // Get stories for this tag in the specified language only
    const { data: storiesData, error: storiesError } = await supabase
      .from('stories')
      .select(`
        id,
        slug,
        age_group,
        created_at,
        updated_at,
        story_translation!inner (
          title,
          description,
          content,
          reading_time
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        ),
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        )
      `)
      .eq('story_tags.tags.slug', tagSlug)
      .eq('story_translation.language', language)
      .order('created_at', { ascending: false });

    if (storiesError) {
      return { tag, stories: [] };
    }

    const stories = storiesData?.map(story => {
      const storyTranslation = Array.isArray(story.story_translation) ? story.story_translation[0] : story.story_translation;
      return {
        id: story.id,
        // Always use translated content - no fallbacks to base story data
        title: storyTranslation.title,
        description: storyTranslation.description,
        content: storyTranslation.content,
        readingTime: storyTranslation.reading_time,
        ageGroup: story.age_group,
        slug: story.slug,
        tags: story.story_tags?.map((st: any) => st.tags.name) || [],
        images: story.story_images?.map((img: any) => ({
          id: img.id,
          src: img.src,
          alt: img.alt,
          position: img.position,
          fileName: img.file_name,
          fileSize: img.file_size,
          mimeType: img.mime_type,
          storagePath: img.storage_path
        })) || [],
        createdAt: story.created_at,
        updatedAt: story.updated_at
      };
    }) || [];

    return { tag, stories };
  }

  /**
   * Get all stories for home page with language support
   */
  async getStoriesForHomePage(language: string, limit: number = 25): Promise<{
    stories: any[];
    categories: any[];
  }> {
    // Get stories
    const { data: storiesData, error: storiesError } = await supabase
      .from('stories')
      .select(`
        id,
        slug,
        age_group,
        created_at,
        updated_at,
        story_translation!inner (
          title,
          description,
          content,
          reading_time
        ),
        story_images (
          id,
          src,
          alt,
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
        ),
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        )
      `)
      .eq('story_translation.language', language)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (storiesError) {
      console.error('Error fetching stories for home page:', storiesError);
      throw storiesError;
    }

    const stories = storiesData?.map(story => {
      const storyTranslation = Array.isArray(story.story_translation) ? story.story_translation[0] : story.story_translation;
      return {
        id: story.id,
        // Always use translated content - no fallbacks to base story data
        title: storyTranslation.title,
        description: storyTranslation.description,
        content: storyTranslation.content,
        readingTime: storyTranslation.reading_time,
        ageGroup: story.age_group,
        slug: story.slug,
        tags: story.story_tags?.map((st: any) => st.tags.name) || [],
        images: story.story_images?.map((img: any) => ({
          id: img.id,
          src: img.src,
          alt: img.alt,
          position: img.position,
          fileName: img.file_name,
          fileSize: img.file_size,
          mimeType: img.mime_type,
          storagePath: img.storage_path
        })) || [],
        createdAt: story.created_at,
        updatedAt: story.updated_at
      };
    }) || [];

    // Get categories (tags that have stories in this language)
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('tags')
      .select(`
        id,
        name,
        slug,
        description,
        color,
        tag_translation!inner (
          name,
          description
        ),
        story_tags!inner (
          story_id,
          stories!inner (
            id,
            story_translation!inner (
              language
            )
          )
        )
      `)
      .eq('tag_translation.language', language)
      .eq('story_tags.stories.story_translation.language', language)
      .order('name');

    if (categoriesError) {
      console.error('Error fetching categories for home page:', categoriesError);
      throw categoriesError;
    }

    const categories = categoriesData?.map(tag => {
      const tagTranslation = Array.isArray(tag.tag_translation) ? tag.tag_translation[0] : tag.tag_translation;
      return {
        id: tag.id,
        // Always use translated content - no fallbacks to base tag data
        name: tagTranslation.name,
        description: tagTranslation.description,
        slug: tag.slug,
        color: tag.color
      };
    }) || [];

    return { stories, categories };
  }
}

// Export singleton instance
export const seoOptimizedService = new SEOOptimizedService();
