import Link from 'next/link';

import { Container } from '@/components/primitives/container';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog/', label: 'Blog' },
  { href: '/topics/', label: 'Topics' },
  { href: '/work/', label: 'Work' },
  { href: '/products/', label: 'Products' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link className="font-heading text-xl tracking-tight text-ink" href="/">
          Lakshmana Deepesh
        </Link>

        <nav aria-label="Primary" className="flex flex-1 justify-end gap-4 overflow-x-auto whitespace-nowrap">
          {links.map((link) => (
            <Link
              className="text-sm font-medium text-ink/80 transition hover:text-accent"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
