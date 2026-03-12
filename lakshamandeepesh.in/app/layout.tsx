import type { Metadata } from 'next';
import Script from 'next/script';
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
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${siteConfig.gaMeasurementId}', { page_path: window.location.pathname });
          `}
        </Script>

        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
