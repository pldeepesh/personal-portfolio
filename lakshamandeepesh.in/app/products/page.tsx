import { Section } from '@/components/primitives/section';
import { WaitlistCTA } from '@/components/cta/waitlist-cta';
import { createMetadata } from '@/lib/seo';

const roadmapItems = [
  {
    title: 'Experiment QA Copilot',
    description: 'Checklist-driven validation for hypothesis quality, metric health, and stop/go decisions.'
  },
  {
    title: 'Growth Guardrails Engine',
    description: 'Automated alerting on activation, retention, and unit economics during experiments.'
  },
  {
    title: 'Decision Evidence Builder',
    description: 'Structured post-experiment reporting to reduce interpretation ambiguity across stakeholders.'
  }
];

export const metadata = createMetadata({
  title: 'Products | Lakshmana Deepesh',
  description: 'Micro-SaaS product foundation for experimentation and growth analytics teams.',
  path: '/products/'
});

export default function ProductsPage() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Product Foundation</p>
            <h1 className="font-heading text-5xl text-ink">Micro-SaaS roadmap</h1>
            <p className="max-w-2xl text-lg text-muted">
              Foundation phase is live: architecture, messaging, and waitlist are set so product modules can launch without
              platform rewrites.
            </p>
          </div>

          <div className="grid gap-4">
            {roadmapItems.map((item) => (
              <article className="rounded-2xl border border-border bg-white p-5 shadow-editorial" key={item.title}>
                <h2 className="font-heading text-2xl text-ink">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <WaitlistCTA />
      </div>
    </Section>
  );
}
