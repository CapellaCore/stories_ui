import { useState, useEffect } from 'react';
import { Story } from '../types';
import { storiesApi } from '../services/supabase';
import {useTranslation} from "../contexts/TranslationContext";

export const useStories = () => {
  const { language } = useTranslation();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await storiesApi.getAll(language);
        setStories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stories');
        console.error('Error fetching stories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [language]);

  return { stories, loading, error };
};

export const useStory = (slug: string) => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await storiesApi.getBySlug(slug);
        setStory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch story');
        console.error('Error fetching story:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchStory();
    }
  }, [slug]);

  return { story, loading, error };
};

export const useStoriesByTag = (tagSlug: string) => {
  const { language } = useTranslation();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoriesByTag = async () => {
      try {
        setLoading(true);
        setError(null);
        // If tagSlug is "all", fetch all stories
        if (tagSlug === 'all') {
          const data = await storiesApi.getAll(language);
          setStories(data);
        } else {
          const data = await storiesApi.getByTagSlug(tagSlug, language);
          console.log("byTag", data)
          setStories(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stories by tag');
        console.error('Error fetching stories by tag:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tagSlug) {
      fetchStoriesByTag();
    }
  }, [tagSlug, language]);

  return { stories, loading, error };
};

export const useSearch = (query: string) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchStories = async () => {
      if (!query.trim()) {
        setStories([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await storiesApi.search(query);
        setStories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search stories');
        console.error('Error searching stories:', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(searchStories, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { stories, loading, error };
}; 