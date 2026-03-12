import Link from 'next/link';

import { Section } from '@/components/primitives/section';

export default function NotFoundPage() {
  return (
    <Section>
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-8 text-center shadow-editorial">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-3 font-heading text-4xl text-ink">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
        <Link className="btn-primary mt-6 inline-flex" href="/blog/">
          Go to blog
        </Link>
      </div>
    </Section>
  );
}
