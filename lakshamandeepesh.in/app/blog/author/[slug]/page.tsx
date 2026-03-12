import { notFound } from 'next/navigation';

import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

const legacyAuthorMap: Record<string, { title: string; href: string }> = {
  'deepesh-reddy': {
    title: 'Lakshmana Deepesh Reddy',
    href: '/about/'
  }
};

type LegacyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(legacyAuthorMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegacyPageProps) {
  const { slug } = await params;
  const entry = legacyAuthorMap[slug];
  if (!entry) return {};

  return {
    ...createMetadata({
      title: `${entry.title} | Legacy Author`,
      description: `Legacy author archive for ${entry.title}.`,
      path: `/blog/author/${slug}/`
    }),
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function LegacyAuthorPage({ params }: LegacyPageProps) {
  const { slug } = await params;
  const entry = legacyAuthorMap[slug];

  if (!entry) notFound();

  return (
    <Section>
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 text-center shadow-editorial">
        <h1 className="font-heading text-4xl text-ink">Author page moved</h1>
        <p className="mt-3 text-muted">Author authority and profile are now consolidated in a dedicated about page.</p>
        <a className="btn-primary mt-6 inline-flex" href={entry.href}>
          Continue to about
        </a>
      </div>
    </Section>
  );
}
