import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
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
        <GoogleAnalytics gaId={siteConfig.gaMeasurementId} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
