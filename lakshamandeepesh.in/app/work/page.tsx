import { ArrowRight, LockKeyhole, Tags } from 'lucide-react';

import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Container } from '@/components/primitives/container';
import { Section } from '@/components/primitives/section';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { createMetadata } from '@/lib/seo';
import { getAllCaseStudies } from '@/lib/work';

export const metadata = createMetadata({
  title: 'Work | Lakshmana Deepesh',
  description: 'Anonymized case studies across AI workflows, growth analytics, experimentation, and decision systems.',
  path: '/work/'
});

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();
  const categories = Array.from(new Set(caseStudies.map((study) => study.category)));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_75%_20%,rgba(55,168,255,0.18),transparent_34%),linear-gradient(135deg,#07101d,#05070d)]">
        <Container className="py-20 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Selected work</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              Anonymized systems that changed how teams made decisions.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Public-safe case studies across growth funnels, AI workflows, attribution, experimentation, and decision-system design.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span className="rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs font-semibold text-muted" key={category}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work/' }]} />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Card className="flex h-full flex-col" key={study.slug}>
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Case {String(index + 1).padStart(2, '0')}</p>
                <span className="rounded-lg border border-border bg-background/70 px-3 py-1 text-xs font-semibold text-muted">{study.category}</span>
              </div>

              <h2 className="mt-5 font-heading text-2xl font-semibold leading-tight text-ink">{study.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{study.summary}</p>

              <div className="mt-5 rounded-lg border border-border bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Impact</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">{study.headlineResult}</p>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-muted">
                <LockKeyhole className="h-4 w-4 text-accent" />
                {study.confidentialityLabel}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {study.tags.slice(0, 3).map((tag) => (
                  <span className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs text-muted" key={tag}>
                    <Tags className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <ButtonLink className="mt-6 w-fit" href={`/work/${study.slug}/`} variant="secondary">
                View Case Study
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
