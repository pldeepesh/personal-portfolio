import type { HTMLAttributes, ReactNode } from 'react';

import { Container } from '@/components/primitives/container';

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
} & HTMLAttributes<HTMLElement>;

export function Section({ children, className, containerClassName, ...props }: SectionProps) {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${className ?? ''}`} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
