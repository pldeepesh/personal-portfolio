'use client';

import { sendGAEvent } from '@next/third-parties/google';

export type AnalyticsParams = Record<string, string | number | boolean>;

export type AnalyticsEventName =
  | 'cta_clicked'
  | 'cta_strategy_call_clicked'
  | 'case_study_opened'
  | 'tool_started'
  | 'tool_completed'
  | 'tool_result_copied'
  | 'tool_result_downloaded'
  | 'tool_result_emailed'
  | 'newsletter_signup_submitted'
  | 'contact_form_submitted'
  | 'waitlist_signup_submitted'
  | 'blog_cta_clicked'
  | 'product_waitlist_clicked'
  | 'topic_click'
  | 'post_read_75';

export function trackEvent(eventName: AnalyticsEventName, params?: AnalyticsParams) {
  if (typeof window === 'undefined') {
    return;
  }

  const eventParams = params ?? {};

  sendGAEvent('event', eventName, eventParams);
  window.dispatchEvent(new CustomEvent('site:analytics', { detail: { eventName, params: eventParams } }));

  const debugWindow = window as typeof window & {
    __analyticsEvents?: Array<{ eventName: AnalyticsEventName; params: AnalyticsParams }>;
  };

  debugWindow.__analyticsEvents?.push({ eventName, params: eventParams });
}
