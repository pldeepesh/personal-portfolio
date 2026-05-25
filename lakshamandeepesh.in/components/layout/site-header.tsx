'use client';

import Link from 'next/link';
import { CalendarDays, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { ButtonLink } from '@/components/primitives/button';
import { Container } from '@/components/primitives/container';
import { siteConfig } from '@/lib/site-config';

const links = [
  { href: '/work/', label: 'Work' },
  { href: '/blog/', label: 'Articles' },
  { href: '/tools/', label: 'Tools' },
  { href: '/products/', label: 'Products' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/78 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link className="font-heading text-lg font-semibold tracking-tight text-ink sm:text-xl" href="/">
          Lakshmana Deepesh
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 justify-end gap-5 whitespace-nowrap lg:flex">
          {links.map((link) => (
            <Link
              className="text-sm font-medium text-muted transition hover:text-ink"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink className="px-4 py-2.5" href={siteConfig.calendarUrl}>
            <CalendarDays aria-hidden="true" size={16} />
            Book a Strategy Call
          </ButtonLink>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-ink transition hover:border-accent lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-border bg-background/96 lg:hidden" id="mobile-navigation">
          <Container className="grid gap-3 py-4">
            {links.map((link) => (
              <Link
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted transition hover:bg-surface hover:text-ink"
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink className="mt-1 w-full" href={siteConfig.calendarUrl} onClick={() => setIsOpen(false)}>
              <CalendarDays aria-hidden="true" size={16} />
              Book a Strategy Call
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
