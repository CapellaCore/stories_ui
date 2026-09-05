import type { NextApiRequest, NextApiResponse } from 'next';
import { SitemapService } from '../../src/services/sitemap';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const urls = await SitemapService.generateSitemapUrls();
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ urls });
  } catch (error) {
    console.error('Error generating sitemap JSON:', error);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
}
