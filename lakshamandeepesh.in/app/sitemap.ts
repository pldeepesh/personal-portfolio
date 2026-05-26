import type { MetadataRoute } from 'next';

import { getAllPosts, getAllTopics } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';
import { getAllTools } from '@/lib/tools';
import { getAllCaseStudies } from '@/lib/work';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/blog/', '/about/', '/work/', '/tools/', '/products/', '/contact/', '/newsletter/'];
  const posts = getAllPosts().map((post) => `/blog/${post.slug}/`);
  const topics = getAllTopics().map((topic) => `/topics/${topic.slug}/`);
  const tools = getAllTools().map((tool) => `/tools/${tool.slug}/`);
  const work = getAllCaseStudies().map((study) => `/work/${study.slug}/`);

  return [...pages, ...posts, ...topics, ...tools, ...work].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    changeFrequency: route.includes('/blog/') ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/blog/' ? 0.9 : 0.7,
    lastModified: new Date()
  }));
}
