'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

import { trackEvent } from '@/lib/analytics';

type EventLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: Record<string, string | number>;
};

export function EventLink({
  children,
  className,
  eventName,
  eventParams,
  onClick,
  ...rest
}: EventLinkProps) {
  return (
    <Link
      {...rest}
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
