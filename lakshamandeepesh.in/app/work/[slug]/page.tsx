import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { EventLink } from '@/components/analytics/event-link';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/work';

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) return {};

  return createMetadata({
    title: `${study.title} | Work | Lakshmana Deepesh`,
    description: study.summary,
    path: `/work/${study.slug}/`,
    image: study.heroImage,
    type: 'article'
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image alt={study.title} className="h-[44vh] min-h-[330px] w-full object-cover" height={1000} priority src={study.heroImage} width={2200} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101512]/75 via-[#1a211c]/50 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-6xl items-end px-4 pb-10 sm:px-6">
          <div className="max-w-3xl text-paper">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f8d7b9]">Case Study</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-6xl">{study.title}</h1>
            <p className="mt-4 text-base leading-7 text-paper/85 sm:text-lg">{study.summary}</p>
          </div>
        </div>
      </section>

      <Section>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Work', href: '/work/' },
            { label: study.title, href: `/work/${study.slug}/` }
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6 rounded-2xl border border-border bg-white p-6 shadow-editorial sm:p-8">
            <div>
              <p className="text-sm font-semibold text-accent">Impact</p>
              <p className="mt-2 text-2xl font-heading text-ink">{study.headlineResult}</p>
            </div>

            <div>
              <h2 className="font-heading text-3xl text-ink">Challenge</h2>
              <p className="mt-3 leading-8 text-muted">{study.challenge}</p>
            </div>

            <div>
              <h2 className="font-heading text-3xl text-ink">Approach</h2>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-muted">
                {study.approach.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-3xl text-ink">Outcomes</h2>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-muted">
                {study.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-editorial">
              <h3 className="font-heading text-2xl text-ink">Project scope</h3>
              <p className="mt-2 text-sm text-muted">{study.scope}</p>

              <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-accent">Duration</h4>
              <p className="mt-1 text-sm text-muted">{study.duration}</p>

              <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-accent">Tools</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                {study.tools.map((tool) => (
                  <li key={tool}>• {tool}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-tint p-5 shadow-editorial">
              <h3 className="font-heading text-2xl text-ink">Need similar outcomes?</h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                If your team needs help with experimentation velocity, funnel decision systems, or pricing analytics, let’s talk.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <EventLink
                  className="btn-primary"
                  eventName="cta_click"
                  eventParams={{ location: 'work_detail', target: 'contact' }}
                  href="/contact/"
                >
                  Discuss your project
                </EventLink>
                {study.relatedPostSlug ? (
                  <Link className="text-sm font-semibold text-accent hover:text-ink" href={`/blog/${study.relatedPostSlug}/`}>
                    Read related playbook →
                  </Link>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
