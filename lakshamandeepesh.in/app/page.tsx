import { FeaturedPost } from '@/components/blog/featured-post';
import { PostCard } from '@/components/blog/post-card';
import { TopicClusterRail } from '@/components/blog/topic-cluster-rail';
import { LeadCTA } from '@/components/cta/lead-cta';
import { NewsletterForm } from '@/components/cta/newsletter-form';
import { SaaSTeaserCard } from '@/components/cta/saas-teaser-card';
import { SplitHero } from '@/components/primitives/split-hero';
import { Section } from '@/components/primitives/section';
import { getAllPosts, getAllTopics } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Lakshmana Deepesh | Experimentation and Growth Analytics',
  description:
    'Blog-first website sharing practical frameworks for experimentation, funnel analysis, and growth decision systems.',
  path: '/'
});

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const latest = posts.filter((post) => post.slug !== featured.slug).slice(0, 3);
  const topics = getAllTopics();

  return (
    <>
      <SplitHero
        aside={<TopicClusterRail topics={topics} />}
        description="A modern editorial hub on experimentation systems, growth analytics, and practical execution guides that compound traffic and business outcomes."
        eyebrow="Editorial Analytics Blog"
        title="Build growth systems with better data and better decisions"
      />

      <Section>
        <FeaturedPost post={featured} />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <LeadCTA />
          <NewsletterForm />
        </div>
      </Section>

      <Section className="pt-0">
        <SaaSTeaserCard />
      </Section>
    </>
  );
}
