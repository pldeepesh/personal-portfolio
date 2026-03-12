'use client';

import { useEffect, useRef } from 'react';

import { trackEvent } from '@/lib/analytics';

type ReadingProgressProps = {
  slug: string;
};

export function ReadingProgress({ slug }: ReadingProgressProps) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollableHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const ratio = window.scrollY / scrollableHeight;
      if (!hasTrackedRef.current && ratio >= 0.75) {
        hasTrackedRef.current = true;
        trackEvent('post_read_75', { slug });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [slug]);

  return null;
}
