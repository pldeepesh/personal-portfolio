import Image from 'next/image';
import Link from 'next/link';

import { EventLink } from '@/components/analytics/event-link';
import { Tag } from '@/components/primitives/tag';
import type { PostSummary } from '@/lib/types';

type FeaturedPostProps = {
  post: PostSummary;
};

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="grid gap-8 overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-editorial sm:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Featured Insight</p>
        <h2 className="font-heading text-3xl leading-tight text-ink sm:text-4xl">
          <Link className="hover:text-accent" href={`/blog/${post.slug}/`}>
            {post.title}
          </Link>
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted">
          <span>{post.publishedAt}</span>
          <span>·</span>
          <span>{post.readingTimeMinutes} min read</span>
          <span>·</span>
          <EventLink
            className="font-semibold text-accent hover:text-ink"
            eventName="topic_click"
            eventParams={{ topic: post.topic }}
            href={`/topics/${post.topic}/`}
          >
            {post.topic.replace(/-/g, ' ')}
          </EventLink>
        </div>
      </div>

      <Link className="block overflow-hidden rounded-xl" href={`/blog/${post.slug}/`}>
        <Image alt={post.title} className="h-full w-full object-cover" height={420} src={post.coverImage} width={640} />
      </Link>
    </article>
  );
}
