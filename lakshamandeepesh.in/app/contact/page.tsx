import Image from 'next/image';

import { EventLink } from '@/components/analytics/event-link';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Contact | Lakshmana Deepesh',
  description: 'Discuss consulting engagements for experimentation, analytics strategy, and product measurement design.',
  path: '/contact/'
});

const engagementFlow = [
  {
    step: '01',
    title: 'Context call',
    detail: 'You share product stage, growth goals, and current analytics setup.'
  },
  {
    step: '02',
    title: 'Diagnosis and scope',
    detail: 'I map bottlenecks, decision risks, and define a practical work plan.'
  },
  {
    step: '03',
    title: 'Execution system',
    detail: 'We implement metrics, experimentation process, and reporting rhythm for durable outcomes.'
  }
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          alt="Early morning drive photography"
          className="h-[38vh] min-h-[320px] w-full object-cover"
          height={960}
          priority
          src="/img/stock/contact-hero.jpg"
          width={2000}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171c18]/70 via-[#1e2520]/50 to-transparent" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-6xl items-end px-4 pb-10 sm:px-6">
          <div className="max-w-2xl text-paper animate-reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f8d7b9]">Contact</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight sm:text-6xl">Let’s build better growth decisions</h1>
            <p className="mt-4 text-base leading-7 text-paper/85 sm:text-lg">
              For consulting and advisory work on experimentation, analytics strategy, and decision systems.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-editorial sm:p-8">
              <h2 className="font-heading text-3xl text-ink">Reach out directly</h2>
              <p className="mt-3 leading-8 text-muted">
                Share your product stage, current analytics stack, and where decision bottlenecks are slowing growth. I
                typically respond within one business day.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a className="rounded-xl border border-border bg-paper p-4 transition hover:border-accent" href="mailto:pldeepesh@gmail.com?subject=Consulting%20Inquiry%20from%20Website">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">Email</p>
                  <p className="mt-2 font-semibold text-ink">pldeepesh@gmail.com</p>
                  <p className="mt-1 text-sm text-muted">Best for project briefs and scope details.</p>
                </a>

                <a
                  className="rounded-xl border border-border bg-paper p-4 transition hover:border-accent"
                  href="https://www.linkedin.com/in/lakshmanadeepesh/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">LinkedIn</p>
                  <p className="mt-2 font-semibold text-ink">Lakshmana Deepesh</p>
                  <p className="mt-1 text-sm text-muted">Best for quick context and background.</p>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <EventLink
                  className="btn-primary"
                  eventName="cta_click"
                  eventParams={{ location: 'contact', target: 'email' }}
                  href="mailto:pldeepesh@gmail.com?subject=Consulting%20Inquiry%20from%20Website"
                >
                  Start via email
                </EventLink>
                <EventLink
                  className="btn-secondary"
                  eventName="cta_click"
                  eventParams={{ location: 'contact', target: 'linkedin' }}
                  href="https://www.linkedin.com/in/lakshmanadeepesh/"
                >
                  Message on LinkedIn
                </EventLink>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-tint p-6 shadow-editorial sm:p-8">
              <h2 className="font-heading text-3xl text-ink">Before you send a note</h2>
              <p className="mt-3 text-sm leading-7 text-muted">Include these details so we can make the first call actionable.</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/85">
                <li>• Product stage and team size</li>
                <li>• Current analytics and experimentation stack</li>
                <li>• Top 2 growth decisions currently blocked</li>
                <li>• Target timeline and expected outcomes</li>
              </ul>

              <div className="mt-6 rounded-xl border border-border bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Availability</p>
                <p className="mt-2 text-sm text-muted">Advisory, analytics system design, and focused execution sprints.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-editorial sm:p-8">
            <h2 className="font-heading text-3xl text-ink">Engagement flow</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {engagementFlow.map((item) => (
                <article className="rounded-xl border border-border bg-paper p-4" key={item.step}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">Step {item.step}</p>
                  <h3 className="mt-2 font-heading text-2xl text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
