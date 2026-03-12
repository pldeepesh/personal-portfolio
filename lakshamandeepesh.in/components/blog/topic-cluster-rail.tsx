import Link from 'next/link';

import type { TopicDefinition } from '@/lib/types';

type TopicClusterRailProps = {
  topics: TopicDefinition[];
};

export function TopicClusterRail({ topics }: TopicClusterRailProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-editorial">
      <h2 className="font-heading text-2xl text-ink">Traffic clusters</h2>
      <p className="mt-2 text-sm text-muted">
        Every cluster is built as a pillar + supporting articles to improve topical authority and internal linking depth.
      </p>
      <ul className="mt-5 space-y-4">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link className="text-lg font-semibold text-ink hover:text-accent" href={`/topics/${topic.slug}/`}>
              {topic.title}
            </Link>
            <p className="mt-1 text-sm text-muted">{topic.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
