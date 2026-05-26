import { ArrowRight, BookOpen, MailCheck, Wrench } from 'lucide-react';

import { NewsletterForm } from '@/components/cta/newsletter-form';
import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Newsletter | Lakshmana Deepesh',
  description: 'Field notes on analytics systems, AI workflows, experimentation, and better business decisions.',
  path: '/newsletter/'
});

const themes = [
  {
    title: 'Decision systems',
    description: 'How to turn messy metrics and fragmented workflows into clearer operating loops.',
    icon: MailCheck
  },
  {
    title: 'Experimentation and growth',
    description: 'Practical notes on hypotheses, guardrails, attribution, funnel diagnostics, and review cadence.',
    icon: BookOpen
  },
  {
    title: 'Tools and templates',
    description: 'Updates when new diagnostics, calculators, and AI workflow tools are ready.',
    icon: Wrench
  }
];

export default function NewsletterPage() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Newsletter</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Field notes for better analytics, AI, and growth decisions.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            A practical digest for operators, founders, analysts, and growth leaders who want clearer decision systems.
          </p>
          <ButtonLink className="mt-7" href="/blog/" variant="secondary">
            Read recent articles
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <NewsletterForm />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <Card as="article" key={theme.title}>
              <Icon className="h-6 w-6 text-accent" />
              <h2 className="mt-5 font-heading text-2xl text-ink">{theme.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{theme.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
