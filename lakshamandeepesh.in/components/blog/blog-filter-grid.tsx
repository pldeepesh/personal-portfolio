'use client';

import { useMemo, useState } from 'react';

import { PostCard } from '@/components/blog/post-card';
import type { PostSummary } from '@/lib/types';

type BlogFilterGridProps = {
  posts: PostSummary[];
};

export function BlogFilterGrid({ posts }: BlogFilterGridProps) {
  const [activeTopic, setActiveTopic] = useState<string>('all');

  const topics = useMemo(() => {
    const unique = new Set(posts.map((post) => post.topic));
    return ['all', ...Array.from(unique).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTopic === 'all') return posts;
    return posts.filter((post) => post.topic === activeTopic);
  }, [activeTopic, posts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              activeTopic === topic
                ? 'border-accent bg-accent text-white'
                : 'border-border bg-white text-ink hover:border-accent hover:text-accent'
            }`}
            key={topic}
            onClick={() => setActiveTopic(topic)}
            type="button"
          >
            {topic.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
