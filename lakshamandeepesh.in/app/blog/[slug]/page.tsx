import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { ArrowRight, BookOpen, BriefcaseBusiness, Wrench } from 'lucide-react';

import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { AuthorBadge } from '@/components/primitives/author-badge';
import { ButtonLink } from '@/components/primitives/button';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { NewsletterForm } from '@/components/cta/newsletter-form';
import { mdxComponents } from '@/components/mdx-components';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/content';
import { absoluteUrl, createArticleSchema, createBaseSchema, createBreadcrumbSchema, createMetadata } from '@/lib/seo';
import { getToolBySlug } from '@/lib/tools';
import { getCaseStudyBySlug } from '@/lib/work';

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
  const relatedTool = post.relatedTools[0] ? getToolBySlug(post.relatedTools[0]) : null;
  const relatedCaseStudy = post.relatedCaseStudies[0] ? getCaseStudyBySlug(post.relatedCaseStudies[0]) : null;
  const topicLabel = post.topic.replace(/-/g, ' ');

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

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px]">
        <div>
          <header className="space-y-5 rounded-lg border border-border bg-surface p-6 shadow-editorial sm:p-8">
            <ButtonLink className="w-fit px-3 py-2 text-xs" href={`/topics/${post.topic}/`} variant="secondary">
              {topicLabel}
            </ButtonLink>
            <h1 className="font-heading text-4xl leading-tight text-ink sm:text-5xl">{post.title}</h1>
            <p className="text-lg leading-8 text-muted">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>Published {post.publishedAt}</span>
              <span>·</span>
              <span>Updated {post.updatedAt}</span>
              <span>·</span>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
            <AuthorBadge compact author={post.author} />
          </header>

          <div className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-ink prose-a:text-accent prose-p:text-muted prose-strong:text-ink">
            {content}
          </div>

          <section className="mt-12 grid gap-4 md:grid-cols-2">
            {relatedTool ? (
              <div className="rounded-lg border border-accent/30 bg-accent-soft p-5 shadow-glow">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
                  <Wrench aria-hidden="true" size={15} />
                  Related tool
                </div>
                <h2 className="mt-3 font-heading text-2xl text-ink">{relatedTool.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{relatedTool.description}</p>
                <ButtonLink className="mt-4 w-fit px-4 py-2" href={`/tools/#${relatedTool.slug}`}>
                  {relatedTool.ctaLabel} <ArrowRight aria-hidden="true" size={15} />
                </ButtonLink>
              </div>
            ) : null}

            {relatedCaseStudy ? (
              <div className="rounded-lg border border-border bg-surface p-5 shadow-editorial">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold">
                  <BriefcaseBusiness aria-hidden="true" size={15} />
                  Related case study
                </div>
                <h2 className="mt-3 font-heading text-2xl text-ink">{relatedCaseStudy.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{relatedCaseStudy.summary}</p>
                <ButtonLink className="mt-4 w-fit px-4 py-2" href={`/work/${relatedCaseStudy.slug}/`} variant="secondary">
                  Read case study <ArrowRight aria-hidden="true" size={15} />
                </ButtonLink>
              </div>
            ) : null}
          </section>

          <section className="mt-6 rounded-lg border border-border bg-surface p-6 shadow-editorial sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
              <BookOpen aria-hidden="true" size={15} />
              Next step
            </div>
            <h2 className="mt-3 font-heading text-3xl text-ink">Turn this into a decision system</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
              If this problem is showing up inside your funnel, dashboard, or experimentation process, the next move is a focused diagnostic rather than another generic report.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={post.cta?.href ?? '/contact/'}>
                {post.cta?.label ?? 'Book a strategy call'} <ArrowRight aria-hidden="true" size={15} />
              </ButtonLink>
              <ButtonLink href={`/topics/${post.topic}/`} variant="secondary">
                Explore {topicLabel}
              </ButtonLink>
            </div>
          </section>

          <RelatedPosts posts={relatedPosts} />

          <div className="mt-12">
            <NewsletterForm />
          </div>
        </div>

        <TableOfContents headings={post.headings} />
      </div>
    </article>
  );
}
