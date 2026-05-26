import { ArrowRight, Camera, CircuitBoard, Database, FlaskConical, LineChart, Rocket } from 'lucide-react';
import Image from 'next/image';

import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Container } from '@/components/primitives/container';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

const beliefs = [
  'Data should reduce ambiguity.',
  'AI should improve decisions, not create noise.',
  'Dashboards should trigger action.',
  'Experiments should compound learning.',
  'Systems should outlive individuals.'
];

const workAreas = [
  { title: 'Analytics systems', icon: LineChart },
  { title: 'AI workflows', icon: CircuitBoard },
  { title: 'Data platforms', icon: Database },
  { title: 'Experimentation systems', icon: FlaskConical },
  { title: 'Growth diagnostics', icon: Rocket }
];

export const metadata = createMetadata({
  title: 'About | Lakshmana Deepesh',
  description: 'About Lakshmana Deepesh, an AI, analytics, and decision systems leader building practical growth systems.',
  path: '/about/'
});

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <Image
          alt="Night city photography by Lakshmana Deepesh"
          className="absolute inset-0 h-full w-full object-cover opacity-32"
          height={1200}
          priority
          src="/img/portfolio/portfolio-03-large.jpg"
          width={2200}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.97),rgba(5,7,13,0.72),rgba(5,7,13,0.38))]" />
        <Container className="relative z-10 py-20 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About Lakshmana</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              AI, analytics, and decision systems leader.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              I work at the intersection of business analytics, AI systems, growth strategy, and automation. Over the last decade, I have built dashboards, data pipelines, AI workflows, and decision systems for high-growth teams.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card as="div">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Professional summary</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-ink">A practical builder for messy business systems.</h2>
            <p className="mt-4 leading-8 text-muted">
              My work usually starts with an unclear decision: why did conversion change, which source is improving, what should an experiment prove, or where can AI remove manual friction? I turn that ambiguity into metrics, workflows, and operating rhythms teams can use.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {workAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background/70 p-3" key={area.title}>
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="text-sm font-semibold text-ink">{area.title}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card as="div">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">What I believe</p>
            <div className="mt-5 space-y-3">
              {beliefs.map((belief) => (
                <div className="rounded-lg border border-border bg-background/70 p-4 text-sm font-semibold text-ink" key={belief}>
                  {belief}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Card as="div">
            <div className="flex items-start gap-4">
              <Camera className="mt-1 h-6 w-6 text-accent" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Human layer</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold text-ink">A maker mindset beyond dashboards.</h2>
                <p className="mt-4 leading-8 text-muted">
                  Photography, space imagery, Raspberry Pi projects, writing, and small automation experiments keep me close to the craft of noticing patterns, building prototypes, and explaining complex ideas clearly.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Image alt="Landscape photography" className="h-44 rounded-lg object-cover" height={360} src="/img/portfolio/portfolio-06-thumbnail.jpg" width={520} />
            <Image alt="Light and architecture photography" className="h-44 rounded-lg object-cover" height={360} src="/img/portfolio/portfolio-08-thumbnail.jpg" width={520} />
            <Image alt="City photography" className="col-span-2 h-56 rounded-lg object-cover" height={420} src="/img/portfolio/portfolio-01-thumbnail.jpg" width={760} />
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-accent/30 bg-accent-soft/40 p-6 shadow-glow sm:p-8">
          <h2 className="font-heading text-3xl font-semibold text-ink">Want to build a sharper operating system for decisions?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            I help teams diagnose growth problems, design analytics systems, and apply AI where it creates real operating leverage.
          </p>
          <ButtonLink className="mt-6" href="/contact/">
            Work with me
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
