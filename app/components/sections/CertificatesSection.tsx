"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "@/app/components/ui/Reveal";
import StaggerGroup from "@/app/components/ui/StaggerGroup";
import { ACHIEVEMENTS, CERTIFICATES } from "@/app/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export default function CertificatesSection() {
  return (
    <>
      <style>{`
        .achievements { margin-bottom: clamp(3rem, 6vw, 5rem); }
        .credentials-subheading {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2.5vw, 1.65rem);
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.025em;
          margin: 0 0 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .credentials-subheading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }
        .achievement-card {
          --medal: #dca574;
          --medal-dark: #714522;
          --medal-glow: rgba(220, 165, 116, 0.10);
          position: relative;
          min-width: 0;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          border: 1px solid var(--border);
          border-top: 2px solid var(--medal);
          border-radius: var(--r-lg);
          background: radial-gradient(ellipse at 100% 0%, var(--medal-glow), transparent 65%), var(--surface);
          display: flex;
          flex-direction: column;
          overflow-wrap: anywhere;
        }
        .achievement-card[data-medal="silver"] {
          --medal: #c3cedb;
          --medal-dark: #4a5b70;
          --medal-glow: rgba(195, 206, 219, 0.10);
        }
        .achievement-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .achievement-award { display: flex; align-items: center; gap: 0.85rem; }
        .achievement-medal {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid var(--medal);
          background: linear-gradient(135deg, #fff3df, var(--medal) 45%, var(--medal-dark));
          color: #211c18;
          box-shadow: inset 0 0 0 4px var(--medal-dark), inset 0 0 0 5px var(--medal);
        }
        .achievement-rank { color: var(--text); font-weight: 600; font-size: 1.05rem; }
        .achievement-year {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-sub);
          padding: 0.4rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 100px;
        }
        .achievement-project {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: var(--text);
          margin: 0 0 0.75rem;
        }
        .achievement-description { color: var(--text-sub); font-size: 0.95rem; line-height: 1.65; margin: 0 0 2rem; max-width: 38ch; }
        .achievement-details { margin-top: auto; padding-top: 1.25rem; border-top: 1px solid var(--border); }
        .achievement-competition { color: var(--text); font-size: 0.95rem; line-height: 1.65; margin: 0 0 0.75rem; }
        .achievement-scope { color: var(--text-sub); font-family: var(--font-mono); font-size: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
        .achievement-scope::before { content: ''; width: 5px; height: 5px; flex-shrink: 0; border-radius: 50%; background: var(--medal); }
        @media (max-width: 700px) {
          .achievements-grid { grid-template-columns: minmax(0, 1fr); }
        }
        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: view()) {
            .achievement-card {
              animation: achievement-reveal linear both;
              animation-timeline: view();
              animation-range: entry 0% entry 90%;
            }
          }
        }
        @keyframes achievement-reveal {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
          gap: 1.25rem;
        }
        .cert-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          overflow: hidden;
          transition: transform 0.5s var(--ease), border-color 0.5s var(--ease), box-shadow 0.5s var(--ease);
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }
        .cert-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-warm);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35);
        }

        .cert-preview {
          position: relative;
          aspect-ratio: 4/3;
          background:
            radial-gradient(circle at 30% 30%, rgba(232, 98, 42, 0.12), transparent 60%),
            linear-gradient(180deg, var(--surface-2) 0%, var(--charcoal) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .cert-preview::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.5;
          transition: opacity 0.5s var(--ease);
        }
        .cert-card:hover .cert-preview::before { opacity: 0.8; }

        .cert-paper {
          position: relative;
          z-index: 1;
          width: 78%;
          max-width: 240px;
          aspect-ratio: 1158/846;
          background: #ffffff;
          border-radius: 10px;
          padding: 12% 10%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(0, 0, 0, 0.04);
          transition: transform 0.6s var(--ease), box-shadow 0.6s var(--ease);
        }
        .cert-card:hover .cert-paper {
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            0 18px 44px rgba(232, 98, 42, 0.28),
            0 0 0 1px rgba(0, 0, 0, 0.04);
        }
        .cert-paper-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }
        .cert-paper-stripe {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--orange), var(--amber));
          border-radius: 10px 10px 0 0;
        }

        .cert-arrow {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--scrim);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: color 0.3s var(--ease), background 0.4s var(--ease), transform 0.4s var(--ease);
          z-index: 2;
        }
        .cert-card:hover .cert-arrow {
          background: var(--orange);
          color: #fff;
          border-color: var(--orange);
          transform: rotate(45deg) scale(1.05);
        }

        .cert-body { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }
        .cert-issuer {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 0.5rem;
        }
        .cert-name {
          font-family: var(--font-display);
          font-size: 1.02rem;
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.015em;
          line-height: 1.35;
          margin-bottom: 0.5rem;
          transition: color 0.3s var(--ease);
        }
        .cert-card:hover .cert-name { color: var(--orange-light); }
        .cert-date {
          font-size: 0.78rem;
          color: var(--text-sub);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: auto;
        }
        .cert-date::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--orange);
          opacity: 0.5;
        }

        @media (max-width: 640px) {
          .certs-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
          .cert-body { padding: 1.2rem; }
          .cert-name { font-size: 0.92rem; }
        }
        @media (max-width: 480px) {
          .certs-grid { grid-template-columns: 1fr; }
          .cert-paper { width: 78%; }
        }
        @media (max-width: 380px) {
          .certs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="certificates" className="section-container">
        <div className="section-wrap">
          <div className="section-index">07 / Credentials</div>

          <div className="section-header">
            <Reveal>
              <div className="section-label">Credentials</div>
              <h2 className="section-heading">
                Certificates &amp; <em>achievements</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="section-intro" style={{ marginBottom: 0 }}>
                From continuous learning to award-winning projects — milestones
                earned by putting ideas into practice.
              </p>
            </Reveal>
          </div>

          <section className="achievements" aria-labelledby="achievements-heading">
            <h3 id="achievements-heading" className="credentials-subheading">Current Achievements</h3>
            <div className="achievements-grid">
              {ACHIEVEMENTS.map((achievement) => (
                <article key={achievement.project} className="achievement-card" data-medal={achievement.medal} lang="id" aria-labelledby={`achievement-${achievement.project}`}>
                  <div className="achievement-top">
                    <div className="achievement-award">
                      <span className="achievement-medal" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M8 3h8v5a4 4 0 0 1-8 0V3ZM8 5H5v2a4 4 0 0 0 4 4m7-6h3v2a4 4 0 0 1-4 4M12 12v5m-4 4h8m-6-4h4v4h-4z" />
                        </svg>
                      </span>
                      <span className="achievement-rank">Juara {achievement.rank}</span>
                    </div>
                    <time className="achievement-year" dateTime={achievement.year}>{achievement.year}</time>
                  </div>
                  <h4 id={`achievement-${achievement.project}`} className="achievement-project">{achievement.project}</h4>
                  <p className="achievement-description">{achievement.description}</p>
                  <div className="achievement-details">
                    <p className="achievement-competition">{achievement.competition}</p>
                    <div className="achievement-scope">{achievement.scope}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <h3 className="credentials-subheading">Certificates &amp; Learning</h3>
          <StaggerGroup className="certs-grid" stagger={0.05} delay={0.15} y={24} duration={0.7}>
            {CERTIFICATES.map((cert) => (
              <motion.a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="cert-preview">
                  <div className="cert-paper">
                    <div className="cert-paper-stripe" />
                    <Image
                      src={cert.image || "/dicoding.png"}
                      alt={`${cert.issuer} certificate`}
                      width={1158}
                      height={846}
                      className="cert-paper-img"
                      sizes="(max-width: 540px) 160px, 240px"
                    />
                  </div>
                  <div className="cert-arrow">
                    <ArrowUpRight />
                  </div>
                </div>
                <div className="cert-body">
                  <div className="cert-issuer">{cert.issuer}</div>
                  <div className="cert-name">{cert.name}</div>
                  <div className="cert-date">{cert.date}</div>
                </div>
              </motion.a>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
