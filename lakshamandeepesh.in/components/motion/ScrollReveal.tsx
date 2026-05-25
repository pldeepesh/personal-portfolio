'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { useReducedMotionPreference } from './ReducedMotionProvider';

type ScrollRevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
};

export function ScrollReveal({ children, delay = 0, className, ...props }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotionPreference();

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, margin: '-12% 0px' }}
      whileInView={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
