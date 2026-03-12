import { BlogFilterGrid } from '@/components/blog/blog-filter-grid';
import { FeaturedPost } from '@/components/blog/featured-post';
import { Section } from '@/components/primitives/section';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllPosts } from '@/lib/content';
import { createBaseSchema, createBreadcrumbSchema, createCollectionSchema, createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Blog | Lakshmana Deepesh',
  description:
    'High-signal writing on growth analytics, experimentation, attribution, pricing analysis, and product decision frameworks.',
  path: '/blog/'
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];

  return (
    <Section>
      <JsonLd
        data={[
          ...createBaseSchema(),
          createBreadcrumbSchema([
            { name: 'Home', item: 'https://www.lakshmanadeepesh.in/' },
            { name: 'Blog', item: 'https://www.lakshmanadeepesh.in/blog/' }
          ]),
          createCollectionSchema({
            title: 'Blog',
            description:
              'High-signal writing on growth analytics, experimentation, attribution, pricing analysis, and product decision frameworks.',
            path: '/blog/'
          })
        ]}
      />

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog/' }]} />

      <div className="space-y-12">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Archive</p>
          <h1 className="font-heading text-5xl leading-tight text-ink">Growth Analytics Blog</h1>
          <p className="max-w-3xl text-lg text-muted">
            Practical playbooks and systems thinking for experimentation, measurement quality, and decision velocity.
          </p>
        </div>

        <FeaturedPost post={featured} />

        <BlogFilterGrid posts={posts} />
      </div>
    </Section>
  );
}
