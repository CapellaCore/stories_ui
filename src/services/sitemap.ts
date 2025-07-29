import { storiesApi, tagsApi } from './supabase';

export interface SitemapUrl {
  url: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: string;
}

const BASE_URL = 'https://bedtime-stories.com';

// Static pages configuration
const STATIC_PAGES: SitemapUrl[] = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/stories', priority: 0.9, changefreq: 'daily' },
  { url: '/stories/all', priority: 0.9, changefreq: 'daily' },
  { url: '/search', priority: 0.7, changefreq: 'weekly' },
  { url: '/about', priority: 0.6, changefreq: 'monthly' },
  { url: '/contact', priority: 0.5, changefreq: 'monthly' },
  { url: '/terms-of-use', priority: 0.3, changefreq: 'yearly' },
  { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' }
];

export class SitemapService {
  static async generateSitemapUrls(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = [...STATIC_PAGES];
    
    try {
      // Add tag pages
      const tags = await tagsApi.getAll();
      tags.forEach(tag => {
        urls.push({
          url: `/stories/${tag.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString()
        });
      });
      
      // Add story pages
      const stories = await storiesApi.getAll();
      stories.forEach(story => {
        urls.push({
          url: `/stories/all/${story.slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: story.updatedAt || story.createdAt || new Date().toISOString()
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
    
    const urlEntries = urls.map(url => {
      const urlElement = `<url>
  <loc>${BASE_URL}${url.url}</loc>
  ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
  ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
  ${url.priority ? `<priority>${url.priority}</priority>` : ''}
</url>`;
      return urlElement;
    }).join('\n');
    
    return `${xmlHeader}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
  }
  
  static async generateFullSitemap(): Promise<string> {
    const urls = await this.generateSitemapUrls();
    return this.generateSitemapXml(urls);
  }
} 