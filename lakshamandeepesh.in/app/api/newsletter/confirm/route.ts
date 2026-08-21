import { NextResponse } from 'next/server';

import { formDataToObject } from '@/lib/forms/request';
import { confirmNewsletterContact, readNewsletterConfirmationToken } from '@/lib/forms/newsletter';

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;

  try {
    const form = await formDataToObject(request);
    const token = typeof form.token === 'string' ? form.token : '';
    const payload = token.length <= 2000 ? readNewsletterConfirmationToken(token) : null;

    if (!payload) {
      return NextResponse.redirect(new URL('/newsletter/confirm/?status=invalid', origin), 303);
    }

    await confirmNewsletterContact(payload.email);
    return NextResponse.redirect(new URL('/newsletter/confirmed/', origin), 303);
  } catch {
    return NextResponse.redirect(new URL('/newsletter/confirm/?status=error', origin), 303);
  }
}
