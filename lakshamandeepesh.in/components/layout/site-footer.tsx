import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/primitives/container';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-ink">{siteConfig.siteName}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">{siteConfig.siteDescription}</p>
          <p className="mt-4 text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.authorName}. Built with Next.js and shipped via static export.
          </p>
        </div>

        <div className="grid gap-8 text-sm sm:grid-cols-3">
          <div className="space-y-2">
            <p className="font-semibold text-ink">Explore</p>
            <Link className="block text-muted transition hover:text-accent" href="/work/">
              Work
            </Link>
            <Link className="block text-muted transition hover:text-accent" href="/blog/">
              Articles
            </Link>
            <Link className="block text-muted transition hover:text-accent" href="/about/">
              About
            </Link>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-ink">Resources</p>
            <Link className="block text-muted transition hover:text-accent" href="/tools/">
              Tools
            </Link>
            <Link className="block text-muted transition hover:text-accent" href="/topics/">
              Topics
            </Link>
            <Link className="block text-muted transition hover:text-accent" href="/products/">
              Products
            </Link>
            <a className="block text-muted transition hover:text-accent" href="/feed.xml">
              RSS Feed
            </a>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-ink">Contact</p>
            <Link className="block text-muted transition hover:text-accent" href="/contact/">
              Contact
            </Link>
            <a className="inline-flex items-center gap-1 text-muted transition hover:text-accent" href={siteConfig.social.linkedin} rel="noreferrer" target="_blank">
              LinkedIn <ArrowUpRight aria-hidden="true" size={14} />
            </a>
            <a className="flex items-center gap-1 text-muted transition hover:text-accent" href={siteConfig.social.github} rel="noreferrer" target="_blank">
              GitHub <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
