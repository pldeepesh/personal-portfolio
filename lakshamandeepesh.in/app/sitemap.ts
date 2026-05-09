import type { MetadataRoute } from 'next';

import { getAllPosts, getAllTopics } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';
import { getLiveTools } from '@/lib/tools';
import { getAllCaseStudies } from '@/lib/work';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/blog/', '/about/', '/work/', '/products/', '/contact/'];
  const posts = getAllPosts().map((post) => `/blog/${post.slug}/`);
  const topics = getAllTopics().map((topic) => `/topics/${topic.slug}/`);
  const work = getAllCaseStudies().map((study) => `/work/${study.slug}/`);
  const liveTools = getLiveTools().map((tool) => `/products/${tool.slug}/`);

  return [...pages, ...posts, ...topics, ...work, ...liveTools].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    changeFrequency: route.includes('/blog/') ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/blog/' ? 0.9 : 0.7,
    lastModified: new Date()
  }));
}
