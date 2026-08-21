import type { Metadata } from 'next';

import { Button } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Section } from '@/components/primitives/section';

export const metadata: Metadata = {
  title: 'Confirm newsletter subscription | Lakshmana Deepesh',
  robots: { index: false, follow: false }
};

type ConfirmationPageProps = {
  searchParams: Promise<{ token?: string; status?: string }>;
};

export default async function NewsletterConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { token, status } = await searchParams;
  const validRequest = typeof token === 'string' && token.length > 0 && token.length <= 2000;
  const hasError = status === 'invalid' || status === 'error' || !validRequest;

  return (
    <Section>
      <Card className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Newsletter</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold text-ink">
          {hasError ? 'This confirmation link cannot be used.' : 'Confirm your subscription.'}
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
          {hasError
            ? 'The link may have expired or already been altered. Request a fresh confirmation from the newsletter page.'
            : 'One final click confirms that you asked to receive practical field notes. You can unsubscribe from any issue.'}
        </p>
        {validRequest && !hasError ? (
          <form action="/api/newsletter/confirm/" className="mt-7" method="post">
            <input name="token" type="hidden" value={token} />
            <Button type="submit">Confirm subscription</Button>
          </form>
        ) : (
          <a className="btn-primary mt-7 inline-flex" href="/newsletter/">Request a new confirmation</a>
        )}
      </Card>
    </Section>
  );
}
