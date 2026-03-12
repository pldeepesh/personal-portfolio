import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

type H2Props = ComponentPropsWithoutRef<'h2'>;
type H3Props = ComponentPropsWithoutRef<'h3'>;

export const mdxComponents: MDXComponents = {
  h2: ({ id, children, ...props }: H2Props) => (
    <h2 {...props} className="mt-10 scroll-mt-24 font-heading text-3xl text-ink" id={id}>
      {children}
    </h2>
  ),
  h3: ({ id, children, ...props }: H3Props) => (
    <h3 {...props} className="mt-8 scroll-mt-24 font-heading text-2xl text-ink" id={id}>
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-5 leading-8 text-muted">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  a: ({ href, children }) => (
    <a className="font-medium text-accent underline-offset-4 hover:underline" href={href}>
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-accent/60 pl-4 italic text-ink/85">{children}</blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-tint px-1.5 py-1 font-mono text-sm text-ink">{children}</code>
  )
};
