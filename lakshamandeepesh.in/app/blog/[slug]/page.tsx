import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { AuthorBadge } from '@/components/primitives/author-badge';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { mdxComponents } from '@/components/mdx-components';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/content';
import { absoluteUrl, createArticleSchema, createBaseSchema, createBreadcrumbSchema, createMetadata } from '@/lib/seo';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return createMetadata({
    title: `${post.title} | Lakshmana Deepesh`,
    description: post.excerpt,
    path: `/blog/${post.slug}/`,
    image: post.ogImage,
    type: 'article'
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug);

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]]
      }
    }
  });

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <ReadingProgress slug={post.slug} />

      <JsonLd
        data={[
          ...createBaseSchema(),
          createBreadcrumbSchema([
            { name: 'Home', item: 'https://www.lakshmanadeepesh.in/' },
            { name: 'Blog', item: 'https://www.lakshmanadeepesh.in/blog/' },
            { name: post.title, item: `https://www.lakshmanadeepesh.in/blog/${post.slug}/` }
          ]),
          createArticleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}/`,
            image: post.ogImage,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            authorName: post.author.name,
            authorUrl: absoluteUrl(`/about/`)
          })
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: post.title, href: `/blog/${post.slug}/` }
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_270px]">
        <div>
          <header className="space-y-5 border-b border-border pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{post.topic.replace(/-/g, ' ')}</p>
            <h1 className="font-heading text-4xl leading-tight text-ink sm:text-5xl">{post.title}</h1>
            <p className="text-lg text-muted">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>Published {post.publishedAt}</span>
              <span>·</span>
              <span>Updated {post.updatedAt}</span>
              <span>·</span>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
            <AuthorBadge compact author={post.author} />
          </header>

          <div className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-ink prose-p:text-muted">
            {content}
          </div>

          <RelatedPosts posts={relatedPosts} />
        </div>

        <TableOfContents headings={post.headings} />
      </div>
    </article>
  );
}
