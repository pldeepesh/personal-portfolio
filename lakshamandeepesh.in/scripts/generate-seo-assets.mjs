import fs from "fs";
import path from "path";

const siteRoot = path.resolve(process.cwd());
const baseUrl = "https://www.lakshmanadeepesh.in";
const today = new Date().toISOString();

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    if (entry.isFile() && entry.name === "index.html") files.push(full);
  }
  return files;
}

function toUrl(filePath) {
  const rel = path.relative(siteRoot, filePath);
  const urlPath = "/" + rel.replace(/index\.html$/, "").replace(/\\/g, "/");
  return baseUrl + urlPath;
}

const indexFiles = walk(siteRoot);
const urls = indexFiles
  .map(toUrl)
  .filter((u) => !u.includes("/."));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => {
    const priority = u.endsWith("/blog/") ? "0.9" : u === `${baseUrl}/` ? "1.0" : "0.7";
    const changefreq = u.includes("/blog/") ? "weekly" : "monthly";
    return `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join("\n") +
  `\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\nFeed: ${baseUrl}/feed.xml\n`;

const feedItems = urls
  .filter((u) => u.startsWith(`${baseUrl}/blog/`))
  .filter((u) => !u.includes("/blog/category/") && !u.includes("/blog/tag/") && !u.includes("/blog/author/") && !u.includes("/blog/page/"))
  .map((u) => `  <entry>\n    <title>${u.split("/").filter(Boolean).pop()}</title>\n    <link href="${u}"/>\n    <id>${u}</id>\n    <updated>${today}</updated>\n  </entry>`)
  .join("\n");

const feed = `<?xml version="1.0" encoding="utf-8"?>\n` +
  `<feed xmlns="http://www.w3.org/2005/Atom">\n` +
  `  <title>Lakshmana Deepesh Blog</title>\n` +
  `  <link href="${baseUrl}/feed.xml" rel="self"/>\n` +
  `  <link href="${baseUrl}/blog/"/>\n` +
  `  <updated>${today}</updated>\n` +
  `  <id>${baseUrl}/</id>\n` +
  feedItems +
  `\n</feed>\n`;

fs.writeFileSync(path.join(siteRoot, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(siteRoot, "robots.txt"), robots);
fs.writeFileSync(path.join(siteRoot, "feed.xml"), feed);

console.log("Generated sitemap.xml, robots.txt, feed.xml");
