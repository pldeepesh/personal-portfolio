import { ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Container } from '@/components/primitives/container';
import { Section } from '@/components/primitives/section';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
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
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_76%_20%,rgba(55,168,255,0.18),transparent_34%),linear-gradient(135deg,#07101d,#05070d)]">
        <Container className="py-20 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{study.category} case study</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-ink sm:text-6xl">{study.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">{study.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span className="rounded-lg border border-border bg-surface/70 px-3 py-2 text-xs font-semibold text-muted" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Work', href: '/work/' },
            { label: study.title, href: `/work/${study.slug}/` }
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <Card as="div">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Problem</p>
              <h2 className="mt-3 font-heading text-3xl text-ink">The decision gap</h2>
              <p className="mt-4 leading-8 text-muted">{study.problem}</p>
            </Card>

            <Card as="div">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Approach</p>
              <h2 className="mt-3 font-heading text-3xl text-ink">How the system was designed</h2>
              <div className="mt-5 grid gap-3">
                {study.approach.map((item) => (
                  <div className="flex gap-3 rounded-lg border border-border bg-background/70 p-4" key={item}>
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <p className="text-sm leading-7 text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card as="div">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Impact</p>
              <h2 className="mt-3 font-heading text-3xl text-ink">{study.headlineResult}</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {study.impact.map((item) => (
                  <div className="rounded-lg border border-border bg-background/70 p-4 text-sm leading-7 text-muted" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card as="div">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Outcomes</p>
              <h2 className="mt-3 font-heading text-3xl text-ink">What changed</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                {study.outcomes.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <aside className="space-y-5">
            <Card as="div">
              <h3 className="font-heading text-2xl text-ink">Project context</h3>
              <div className="mt-5 space-y-4 text-sm">
                <Meta label="Scope" value={study.scope} />
                <Meta label="Duration" value={study.duration} />
                <Meta label="Confidentiality" value={study.confidentialityLabel} />
              </div>
              <div className="mt-5 flex items-start gap-2 rounded-lg border border-accent/25 bg-accent-soft/50 p-3 text-sm leading-6 text-muted">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Client and employer details are intentionally generalized.
              </div>
            </Card>

            <Card as="div">
              <h3 className="font-heading text-2xl text-ink">Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.stack.map((item) => (
                  <span className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            <Card as="div">
              <h3 className="font-heading text-2xl text-ink">Related tools</h3>
              <div className="mt-4 space-y-3">
                {study.relatedTools.map((tool) => (
                  <Link className="block rounded-lg border border-border bg-background/70 p-3 text-sm font-semibold text-accent hover:border-accent hover:text-ink" href="/tools/" key={tool}>
                    {tool.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </Card>

            <Card as="div">
              <h3 className="font-heading text-2xl text-ink">Next step</h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                If your team needs a similar decision system, start with a focused diagnostic call.
              </p>
              <ButtonLink className="mt-5 w-full" href="/contact/">
                Discuss your project
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              {study.relatedArticles[0] ? (
                <Link className="mt-4 block text-sm font-semibold text-accent hover:text-ink" href={`/blog/${study.relatedArticles[0]}/`}>
                  Read related article →
                </Link>
              ) : null}
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 font-semibold text-ink">{value}</p>
    </div>
  );
}
