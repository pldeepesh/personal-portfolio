import type { ReactNode } from 'react';

type TagProps = {
  children: ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent-soft/55 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
      {children}
    </span>
  );
}
