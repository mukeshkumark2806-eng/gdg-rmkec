import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url || 'https://gdg-rmkec.dev';
  const currentDate = new Date();

  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/journey', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/events', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/album', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/family', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/join', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/technical-wings', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/credits', changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
