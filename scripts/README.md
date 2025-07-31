# Scripts Documentation

This directory contains utility scripts for database management, data migration, and maintenance.

## Available Scripts

### Database Management
- **`setup-database-v2.js`** - Initial database setup and schema creation
- **`cleanup-database.js`** - Analyze database for cleanup opportunities
- **`delete-unmigrated-images.js`** - Remove unmigrated image records

### Data Migration
- **`migrate-images-to-storage.js`** - Migrate images from public folder to Supabase storage

### SEO & Sitemap
- **`generate-sitemap.js`** - Generate static sitemap.xml file

## Sitemap Generation

This project includes comprehensive sitemap generation functionality for better SEO.

### Available Scripts

1. **`npm run generate-sitemap`** - Generates a static sitemap.xml file in the public directory
2. **`npm run build-with-sitemap`** - Builds the project and generates the sitemap

### Sitemap Features

The sitemap includes:

- **Static Pages**: Home, Stories, Search, About, Contact, Terms, Privacy Policy
- **Dynamic Tag Pages**: All story tag pages (e.g., `/stories/fantasy`)
- **Dynamic Story Pages**: All individual story pages (e.g., `/stories/all/story-slug`)

### Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bedtime-stories.com/</loc>
    <lastmod>2024-01-01T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- More URLs... -->
</urlset>
```

### Priority Levels

- **1.0**: Homepage
- **0.9**: Stories listing pages
- **0.8**: Tag pages
- **0.7**: Individual story pages, Search page
- **0.6**: About page
- **0.5**: Contact page
- **0.3**: Legal pages (Terms, Privacy)

### Change Frequencies

- **daily**: Homepage, Stories pages
- **weekly**: Tag pages, Search page
- **monthly**: Individual stories, About, Contact
- **yearly**: Legal pages

### Dynamic Sitemap Access

The sitemap is also available dynamically at:
- `/sitemap.xml` - XML format
- `/sitemap.json` - JSON format

### Robots.txt

The robots.txt file is configured to:
- Allow crawling of all public content
- Disallow admin and private areas
- Reference the sitemap location
- Set a crawl delay for server respect

### Usage

1. **Generate static sitemap**:
   ```bash
   npm run generate-sitemap
   ```

2. **Build with sitemap**:
   ```bash
   npm run build-with-sitemap
   ```

3. **Access dynamic sitemap**:
   - Visit `/sitemap.xml` in your browser
   - Visit `/sitemap.json` for JSON format

### Configuration

The sitemap configuration can be modified in:
- `scripts/generate-sitemap.js` - Static generation script
- `src/services/sitemap.ts` - Dynamic generation service

### SEO Benefits

- Helps search engines discover all pages
- Provides crawl priority information
- Indicates content update frequency
- Improves search engine indexing 