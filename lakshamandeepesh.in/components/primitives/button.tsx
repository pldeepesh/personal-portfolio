import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import type { AnalyticsEventName, AnalyticsParams } from '@/lib/analytics';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  analyticsEvent?: AnalyticsEventName;
  analyticsParams?: AnalyticsParams;
};

type ButtonProps = SharedButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'data-analytics-event' | 'data-analytics-params'>;
type ButtonLinkProps = SharedButtonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'data-analytics-event' | 'data-analytics-params'> & { href: string };

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-accent/70 bg-accent text-background shadow-glow hover:-translate-y-0.5 hover:bg-surface',
  secondary:
    'border-border bg-surface/80 text-ink hover:-translate-y-0.5 hover:border-accent hover:text-accent',
  ghost: 'border-transparent bg-transparent text-muted hover:text-ink'
};

function buttonClassName(variant: ButtonVariant, className?: string) {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition ${variantClasses[variant]} ${className ?? ''}`;
}

function encodeAnalyticsParams(params?: AnalyticsParams) {
  return params ? JSON.stringify(params) : undefined;
}

function defaultLinkEvent(href: string, variant: ButtonVariant): AnalyticsEventName {
  if (href.includes('/contact') || href.includes('calend') || href.startsWith('mailto:')) {
    return 'cta_strategy_call_clicked';
  }

  return variant === 'ghost' ? 'cta_clicked' : 'cta_clicked';
}

export function Button({
  analyticsEvent,
  analyticsParams,
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName(variant, className)}
      data-analytics-event={analyticsEvent}
      data-analytics-params={encodeAnalyticsParams(analyticsParams)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  analyticsEvent,
  analyticsParams,
  children,
  className,
  href,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  const eventName = analyticsEvent ?? defaultLinkEvent(href, variant);
  const eventParams = analyticsParams ?? { href, variant };

  return (
    <Link
      className={buttonClassName(variant, className)}
      data-analytics-event={eventName}
      data-analytics-params={encodeAnalyticsParams(eventParams)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
