import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');
const requiredFields = [
  'title',
  'slug',
  'excerpt',
  'publishedAt',
  'updatedAt',
  'author',
  'topic',
  'tags',
  'coverImage',
  'ogImage',
  'canonicalUrl',
  'readingTimeMinutes',
  'draft',
  'featured',
  'relatedSlugs'
];

const posts = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => {
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(raw);

    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new Error(`Missing field "${field}" in ${file}`);
      }
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt)) {
      throw new Error(`Invalid publishedAt format in ${file}`);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.updatedAt)) {
      throw new Error(`Invalid updatedAt format in ${file}`);
    }

    if (!Array.isArray(data.relatedSlugs)) {
      throw new Error(`relatedSlugs must be array in ${file}`);
    }

    return data;
  });

const slugSet = new Set(posts.map((post) => post.slug));
for (const post of posts) {
  for (const relatedSlug of post.relatedSlugs) {
    if (!slugSet.has(relatedSlug)) {
      throw new Error(`Post ${post.slug} references missing related slug ${relatedSlug}`);
    }
  }
}

console.log(`Validated ${posts.length} posts successfully.`);
