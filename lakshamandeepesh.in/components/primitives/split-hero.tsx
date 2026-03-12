import Link from 'next/link';
import type { ReactNode } from 'react';

type SplitHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
};

export function SplitHero({ eyebrow, title, description, actions, aside }: SplitHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_right,_#fef5ea,_transparent_45%),linear-gradient(180deg,#fffdf9_0%,#fffdf9_100%)] py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:grid-cols-[1.2fr_0.8fr] sm:px-6">
        <div className="animate-reveal space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h1 className="font-heading text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
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

        <aside className="animate-reveal-delayed rounded-2xl border border-border bg-white p-6 shadow-editorial">{aside}</aside>
      </div>
    </section>
  );
}
