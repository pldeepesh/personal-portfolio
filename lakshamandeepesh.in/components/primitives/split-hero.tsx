import Link from 'next/link';
import type { ReactNode } from 'react';
import { DecisionEngineHeroLayer } from '@/components/three/DecisionEngineHeroLayer';

type SplitHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
};

export function SplitHero({ eyebrow, title, description, actions, aside }: SplitHeroProps) {
  return (
    <section className="relative min-h-[680px] overflow-hidden border-b border-border bg-background py-20 sm:py-24">
      <DecisionEngineHeroLayer />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.96)_0%,rgba(5,7,13,0.78)_48%,rgba(5,7,13,0.26)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-background),transparent)]" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-4 sm:grid-cols-[1.2fr_0.8fr] sm:px-6 lg:px-8">
        <div className="animate-reveal space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
          <div className="flex flex-wrap gap-3">
            {actions ?? (
              <>
                <Link className="btn-primary" href="/blog/">
                  Explore Articles
                </Link>
                <Link className="btn-secondary" href="/products/">
                  Product Roadmap
                </Link>
              </>
            )}
          </div>
        </div>

        <aside className="animate-reveal-delayed rounded-lg border border-border bg-surface p-6 shadow-editorial">{aside}</aside>
      </div>
    </section>
  );
}
