import Image from 'next/image';
import { notFound } from 'next/navigation';

import { EventLink } from '@/components/analytics/event-link';
import { PostCard } from '@/components/blog/post-card';
import { Section } from '@/components/primitives/section';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllTopics, getPostBySlug, getPostsByTopic, getTopicBySlug } from '@/lib/content';
import { createBaseSchema, createBreadcrumbSchema, createCollectionSchema, createMetadata } from '@/lib/seo';

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams() {
  return getAllTopics().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) return {};

  return createMetadata({
    title: `${topic.title} | Topic Hub | Lakshmana Deepesh`,
    description: topic.description,
    path: `/topics/${topic.slug}/`
  });
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) notFound();

  const posts = getPostsByTopic(topic.slug);
  const pillarPost = getPostBySlug(topic.pillarSlug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image alt={topic.title} className="h-[40vh] min-h-[340px] w-full object-cover" height={900} priority src={topic.heroImage} width={2200} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121a16]/80 via-[#1c2620]/55 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-6xl items-end px-4 pb-10 sm:px-6 sm:pb-12">
          <div className="max-w-2xl text-paper animate-reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f8d7b9]">Topic Hub</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-6xl">{topic.title}</h1>
            <p className="mt-4 text-base leading-7 text-paper/85 sm:text-lg">{topic.description}</p>
          </div>
        </div>
      </section>

      <Section className="pt-12">
        <JsonLd
          data={[
            ...createBaseSchema(),
            createBreadcrumbSchema([
              { name: 'Home', item: 'https://www.lakshmanadeepesh.in/' },
              { name: 'Topics', item: 'https://www.lakshmanadeepesh.in/topics/' },
              { name: topic.title, item: `https://www.lakshmanadeepesh.in/topics/${topic.slug}/` }
            ]),
            createCollectionSchema({
              title: topic.title,
              description: topic.description,
              path: `/topics/${topic.slug}/`
            })
          ]}
        />

        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Topics', href: '/topics/' },
            { label: topic.title, href: `/topics/${topic.slug}/` }
          ]}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-border bg-white p-6 shadow-editorial sm:p-8">
            <h2 className="font-heading text-3xl text-ink">What this cluster covers</h2>
            <p className="mt-3 leading-8 text-muted">
              This hub is designed to rank for core experimentation and growth analytics intents while giving readers a clear path from strategy to execution.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {topic.intentKeywords.map((keyword) => (
                <span className="rounded-full border border-border bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink/80" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-editorial">
            <Image alt={`${topic.title} dashboard and reports`} className="h-56 w-full object-cover" height={520} src={topic.spotlightImage} width={760} />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Cluster signal</p>
              <h3 className="mt-2 font-heading text-2xl text-ink">{posts.length} supporting guides in this hub</h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                Content is organized to capture search intent and guide readers into the right playbook quickly.
              </p>
            </div>
          </article>
        </div>

        {pillarPost ? (
          <article className="mt-8 grid gap-6 overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-editorial md:grid-cols-[1fr_340px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Pillar Guide</p>
              <h2 className="mt-2 font-heading text-3xl leading-tight text-ink sm:text-4xl">{pillarPost.title}</h2>
              <p className="mt-3 max-w-2xl leading-8 text-muted">{pillarPost.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <EventLink
                  className="btn-primary"
                  eventName="cta_click"
                  eventParams={{ location: 'topic_hub', target: pillarPost.slug }}
                  href={`/blog/${pillarPost.slug}/`}
                >
                  Read the pillar guide
                </EventLink>
                <span className="rounded-full border border-border bg-tint px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink/80">
                  {pillarPost.readingTimeMinutes} min read
                </span>
              </div>
            </div>
            <Image alt={pillarPost.title} className="h-full w-full rounded-xl object-cover" height={520} src={topic.supportImage} width={360} />
          </article>
        ) : null}

        <div className="mt-12">
          <h2 className="font-heading text-4xl text-ink">Supporting articles</h2>
          <p className="mt-3 max-w-3xl text-muted">
            Start with the pillar and then use these posts to solve specific acquisition, activation, retention, pricing, and attribution bottlenecks.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
