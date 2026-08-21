import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';

import { ButtonLink } from '@/components/primitives/button';
import { Card } from '@/components/primitives/card';
import { Section } from '@/components/primitives/section';

export const metadata: Metadata = {
  title: 'Newsletter subscription confirmed | Lakshmana Deepesh',
  robots: { index: false, follow: false }
};

export default function NewsletterConfirmedPage() {
  return (
    <Section>
      <Card className="mx-auto max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <h1 className="mt-5 font-heading text-4xl font-semibold text-ink">You are subscribed.</h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
          Your email is confirmed. The next field note will arrive when it is published, and every issue will include an unsubscribe option.
        </p>
        <ButtonLink className="mt-7" href="/blog/" variant="secondary">Read the latest articles</ButtonLink>
      </Card>
    </Section>
  );
}
