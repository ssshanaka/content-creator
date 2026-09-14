import { MetadataRoute } from 'next';
import { posts } from './(marketing)/blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseDate = new Date('2026-09-01T00:00:00Z');
  
  const staticRoutes: MetadataRoute.Sitemap = [
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

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://vibeclips.shanaka.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
