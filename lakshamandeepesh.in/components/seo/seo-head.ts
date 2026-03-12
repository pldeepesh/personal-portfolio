import type { Metadata } from 'next';

import { createMetadata } from '@/lib/seo';

type SeoHeadInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

export function SeoHead(input: SeoHeadInput): Metadata {
  return createMetadata(input);
}
