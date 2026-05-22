'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Contact Form <contact@coltonwirgau.me>';
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: bots will fill this hidden field. Pretend success so they stop trying.
  if (formData.get('website')) {
    return { status: 'success', message: 'Thanks, I’ll be in touch soon.' };
  }

  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  const errors: ContactFormState['errors'] = {};
  if (name.length < 2) errors.name = 'Please tell me your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'A valid email address, please.';
  if (message.length < 10) errors.message = 'Just a little more detail, please.';

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors };
  }

  if (!TO_EMAIL) {
    console.error('CONTACT_TO_EMAIL env var is not set');
    return { status: 'error', message: 'Contact form is not configured yet. Try again soon.' };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <p style="font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin: 0 0 16px;">Portfolio Contact</p>
          <p style="margin: 0 0 4px;"><strong>${escapeHtml(name)}</strong></p>
          <p style="margin: 0 0 20px; color: #555;"><a href="mailto:${escapeHtml(email)}" style="color: #D94420;">${escapeHtml(email)}</a></p>
          <div style="white-space: pre-wrap; line-height: 1.6; padding: 16px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">${escapeHtml(message)}</div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { status: 'error', message: 'Something broke on my end. Try again, or email me directly.' };
    }

    return { status: 'success', message: 'Thanks, I’ll be in touch soon.' };
  } catch (err) {
    console.error('Contact form exception:', err);
    return { status: 'error', message: 'Something broke on my end. Try again, or email me directly.' };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
