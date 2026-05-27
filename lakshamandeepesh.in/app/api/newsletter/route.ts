import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { formDataToObject } from '@/lib/forms/request';
import { configurationErrorResponse, genericErrorResponse, validationErrorResponse } from '@/lib/forms/response';
import { isLeadEmailConfigured, sendLeadEmail } from '@/lib/forms/resend';
import { newsletterFormSchema } from '@/lib/forms/validation';

export async function POST(request: Request) {
  try {
    const payload = newsletterFormSchema.parse(await formDataToObject(request));

    if (payload.company_website) {
      return NextResponse.json({ ok: true });
    }

    if (!isLeadEmailConfigured()) {
      return configurationErrorResponse();
    }

    await sendLeadEmail({
      subject: 'New newsletter signup',
      preview: 'A new newsletter signup was received from lakshmanadeepesh.in.',
      lines: [
        ['Email', payload.email],
        ['Source', payload.source || 'newsletter_form']
      ]
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return genericErrorResponse();
  }
}
