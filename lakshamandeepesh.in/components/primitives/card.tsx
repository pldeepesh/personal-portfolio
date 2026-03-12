import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-border bg-white p-6 shadow-editorial transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,40,34,0.12)] ${className ?? ''}`}
    >
      {children}
    </article>
  );
}
