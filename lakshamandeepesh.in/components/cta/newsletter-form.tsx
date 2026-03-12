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

    if (siteConfig.newsletterFormAction.includes('your-form-id')) {
      setStatus('error');
      return;
    }

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
      trackEvent('newsletter_submit', { location: 'newsletter_form' });
    } catch (_error) {
      setStatus('error');
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-editorial">
      <h2 className="font-heading text-2xl text-ink">Weekly growth notes</h2>
      <p className="mt-2 text-sm text-muted">One practical article digest each week. No fluff, no spam.</p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
        <button className="btn-primary" type="submit">
          Subscribe
        </button>
      </form>
      {status === 'success' && <p className="mt-3 text-sm text-emerald-700">Subscribed. Check your inbox for confirmation.</p>}
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-700">
          Unable to submit right now. Configure `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` to activate this form.
        </p>
      )}
    </section>
  );
}
