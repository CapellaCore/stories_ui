import { storiesApi, tagsApi } from './supabase';
import { seoOptimizedService } from './seo-optimized';

export interface SitemapUrl {
  url: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: string;
}

const BASE_URL = 'https://timetosleep.org';
const SUPPORTED_LOCALES = ['en', 'pl', 'ru'];

// Static pages configuration
const STATIC_PAGES: SitemapUrl[] = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/stories', priority: 0.9, changefreq: 'daily' },
  { url: '/search', priority: 0.7, changefreq: 'weekly' },
  { url: '/about', priority: 0.6, changefreq: 'monthly' },
  { url: '/contact', priority: 0.5, changefreq: 'monthly' },
  { url: '/terms-of-use', priority: 0.3, changefreq: 'yearly' },
  { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' }
];

// Helper function to generate localized URLs
const getLocalizedUrl = (locale: string, path: string): string => {
  if (locale === 'en') {
    return path; // English URLs don't have locale prefix
  }
  return `/${locale}${path}`;
};

export class SitemapService {
  static async generateSitemapUrls(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = [];
    
    try {
      // Add static pages for all languages
      STATIC_PAGES.forEach(page => {
        SUPPORTED_LOCALES.forEach(locale => {
          urls.push({
            url: getLocalizedUrl(locale, page.url),
            changefreq: page.changefreq,
            priority: page.priority,
            lastmod: new Date().toISOString()
          });
        });
      });
      
      // Add tag pages for all languages
      const tags = await seoOptimizedService.getAllActualTagsByLanguage('en'); // Get base tags
      tags.forEach(tag => {
        SUPPORTED_LOCALES.forEach(locale => {
          urls.push({
            url: getLocalizedUrl(locale, `/stories/${tag.slug}`),
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString()
          });
        });
      });
      
      // Add story pages for all languages
      const stories = await seoOptimizedService.getAllStoriesForStaticPaths();
      stories.forEach(story => {
        SUPPORTED_LOCALES.forEach(locale => {
          urls.push({
            url: getLocalizedUrl(locale, `/stories/${story.tagSlug}/${story.storySlug}`),
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: story.updatedAt || story.createdAt || new Date().toISOString()
          });
        });
      });
      
    } catch (error) {
      console.error('Error generating sitemap URLs:', error);
    }
    
    return urls;
  }
  
  static generateSitemapXml(urls: SitemapUrl[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetClose = '</urlset>';

    const urlEntries = urls.map(url =>
      `<url>
            <loc>${BASE_URL}${url.url}</loc>
            ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
            ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
            ${url.priority ? `<priority>${url.priority}</priority>` : ''}
      </url>`
    ).join('\n');
    return `${xmlHeader}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
  }
  
  static async generateFullSitemap(): Promise<string> {
    const urls = await this.generateSitemapUrls();
    return this.generateSitemapXml(urls);
  }
} 