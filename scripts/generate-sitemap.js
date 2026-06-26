import fs from 'fs';
import path from 'path';
import { services } from '../src/data/services.js';
import { projects } from '../src/data/projects.js';
import { rentals, lands, designs, artifacts, materials, buildingPlans, catalogCategories } from '../src/data/catalog.js';
import { defaultWebsiteUrl } from '../src/config/constants.js';

const baseUrl = defaultWebsiteUrl;
const outputDir = 'public';
const outputFile = 'sitemap.xml';

const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/gallery',
  '/contact',
  '/request-quote',
  '/testimonials',
  '/catalog',
  ...catalogCategories.map(cat => cat.path)
];

const dynamicRoutes = [
  ...services.map(s => `/services/${s.id}`),
  ...projects.map(p => `/projects/${p.id}`),
  ...rentals.map(i => `/catalog/rentals/${i.id}`),
  ...lands.map(i => `/catalog/lands/${i.id}`),
  ...designs.map(i => `/catalog/designs/${i.id}`),
  ...artifacts.map(i => `/catalog/artifacts/${i.id}`),
  ...materials.map(i => `/catalog/materials/${i.id}`),
  ...buildingPlans.map(i => `/catalog/building-plans/${i.id}`),
];

const allUrls = [...new Set([...staticRoutes, ...dynamicRoutes])].map(route => `${baseUrl}${route}`);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, outputFile), sitemapXml);
console.log(`Sitemap generated successfully at ${path.join(outputDir, outputFile)}!`);