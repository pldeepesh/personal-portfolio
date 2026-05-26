import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, Mail, PhoneCall, Wrench } from 'lucide-react';

import { PostCard } from '@/components/blog/post-card';
import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Section } from '@/components/primitives/section';
import { FunnelDropDiagnostic } from '@/components/tools/funnel-drop-diagnostic';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/json-ld';
import { getPostBySlug } from '@/lib/content';
import { createBaseSchema, createBreadcrumbSchema, createMetadata, absoluteUrl } from '@/lib/seo';
import { getAllTools, getToolBySlug } from '@/lib/tools';
import { getCaseStudyBySlug } from '@/lib/work';

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) return {};

  return createMetadata({
    title: `${tool.seoTitle} | Lakshmana Deepesh`,
    description: tool.seoDescription,
    path: `/tools/${tool.slug}/`
  });
}

function createToolSchema(tool: NonNullable<ReturnType<typeof getToolBySlug>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.seoDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: absoluteUrl(`/tools/${tool.slug}/`),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const relatedArticles = tool.relatedArticles
    .map((articleSlug) => getPostBySlug(articleSlug))
    .filter((post): post is NonNullable<ReturnType<typeof getPostBySlug>> => Boolean(post));
  const relatedCaseStudies = tool.relatedCaseStudies
    .map((studySlug) => getCaseStudyBySlug(studySlug))
    .filter((study): study is NonNullable<ReturnType<typeof getCaseStudyBySlug>> => Boolean(study));
  const relatedTools = getAllTools().filter((relatedTool) => relatedTool.slug !== tool.slug).slice(0, 3);

  return (
    <Section>
      <JsonLd
        data={[
          ...createBaseSchema(),
          createBreadcrumbSchema([
            { name: 'Home', item: 'https://www.lakshmanadeepesh.in/' },
            { name: 'Tools', item: 'https://www.lakshmanadeepesh.in/tools/' },
            { name: tool.title, item: `https://www.lakshmanadeepesh.in/tools/${tool.slug}/` }
          ]),
          createToolSchema(tool)
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools/' },
          { label: tool.title, href: `/tools/${tool.slug}/` }
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-10">
          <header className="rounded-lg border border-border bg-surface p-6 shadow-editorial sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {tool.status.replace('-', ' ')}
              </span>
              <span className="rounded-lg border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">{tool.category}</span>
              <span className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1 text-xs text-muted">
                <Clock aria-hidden="true" size={14} />
                {tool.estimatedTime}
              </span>
            </div>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">{tool.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{tool.searchIntentCopy}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="#tool-interface">
                {tool.status === 'live' ? 'Use the tool' : 'Preview the tool'} <ArrowRight aria-hidden="true" size={16} />
              </ButtonLink>
              <ButtonLink href="/contact/" variant="secondary">
                <PhoneCall aria-hidden="true" size={16} />
                Book a Strategy Call
              </ButtonLink>
            </div>
          </header>

          <div className="scroll-mt-28" id="tool-interface">
            {tool.slug === 'funnel-drop-diagnostic' ? (
              <FunnelDropDiagnostic />
            ) : (
              <section className="rounded-lg border border-border bg-surface p-6 shadow-editorial sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                  <Wrench aria-hidden="true" size={22} />
                </div>
                <h2 className="mt-5 font-heading text-3xl text-ink">This tool is in the build queue</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  The template is live for SEO and roadmap clarity. The interactive workflow will ship after the Funnel Drop Diagnostic proves the core tool experience.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/newsletter/">
                    <Mail aria-hidden="true" size={16} />
                    Get launch updates
                  </ButtonLink>
                  <ButtonLink href="/contact/" variant="secondary">
                    Discuss this workflow
                  </ButtonLink>
                </div>
              </section>
            )}
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              ['How to use it', 'Start with two comparable time windows, then add stage-level rows to isolate the largest movement.'],
              ['Example output', 'The tool separates estimated revenue pressure from volume loss and conversion-rate loss.'],
              ['Recommended next steps', 'Validate the signal by segment, audit tracking, then run one focused diagnostic experiment.']
            ].map(([title, description]) => (
              <Card as="article" className="p-5" key={title}>
                <h2 className="font-heading text-2xl text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </Card>
            ))}
          </section>

          {relatedArticles.length > 0 ? (
            <section>
              <h2 className="font-heading text-3xl text-ink">Related articles</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {relatedArticles.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-5">
          <Card as="div" className="p-5">
            <h2 className="font-heading text-2xl text-ink">Strategy call</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Use the tool for a first read, then bring the result into a focused diagnostic call if the revenue or conversion movement is material.
            </p>
            <div className="mt-4 grid gap-3">
              <ButtonLink className="w-full px-4 py-2" href="/contact/">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink className="w-full px-4 py-2" href="/newsletter/" variant="secondary">
                Get tool updates
              </ButtonLink>
            </div>
          </Card>

          {relatedCaseStudies.length > 0 ? (
            <Card as="div" className="p-5">
              <h2 className="font-heading text-2xl text-ink">Related case study</h2>
              <div className="mt-4 space-y-4">
                {relatedCaseStudies.map((study) => (
                  <Link className="block rounded-lg border border-border p-3 transition hover:border-accent" href={`/work/${study.slug}/`} key={study.slug}>
                    <p className="text-sm font-semibold text-ink">{study.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{study.summary}</p>
                  </Link>
                ))}
              </div>
            </Card>
          ) : null}

          <Card as="div" className="p-5">
            <h2 className="font-heading text-2xl text-ink">Related tools</h2>
            <div className="mt-4 space-y-3">
              {relatedTools.map((relatedTool) => (
                <Link className="block rounded-lg border border-border p-3 text-sm text-muted transition hover:border-accent hover:text-ink" href={`/tools/${relatedTool.slug}/`} key={relatedTool.slug}>
                  {relatedTool.title}
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </Section>
  );
}
