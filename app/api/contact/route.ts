import { NextResponse } from 'next/server';

const EMAILJS_SERVICE_ID = 'service_1744rum';
const EMAILJS_TEMPLATE_ID = 'template_sdewqok';
const EMAILJS_PUBLIC_KEY = 'vAdEUTmFjKoesK7Sn';
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: { name, email, subject, message },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
