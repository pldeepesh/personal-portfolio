import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ReducedMotionProvider } from '@/components/motion/ReducedMotionProvider';
import { siteConfig } from '@/lib/site-config';
import { createMetadata } from '@/lib/seo';

import './globals.css';

export const metadata: Metadata = {
  ...createMetadata({
    title: `${siteConfig.siteName} | Growth Analytics and Experimentation`,
    description: siteConfig.siteDescription,
    path: '/'
  })
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReducedMotionProvider>
          <a className="sr-only z-50 rounded-lg bg-accent px-4 py-3 font-semibold text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4" href="#main-content">
            Skip to content
          </a>
          <GoogleAnalytics gaId={siteConfig.gaMeasurementId} />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
