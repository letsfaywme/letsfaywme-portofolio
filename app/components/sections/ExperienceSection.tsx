"use client";
import { motion } from "framer-motion";
import Reveal from "@/app/components/ui/Reveal";
import { EXPERIENCES } from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ExperienceSection() {
  return (
    <>
      <style>{`
        .exp-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 5rem;
          align-items: start;
        }
        .exp-list {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .exp-item {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 2.5rem;
          padding: 2.5rem 0;
          border-top: 1px solid var(--border);
          transition: padding 0.4s var(--ease);
          position: relative;
        }
        .exp-item:last-child { border-bottom: 1px solid var(--border); }
        .exp-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--orange);
          transition: width 0.7s var(--ease) 0.2s;
        }
        .exp-item:hover::before { width: 100%; }
        .exp-item:hover { padding-left: 0.75rem; }
        .exp-item:hover .exp-role { color: var(--orange-light); }

        .exp-period {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          color: var(--orange);
          padding-top: 0.25rem;
        }
        .exp-role {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 2vw, 1.55rem);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
          line-height: 1.2;
          transition: color 0.4s var(--ease);
        }
        .exp-company {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: 0.85rem;
          font-weight: 500;
        }
        .exp-desc {
          font-size: 0.93rem;
          color: var(--text-muted);
          line-height: 1.75;
          max-width: 56ch;
          font-weight: 300;
        }

        @media (max-width: 900px) {
          .exp-layout { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 768px) {
          .exp-item { grid-template-columns: 120px 1fr; gap: 1.5rem; padding: 1.75rem 0; }
        }
        @media (max-width: 640px) {
          .exp-item { grid-template-columns: 1fr; gap: 0.35rem; padding: 1.5rem 0; }
          .exp-role { font-size: clamp(1.15rem, 4.5vw, 1.3rem); }
          .exp-desc { font-size: 0.88rem; }
          .exp-period { font-size: 0.72rem; }
        }
        @media (max-width: 480px) {
          .exp-layout { gap: 1.5rem; }
          .exp-company { font-size: 0.85rem; }
        }
        @media (max-width: 400px) {
          .exp-company { margin-bottom: 0.6rem; font-size: 0.85rem; }
          .exp-desc { font-size: 0.84rem; line-height: 1.65; }
        }
      `}</style>

      <section id="experience" className="section-container">
        <div className="section-wrap">
          <div className="section-index">04 / Experience</div>

          <div className="exp-layout">
            <div>
              <Reveal>
                <div className="section-label">Experience</div>
              </Reveal>
              <Reveal delay={0.1} blur>
                <h2 className="section-heading">
                  A journey of <em>building</em>.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="section-intro">
                  Selected roles where I&apos;ve led teams, shipped products, and
                  helped founders turn ideas into reality.
                </p>
              </Reveal>
            </div>

            <div className="exp-list">
              {EXPERIENCES.map((exp, i) => (
                <Reveal key={exp.role + exp.company} delay={i * 0.12}>
                  <div className="exp-item">
                    <motion.div
                      className="exp-period"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                      transition={{ duration: 0.6, delay: 0.1, ease }}
                    >
                      {exp.period}
                    </motion.div>
                    <div>
                      <div className="exp-role">{exp.role}</div>
                      <div className="exp-company">{exp.company}</div>
                      <p className="exp-desc">{exp.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
