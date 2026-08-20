import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

import type { Heading, Post, PostFrontmatter, PostSummary, TopicDefinition } from '@/lib/types';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const topicsDirectory = path.join(process.cwd(), 'content/topics');

const authorSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1)
});

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(20),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: authorSchema,
  topic: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  coverImage: z.string().min(1),
  ogImage: z.string().min(1),
  canonicalUrl: z.string().url(),
  readingTimeMinutes: z.number().int().positive().optional().default(1),
  draft: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  relatedSlugs: z.array(z.string().regex(/^[a-z0-9-]+$/)).optional().default([]),
  relatedTools: z.array(z.string().regex(/^[a-z0-9-]+$/)).optional().default([]),
  relatedCaseStudies: z.array(z.string().regex(/^[a-z0-9-]+$/)).optional().default([]),
  cta: z
    .object({
      label: z.string().min(1),
      href: z.string().min(1)
    })
    .optional()
});

const topicSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().min(20),
  pillarSlug: z.string().regex(/^[a-z0-9-]+$/),
  intentKeywords: z.array(z.string().min(2)).min(3),
  heroImage: z.string().min(1),
  spotlightImage: z.string().min(1),
  supportImage: z.string().min(1)
});

function calculateReadingTime(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);

    if (h2) {
      const text = h2[1].trim();
      headings.push({ id: slugifyHeading(text), level: 2, text });
    }

    if (h3) {
      const text = h3[1].trim();
      headings.push({ id: slugifyHeading(text), level: 3, text });
    }
  }

  return headings;
}

function getPostFilePaths(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => path.join(postsDirectory, file));
}

function getTopicFilePaths(): string[] {
  if (!fs.existsSync(topicsDirectory)) return [];

  return fs
    .readdirSync(topicsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(topicsDirectory, file));
}

function parsePostFile(filePath: string): Post {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const parsed: PostFrontmatter = postSchema.parse(data);

  return {
    ...parsed,
    readingTimeMinutes: parsed.readingTimeMinutes ?? calculateReadingTime(content),
    headings: extractHeadings(content),
    content
  };
}

export function getAllPosts(options?: { includeDrafts?: boolean }): PostSummary[] {
  const includeDrafts = options?.includeDrafts ?? false;

  const posts = getPostFilePaths()
    .map(parsePostFile)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return posts.map(({ content: _content, headings: _headings, ...summary }) => {
    void _content;
    void _headings;
    return summary;
  });
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  return parsePostFile(filePath);
}

export function getPostsByTopic(topic: string): PostSummary[] {
  return getAllPosts().filter((post) => post.topic === topic);
}

export function getRelatedPosts(slug: string): PostSummary[] {
  const posts = getAllPosts();
  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) return [];

  if (currentPost.relatedSlugs.length > 0) {
    return currentPost.relatedSlugs
      .map((relatedSlug) => posts.find((post) => post.slug === relatedSlug))
      .filter((post): post is PostSummary => Boolean(post))
      .slice(0, 3);
  }

  return posts
    .filter((post) => post.slug !== slug && post.topic === currentPost.topic)
    .slice(0, 3);
}

export function getAllTopics(): TopicDefinition[] {
  return getTopicFilePaths()
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(raw);
      return topicSchema.parse(data);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getTopicBySlug(slug: string): TopicDefinition | null {
  const filePath = path.join(topicsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(raw);

  return topicSchema.parse(data);
}

export function assertContentIntegrity(): void {
  const posts = getAllPosts({ includeDrafts: true });
  const slugs = new Set(posts.map((post) => post.slug));

  for (const post of posts) {
    for (const related of post.relatedSlugs) {
      if (!slugs.has(related)) {
        throw new Error(`Post \"${post.slug}\" references missing related slug \"${related}\".`);
      }
    }
  }

  const topics = getAllTopics();
  for (const topic of topics) {
    if (!slugs.has(topic.pillarSlug)) {
      throw new Error(`Topic \"${topic.slug}\" pillar \"${topic.pillarSlug}\" does not exist.`);
    }
  }
}
