import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const leadEmailTo = process.env.LEAD_EMAIL_TO;
const resendFrom = process.env.RESEND_FROM ?? 'Lakshmana Deepesh <onboarding@resend.dev>';

type SendLeadEmailInput = {
  subject: string;
  preview: string;
  lines: Array<[string, string]>;
  replyTo?: string;
};

type SendEmailInput = SendLeadEmailInput & {
  to: string;
};

export function isLeadEmailConfigured() {
  return Boolean(resendApiKey && leadEmailTo);
}

export async function sendEmail({ to, subject, preview, lines, replyTo }: SendEmailInput) {
  if (!resendApiKey) {
    throw new Error('Email delivery is not configured.');
  }

  const resend = new Resend(resendApiKey);
  const htmlRows = lines
    .map(([label, value]) => {
      const safeLabel = escapeHtml(label);
      const safeValue = escapeHtml(value);

      return `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;">${safeLabel}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">${safeValue}</td></tr>`;
    })
    .join('');

  const { error } = await resend.emails.send({
    from: resendFrom,
    to,
    ...(replyTo ? { replyTo } : {}),
    subject,
    text: [preview, '', ...lines.map(([label, value]) => `${label}: ${value}`)].join('\n'),
    html: `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;"><p>${escapeHtml(preview)}</p><table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:720px;">${htmlRows}</table></div>`
  });

  if (error) {
    throw new Error(`Email delivery failed: ${error.name}`);
  }
}

export async function sendLeadEmail({ subject, preview, lines, replyTo }: SendLeadEmailInput) {
  if (!resendApiKey || !leadEmailTo) {
    throw new Error('Lead email delivery is not configured.');
  }

  await sendEmail({ to: leadEmailTo, subject, preview, lines, replyTo });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
