export interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const sanitized = (s: string) => s.replace(/[<>"'&]/g, c => ({ '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' })[c] || c);

export function ContactEmailHtml({ name, email, subject, message }: ContactEmailProps): string {
  const s = (v: string) => sanitized(v);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;600;700;800;900&display=swap');
    body {
      margin: 0;
      padding: 0;
      background: #050505;
      font-family: 'DM Sans', 'Segoe UI', Helvetica, sans-serif;
      color: #ffffff;
    }
    .container {
      max-width: 560px;
      margin: 40px auto;
      background: #0b0b0b;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 22px;
      overflow: hidden;
    }
    .header {
      padding: 45px 40px;
      background: linear-gradient(135deg, #0f0f0f 0%, #1a120d 100%);
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .logo {
      font-size: 34px;
      font-weight: 800;
      letter-spacing: -1px;
      color: #ffffff;
      margin: 0;
      font-family: 'DM Serif Display', Georgia, 'Times New Roman', serif;
    }
    .logo span { color: #ff6a1a; }
    .title {
      margin: 18px 0 0;
      font-size: 42px;
      font-weight: 900;
      line-height: 1.1;
      color: #ffffff;
      letter-spacing: -1.5px;
    }
    .title span { color: #ff6a1a; }
    .content { padding: 40px; }
    .card {
      background: #111111;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 18px;
      padding: 28px;
      margin-bottom: 24px;
    }
    .label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #888;
      margin: 0 0 8px;
    }
    .value {
      font-size: 16px;
      color: #fff;
      line-height: 1.7;
      word-break: break-word;
      margin: 0;
    }
    .link-value {
      font-size: 16px;
      color: #ff6a1a;
      line-height: 1.7;
      word-break: break-word;
      text-decoration: none;
    }
    .message-box {
      background: rgba(255, 106, 26, 0.05);
      border: 1px solid rgba(255, 106, 26, 0.15);
    }
    .button {
      display: inline-block;
      margin-top: 10px;
      padding: 16px 28px;
      background: #ff6a1a;
      color: #ffffff;
      text-decoration: none;
      border-radius: 12px;
      font-weight: bold;
      letter-spacing: 0.5px;
      font-size: 16px;
    }
    .footer {
      padding: 28px 40px;
      border-top: 1px solid rgba(255,255,255,0.05);
      text-align: center;
    }
    .footer p {
      margin: 0;
      color: #666;
      font-size: 13px;
    }
    @media only screen and (max-width: 600px) {
      .header, .content, .footer { padding: 28px; }
      .title { font-size: 30px; }
    }
  </style>
</head>
<body>
  <table role="presentation" style="width:100%;background:#050505;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" class="container" style="width:100%;max-width:560px;background:#0b0b0b;border:1px solid rgba(255,255,255,0.06);border-radius:22px;border-collapse:separate;overflow:hidden;">
          <tr>
            <td class="header" style="padding:45px 40px;background:linear-gradient(135deg,#0f0f0f 0%,#1a120d 100%);border-bottom:1px solid rgba(255,255,255,0.05);">
              <div class="logo" style="font-size:34px;font-weight:800;letter-spacing:-1px;color:#fff;font-family:'DM Serif Display',Georgia,'Times New Roman',serif;">Faya<span style="color:#ff6a1a;">kun</span></div>
              <div class="title" style="margin:18px 0 0;font-size:42px;font-weight:900;line-height:1.1;color:#fff;letter-spacing:-1.5px;">New Project <span style="color:#ff6a1a;">Inquiry</span></div>
            </td>
          </tr>
          <tr>
            <td class="content" style="padding:40px;">
              <table role="presentation" style="width:100%;">
                <tr>
                  <td class="card" style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:28px;margin-bottom:24px;">
                    <div class="label" style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;margin:0 0 8px;">Client Name</div>
                    <div class="value" style="font-size:16px;color:#fff;line-height:1.7;word-break:break-word;margin:0;">${s(name)}</div>
                  </td>
                </tr>
                <tr>
                  <td class="card" style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:28px;margin-bottom:24px;">
                    <div class="label" style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;margin:0 0 8px;">Email Address</div>
                    <a href="mailto:${s(email)}" class="link-value" style="font-size:16px;color:#ff6a1a;line-height:1.7;word-break:break-word;text-decoration:none;">${s(email)}</a>
                  </td>
                </tr>
                <tr>
                  <td class="card" style="background:#111;border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:28px;margin-bottom:24px;">
                    <div class="label" style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;margin:0 0 8px;">Subject</div>
                    <div class="value" style="font-size:16px;color:#fff;line-height:1.7;word-break:break-word;margin:0;">${s(subject)}</div>
                  </td>
                </tr>
                <tr>
                  <td class="card message-box" style="background:rgba(255,106,26,0.05);border:1px solid rgba(255,106,26,0.15);border-radius:18px;padding:28px;margin-bottom:24px;">
                    <div class="label" style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;margin:0 0 8px;">Project Message</div>
                    <div class="value" style="font-size:16px;color:#fff;line-height:1.7;word-break:break-word;margin:0;white-space:pre-wrap;">${s(message)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:10px;">
                    <a href="mailto:${s(email)}" class="button" style="display:inline-block;padding:16px 28px;background:#ff6a1a;color:#fff;text-decoration:none;border-radius:12px;font-weight:bold;letter-spacing:0.5px;font-size:16px;">Reply Client</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="footer" style="padding:28px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
              <p style="margin:0;color:#666;font-size:13px;">&copy; ${new Date().getFullYear()} Fayakun Portfolio &mdash; Direct Contact System</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
