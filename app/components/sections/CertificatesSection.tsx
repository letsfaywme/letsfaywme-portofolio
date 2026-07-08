"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "@/app/components/ui/Reveal";
import StaggerGroup from "@/app/components/ui/StaggerGroup";
import { CERTIFICATES } from "@/app/lib/data";

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
                Certificates &amp; <em>learning</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="section-intro" style={{ marginBottom: 0 }}>
                Continuous learning is part of the practice — these are
                credentials earned along the way.
              </p>
            </Reveal>
          </div>

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
