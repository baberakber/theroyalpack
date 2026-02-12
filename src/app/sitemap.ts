import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xerostopcups.com';

/** All public pathnames (without leading locale). */
const publicPaths = [
  '',
  '/products',
  '/products/paper-cups',
  '/products/cup-printing',
  '/products/cup-sleeves',
  '/products/lids',
  '/products/accessories',
  '/industries',
  '/industries/cafes',
  '/industries/restaurants',
  '/industries/hotels',
  '/industries/events',
  '/industries/corporate',
  '/gallery',
  '/about',
  '/sustainability',
  '/faq',
  '/design-support',
  '/contact',
  '/get-a-quote',
  '/request-sample',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of publicPaths) {
      const pathname = path || '/';
      entries.push({
        url: `${baseUrl}/${locale}${pathname === '/' ? '' : pathname}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : (path.startsWith('/products') || path.startsWith('/gallery') ? 'weekly' : 'monthly'),
        priority: path === '' ? 1 : (path === '/products' || path === '/contact' ? 0.9 : 0.8),
      });
    }
  }

  return entries;
}
