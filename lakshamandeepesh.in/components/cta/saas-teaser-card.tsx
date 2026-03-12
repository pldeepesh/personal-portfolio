import Link from 'next/link';

import { WaitlistCTA } from '@/components/cta/waitlist-cta';

export function SaaSTeaserCard() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl border border-border bg-[linear-gradient(170deg,#fff3de_0%,#fffaf0_100%)] p-6 shadow-editorial">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Micro-SaaS Foundation</p>
        <h2 className="mt-3 font-heading text-3xl text-ink">Product ideas in active discovery</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The product layer will focus on experiment QA workflows, growth metric guardrails, and decision support tools.
          This phase ships the architecture and waitlist channel so launch-ready features can slot in without refactors.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink/85">
          <li>• Product route architecture ready for `/products/[slug]`</li>
          <li>• Event tracking for waitlist and CTA flows</li>
          <li>• Positioning and messaging ready for first launch</li>
        </ul>
        <Link className="btn-secondary mt-5 inline-flex" href="/products/">
          View product roadmap
        </Link>
      </div>

      <WaitlistCTA />
    </div>
  );
}
