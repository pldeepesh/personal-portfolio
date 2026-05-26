import { ArrowRight, CalendarDays, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

import { ContactForm } from '@/components/cta/contact-form';
import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Container } from '@/components/primitives/container';
import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata = createMetadata({
  title: 'Contact | Lakshmana Deepesh',
  description: 'Book a strategy call or discuss analytics, AI workflow, experimentation, and growth decision systems.',
  path: '/contact/'
});

const faqs = [
  {
    question: 'What kind of projects are a fit?',
    answer: 'Analytics systems, funnel diagnosis, experimentation operating models, AI workflow design, and focused decision-system sprints.'
  },
  {
    question: 'Can you work with incomplete data?',
    answer: 'Yes. Many useful decision systems start by separating known signal, missing data, and assumptions instead of waiting for perfect instrumentation.'
  },
  {
    question: 'Do you disclose client details publicly?',
    answer: 'No. Public examples are anonymized and generalized unless explicit approval is given.'
  }
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_76%_22%,rgba(55,168,255,0.18),transparent_34%),linear-gradient(135deg,#07101d,#05070d)]">
        <Container className="py-20 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              Book a strategy call for sharper growth decisions.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Share the decision bottleneck, current system, and timeline. I will help map whether a diagnostic, advisory sprint, or deeper build makes sense.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.calendarUrl}>
                <CalendarDays className="h-4 w-4" />
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="mailto:pldeepesh@gmail.com?subject=Consulting%20Inquiry%20from%20Website" variant="secondary">
                <Mail className="h-4 w-4" />
                Email Directly
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Card as="div">
            <div className="mb-6 flex items-start gap-3">
              <MessageCircle className="mt-1 h-6 w-6 text-accent" />
              <div>
                <h2 className="font-heading text-3xl font-semibold text-ink">Send project context</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  The form validates required context locally and can submit to an external endpoint when configured.
                </p>
              </div>
            </div>
            <ContactForm />
          </Card>

          <div className="space-y-5">
            <Card as="div">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <h2 className="mt-4 font-heading text-3xl font-semibold text-ink">What to include</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                <li>Product stage and team context.</li>
                <li>Current analytics, data, and AI workflow stack.</li>
                <li>Top decisions currently blocked by unclear signal.</li>
                <li>Timeline and desired operating outcome.</li>
              </ul>
            </Card>

            <Card as="div">
              <h2 className="font-heading text-3xl font-semibold text-ink">FAQ</h2>
              <div className="mt-4 space-y-3">
                {faqs.map((faq, index) => (
                  <details className="rounded-lg border border-border bg-background/70 p-4" key={faq.question} open={index === 0}>
                    <summary className="cursor-pointer list-none text-sm font-semibold text-ink">{faq.question}</summary>
                    <p className="mt-2 text-sm leading-7 text-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </Card>

            <ButtonLink className="w-full" href="/work/" variant="secondary">
              Explore case studies first
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
