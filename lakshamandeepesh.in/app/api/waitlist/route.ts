import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { formDataToObject } from '@/lib/forms/request';
import { checkRateLimit, rateLimitResponse } from '@/lib/forms/rate-limit';
import { configurationErrorResponse, genericErrorResponse, validationErrorResponse } from '@/lib/forms/response';
import { isLeadEmailConfigured, sendLeadEmail } from '@/lib/forms/resend';
import { waitlistFormSchema } from '@/lib/forms/validation';

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, { limit: 5, scope: 'waitlist', windowMs: 10 * 60 * 1000 });
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit);

  try {
    const payload = waitlistFormSchema.parse(await formDataToObject(request));

    if (payload.company_website) {
      return NextResponse.json({ ok: true });
    }

    if (!isLeadEmailConfigured()) {
      return configurationErrorResponse();
    }

    await sendLeadEmail({
      subject: `New product waitlist signup from ${payload.name}`,
      preview: 'A new product waitlist submission was received from lakshmanadeepesh.in.',
      replyTo: payload.email,
      lines: [
        ['Name', payload.name],
        ['Email', payload.email],
        ['Problem', payload.problem],
        ['Source', payload.source || 'waitlist_cta']
      ]
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return genericErrorResponse();
  }
}
