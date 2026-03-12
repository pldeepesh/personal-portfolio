'use client';

import Link from 'next/link';

import { trackEvent } from '@/lib/analytics';

type LeadCTAProps = {
  title?: string;
  description?: string;
};

export function LeadCTA({
  title = 'Need experimentation strategy that compounds?',
  description = 'I help product and growth teams design measurement systems, experiments, and analytical workflows that drive decisions with confidence.'
}: LeadCTAProps) {
  return (
    <section className="rounded-2xl border border-border bg-ink px-6 py-10 text-paper sm:px-10">
      <h2 className="font-heading text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-paper/80 sm:text-base">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          className="btn-primary"
          href="/contact/"
          onClick={() => trackEvent('cta_click', { location: 'lead_cta', target: 'contact' })}
        >
          Book a strategy call
        </Link>
        <Link
          className="btn-secondary"
          href="/work/"
          onClick={() => trackEvent('cta_click', { location: 'lead_cta', target: 'work' })}
        >
          View case studies
        </Link>
      </div>
    </section>
  );
}
