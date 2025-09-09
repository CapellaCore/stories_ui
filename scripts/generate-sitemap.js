const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
require('dotenv').config({ path: '.env.local' });

const BASE_URL = 'https://timetosleep.org';
const SUPPORTED_LOCALES = ['en', 'pl', 'ru'];

// Static pages with their priorities and change frequencies
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/stories', priority: 0.9, changefreq: 'daily' },
  { url: '/search', priority: 0.7, changefreq: 'weekly' },
  { url: '/contact', priority: 0.5, changefreq: 'monthly' },
  { url: '/terms-of-use', priority: 0.3, changefreq: 'yearly' },
  { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' }
];

// Helper function to generate localized URLs
const getLocalizedUrl = (locale, path) => {
  if (locale === 'en') {
    return path; // English URLs don't have locale prefix
  }
  return `/${locale}${path}`;
};

// Simple Supabase client for sitemap generation
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your environment variables.');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// API functions for sitemap generation
const storiesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        id, 
        title, 
        slug, 
        created_at, 
        updated_at,
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
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }

    return data?.map(story => ({
      id: story.id,
      title: story.title,
      slug: story.slug,
      createdAt: story.created_at,
      updatedAt: story.updated_at,
      tags: story.story_tags?.map((st) => st.tags) || []
    })) || [];
  }
};

const tagsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('tags')
      .select('id, name, slug, description, color')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }

    return data || [];
  }
};

async function generateSitemap() {
  try {
    console.log('Starting sitemap generation...');
    
    // Create sitemap stream
    const sitemap = new SitemapStream({ hostname: BASE_URL });
    
    // Add static pages for all languages
    console.log('Adding static pages for all languages...');
    staticPages.forEach(page => {
      SUPPORTED_LOCALES.forEach(locale => {
        sitemap.write({
          url: getLocalizedUrl(locale, page.url),
          changefreq: page.changefreq,
          priority: page.priority,
          lastmod: new Date().toISOString()
        });
      });
    });
    
    // Add tag pages for all languages
    console.log('Fetching and adding tag pages for all languages...');
    let tags = [];
    try {
      tags = await tagsApi.getAll();
      tags.forEach(tag => {
        SUPPORTED_LOCALES.forEach(locale => {
          sitemap.write({
            url: getLocalizedUrl(locale, `/stories/${tag.slug}`),
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString()
          });
        });
      });
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
    
    // Add story pages with their actual tag relationships for all languages
    console.log('Fetching and adding story pages for all languages...');
    let stories = [];
    let storyUrls = new Set(); // To avoid duplicate URLs
    try {
      stories = await storiesApi.getAll();
      stories.forEach(story => {
        // Generate URLs for each tag the story belongs to
        story.tags.forEach(tag => {
          const baseStoryUrl = `/stories/${tag.slug}/${story.slug}`;
          SUPPORTED_LOCALES.forEach(locale => {
            const storyUrl = getLocalizedUrl(locale, baseStoryUrl);
            if (!storyUrls.has(storyUrl)) {
              storyUrls.add(storyUrl);
              sitemap.write({
                url: storyUrl,
                changefreq: 'monthly',
                priority: 0.7,
                lastmod: story.updatedAt || story.createdAt || new Date().toISOString()
              });
            }
          });
        });
      });
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
    
    // End the stream
    sitemap.end();
    
    // Convert to string and write to file
    const sitemapString = await streamToPromise(sitemap);
    
    // Create a more readable XML format
    const xmlContent = sitemapString.toString()
      .replace(/></g, '>\n  <')
      .replace(/<\/url>/g, '\n  </url>')
      .replace(/<\/urlset>/g, '\n</urlset>');
    
    const writeStream = createWriteStream('./public/sitemap.xml');
    writeStream.write(xmlContent);
    writeStream.end();
    
    console.log('Sitemap generated successfully at public/sitemap.xml');
    const totalStaticUrls = staticPages.length * SUPPORTED_LOCALES.length;
    const totalTagUrls = tags.length * SUPPORTED_LOCALES.length;
    const totalStoryUrls = storyUrls.size;
    console.log(`Total URLs: ${totalStaticUrls + totalTagUrls + totalStoryUrls}`);
    console.log(`- Static pages: ${totalStaticUrls} (${staticPages.length} pages × ${SUPPORTED_LOCALES.length} languages)`);
    console.log(`- Tag pages: ${totalTagUrls} (${tags.length} tags × ${SUPPORTED_LOCALES.length} languages)`);
    console.log(`- Story pages: ${totalStoryUrls} (stories × ${SUPPORTED_LOCALES.length} languages)`);
    console.log(`Supported languages: ${SUPPORTED_LOCALES.join(', ')}`);
    console.log(`Available tags: ${tags.map(t => t.name).join(', ')}`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
generateSitemap(); 