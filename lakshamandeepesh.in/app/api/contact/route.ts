import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { formDataToObject } from '@/lib/forms/request';
import { configurationErrorResponse, genericErrorResponse, validationErrorResponse } from '@/lib/forms/response';
import { isLeadEmailConfigured, sendLeadEmail } from '@/lib/forms/resend';
import { contactFormSchema } from '@/lib/forms/validation';

export async function POST(request: Request) {
  try {
    const payload = contactFormSchema.parse(await formDataToObject(request));

    if (payload.company_website) {
      return NextResponse.json({ ok: true });
    }

    if (!isLeadEmailConfigured()) {
      return configurationErrorResponse();
    }

    await sendLeadEmail({
      subject: `New strategy call inquiry from ${payload.name}`,
      preview: 'A new contact form submission was received from lakshmanadeepesh.in.',
      replyTo: payload.email,
      lines: [
        ['Name', payload.name],
        ['Email', payload.email],
        ['Help type', payload.helpType],
        ['Project type', payload.projectType],
        ['Timeline', payload.timeline],
        ['Message', payload.message]
      ]
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return genericErrorResponse();
  }
}
