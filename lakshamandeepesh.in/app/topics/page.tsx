import Image from 'next/image';
import Link from 'next/link';

import { EventLink } from '@/components/analytics/event-link';
import { Section } from '@/components/primitives/section';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllPosts, getAllTopics } from '@/lib/content';
import { createBaseSchema, createBreadcrumbSchema, createCollectionSchema, createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Topics | Lakshmana Deepesh',
  description: 'Topic clusters built for experimentation and growth analytics search intent coverage.',
  path: '/topics/'
});

export default function TopicsPage() {
  const topics = getAllTopics();
  const totalPosts = getAllPosts().length;
  const totalKeywords = topics.reduce((count, topic) => count + topic.intentKeywords.length, 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          alt="Growth analytics strategy planning session"
          className="h-[42vh] min-h-[340px] w-full object-cover"
          height={1000}
          priority
          src="/img/stock/topics-hero.jpg"
          width={2200}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121a16]/80 via-[#1a231d]/55 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-6xl items-end px-4 pb-10 sm:px-6 sm:pb-12">
          <div className="max-w-2xl text-paper animate-reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f8d7b9]">Topic Hubs</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-6xl">Cluster pages built for search intent depth</h1>
            <p className="mt-4 text-base leading-7 text-paper/85 sm:text-lg">
              Each topic hub combines pillar content, supporting posts, and internal links to compound traffic and decision authority.
            </p>
          </div>
        </div>
      </section>

      <Section className="pt-12">
        <JsonLd
          data={[
            ...createBaseSchema(),
            createBreadcrumbSchema([
              { name: 'Home', item: 'https://www.lakshmanadeepesh.in/' },
              { name: 'Topics', item: 'https://www.lakshmanadeepesh.in/topics/' }
            ]),
            createCollectionSchema({
              title: 'Topics',
              description: 'Topic clusters built for experimentation and growth analytics search intent coverage.',
              path: '/topics/'
            })
          ]}
        />

        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Topics', href: '/topics/' }]} />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-border bg-white p-5 shadow-editorial">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Topic hubs</p>
            <p className="mt-2 font-heading text-4xl text-ink">{topics.length}</p>
            <p className="text-sm text-muted">Structured clusters currently live</p>
          </article>
          <article className="rounded-2xl border border-border bg-white p-5 shadow-editorial">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Published posts</p>
            <p className="mt-2 font-heading text-4xl text-ink">{totalPosts}</p>
            <p className="text-sm text-muted">Articles linked into topic architecture</p>
          </article>
          <article className="rounded-2xl border border-border bg-white p-5 shadow-editorial">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Intent keywords</p>
            <p className="mt-2 font-heading text-4xl text-ink">{totalKeywords}</p>
            <p className="text-sm text-muted">Priority queries mapped to content clusters</p>
          </article>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {topics.map((topic) => (
            <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-editorial" key={topic.slug}>
              <Image alt={topic.title} className="h-64 w-full object-cover" height={760} src={topic.heroImage} width={1300} />
              <div className="space-y-4 p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Topic cluster</p>
                <h2 className="font-heading text-3xl text-ink sm:text-4xl">
                  <Link className="hover:text-accent" href={`/topics/${topic.slug}/`}>
                    {topic.title}
                  </Link>
                </h2>
                <p className="max-w-2xl leading-8 text-muted">{topic.description}</p>
                <div className="flex flex-wrap gap-2">
                  {topic.intentKeywords.map((keyword) => (
                    <span className="rounded-full border border-border bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink/80" key={keyword}>
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <EventLink
                    className="btn-primary"
                    eventName="topic_click"
                    eventParams={{ topic: topic.slug, location: 'topics_index' }}
                    href={`/topics/${topic.slug}/`}
                  >
                    Open topic hub
                  </EventLink>
                  <EventLink
                    className="btn-secondary"
                    eventName="cta_click"
                    eventParams={{ location: 'topics_index', target: topic.pillarSlug }}
                    href={`/blog/${topic.pillarSlug}/`}
                  >
                    Read pillar guide
                  </EventLink>
                </div>
              </div>
            </article>
          ))}

          <aside className="space-y-6">
            <article className="rounded-2xl border border-border bg-white p-6 shadow-editorial">
              <h2 className="font-heading text-3xl text-ink">How these clusters are built</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                <li>One pillar post defines the decision framework and operating model.</li>
                <li>Supporting posts attack specific bottlenecks and long-tail intents.</li>
                <li>Each article links back to its hub and to at least two related posts.</li>
                <li>All clusters are updated based on ranking and conversion signals.</li>
              </ul>
            </article>

            <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-editorial">
              <Image
                alt="Keyword and performance review documents"
                className="h-56 w-full object-cover"
                height={420}
                src="/img/stock/topics-roadmap.jpg"
                width={700}
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Workflow</p>
                <h3 className="mt-2 font-heading text-2xl text-ink">From keyword intent to publish cadence</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Topics are prioritized by business relevance, query opportunity, and internal linking potential.
                </p>
              </div>
            </article>
          </aside>
        </div>
      </Section>
    </>
  );
}
