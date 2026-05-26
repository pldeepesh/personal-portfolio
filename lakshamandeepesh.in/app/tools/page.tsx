import { ArrowRight, BarChart3, Clock, Wrench } from 'lucide-react';

import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { CtaGroup } from '@/components/primitives/cta-group';
import { Section } from '@/components/primitives/section';
import { JsonLd } from '@/components/seo/json-ld';
import { createCollectionSchema, createMetadata } from '@/lib/seo';
import { getAllTools } from '@/lib/tools';

export const metadata = createMetadata({
  title: 'Free Analytics, Growth, and AI Tools | Lakshmana Deepesh',
  description: 'Free analytics, growth, experimentation, and AI tools for better business decisions.',
  path: '/tools/'
});

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <Section>
      <JsonLd
        data={createCollectionSchema({
          title: 'Free Analytics, Growth, and AI Tools',
          description: 'Free analytics, growth, experimentation, and AI tools for better business decisions.',
          path: '/tools/'
        })}
      />
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Tools</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">Free Analytics, Growth, and AI Tools</h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            Practical diagnostics for operators, marketers, analysts, and founders who need faster decision clarity.
          </p>
          <CtaGroup>
            <ButtonLink href="/contact/">
              Discuss a diagnostic <ArrowRight aria-hidden="true" size={16} />
            </ButtonLink>
            <ButtonLink href="/newsletter/" variant="secondary">
              Get tool updates
            </ButtonLink>
          </CtaGroup>
        </div>

        <div className="grid gap-4">
          {tools.map((tool) => (
            <Card as="article" className="scroll-mt-28 p-5" id={tool.slug} key={tool.slug}>
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                  {tool.status === 'live' ? <BarChart3 aria-hidden="true" size={20} /> : <Wrench aria-hidden="true" size={20} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">{tool.status.replace('-', ' ')}</p>
                    <span className="rounded-lg border border-border px-2 py-1 text-xs text-muted">{tool.category}</span>
                  </div>
                  <h2 className="mt-2 font-heading text-2xl font-semibold text-ink">{tool.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                    <span className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1">
                      <Clock className="h-3.5 w-3.5" />
                      {tool.estimatedTime}
                    </span>
                    <span className="rounded-lg border border-border px-2 py-1">Input: {tool.inputType}</span>
                  </div>
                  <ButtonLink
                    className="mt-5 w-fit px-4 py-2"
                    href={`/tools/${tool.slug}/`}
                    variant={tool.status === 'live' ? 'primary' : 'secondary'}
                  >
                    {tool.ctaLabel} <ArrowRight aria-hidden="true" size={15} />
                  </ButtonLink>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
