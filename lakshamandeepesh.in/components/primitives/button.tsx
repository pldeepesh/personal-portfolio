import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps = SharedButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonLinkProps = SharedButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

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

export function Button({ children, className, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return (
    <button className={buttonClassName(variant, className)} type={type} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, className, href, variant = 'primary', ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, className)} href={href} {...props}>
      {children}
    </Link>
  );
}
