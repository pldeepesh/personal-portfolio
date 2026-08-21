export const siteConfig = {
  siteName: 'Lakshmana Deepesh',
  authorName: 'Lakshmana Deepesh Reddy',
  siteDescription:
    'Experimentation and growth analytics insights, case studies, and practical tools for better product decisions.',
  siteUrl: 'https://lakshmanadeepesh.in',
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '',
  publisherLogo: '/img/header-bg-og.jpg',
  defaultOgImage: '/img/header-bg-og.jpg',
  social: {
    linkedin: 'https://www.linkedin.com/in/lakshmanadeepesh',
    github: 'https://www.github.com/pldeepesh',
    x: 'https://twitter.com/lakshmandeepesh'
  },
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL ?? 'https://calendar.app.google/MfnmNJtqAmmwRgqM9',
  contactFormAction: '/api/contact',
  waitlistFormAction: '/api/waitlist',
  newsletterFormAction: '/api/newsletter'
} as const;

export type SiteConfig = typeof siteConfig;
