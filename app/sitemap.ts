import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseDate = new Date('2026-09-01T00:00:00Z');
  
  return [
    {
      url: 'https://vibeclips.shanaka.dev',
      lastModified: baseDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://vibeclips.shanaka.dev/about',
      lastModified: baseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://vibeclips.shanaka.dev/blog',
      lastModified: baseDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  ];
}
