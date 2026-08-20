import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { configurationErrorResponse, genericErrorResponse, validationErrorResponse } from '@/lib/forms/response';
import { isLeadEmailConfigured, sendEmail, sendLeadEmail } from '@/lib/forms/resend';
import { toolResultSchema } from '@/lib/forms/validation';

export async function POST(request: Request) {
  try {
    const payload = toolResultSchema.parse(await request.json());

    if (payload.company_website) {
      return NextResponse.json({ ok: true });
    }

    if (!isLeadEmailConfigured()) {
      return configurationErrorResponse();
    }

    await sendEmail({
      to: payload.email,
      subject: 'Your Funnel Drop Diagnostic result',
      preview: 'Here is the Funnel Drop Diagnostic result you requested.',
      lines: [
        ['Headline', payload.headline],
        ['Summary', payload.summary],
        ['Stage finding', payload.stageFinding],
        ['Diagnostic questions', payload.diagnostics.join('\n')],
        ['Recommended actions', payload.recommendedActions.join('\n')]
      ]
    });

    await sendLeadEmail({
      subject: `Tool result lead: ${payload.toolSlug}`,
      preview: 'A Funnel Drop Diagnostic result was emailed from lakshmanadeepesh.in.',
      replyTo: payload.email,
      lines: [
        ['Email', payload.email],
        ['Tool', payload.toolSlug],
        ['Headline', payload.headline],
        ['Summary', payload.summary]
      ]
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return genericErrorResponse();
  }
}
