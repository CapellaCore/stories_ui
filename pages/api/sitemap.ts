import type { NextApiRequest, NextApiResponse } from 'next';
import { SitemapService } from '../../src/services/sitemap';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const xml = await SitemapService.generateFullSitemap();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
