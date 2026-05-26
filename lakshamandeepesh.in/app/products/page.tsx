import { ArrowRight, Boxes, FlaskConical, Gauge, Sparkles } from 'lucide-react';

import { WaitlistCTA } from '@/components/cta/waitlist-cta';
import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

const roadmapItems = [
  {
    title: 'Funnel Diagnostic Workspace',
    description: 'A lightweight workspace for diagnosing funnel movement, source quality, and weekly decision priorities.',
    icon: Gauge,
    status: 'First product direction'
  },
  {
    title: 'Experiment QA Console',
    description: 'A practical review layer for hypotheses, tracking plans, guardrails, and post-test decision memos.',
    icon: FlaskConical,
    status: 'Discovery'
  },
  {
    title: 'AI Decision Workflow Kits',
    description: 'Reusable templates for prioritizing and evaluating AI workflows where business teams need leverage.',
    icon: Sparkles,
    status: 'Research'
  }
];

export const metadata = createMetadata({
  title: 'Products | Lakshmana Deepesh',
  description: 'Practical analytics and decision-system product roadmap for growth teams.',
  path: '/products/'
});

export default function ProductsPage() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Product lab</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Practical analytics tools for growth teams.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
              The product layer will turn the site’s decision frameworks into lightweight tools for funnel diagnosis, experiment quality, and AI workflow prioritization.
            </p>
          </div>

          <div className="grid gap-4">
            {roadmapItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card as="article" className="p-5" key={item.title}>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{item.status}</p>
                      <h2 className="mt-2 font-heading text-2xl text-ink">{item.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="rounded-lg border border-border bg-surface/70 p-5">
            <div className="flex items-start gap-3">
              <Boxes className="mt-1 h-5 w-5 text-accent" />
              <div>
                <h2 className="font-heading text-2xl text-ink">Product principles</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Small, useful, privacy-aware tools that help teams diagnose, decide, and document. No black-box magic, no bloated dashboards.
                </p>
              </div>
            </div>
          </div>

          <ButtonLink href="/tools/" variant="secondary">
            Explore free tools
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <WaitlistCTA />
      </div>
    </Section>
  );
}
