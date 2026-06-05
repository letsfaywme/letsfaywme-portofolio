import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const TO_EMAIL = 'fayakunachmadisa2010@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';
const FROM_NAME = 'Fayakun Portfolio';

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject || 'New Message'} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '(no subject)'}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
