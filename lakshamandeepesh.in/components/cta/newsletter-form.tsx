'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/lib/site-config';

export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(siteConfig.newsletterFormAction, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) throw new Error('Newsletter request failed');

      setStatus('success');
      event.currentTarget.reset();
      trackEvent('newsletter_signup_submitted', { location: 'newsletter_form' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="rounded-lg border border-border bg-surface p-6 shadow-editorial">
      <h2 className="font-heading text-2xl text-ink">Weekly growth notes</h2>
      <p className="mt-2 text-sm text-muted">One practical article digest each week. No fluff, no spam.</p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <input
          aria-label="Newsletter email"
          className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
        <input name="source" type="hidden" value="newsletter_form" />
        <input aria-hidden="true" className="hidden" name="company_website" tabIndex={-1} type="text" />
        <button className="btn-primary" type="submit">
          Subscribe
        </button>
      </form>
      {status === 'success' && <p className="mt-3 text-sm text-emerald-700">Subscribed. Check your inbox for confirmation.</p>}
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-700">
          Unable to submit right now. Please try again later.
        </p>
      )}
    </section>
  );
}
