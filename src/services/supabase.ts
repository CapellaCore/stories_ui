import { createClient } from '@supabase/supabase-js';
import {Locale, TagStory} from "../types/interfaces";

// Type definitions
interface Story {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  images: StoryImage[];
  readingTime: number;
  ageGroup: '3-5' | '6-8' | '9-12';
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface StoryImage {
  id: string;
  src: string;
  alt: string;
  position: number;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  storagePath?: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied' | 'archived';
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
}

interface CreateContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to transform story images
const transformStoryImages = (images: any[]): StoryImage[] => {
  return images?.map((img: any) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    position: img.position,
    fileName: img.file_name,
    fileSize: img.file_size,
    mimeType: img.mime_type,
    storagePath: img.storage_path
  })) || [];
};

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
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
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
            images: transformStoryImages(story.story_images),
            readingTime: story.reading_time,
            ageGroup: story.age_group,
            slug: story.slug,
            createdAt: story.created_at,
            updatedAt: story.updated_at
        })) || [];
    },

    async getAllByLanguage(language?: string): Promise<Story[]> {
        let query = supabase
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
        position,
        file_name,
        file_size,
        mime_type,
        storage_path
      ),
      story_translation!inner (
        id,
        language,
        title,
        description,
        content,
        reading_time
      )
    `)
            .order('created_at', { ascending: false });

        // If language is specified, filter translations by language
        if (language) {
            query = query.eq('story_translation.language', language);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching stories:', error);
            throw error;
        }

        // Transform the data to match our Story type
        return data?.map(story => ({
            id: story.id,
            // Use translated fields if available, otherwise fall back to original story fields
            title: story.story_translation?.title || story.title,
            description: story.story_translation?.description || story.description,
            content: story.story_translation?.content || story.content,
            tags: story.story_tags?.map((st: any) => st.tags.name) || [],
            images: transformStoryImages(story.story_images),
            readingTime: story.story_translation?.reading_time || story.reading_time,
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
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
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
      images: transformStoryImages(data.story_images),
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
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
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
      images: transformStoryImages(data.story_images),
      readingTime: data.reading_time,
      ageGroup: data.age_group,
      slug: data.slug,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  },

  // Get stories by tag slug
    async getByTagSlug(tagSlug: string, language?: string): Promise<Story[]> {
        let query = supabase
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
        position,
        file_name,
        file_size,
        mime_type,
        storage_path
      ),
      story_translation!inner (
        id,
        language,
        title,
        description,
        content,
        reading_time
      )
    `)
            .eq('story_tags.tags.slug', tagSlug)
            .order('created_at', { ascending: false });

        // If language is specified, filter translations by language
        if (language) {
            query = query.eq('story_translation.language', language);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching stories by tag:', error);
            throw error;
        }

        // Transform the data to match our Story type
        return data?.map(story => ({
            id: story.id,
            // Use translated fields if available, otherwise fall back to original story fields
            title: story.story_translation?.title || story.title,
            description: story.story_translation?.description || story.description,
            content: story.story_translation?.content || story.content,
            tags: story.story_tags?.map((st: any) => st.tags.name) || [],
            images: transformStoryImages(story.story_images),
            readingTime: story.story_translation?.reading_time || story.reading_time,
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
          position,
          file_name,
          file_size,
          mime_type,
          storage_path
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
      images: transformStoryImages(story.story_images),
      readingTime: story.reading_time,
      ageGroup: story.age_group,
      slug: story.slug,
      createdAt: story.created_at,
      updatedAt: story.updated_at
    })) || [];
  },

    async search(searchQuery: string, language?: string): Promise<Story[]> {
        if (!searchQuery.trim()) {
            return [];
        }
        let query = supabase
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
        position,
        file_name,
        file_size,
        mime_type,
        storage_path
      ),
      story_translation!inner (
        id,
        language,
        title,
        description,
        content,
        reading_time
      )
    `).or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
            .order('created_at', { ascending: false });

        // If language is specified, filter translations by language
        if (language) {
            query = query.eq('story_translation.language', language);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching stories:', error);
            throw error;
        }

        // Transform the data to match our Story type
        return data?.map(story => ({
            id: story.id,
            // Use translated fields if available, otherwise fall back to original story fields
            title: story.story_translation?.title || story.title,
            description: story.story_translation?.description || story.description,
            content: story.story_translation?.content || story.content,
            tags: story.story_tags?.map((st: any) => st.tags.name) || [],
            images: transformStoryImages(story.story_images),
            readingTime: story.story_translation?.reading_time || story.reading_time,
            ageGroup: story.age_group,
            slug: story.slug,
            createdAt: story.created_at,
            updatedAt: story.updated_at
        })) || [];
    },

  // Search stories by query
  // async search(query: string): Promise<Story[]> {
  //   if (!query.trim()) {
  //     return [];
  //   }
  //
  //   const { data, error } = await supabase
  //     .from('stories')
  //     .select(`
  //       *,
  //       story_tags!inner (
  //         tag_id,
  //         tags!inner (
  //           id,
  //           name,
  //           slug,
  //           description,
  //           color
  //         )
  //       ),
  //       story_images (
  //         id,
  //         src,
  //         alt,
  //         position,
  //         file_name,
  //         file_size,
  //         mime_type,
  //         storage_path
  //       )
  //     `)
  //     .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)
  //     .order('created_at', { ascending: false });
  //
  //   if (error) {
  //     console.error('Error searching stories:', error);
  //     throw error;
  //   }
  //
  //   // Transform the data to match our Story type
  //   return data?.map(story => ({
  //     id: story.id,
  //     title: story.title,
  //     description: story.description,
  //     content: story.content,
  //     tags: story.story_tags?.map((st: any) => st.tags.name) || [],
  //     images: transformStoryImages(story.story_images),
  //     readingTime: story.reading_time,
  //     ageGroup: story.age_group,
  //     slug: story.slug,
  //     createdAt: story.created_at,
  //     updatedAt: story.updated_at
  //   })) || [];
  // }
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

    async getAllByLanguage(language?: string): Promise<Tag[]> {
        let query = supabase
            .from('tags')
            .select(`
        id,
        name,
        description,
        slug,
        color,
        tag_translation!inner (
          id,
          name,
          description,
          language
        )
      `);
        if (language) {
            query = query.eq('tag_translation.language', language);
        }
        query.order('name');

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching tag:', error);
            throw error;
        }
        return data?.map(tag => {
            const translation = tag.tag_translation?.[0];
            return {
                id: tag.id,
                slug: tag.slug,
                color: tag.color,
                name: translation?.name || tag.name, // prefer translated version
                description: translation?.description || tag.description
            };
        }) || []
    },

    // Return only tags that have at least one story in the given language
    async getAllActualTags(language?: string): Promise<TagStory[]> {
        let query = supabase
            .from("tags")
            .select(`
      id,
      slug,
      color,
      name,
      description,
      tag_translation!inner (
        name,
        description,
        language
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
    `);

        if (language) {
            query = query
                .eq("tag_translation.language", language)
                .eq("story_tags.stories.story_translation.language", language);
        }

        query.order("name");

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching tags:", error);
            throw error;
        }

        return (
            data?.map((tag: any) => {
                const translation = tag.tag_translation?.[0];
                return {
                    id: tag.id,
                    slug: tag.slug,
                    color: tag.color,
                    name: translation?.name || tag.name,
                    description: translation?.description || tag.description,
                    story_tags: tag.story_tags || [],
                };
            }) || []
        );
    },

  // Get tag by slug
    async getBySlugAndLocale(slug: string, locale?: string): Promise<Tag | null> {
        let query = supabase
            .from('tags')
            .select(`
        id,
        name,
        description,
        slug,
        color,
        tag_translation!inner (
          id,
          name,
          description,
          language
        )
      `)
            .eq('slug', slug);
        if (locale) {
            query = query.eq('tag_translation.language', locale);
        }

        const { data, error } = await query.single();

        if (error) {
            console.error('Error fetching tag:', error);
            throw error;
        }

        if (!data) {
            return null;
        }
        // Transform the data to match the Tag type
        // Use first translation (if any) since tag_translation is an array
        const translation = Array.isArray(data.tag_translation) ? data.tag_translation[0] : data.tag_translation;

        // Transform the data to match the Tag type
        return {
            id: data.id,
            name: translation.name,
            description: translation.description,
            slug: data.slug,
            color: data.color,
        };
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

    return transformStoryImages(data || []);
  }
};

// Contact Requests API
export const contactRequestsApi = {
  // Create a new contact request
  async create(request: CreateContactRequest): Promise<ContactRequest> {
    const { data, error } = await supabase
      .from('contact_requests')
      .insert({
        name: request.name,
        email: request.email,
        subject: request.subject,
        message: request.message
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating contact request:', error);
      throw error;
    }

    return data;
  },

  // Get all contact requests (for admin use)
  async getAll(): Promise<ContactRequest[]> {
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact requests:', error);
      throw error;
    }

    return data || [];
  },

  // Get contact request by ID
  async getById(id: string): Promise<ContactRequest | null> {
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching contact request:', error);
      throw error;
    }

    return data;
  },

  // Update contact request status
  async updateStatus(id: string, status: ContactRequest['status']): Promise<ContactRequest> {
    const { data, error } = await supabase
      .from('contact_requests')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact request status:', error);
      throw error;
    }

    return data;
  }
};

export const localesApi = {
    async getAll(): Promise<Locale[]> {
        const {data, error} = await supabase.from("locales").select("*");
        if (error) throw error;
        return data as Locale[];
    }
}