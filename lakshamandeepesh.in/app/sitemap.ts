import type { MetadataRoute } from 'next';

import { getAllPosts, getAllTopics } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';
import { getLiveTools } from '@/lib/tools';
import { getAllCaseStudies } from '@/lib/work';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  type SitemapEntry = { route: string; lastModified?: string };

  const pages: SitemapEntry[] = ['/', '/blog/', '/about/', '/work/', '/tools/', '/products/', '/contact/', '/newsletter/'].map((route) => ({ route }));
  const posts: SitemapEntry[] = getAllPosts().map((post) => ({ route: `/blog/${post.slug}/`, lastModified: post.updatedAt }));
  const topics: SitemapEntry[] = getAllTopics().map((topic) => ({ route: `/topics/${topic.slug}/` }));
  const tools: SitemapEntry[] = getLiveTools().map((tool) => ({ route: `/tools/${tool.slug}/` }));
  const work: SitemapEntry[] = getAllCaseStudies().map((study) => ({ route: `/work/${study.slug}/` }));

  return [...pages, ...posts, ...topics, ...tools, ...work].map(({ route, lastModified }) => ({
    url: `${siteConfig.siteUrl}${route}`,
    changeFrequency: route.includes('/blog/') ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/blog/' ? 0.9 : 0.7,
    ...(lastModified ? { lastModified } : {})
  }));
}
