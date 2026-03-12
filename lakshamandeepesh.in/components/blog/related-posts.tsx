import { PostCard } from '@/components/blog/post-card';
import type { PostSummary } from '@/lib/types';

type RelatedPostsProps = {
  posts: PostSummary[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-6 font-heading text-3xl text-ink">Related posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
