import { z } from 'zod';

const emailSchema = z.string().trim().email('Enter a valid email.');
const optionalTextSchema = z.string().trim().max(2000).optional().default('');

export const honeypotSchema = z
  .string()
  .trim()
  .max(0, 'Spam check failed.')
  .optional()
  .default('');

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(120),
  email: emailSchema,
  helpType: z.string().trim().min(1, 'Choose a help type.').max(120),
  projectType: z.string().trim().min(1, 'Choose a project type.').max(120),
  timeline: z.string().trim().min(1, 'Choose a timeline.').max(120),
  message: z.string().trim().min(30, 'Share at least 30 characters of context.').max(5000),
  company_website: honeypotSchema
});

export const newsletterFormSchema = z.object({
  email: emailSchema,
  source: optionalTextSchema,
  company_website: honeypotSchema
});

export const waitlistFormSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(120),
  email: emailSchema,
  problem: z.string().trim().min(10, 'Share the problem you want solved.').max(3000),
  source: optionalTextSchema,
  company_website: honeypotSchema
});

export const toolResultSchema = z.object({
  toolSlug: z.string().trim().min(1).max(120),
  email: emailSchema,
  summary: z.string().trim().min(10).max(5000),
  headline: z.string().trim().min(1).max(500),
  stageFinding: z.string().trim().min(1).max(2000),
  diagnostics: z.array(z.string().trim().min(1).max(1000)).max(10),
  recommendedActions: z.array(z.string().trim().min(1).max(1000)).max(10),
  company_website: honeypotSchema
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type NewsletterFormInput = z.infer<typeof newsletterFormSchema>;
export type WaitlistFormInput = z.infer<typeof waitlistFormSchema>;
export type ToolResultInput = z.infer<typeof toolResultSchema>;
