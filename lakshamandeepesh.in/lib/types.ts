export type Author = {
  name: string;
  slug: string;
  role: string;
  bio: string;
};

export type PostFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  author: Author;
  topic: string;
  tags: string[];
  coverImage: string;
  ogImage: string;
  canonicalUrl: string;
  readingTimeMinutes: number;
  draft: boolean;
  featured: boolean;
  relatedSlugs: string[];
  relatedTools: string[];
  relatedCaseStudies: string[];
  cta?: {
    label: string;
    href: string;
  };
};

export type PostSummary = PostFrontmatter;

export type Heading = {
  id: string;
  level: 2 | 3;
  text: string;
};

export type Post = PostFrontmatter & {
  content: string;
  headings: Heading[];
};

export type TopicDefinition = {
  slug: string;
  title: string;
  description: string;
  pillarSlug: string;
  intentKeywords: string[];
  heroImage: string;
  spotlightImage: string;
  supportImage: string;
};

export type ToolStatus = 'live' | 'coming-soon' | 'planned';

export type ToolDefinition = {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: ToolStatus;
  ctaLabel: string;
  searchIntentCopy: string;
  metaDescription?: string;
  keywords?: string[];
  inputType: string;
  estimatedTime: string;
  eventName: string;
  seoTitle: string;
  seoDescription: string;
  relatedArticles: string[];
  relatedCaseStudies: string[];
  resultCapture: boolean;
};

export type ToolResult = {
  toolSlug: string;
  email?: string;
  headline?: string;
  summary: string;
  stageFinding?: string;
  diagnostics: string[];
  recommendedActions: string[];
  createdAt?: string;
};

export type LeadFormPayload = {
  name: string;
  email: string;
  helpType: string;
  projectType: string;
  timeline: string;
  message: string;
};

export type NewsletterSignupPayload = {
  email: string;
  source?: string;
};

export type WaitlistSignupPayload = {
  name: string;
  email: string;
  problem: string;
  source?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  relatedTools: string[];
  relatedArticles: string[];
};
