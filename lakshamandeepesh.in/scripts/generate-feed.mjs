import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const siteUrl = 'https://www.lakshmanadeepesh.in';
const postsDir = path.join(process.cwd(), 'content/posts');
const publicDir = path.join(process.cwd(), 'public');
const outputPath = path.join(publicDir, 'feed.xml');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const entries = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data } = matter(raw);
    return {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt
    };
  })
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

const updated = new Date().toISOString();

const feed = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n  <title>Lakshmana Deepesh Blog</title>\n  <link href="${siteUrl}/feed.xml" rel="self"/>\n  <link href="${siteUrl}/blog/"/>\n  <updated>${updated}</updated>\n  <id>${siteUrl}/blog/</id>\n${entries
  .map(
    (entry) =>
      `  <entry>\n    <title>${escapeXml(entry.title)}</title>\n    <link href="${siteUrl}/blog/${entry.slug}/"/>\n    <id>${siteUrl}/blog/${entry.slug}/</id>\n    <summary>${escapeXml(entry.excerpt)}</summary>\n    <published>${entry.publishedAt}T00:00:00Z</published>\n    <updated>${entry.updatedAt}T00:00:00Z</updated>\n  </entry>`
  )
  .join('\n')}\n</feed>\n`;

fs.writeFileSync(outputPath, feed, 'utf8');
console.log(`Generated ${outputPath}`);

function escapeXml(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
