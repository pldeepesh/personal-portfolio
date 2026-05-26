import type { ReactNode } from 'react';

type CardProps = {
  as?: 'article' | 'div';
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Card({ as = 'article', children, className, id }: CardProps) {
  const Component = as;

  return (
    <Component
      className={`rounded-lg border border-border bg-surface/78 p-6 shadow-editorial backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow ${className ?? ''}`}
      id={id}
    >
      {children}
    </Component>
  );
}
