'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/lib/site-config';

export function WaitlistCTA() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (siteConfig.waitlistFormAction.includes('your-form-id')) {
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(siteConfig.waitlistFormAction, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) throw new Error('Waitlist request failed');

      setStatus('success');
      event.currentTarget.reset();
      trackEvent('waitlist_submit', { location: 'waitlist_cta' });
    } catch (_error) {
      setStatus('error');
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-editorial">
      <h2 className="font-heading text-2xl text-ink">Get early access</h2>
      <p className="mt-2 text-sm text-muted">
        Join the waitlist for analytics micro-SaaS tools built for experimentation and growth teams.
      </p>
      <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
        <input
          className="rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
          name="name"
          placeholder="Your name"
          required
          type="text"
        />
        <input
          className="rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
          name="email"
          placeholder="Work email"
          required
          type="email"
        />
        <textarea
          className="sm:col-span-2 min-h-28 rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
          name="problem"
          placeholder="What experiment or analytics problem should this product solve first?"
          required
        />
        <button className="btn-primary sm:col-span-2" type="submit">
          Join waitlist
        </button>
      </form>
      {status === 'success' && <p className="mt-3 text-sm text-emerald-700">You are on the waitlist.</p>}
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-700">
          Could not submit. Configure `NEXT_PUBLIC_WAITLIST_FORM_ACTION` to activate this form.
        </p>
      )}
    </section>
  );
}
