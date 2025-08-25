import { useState, useEffect } from 'react';
import { Tag } from '../types';
import { tagsApi } from '../services/supabase';
import {useTranslation} from "../contexts/TranslationContext";

export const useTags = () => {
  const { language } = useTranslation();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(language);
        const data = await tagsApi.getAllActualTags(language);
        console.log(data);
        setTags(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tags');
        console.error('Error fetching tags:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [language]);

  return { tags, loading, error };
};

export const useTag = (slug: string) => {
  const { language} = useTranslation();
  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await tagsApi.getBySlug(slug, language);
        setTag(data);
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
  }, [slug, language]);

  return { tag, loading, error };
}; 