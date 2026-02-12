import type { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://samliweisen.dev';

// Static pages
const STATIC_PAGES = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/resume', changefreq: 'monthly', priority: 0.9 },
  { url: '/blogs', changefreq: 'weekly', priority: 0.8 },
  { url: '/knowledges', changefreq: 'monthly', priority: 0.7 },
  { url: '/todos', changefreq: 'daily', priority: 0.6 },
  { url: '/expenses', changefreq: 'daily', priority: 0.6 },
];

function generateSiteMap(dynamicPaths: string[] = []) {
  const staticPages = STATIC_PAGES.map(
    (page) => `
    <url>
      <loc>${SITE_URL}${page.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
  ).join('');

  const dynamicPages = dynamicPaths
    .map(
      (path) => `
    <url>
      <loc>${SITE_URL}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages}
    ${dynamicPages}
  </urlset>`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch dynamic blog posts (optional - if you have an API endpoint)
    // const blogResponse = await fetch(`${process.env.API_URL}/blogs`);
    // const blogs = await blogResponse.json();
    // const blogPaths = blogs.map((blog: any) => `/blogs/${blog._id}`);

    const sitemap = generateSiteMap(/* blogPaths */);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
}
