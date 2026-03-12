import Image from 'next/image';
import Link from 'next/link';

import { EventLink } from '@/components/analytics/event-link';
import { Card } from '@/components/primitives/card';
import { Tag } from '@/components/primitives/tag';
import type { PostSummary } from '@/lib/types';

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full">
      <div className="space-y-4">
        <Link className="block overflow-hidden rounded-xl" href={`/blog/${post.slug}/`}>
          <Image
            alt={post.title}
            className="h-48 w-full object-cover transition duration-500 hover:scale-105"
            height={360}
            src={post.coverImage}
            width={640}
          />
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <EventLink
            className="text-xs font-semibold uppercase tracking-wide text-accent hover:text-ink"
            eventName="topic_click"
            eventParams={{ topic: post.topic }}
            href={`/topics/${post.topic}/`}
          >
            {post.topic.replace(/-/g, ' ')}
          </EventLink>
          <span className="text-xs text-muted">· {post.readingTimeMinutes} min read</span>
        </div>

        <h3 className="font-heading text-2xl text-ink">
          <Link className="hover:text-accent" href={`/blog/${post.slug}/`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}
