import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const TO_EMAIL = 'fayakunachmadisa2010@gmail.com';
const FROM_EMAIL = 'contact@letsfaywme.my.id';
const FROM_NAME = 'Fayakun';

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

    const sanitized = (s: string) => s.replace(/[<>"'&]/g, c => ({ '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' })[c] || c);

    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject || 'New Message'} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '(no subject)'}\n\nMessage:\n${message}`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0b0a08;font-family:'DM Sans',Arial,sans-serif;">
  <table role="presentation" style="width:100%;max-width:560px;margin:0 auto;padding:40px 24px;">
    <tr>
      <td style="text-align:center;padding-bottom:32px;">
        <span style="font-size:28px;font-weight:700;letter-spacing:-0.03em;background:linear-gradient(180deg,#f2ece3 0%,#e8622a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Fayakun</span>
      </td>
    </tr>
    <tr>
      <td style="background:#12110e;border:1px solid rgba(242,236,227,0.08);border-radius:16px;padding:32px;">
        <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#e8622a;font-weight:600;margin-bottom:4px;">New Contact</div>
        <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#f2ece3;letter-spacing:-0.02em;">${sanitized(subject || 'New Message')}</h1>

        <table role="presentation" style="width:100%;">
          <tr><td style="padding:12px 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(242,236,227,0.5);">Name</td></tr>
          <tr><td style="padding:0 0 16px;font-size:15px;color:#f2ece3;">${sanitized(name)}</td></tr>
          <tr><td style="padding:12px 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(242,236,227,0.5);">Email</td></tr>
          <tr><td style="padding:0 0 16px;font-size:15px;color:#e8622a;"><a href="mailto:${sanitized(email)}" style="color:#e8622a;text-decoration:none;">${sanitized(email)}</a></td></tr>
          <tr><td style="padding:12px 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(242,236,227,0.5);">Message</td></tr>
          <tr><td style="padding:0;font-size:15px;color:rgba(242,236,227,0.85);line-height:1.7;white-space:pre-wrap;">${sanitized(message)}</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="text-align:center;padding-top:24px;font-size:12px;color:rgba(242,236,227,0.3);">
        letsfaywme.my.id — ${new Date().getFullYear()}
      </td>
    </tr>
  </table>
</body>
</html>`,
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
