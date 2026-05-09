import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { WaitlistCTA } from '@/components/cta/waitlist-cta';
import { Section } from '@/components/primitives/section';
import { DriverSalarySlipGenerator } from '@/components/tools/driver-salary-slip-generator';
import { createMetadata } from '@/lib/seo';
import { getAllTools, getToolBySlug } from '@/lib/tools';

type ProductToolPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ProductToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return createMetadata({
      title: 'Products | Lakshmana Deepesh',
      description: 'Practical reimbursement and payroll tools.',
      path: '/products/'
    });
  }

  return createMetadata({
    title: `${tool.title} | Lakshmana Deepesh`,
    description: tool.metaDescription ?? tool.description,
    path: `/products/${tool.slug}/`
  });
}

export default async function ProductToolPage({ params }: ProductToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const isLiveTool = tool.status === 'live' && tool.slug === 'driver-salary-slip-generator';

  return (
    <>
      <section className="print-hidden relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_right,_#fce9d3,_transparent_40%),linear-gradient(180deg,#fffdf9_0%,#fffaf2_100%)] py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:grid-cols-[1.08fr_0.92fr] sm:px-6">
          <div className="animate-reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{tool.category}</p>
            <h1 className="mt-3 font-heading text-5xl leading-tight text-ink sm:text-6xl">{tool.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{tool.description}</p>
          </div>

          <aside className="animate-reveal-delayed rounded-2xl border border-border bg-white p-6 shadow-editorial">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {tool.status === 'live' ? 'Live now' : 'Coming soon'}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">{tool.searchIntentCopy}</p>
            <div className="mt-5 rounded-2xl border border-border bg-paper p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Delivery model</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                Static, browser-based, and print-first. No account setup, no backend workflow, and no server-side PDF generation.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Section>
        {isLiveTool ? (
          <DriverSalarySlipGenerator />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-editorial sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Planned release</p>
              <h2 className="mt-3 font-heading text-3xl text-ink">This tool is queued for the next batch</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                The route is already live so the tools architecture is stable, but the document workflow is still being shaped
                around real reimbursement and payroll usage.
              </p>
              <div className="mt-6 rounded-2xl border border-border bg-paper p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">What is planned</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/85">
                  <li>• Fast input flow tuned for monthly documentation</li>
                  <li>• Clean print layout for HR, finance, or reimbursement submissions</li>
                  <li>• Browser-only generation with no upload dependency</li>
                </ul>
              </div>
            </div>

            <WaitlistCTA />
          </div>
        )}
      </Section>
    </>
  );
}
