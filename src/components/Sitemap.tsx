import React, { useEffect, useState } from 'react';
import { SitemapService } from '../services/sitemap';

interface SitemapProps {
  format?: 'xml' | 'json';
}

const Sitemap: React.FC<SitemapProps> = ({ format = 'xml' }) => {
  const [sitemapContent, setSitemapContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        setLoading(true);
        
        if (format === 'xml') {
          const xmlContent = await SitemapService.generateFullSitemap();
          setSitemapContent(xmlContent);
        } else {
          const urls = await SitemapService.generateSitemapUrls();
          setSitemapContent(JSON.stringify(urls, null, 2));
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate sitemap');
        console.error('Error generating sitemap:', err);
      } finally {
        setLoading(false);
      }
    };

    generateSitemap();
  }, [format]);

  if (loading) {
    return <div>Generating sitemap...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (format === 'xml') {
    // For XML format, we need to render it as preformatted text
    return (
      <pre style={{ 
        whiteSpace: 'pre-wrap', 
        wordWrap: 'break-word',
        fontFamily: 'monospace',
        fontSize: '12px',
        lineHeight: '1.4'
      }}>
        {sitemapContent}
      </pre>
    );
  }

  // For JSON format
  return (
    <pre style={{ 
      whiteSpace: 'pre-wrap', 
      wordWrap: 'break-word',
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: '1.4'
    }}>
      {sitemapContent}
    </pre>
  );
};

export default Sitemap; 