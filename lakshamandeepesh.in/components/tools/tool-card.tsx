import { EventLink } from '@/components/analytics/event-link';
import { Card } from '@/components/primitives/card';
import type { ToolDefinition } from '@/lib/types';

type ToolCardProps = {
  tool: ToolDefinition;
  featured?: boolean;
};

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  return (
    <Card className={featured ? 'border-accent/30 bg-[linear-gradient(180deg,#fffdf9_0%,#fff5ea_100%)]' : ''}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{tool.category}</p>
            <h2 className="mt-3 font-heading text-3xl text-ink">{tool.title}</h2>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
              tool.status === 'live'
                ? 'border-accent/20 bg-white text-accent'
                : 'border-border bg-paper text-muted'
            }`}
          >
            {tool.status === 'live' ? 'Live now' : 'Coming soon'}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-muted">{tool.description}</p>
        <p className="mt-4 text-sm leading-7 text-ink/85">{tool.searchIntentCopy}</p>

        <div className="mt-6">
          <EventLink
            className={tool.status === 'live' ? 'btn-primary' : 'btn-secondary'}
            eventName="tool_card_click"
            eventParams={{ slug: tool.slug, status: tool.status, location: featured ? 'products_featured' : 'products_grid' }}
            href={`/products/${tool.slug}/`}
          >
            {tool.ctaLabel}
          </EventLink>
        </div>
      </div>
    </Card>
  );
}
