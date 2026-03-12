import type { Author } from '@/lib/types';

type AuthorBadgeProps = {
  author: Author;
  compact?: boolean;
};

export function AuthorBadge({ author, compact = false }: AuthorBadgeProps) {
  return (
    <div className={`flex items-start gap-3 ${compact ? 'text-sm' : 'text-base'}`}>
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-paper text-sm font-bold text-ink">
        {author.name
          .split(' ')
          .slice(0, 2)
          .map((part) => part[0])
          .join('')}
      </div>
      <div>
        <p className="font-semibold text-ink">{author.name}</p>
        <p className="text-sm text-muted">{author.role}</p>
      </div>
    </div>
  );
}
