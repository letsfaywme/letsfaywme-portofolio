"use client";
import { useState, FormEvent, ReactElement, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/app/components/ui/Reveal";
import StaggerGroup from "@/app/components/ui/StaggerGroup";
import GradualBlur from "@/app/components/ui/GradualBlur";


const ease = [0.22, 1, 0.36, 1] as const;

const GmailIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Gmail">
    <path fill="#4285F4" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
    <path fill="#fff" d="M11 13.5L4 8.5V6.4l7 4.4 7-4.4v2.1l-7 5z" opacity="0.95" />
    <path fill="#34A853" d="M11 13.5L4 8.5V18c0 .55.45 1 1 1h2v-7.5L11 13.5z" opacity="0.9" />
    <path fill="#FBBC04" d="M11 13.5L18 8.5V18c0 .55-.45 1-1 1h-2v-7.5l-4 2z" opacity="0.9" />
    <path fill="#EA4335" d="M4 6.4V8.5l7 5 7-5V6.4l-7 4.4-7-4.4z" opacity="0.9" />
  </svg>
);

const WhatsappIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp">
    <path fill="#25D366" d="M12 2C6.48 2 2 6.48 2 12c0 1.94.55 3.74 1.5 5.27L2 22l4.83-1.47C8.32 21.45 10.12 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    <path fill="#fff" d="M16.6 14.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const SOCIAL_ICONS: Record<string, ReactElement> = {
  GitHub: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.49.11-3.1 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.61.23 2.8.11 3.1.75.8 1.2 1.82 1.2 3.08 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  Discord: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.32 4.85a18.8 18.8 0 0 0-4.64-1.44.07.07 0 0 0-.08.04c-.2.36-.42.83-.57 1.2a17.32 17.32 0 0 0-5.2 0 9.3 9.3 0 0 0-.58-1.2.08.08 0 0 0-.08-.04A18.72 18.72 0 0 0 4.66 4.85a.07.07 0 0 0-.03.03C2.1 8.8 1.4 12.64 1.73 16.42v.04a.08.08 0 0 0 .03.06A18.75 18.75 0 0 0 7.1 19.72a.08.08 0 0 0 .09-.01 13.2 13.2 0 0 0 1.13-1.83.08.08 0 0 0-.04-.1 12.34 12.34 0 0 1-1.73-.83.08.08 0 0 1-.02-.13l.34-.27a.07.07 0 0 1 .07-.01c3.65 1.66 7.59 1.66 11.2 0a.07.07 0 0 1 .08.01l.33.27a.08.08 0 0 1-.01.14 11.9 11.9 0 0 1-1.74.82.08.08 0 0 0-.04.1c.35.65.75 1.26 1.13 1.83a.08.08 0 0 0 .09.01 18.7 18.7 0 0 0 5.37-3.2.08.08 0 0 0 .03-.06c.39-4.32-.68-8.13-2.82-11.54a.05.05 0 0 0-.03-.02zM8.8 14.12c-1.05 0-1.92-.96-1.92-2.14s.84-2.15 1.92-2.15c1.09 0 1.96.97 1.93 2.15 0 1.18-.84 2.14-1.93 2.14zm6.4 0c-1.06 0-1.92-.96-1.92-2.14s.84-2.15 1.92-2.15c1.09 0 1.96.97 1.93 2.15 0 1.18-.84 2.14-1.93 2.14z" />
    </svg>
  ),
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.39A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.39 5.86 5.86 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.39-2.13A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  ),
};

const SOCIALS = [
  { href: "https://github.com/letsfaywme", label: "GitHub" },
  { href: "https://www.linkedin.com/in/fayakun-achamd-isa-378a043a5/", label: "LinkedIn" },
  { href: "https://discord.com/users/letsfaywme_", label: "Discord" },
  { href: "https://instagram.com/letsfaywme", label: "Instagram" },
];

function Toast({ visible, type, onDismiss }: { visible: boolean; type: 'success' | 'error'; onDismiss: () => void }) {
  const isError = type === 'error';
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onDismiss, isError ? 6000 : 4000);
      return () => clearTimeout(t);
    }
  }, [visible, onDismiss, isError]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, scale: 0.95, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease }}
          style={{
            position: 'fixed', top: '6rem', right: '1.5rem', zIndex: 9999,
            background: 'var(--surface)',
            border: `1px solid var(${isError ? '--orange' : '--success-border'})`,
            borderRadius: 14, padding: '0.85rem 1.25rem',
            boxShadow: '0 16px 40px var(--shadow-color)',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            maxWidth: 360,
          }}
          role="status"
          aria-live="polite"
        >
          <motion.svg
            width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke={isError ? 'var(--orange)' : 'var(--success)'} strokeWidth="2.5"
            initial={{ pathLength: 0, rotate: -90, opacity: 0 }}
            animate={{ pathLength: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            {isError ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M5 12l5 5L20 7" />
            )}
          </motion.svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
              {isError ? 'Failed to send' : 'Message sent'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
              {isError ? 'Please try again or contact me directly.' : 'Thanks for reaching out! I\'ll reply within 24h.'}
            </span>
          </div>
          <button
            onClick={onDismiss}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 4, marginLeft: 'auto', flexShrink: 0,
              color: 'var(--text-sub)', lineHeight: 0,
            }}
            aria-label="Dismiss notification"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; type: 'success' | 'error' }>({ visible: false, type: 'success' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Contact API error:', { status: res.status, statusText: res.statusText, body: text });
        setToast({ visible: true, type: 'error' });
        return;
      }
      form.reset();
      setToast({ visible: true, type: 'success' });
    } catch (err) {
      console.error('Contact fetch error:', err);
      setToast({ visible: true, type: 'error' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .form-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-sub);
          font-weight: 500;
        }
        .form-input,
        .form-textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 0.85rem 0;
          color: var(--text);
          font-family: var(--font-body);
          font-size: 1rem;
          outline: none;
          resize: none;
          width: 100%;
          transition: border-color 0.5s var(--ease), padding 0.4s var(--ease);
          border-radius: 0;
        }
        .form-input:hover,
        .form-textarea:hover { border-bottom-color: var(--text-sub); }
        .form-input:focus,
        .form-textarea:focus {
          border-bottom-color: var(--orange);
          padding-left: 0.4rem;
        }
        .form-input::placeholder,
        .form-textarea::placeholder { color: var(--text-sub); transition: color 0.4s var(--ease); }
        .form-input:focus::placeholder,
        .form-textarea:focus::placeholder { color: var(--text-muted); }
        .form-textarea { min-height: 130px; }

        .form-submit {
          margin-top: 1rem;
          width: fit-content;
          padding: 1rem 2rem;
          background: var(--orange);
          color: #fff;
          border: none;
          border-radius: 99px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: none;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: background 0.4s var(--ease), transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
        }
        .form-submit:hover {
          background: var(--orange-light);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(232, 98, 42, 0.35);
        }
        .form-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .form-submit-arrow {
          transition: transform 0.4s var(--ease);
        }
        .form-submit:hover .form-submit-arrow { transform: translateX(4px); }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .contact-side {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .contact-card {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          transition: padding 0.4s var(--ease);
        }
        .contact-card:hover { padding-left: 0.5rem; }
        .contact-card-icon {
          width: 48px;
          height: 48px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.4s var(--ease), background 0.4s var(--ease), transform 0.4s var(--ease);
        }
        .contact-card:hover .contact-card-icon {
          border-color: var(--border-warm);
          background: var(--orange-dim);
          transform: scale(1.05) rotate(-3deg);
        }
        .contact-card-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-sub);
          margin-bottom: 0.2rem;
        }
        .contact-card-val {
          display: block;
          font-size: 1rem;
          color: var(--text);
          font-weight: 400;
          transition: color 0.3s var(--ease);
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .contact-card:hover .contact-card-val { color: var(--orange-light); }

        .whatsapp-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.2rem;
          background: rgba(37, 211, 102, 0.08);
          border: 1px solid rgba(37, 211, 102, 0.2);
          border-radius: 99px;
          color: #25d366;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: background 0.4s var(--ease), transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
          width: fit-content;
        }
        .whatsapp-cta:hover {
          background: rgba(37, 211, 102, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.2);
        }

        .social-row {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .social-btn {
          width: 42px;
          height: 42px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: var(--text-muted);
          transition: all 0.4s var(--ease);
          cursor: none;
        }
        .social-btn:hover {
          border-color: var(--border-warm);
          background: var(--orange-dim);
          color: var(--orange);
          transform: translateY(-3px) rotate(-3deg);
        }

        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr; gap: 3rem; }
        }
        @media (max-width: 640px) {
          .contact-layout { gap: 2rem; }
          .form-textarea { min-height: 100px; }
          .form-submit { width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) {
          .contact-card-val { font-size: 0.88rem; }
          .contact-card-icon { width: 38px; height: 38px; }
          .contact-side { gap: 1.5rem; }
          .social-btn { width: 38px; height: 38px; }
        }
        @media (hover: none) {
          .form-submit, .social-btn { cursor: auto; }
        }
      `}</style>

      <Toast visible={toast.visible} type={toast.type} onDismiss={() => setToast({ visible: false, type: 'success' })} />

      <section id="contact" className="section-container">
        <div className="section-wrap">
          <div className="section-index">10 / Get in Touch</div>

          <div className="section-header" style={{ marginBottom: "3.5rem" }}>
            <Reveal>
              <div className="section-label">Get in Touch</div>
              <h2 className="section-heading">
                Let&apos;s build something <em>great</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="section-intro" style={{ marginBottom: 0 }}>
                Have a project in mind, a role to discuss, or just want to say
                hello? Drop a message and I&apos;ll get back to you shortly.
              </p>
            </Reveal>
          </div>

          <div className="contact-layout">
            <Reveal delay={0.2}>
              <motion.form
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input name="name" type="text" className="form-input" placeholder="e.g. Ahmad Rizki" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input name="email" type="email" className="form-input" placeholder="hello@example.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input name="subject" type="text" className="form-input" placeholder="What is this about?" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-textarea" placeholder="Tell me a bit about your project..." required />
                </div>
                <button type="submit" className="form-submit" disabled={sending}>
                  {sending ? (
                    <>
                      <span className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="form-submit-arrow"><ArrowRight /></span>
                    </>
                  )}
                </button>
              </motion.form>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="contact-side">
                <StaggerGroup stagger={0.08} delay={0.2} duration={0.7}>
                  <div>
                    <div className="section-label">Direct Contact</div>

                    <a href="mailto:fayakunachmadisa2010@gmail.com" className="contact-card">
                      <div className="contact-card-icon">
                        <GmailIcon size={22} />
                      </div>
                      <div>
                        <div className="contact-card-label">Email</div>
                        <span className="contact-card-val">fayakunachmadisa2010@gmail.com</span>
                      </div>
                    </a>

                    <a href="https://wa.me/6285702236578" target="_blank" rel="noopener noreferrer" className="contact-card">
                      <div className="contact-card-icon">
                        <WhatsappIcon size={22} />
                      </div>
                      <div>
                        <div className="contact-card-label">WhatsApp</div>
                        <span className="contact-card-val">+62 857 0223 6578</span>
                      </div>
                    </a>

                    <div style={{ marginTop: "1.5rem" }}>
                      <a
                        href="https://wa.me/6285702236578?text=Hi+Fayakun,+I'd+like+to+discuss+a+project"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-cta"
                      >
                        <WhatsappIcon size={18} />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="section-label" style={{ marginBottom: "1.25rem" }}>Elsewhere</div>
                    <div className="social-row">
                      {SOCIALS.map((s) => (
                        <motion.a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn"
                          title={s.label}
                          aria-label={s.label}
                          whileHover={{ y: -3, rotate: -3 }}
                          transition={{ duration: 0.4, ease }}
                        >
                          {SOCIAL_ICONS[s.label]}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </StaggerGroup>
              </div>
            </Reveal>
          </div>
          <GradualBlur preset="subtle" position="bottom" height="8rem" target="parent" divCount={6} curve="bezier" />
        </div>
      </section>
    </>
  );
}
