import type { ReactNode } from 'react';

type ResultPanelProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export function ResultPanel({ children, className, title }: ResultPanelProps) {
  return (
    <aside className={`rounded-lg border border-accent/30 bg-accent-soft/35 p-5 shadow-glow ${className ?? ''}`}>
      {title ? <h3 className="font-heading text-lg font-semibold text-ink">{title}</h3> : null}
      <div className={title ? 'mt-3 text-sm leading-6 text-muted' : 'text-sm leading-6 text-muted'}>{children}</div>
    </aside>
  );
}
