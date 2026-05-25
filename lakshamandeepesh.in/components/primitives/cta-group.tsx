import type { ReactNode } from 'react';

type CtaGroupProps = {
  children: ReactNode;
  className?: string;
};

export function CtaGroup({ children, className }: CtaGroupProps) {
  return <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className ?? ''}`}>{children}</div>;
}
