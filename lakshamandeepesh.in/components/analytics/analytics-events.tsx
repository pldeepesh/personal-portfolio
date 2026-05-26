'use client';

import { useEffect } from 'react';

import { type AnalyticsEventName, type AnalyticsParams, trackEvent } from '@/lib/analytics';

function parseParams(value: string | undefined): AnalyticsParams | undefined {
  if (!value) return undefined;

  try {
    return JSON.parse(value) as AnalyticsParams;
  } catch (_error) {
    return undefined;
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trackedElement = target.closest<HTMLElement>('[data-analytics-event]');
      if (!trackedElement) return;

      const eventName = trackedElement?.dataset.analyticsEvent as AnalyticsEventName | undefined;
      if (!eventName) return;

      trackEvent(eventName, parseParams(trackedElement.dataset.analyticsParams));
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
