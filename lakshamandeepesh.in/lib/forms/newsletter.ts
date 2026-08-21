import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const newsletterSegmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
const tokenLifetimeMs = 24 * 60 * 60 * 1000;

type ConfirmationPayload = {
  email: string;
  expiresAt: number;
};

export function isNewsletterConfigured() {
  return Boolean(resendApiKey && newsletterSegmentId);
}

export function createNewsletterConfirmationToken(email: string) {
  const key = getEncryptionKey();
  const initializationVector = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, initializationVector);
  const payload: ConfirmationPayload = {
    email,
    expiresAt: Date.now() + tokenLifetimeMs
  };
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), 'utf8'),
    cipher.final()
  ]);
  const authenticationTag = cipher.getAuthTag();

  return [initializationVector, ciphertext, authenticationTag]
    .map((part) => part.toString('base64url'))
    .join('.');
}

export function readNewsletterConfirmationToken(token: string): ConfirmationPayload | null {
  try {
    const [initializationVectorValue, ciphertextValue, authenticationTagValue, extra] = token.split('.');
    if (!initializationVectorValue || !ciphertextValue || !authenticationTagValue || extra) return null;

    const decipher = createDecipheriv(
      'aes-256-gcm',
      getEncryptionKey(),
      Buffer.from(initializationVectorValue, 'base64url')
    );
    decipher.setAuthTag(Buffer.from(authenticationTagValue, 'base64url'));
    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(ciphertextValue, 'base64url')),
      decipher.final()
    ]).toString('utf8');
    const payload = JSON.parse(plaintext) as Partial<ConfirmationPayload>;

    if (
      typeof payload.email !== 'string' ||
      !/^\S+@\S+\.\S+$/.test(payload.email) ||
      typeof payload.expiresAt !== 'number' ||
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    return { email: payload.email, expiresAt: payload.expiresAt };
  } catch {
    return null;
  }
}

export async function confirmNewsletterContact(email: string) {
  if (!resendApiKey || !newsletterSegmentId) {
    throw new Error('Newsletter delivery is not configured.');
  }

  const resend = new Resend(resendApiKey);
  const existing = await resend.contacts.get({ email });

  if (existing.error?.statusCode === 404) {
    const created = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: [{ id: newsletterSegmentId }]
    });
    if (created.error) throw new Error(`Contact creation failed: ${created.error.name}`);
    return;
  }

  if (existing.error) throw new Error(`Contact lookup failed: ${existing.error.name}`);

  const updated = await resend.contacts.update({ email, unsubscribed: false });
  if (updated.error) throw new Error(`Contact update failed: ${updated.error.name}`);

  const segments = await resend.contacts.segments.list({ email, limit: 100 });
  if (segments.error) throw new Error(`Contact segment lookup failed: ${segments.error.name}`);

  if (!segments.data?.data.some((segment) => segment.id === newsletterSegmentId)) {
    const added = await resend.contacts.segments.add({
      email,
      segmentId: newsletterSegmentId
    });
    if (added.error) throw new Error(`Contact segment update failed: ${added.error.name}`);
  }
}

function getEncryptionKey() {
  if (!resendApiKey) throw new Error('Newsletter delivery is not configured.');

  return createHash('sha256')
    .update(`lakshmanadeepesh.in:newsletter-confirmation:v1:${resendApiKey}`)
    .digest();
}
