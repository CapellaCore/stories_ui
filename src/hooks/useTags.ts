import { useState, useEffect } from 'react';
import { Tag } from '../types';
import { tagsApi } from '../services/supabase';

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tagsApi.getAll();
        setTags(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tags');
        console.error('Error fetching tags:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};

export const useTag = (slug: string) => {
  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If slug is "all", create a virtual "all" tag
        if (slug === 'all') {
          setTag({
            id: 'all',
            name: 'Wszystkie',
            slug: 'all',
            description: 'Wszystkie dostępne bajki',
            color: '#6366f1'
          });
        } else {
          const data = await tagsApi.getBySlug(slug);
          setTag(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tag');
        console.error('Error fetching tag:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTag();
    }
  }, [slug]);

  return { tag, loading, error };
}; 