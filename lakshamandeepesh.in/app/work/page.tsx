import Image from 'next/image';
import Link from 'next/link';

import { EventLink } from '@/components/analytics/event-link';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';
import { getAllCaseStudies } from '@/lib/work';

export const metadata = createMetadata({
  title: 'Work | Lakshmana Deepesh',
  description: 'Detailed case studies across growth analytics, experimentation, and product decision infrastructure.',
  path: '/work/'
});

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          alt="Case studies hero background"
          className="h-[40vh] min-h-[320px] w-full object-cover"
          height={1000}
          priority
          src="/img/stock/work-hero.jpg"
          width={2200}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141915]/80 via-[#1b221d]/55 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-6xl items-end px-4 pb-10 sm:px-6">
          <div className="max-w-2xl text-paper animate-reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f8d7b9]">Case Studies</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-6xl">Work that changed decisions, not just dashboards</h1>
            <p className="mt-4 text-base leading-7 text-paper/85 sm:text-lg">
              Selected projects where experimentation, analytics, and operating cadence were redesigned for measurable business impact.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work/' }]} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <article
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-editorial animate-reveal"
              key={study.slug}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link className="block overflow-hidden" href={`/work/${study.slug}/`}>
                <Image alt={study.title} className="h-48 w-full object-cover transition duration-500 hover:scale-105" height={360} src={study.heroImage} width={640} />
              </Link>

              <div className="space-y-4 p-6">
                <h2 className="font-heading text-2xl text-ink">
                  <Link className="hover:text-accent" href={`/work/${study.slug}/`}>
                    {study.title}
                  </Link>
                </h2>
                <p className="text-sm font-semibold text-accent">{study.headlineResult}</p>
                <p className="text-sm leading-7 text-muted">{study.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-ink/75">
                  <span className="rounded-full border border-border bg-tint px-3 py-1">{study.duration}</span>
                  <span className="rounded-full border border-border bg-tint px-3 py-1">{study.scope}</span>
                </div>
                <EventLink
                  className="inline-flex text-sm font-semibold text-accent hover:text-ink"
                  eventName="cta_click"
                  eventParams={{ location: 'work_index', target: study.slug }}
                  href={`/work/${study.slug}/`}
                >
                  Read full case study →
                </EventLink>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
