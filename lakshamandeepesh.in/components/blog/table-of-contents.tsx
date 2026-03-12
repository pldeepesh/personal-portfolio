import type { Heading } from '@/lib/types';

type TableOfContentsProps = {
  headings: Heading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-editorial">
      <h2 className="mb-4 font-heading text-lg text-ink">On this page</h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              className={`block text-muted transition hover:text-accent ${heading.level === 3 ? 'pl-4' : ''}`}
              href={`#${heading.id}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
