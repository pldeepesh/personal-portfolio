import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { configurationErrorResponse, genericErrorResponse, validationErrorResponse } from '@/lib/forms/response';
import { isLeadEmailConfigured, sendLeadEmail } from '@/lib/forms/resend';
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

    await sendLeadEmail({
      subject: `Tool result lead: ${payload.toolSlug}`,
      preview: 'A Funnel Drop Diagnostic result was submitted from lakshmanadeepesh.in.',
      lines: [
        ['Email', payload.email],
        ['Tool', payload.toolSlug],
        ['Headline', payload.headline],
        ['Summary', payload.summary],
        ['Stage finding', payload.stageFinding],
        ['Diagnostic questions', payload.diagnostics.join('\n')],
        ['Recommended actions', payload.recommendedActions.join('\n')]
      ]
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return validationErrorResponse(error);
    return genericErrorResponse();
  }
}
