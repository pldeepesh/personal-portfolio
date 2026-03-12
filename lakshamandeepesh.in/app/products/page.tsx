import { Section } from '@/components/primitives/section';
import { WaitlistCTA } from '@/components/cta/waitlist-cta';
import { createMetadata } from '@/lib/seo';

type ProductIconProps = {
  className?: string;
};

function CampaignDoctorIcon({ className = 'h-5 w-5' }: ProductIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4 4v16h16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14.5 10 11l3 2.5 4-5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m15.5 8 2.5-.2-.2 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TradingDeskIcon({ className = 'h-5 w-5' }: ProductIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M5 5h14v14H5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14.5 11 11l2 2 3-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8h8M8 17h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StealthProductIcon({ className = 'h-5 w-5' }: ProductIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="m12 3 7 3.5v5.2c0 4.4-2.8 8.4-7 9.8-4.2-1.4-7-5.4-7-9.8V6.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9.5 12 2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const roadmapItems = [
  {
    title: 'AI Campaign Doctor',
    description:
      'AI diagnostics that audit ad campaign performance, surface hidden pitfalls, and recommend the next best optimization moves.',
    Icon: CampaignDoctorIcon
  },
  {
    title: 'AI Trading Decision Desk',
    description:
      'Decision support for intraday trading with cleaner signal interpretation, risk cues, and faster high-confidence trade choices.',
    Icon: TradingDeskIcon
  },
  {
    title: 'Stealth Product',
    description: 'A mission-driven product focused on helping mankind. More details will be revealed soon.',
    Icon: StealthProductIcon
  }
];

export const metadata = createMetadata({
  title: 'Products | Lakshmana Deepesh',
  description: 'Micro-SaaS product foundation for experimentation and growth analytics teams.',
  path: '/products/'
});

export default function ProductsPage() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Product Foundation</p>
            <h1 className="font-heading text-5xl text-ink">Micro-SaaS roadmap</h1>
            <p className="max-w-2xl text-lg text-muted">
              Foundation phase is live: architecture, messaging, and waitlist are set so product modules can launch without
              platform rewrites.
            </p>
          </div>

          <div className="grid gap-4">
            {roadmapItems.map((item) => (
              <article className="rounded-2xl border border-border bg-white p-5 shadow-editorial" key={item.title}>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-tint text-accent">
                    <item.Icon />
                  </span>
                  <div>
                    <h2 className="font-heading text-2xl text-ink">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <WaitlistCTA />
      </div>
    </Section>
  );
}
