import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { formDataToObject } from '@/lib/forms/request';
import { configurationErrorResponse, genericErrorResponse, validationErrorResponse } from '@/lib/forms/response';
import { createNewsletterConfirmationToken, isNewsletterConfigured } from '@/lib/forms/newsletter';
import { sendEmail } from '@/lib/forms/resend';
import { newsletterFormSchema } from '@/lib/forms/validation';
import { siteConfig } from '@/lib/site-config';

export async function POST(request: Request) {
  try {
    const payload = newsletterFormSchema.parse(await formDataToObject(request));

    if (payload.company_website) {
      return NextResponse.json({ ok: true });
    }

    if (!isNewsletterConfigured()) {
      return configurationErrorResponse();
    }

    const token = createNewsletterConfirmationToken(payload.email);
    const confirmationUrl = new URL('/newsletter/confirm/', siteConfig.siteUrl);
    confirmationUrl.searchParams.set('token', token);

    await sendEmail({
      to: payload.email,
      subject: 'Confirm your newsletter subscription',
      preview: 'Confirm that you want practical notes on analytics, experimentation, AI workflows, and growth decisions.',
      lines: [
        ['Requested for', payload.email],
        ['Confirmation window', '24 hours']
      ],
      action: {
        label: 'Confirm subscription',
        url: confirmationUrl.toString()
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return genericErrorResponse();
  }
}
