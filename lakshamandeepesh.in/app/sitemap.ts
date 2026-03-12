import type { MetadataRoute } from 'next';

import { getAllPosts, getAllTopics } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';
import { getAllCaseStudies } from '@/lib/work';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/blog/', '/about/', '/work/', '/products/', '/contact/'];
  const posts = getAllPosts().map((post) => `/blog/${post.slug}/`);
  const topics = getAllTopics().map((topic) => `/topics/${topic.slug}/`);
  const work = getAllCaseStudies().map((study) => `/work/${study.slug}/`);

  return [...pages, ...posts, ...topics, ...work].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    changeFrequency: route.includes('/blog/') ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/blog/' ? 0.9 : 0.7,
    lastModified: new Date()
  }));
}
