import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function validationErrorResponse(error: ZodError) {
  const fields = Object.fromEntries(
    error.issues.map((issue) => [issue.path.join('.') || 'form', issue.message])
  );

  return NextResponse.json({ error: 'Invalid submission.', fields }, { status: 400 });
}

export function configurationErrorResponse() {
  return NextResponse.json({ error: 'Form delivery is not configured.' }, { status: 503 });
}

export function genericErrorResponse() {
  return NextResponse.json({ error: 'Could not submit right now.' }, { status: 500 });
}
