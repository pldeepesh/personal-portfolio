import { ArrowRight, BarChart3, Wrench } from 'lucide-react';

import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { CtaGroup } from '@/components/primitives/cta-group';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

const plannedTools = [
  {
    title: 'Funnel Drop Diagnostic',
    description: 'A structured diagnostic for finding where acquisition, activation, and retention funnels are losing momentum.',
    status: 'First analytics tool'
  },
  {
    title: 'Experiment QA Checklist',
    description: 'A lightweight review system for catching weak hypotheses, tracking gaps, and decision risks before launch.',
    status: 'Planned'
  },
  {
    title: 'Metric Guardrail Builder',
    description: 'A planning aid for choosing primary, secondary, and guardrail metrics for product and growth experiments.',
    status: 'Planned'
  }
];

export const metadata = createMetadata({
  title: 'Tools | Lakshmana Deepesh',
  description: 'Practical analytics, experimentation, and decision-system tools for growth teams.',
  path: '/tools/'
});

export default function ToolsPage() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Tools</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Practical diagnostics for growth and decision systems
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            The tools layer is being rebuilt around analytics, experimentation, AI workflows, and operating decisions. The
            first release will focus on funnel-drop diagnosis.
          </p>
          <CtaGroup>
            <ButtonLink href="/contact/">
              Discuss a diagnostic <ArrowRight aria-hidden="true" size={16} />
            </ButtonLink>
            <ButtonLink href="/products/" variant="secondary">
              View product roadmap
            </ButtonLink>
          </CtaGroup>
        </div>

        <div className="grid gap-4">
          {plannedTools.map((tool) => (
            <Card as="article" className="p-5" key={tool.title}>
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                  {tool.status === 'First analytics tool' ? <BarChart3 aria-hidden="true" size={20} /> : <Wrench aria-hidden="true" size={20} />}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">{tool.status}</p>
                  <h2 className="mt-1 font-heading text-2xl font-semibold text-ink">{tool.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
