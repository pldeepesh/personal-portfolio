import { notFound } from 'next/navigation';

import { Section } from '@/components/primitives/section';
import { createMetadata } from '@/lib/seo';

const legacyTagMap: Record<string, { title: string; href: string }> = {
  seo: {
    title: 'SEO',
    href: '/blog/'
  }
};

type LegacyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(legacyTagMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegacyPageProps) {
  const { slug } = await params;
  const entry = legacyTagMap[slug];
  if (!entry) return {};

  return {
    ...createMetadata({
      title: `${entry.title} | Legacy Tag`,
      description: `Legacy tag archive for ${entry.title}.`,
      path: `/blog/tag/${slug}/`
    }),
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function LegacyTagPage({ params }: LegacyPageProps) {
  const { slug } = await params;
  const entry = legacyTagMap[slug];

  if (!entry) notFound();

  return (
    <Section>
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 text-center shadow-editorial">
        <h1 className="font-heading text-4xl text-ink">Legacy tag moved</h1>
        <p className="mt-3 text-muted">This tag page is now merged into the new blog/topic architecture.</p>
        <a className="btn-primary mt-6 inline-flex" href={entry.href}>
          Continue to blog
        </a>
      </div>
    </Section>
  );
}
