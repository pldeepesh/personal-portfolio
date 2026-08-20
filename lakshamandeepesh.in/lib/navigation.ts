export type NavigationItem = {
  href: string;
  label: string;
  shortLabel?: string;
  description: string;
  matchPrefixes?: string[];
  priority: number;
};

export const primaryNavigation: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    description: 'Landing page and featured pathways.',
    priority: 1
  },
  {
    href: '/work/',
    label: 'Work',
    description: 'Case studies and delivery outcomes.',
    priority: 2
  },
  {
    href: '/blog/',
    label: 'Blog',
    description: 'Articles, frameworks, and topic-led search depth.',
    matchPrefixes: ['/blog/', '/topics/'],
    priority: 3
  },
  {
    href: '/products/',
    label: 'Products',
    description: 'Practical tools and productized workflows.',
    matchPrefixes: ['/products/'],
    priority: 4
  },
  {
    href: '/about/',
    label: 'About',
    description: 'Background, craft, and working style.',
    priority: 5
  },
  {
    href: '/contact/',
    label: 'Contact',
    description: 'Ways to connect and start a project.',
    priority: 6
  }
];

export const secondaryNavigation: NavigationItem[] = [
  {
    href: '/topics/',
    label: 'Topics',
    shortLabel: 'Atlas',
    description: 'Topic hub atlas for clustered search intent.',
    priority: 1
  },
  {
    href: '/feed.xml',
    label: 'Feed',
    description: 'RSS feed for new writing.',
    priority: 2
  }
];

function normalizePathname(pathname: string): string {
  if (pathname === '/') return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function isNavigationItemActive(pathname: string, item: NavigationItem): boolean {
  const normalizedPath = normalizePathname(pathname);
  const prefixes = item.matchPrefixes ?? [item.href];

  return prefixes.some((prefix) => {
    const normalizedPrefix = normalizePathname(prefix);
    return normalizedPath === normalizedPrefix || normalizedPath.startsWith(normalizedPrefix);
  });
}
