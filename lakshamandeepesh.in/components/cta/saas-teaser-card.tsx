import Link from 'next/link';

import { WaitlistCTA } from '@/components/cta/waitlist-cta';

export function SaaSTeaserCard() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl border border-border bg-[linear-gradient(170deg,#fff3de_0%,#fffaf0_100%)] p-6 shadow-editorial">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Tools Hub</p>
        <h2 className="mt-3 font-heading text-3xl text-ink">A live generator is now on the site</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The product layer now includes a print-first driver salary slip generator, with rent receipt and books &
          periodicals workflows queued next for reimbursement-heavy teams.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink/85">
          <li>• Live preview with browser print/save-as-PDF</li>
          <li>• Dedicated `/products/[slug]` route architecture now live</li>
          <li>• More payroll and reimbursement tools already queued</li>
        </ul>
        <Link className="btn-secondary mt-5 inline-flex" href="/products/">
          Explore the tools hub
        </Link>
      </div>

      <WaitlistCTA />
    </div>
  );
}
