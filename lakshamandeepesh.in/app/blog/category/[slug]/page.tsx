import { notFound } from 'next/navigation';

import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

const legacyCategoryMap: Record<string, { title: string; href: string }> = {
  'data-science': {
    title: 'Data Science',
    href: '/topics/experimentation-growth-analytics/'
  }
};

type LegacyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(legacyCategoryMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegacyPageProps) {
  const { slug } = await params;
  const entry = legacyCategoryMap[slug];
  if (!entry) return {};

  return {
    ...createMetadata({
      title: `${entry.title} | Legacy Category`,
      description: `Legacy archive for ${entry.title}.`,
      path: `/blog/category/${slug}/`
    }),
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function LegacyCategoryPage({ params }: LegacyPageProps) {
  const { slug } = await params;
  const entry = legacyCategoryMap[slug];

  if (!entry) notFound();

  return (
    <Section>
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 text-center shadow-editorial">
        <h1 className="font-heading text-4xl text-ink">Legacy category moved</h1>
        <p className="mt-3 text-muted">
          This archive has been consolidated into the new topic hub for better SEO structure and navigation.
        </p>
        <a className="btn-primary mt-6 inline-flex" href={entry.href}>
          Continue to topic hub
        </a>
      </div>
    </Section>
  );
}
