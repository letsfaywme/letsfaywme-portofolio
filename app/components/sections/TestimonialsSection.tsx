"use client";
import { motion } from "framer-motion";
import Reveal from "@/app/components/ui/Reveal";
import StaggerGroup from "@/app/components/ui/StaggerGroup";
import { TESTIMONIALS } from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TestimonialsSection() {
  return (
    <>
      <style>{`
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
          gap: 1.25rem;
        }
        @media (max-width: 700px) {
          .testi-grid { grid-template-columns: 1fr; }
          .testi-card { padding: 1.75rem 1.25rem 1.5rem; }
          .testi-quote { font-size: 2.2rem; }
        }
        @media (max-width: 480px) {
          .testi-grid { gap: 1rem; }
          .testi-card { padding: 1.5rem 1rem 1.25rem; }
          .testi-text { font-size: 0.88rem; }
        }
        .testi-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          padding: 2.25rem 2rem 1.75rem;
          transition: transform 0.5s var(--ease), border-color 0.5s var(--ease), background 0.5s var(--ease);
          overflow: hidden;
        }
        .testi-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, rgba(232, 98, 42, 0.06), transparent 50%);
          opacity: 0;
          transition: opacity 0.5s var(--ease);
          pointer-events: none;
        }
        .testi-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-warm);
        }
        .testi-card:hover::before { opacity: 1; }

        .testi-quote {
          font-family: var(--font-display);
          font-size: 3rem;
          line-height: 0.7;
          color: var(--orange);
          margin-bottom: 1rem;
          font-weight: 700;
          opacity: 0.4;
          position: relative;
        }
        .testi-text {
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.75;
          margin-bottom: 2rem;
          font-weight: 300;
          position: relative;
        }
        .testi-author {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          position: relative;
        }
        .testi-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--orange-dim);
          border: 1px solid var(--border-warm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--orange);
          flex-shrink: 0;
          letter-spacing: -0.02em;
          transition: transform 0.4s var(--ease);
        }
        .testi-card:hover .testi-avatar { transform: scale(1.05); }
        .testi-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text);
        }
        .testi-role {
          font-size: 0.72rem;
          color: var(--text-sub);
          margin-top: 0.15rem;
        }
      `}</style>

      <section id="testimonials" className="section-container">
        <div className="section-wrap">
          <div className="section-index">08 / Kind Words</div>

          <div className="section-header">
            <Reveal>
              <div className="section-label">Kind Words</div>
              <h2 className="section-heading">
                What people <em>say</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="section-intro" style={{ marginBottom: 0 }}>
                Trusted by founders, teams, and clients to deliver work that
                makes a difference.
              </p>
            </Reveal>
          </div>

          <StaggerGroup className="testi-grid" stagger={0.1} delay={0.1} duration={0.75}>
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} className="testi-card">
                <div className="testi-quote">&ldquo;</div>
                <p className="testi-text">{t.quote}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
