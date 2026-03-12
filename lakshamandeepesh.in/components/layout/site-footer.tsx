import Link from 'next/link';

import { Container } from '@/components/primitives/container';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white py-12">
      <Container className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl text-ink">{siteConfig.siteName}</h2>
          <p className="mt-3 max-w-md text-sm text-muted">{siteConfig.siteDescription}</p>
          <p className="mt-4 text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.authorName}. Built with Next.js and shipped via static export.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-ink">Explore</p>
            <Link className="block text-muted hover:text-accent" href="/blog/">
              Blog
            </Link>
            <Link className="block text-muted hover:text-accent" href="/topics/">
              Topics
            </Link>
            <Link className="block text-muted hover:text-accent" href="/products/">
              Products
            </Link>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-ink">Resources</p>
            <a className="block text-muted hover:text-accent" href="/feed.xml">
              Feed
            </a>
            <a className="block text-muted hover:text-accent" href={siteConfig.social.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            <a className="block text-muted hover:text-accent" href={siteConfig.social.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
