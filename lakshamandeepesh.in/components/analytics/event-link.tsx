'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

import { type AnalyticsEventName, type AnalyticsParams, trackEvent } from '@/lib/analytics';

type EventLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children: ReactNode;
  className?: string;
  eventName: AnalyticsEventName;
  eventParams?: AnalyticsParams;
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
