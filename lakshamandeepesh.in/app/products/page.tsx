import { WaitlistCTA } from '@/components/cta/waitlist-cta';
import { Section } from '@/components/primitives/section';
import { ToolCard } from '@/components/tools/tool-card';
import { createMetadata } from '@/lib/seo';
import { getAllTools } from '@/lib/tools';

export const metadata = createMetadata({
  title: 'Products | Lakshmana Deepesh',
  description: 'Practical reimbursement and payroll tools built for Indian documentation, salary records, and print-first workflows.',
  path: '/products/'
});

export default function ProductsPage() {
  const tools = getAllTools();
  const liveTool = tools.find((tool) => tool.status === 'live') ?? tools[0];
  const upcomingTools = tools.filter((tool) => tool.slug !== liveTool.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_right,_#fce9d3,_transparent_38%),linear-gradient(180deg,#fffdf9_0%,#fff8ef_100%)] py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:grid-cols-[1.1fr_0.9fr] sm:px-6">
          <div className="space-y-6 animate-reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Tools hub</p>
            <h1 className="max-w-3xl font-heading text-5xl leading-tight text-ink sm:text-6xl">
              Practical reimbursement and payroll tools
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Built for the real documents employees and operators search for every month: salary receipts, reimbursement
              records, and printable formats that should not require a spreadsheet cleanup first.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/75">
              <span className="rounded-full border border-border bg-white px-4 py-2">India-first workflows</span>
              <span className="rounded-full border border-border bg-white px-4 py-2">Print-ready formats</span>
              <span className="rounded-full border border-border bg-white px-4 py-2">No login, no backend</span>
            </div>
          </div>

          <aside className="animate-reveal-delayed rounded-2xl border border-border bg-white p-6 shadow-editorial">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Live now</p>
            <h2 className="mt-3 font-heading text-3xl text-ink">{liveTool.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{liveTool.description}</p>
            <div className="mt-5 rounded-2xl border border-border bg-paper p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Why this first</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                Driver salary receipts are one of the most common document requests for reimbursement and payroll support.
                This first tool handles the full preview-to-print flow in the browser.
              </p>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-ink/85">
              <li>• Live preview as you type</li>
              <li>• Template switching without losing entered data</li>
              <li>• Print or save as PDF directly from the browser</li>
            </ul>
          </aside>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-8">
            <ToolCard featured tool={liveTool} />

            <div>
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Next in line</p>
                <h2 className="mt-3 font-heading text-3xl text-ink">Tools queued for launch</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {upcomingTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <WaitlistCTA />

            <div className="rounded-2xl border border-border bg-tint p-6 shadow-editorial">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Demand signals</p>
              <h2 className="mt-3 font-heading text-3xl text-ink">What this section is designed for</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                The tool layer is focused on operational formats that employees repeatedly search for, especially salary
                records, rent receipts, and reimbursement paperwork that needs to look clean on first print.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-ink/85">
                <li>• Household and business payroll acknowledgements</li>
                <li>• HRA and reimbursement documentation</li>
                <li>• Print-first records for monthly submissions</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
