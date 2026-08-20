import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site-config';

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalizedPath}`;
}

export function createMetadata({
  title,
  description,
  path,
  image = siteConfig.defaultOgImage,
  type = 'website'
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: siteConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function createBaseSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteConfig.siteUrl}#website`,
      url: siteConfig.siteUrl,
      name: siteConfig.siteName,
      description: siteConfig.siteDescription
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteConfig.siteUrl}#person`,
      name: siteConfig.authorName,
      url: siteConfig.siteUrl,
      sameAs: [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.x]
    }
  ];
}

export function createBreadcrumbSchema(
  items: Array<{ name: string; item: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  };
}

export function createCollectionSchema(input: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path)
  };
}

export function createArticleSchema(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  authorUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    image: input.image.startsWith('http') ? input.image : absoluteUrl(input.image),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    author: {
      '@type': 'Person',
      name: input.authorName,
      url: input.authorUrl
    },
    publisher: {
      '@id': `${siteConfig.siteUrl}#person`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(input.path)
    }
  };
}
