import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: 'blue' | 'green' | 'gold';
};

const toneClasses = {
  blue: 'border-accent/30 bg-accent-soft/60 text-accent',
  green: 'border-success/30 bg-success/10 text-success',
  gold: 'border-gold/35 bg-gold/10 text-gold'
};

export function Badge({ children, className, tone = 'blue' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${toneClasses[tone]} ${className ?? ''}`}>
      {children}
    </span>
  );
}
