import { createClient } from '@supabase/supabase-js';
import { Story, Tag, StoryImage } from '../types';

// Create Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Stories API
export const storiesApi = {
  // Get all stories
  async getAll(): Promise<Story[]> {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }

    // Transform the data to match our Story type
    return data?.map(story => ({
      id: story.id,
      title: story.title,
      description: story.description,
      content: story.content,
      tags: story.story_tags?.map((st: any) => st.tags.name) || [],
      images: story.story_images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        position: img.position
      })) || [],
      readingTime: story.reading_time,
      ageGroup: story.age_group,
      slug: story.slug,
      createdAt: story.created_at,
      updatedAt: story.updated_at
    })) || [];
  },

  // Get story by slug
  async getBySlug(slug: string): Promise<Story | null> {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching story:', error);
      throw error;
    }

    if (!data) return null;

    // Transform the data to match our Story type
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      content: data.content,
      tags: data.story_tags?.map((st: any) => st.tags.name) || [],
      images: data.story_images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        position: img.position
      })) || [],
      readingTime: data.reading_time,
      ageGroup: data.age_group,
      slug: data.slug,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  // Get story by ID (for backward compatibility)
  async getById(id: string): Promise<Story | null> {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching story:', error);
      throw error;
    }

    if (!data) return null;

    // Transform the data to match our Story type
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      content: data.content,
      tags: data.story_tags?.map((st: any) => st.tags.name) || [],
      images: data.story_images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        position: img.position
      })) || [],
      readingTime: data.reading_time,
      ageGroup: data.age_group,
      slug: data.slug,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  // Get stories by tag slug
  async getByTagSlug(tagSlug: string): Promise<Story[]> {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position
        )
      `)
      .eq('story_tags.tags.slug', tagSlug)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories by tag:', error);
      throw error;
    }

    // Transform the data to match our Story type
    return data?.map(story => ({
      id: story.id,
      title: story.title,
      description: story.description,
      content: story.content,
      tags: story.story_tags?.map((st: any) => st.tags.name) || [],
      images: story.story_images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        position: img.position
      })) || [],
      readingTime: story.reading_time,
      ageGroup: story.age_group,
      slug: story.slug,
      createdAt: story.created_at,
      updatedAt: story.updated_at
    })) || [];
  },

  // Get stories by tag name (for backward compatibility)
  async getByTag(tagName: string): Promise<Story[]> {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position
        )
      `)
      .eq('story_tags.tags.name', tagName)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories by tag:', error);
      throw error;
    }

    // Transform the data to match our Story type
    return data?.map(story => ({
      id: story.id,
      title: story.title,
      description: story.description,
      content: story.content,
      tags: story.story_tags?.map((st: any) => st.tags.name) || [],
      images: story.story_images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        position: img.position
      })) || [],
      readingTime: story.reading_time,
      ageGroup: story.age_group,
      slug: story.slug,
      createdAt: story.created_at,
      updatedAt: story.updated_at
    })) || [];
  },

  // Search stories by query
  async search(query: string): Promise<Story[]> {
    if (!query.trim()) {
      return [];
    }

    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        story_tags!inner (
          tag_id,
          tags!inner (
            id,
            name,
            slug,
            description,
            color
          )
        ),
        story_images (
          id,
          src,
          alt,
          position
        )
      `)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching stories:', error);
      throw error;
    }

    // Transform the data to match our Story type
    return data?.map(story => ({
      id: story.id,
      title: story.title,
      description: story.description,
      content: story.content,
      tags: story.story_tags?.map((st: any) => st.tags.name) || [],
      images: story.story_images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        position: img.position
      })) || [],
      readingTime: story.reading_time,
      ageGroup: story.age_group,
      slug: story.slug,
      createdAt: story.created_at,
      updatedAt: story.updated_at
    })) || [];
  }
};

// Tags API
export const tagsApi = {
  // Get all tags
  async getAll(): Promise<Tag[]> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }

    return data || [];
  },

  // Get tag by slug
  async getBySlug(slug: string): Promise<Tag | null> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching tag:', error);
      throw error;
    }

    return data;
  },

  // Get tag by name (for backward compatibility)
  async getByName(name: string): Promise<Tag | null> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      console.error('Error fetching tag:', error);
      throw error;
    }

    return data;
  }
};

// Images API
export const imagesApi = {
  // Get images for a story
  async getByStoryId(storyId: string): Promise<StoryImage[]> {
    const { data, error } = await supabase
      .from('story_images')
      .select('*')
      .eq('story_id', storyId)
      .order('position');

    if (error) {
      console.error('Error fetching story images:', error);
      throw error;
    }

    return data || [];
  }
}; 