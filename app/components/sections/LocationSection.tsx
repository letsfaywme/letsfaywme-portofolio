"use client";
import { motion } from "framer-motion";
import Reveal from "@/app/components/ui/Reveal";
import LocationMap from "../ui/LocationMap";

const ease = [0.22, 1, 0.36, 1] as const;

export default function LocationSection() {
  return (
    <>
      <style>{`
        .loc-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 4rem;
          align-items: stretch;
        }
        .loc-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2.5rem;
        }
        .loc-city {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .loc-region {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 36ch;
          font-weight: 300;
        }
        .loc-region strong { color: var(--orange); font-weight: 500; }
        .loc-meta {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .loc-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 0.85rem;
          transition: padding 0.4s var(--ease);
        }
        .loc-meta-row:hover { padding-left: 0.4rem; }
        .loc-meta-label {
          color: var(--text-sub);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .loc-meta-value {
          color: var(--text);
          font-weight: 500;
        }
        .loc-status {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1rem;
          background: var(--success-bg);
          border: 1px solid var(--success-border);
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--success);
          letter-spacing: 0.02em;
          width: fit-content;
          cursor: pointer;
          transition: background 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .loc-status:hover {
          background: rgba(37, 211, 102, 0.15);
          border-color: rgba(37, 211, 102, 0.35);
          transform: translateY(-1px);
        }
        .loc-status-dot {
          width: 7px;
          height: 7px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
          animation: locDotPulse 2.4s var(--ease) infinite;
        }
        @keyframes locDotPulse {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
          70% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
        .loc-map {
          position: relative;
          border-radius: var(--r-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          min-height: 380px;
        }
        .loc-map iframe {
          width: 100%;
          height: 100%;
          min-height: 380px;
          border: 0;
          filter: grayscale(0.6) contrast(1.05);
          transition: filter 0.6s var(--ease);
        }
        .loc-map:hover iframe { filter: grayscale(0.2) contrast(1.05); }
        @media (max-width: 900px) {
          .loc-layout { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 640px) {
          .loc-map { min-height: 260px; }
          .loc-map iframe { min-height: 260px; }
        }
        @media (max-width: 480px) {
          .loc-layout { gap: 1.5rem; }
          .loc-info { gap: 1.5rem; }
          .loc-map { min-height: 200px; }
          .loc-map iframe { min-height: 200px; }
        }
        @media (hover: none) {
          .loc-status { cursor: auto; }
        }
      `}</style>

      <section id="location" className="section-container">
        <div className="section-wrap">
          <div className="section-index">09 / Based In</div>

          <div className="loc-layout">
            <Reveal>
              <div className="loc-info">
                <div>
                  <div className="section-label">Based In</div>
                  <div className="loc-city">Batang,<br />Indonesia 🇮🇩</div>
                  <p className="loc-region">
                    Working with clients across <strong>APAC</strong>, <strong>Europe</strong>,
                    and <strong>North America</strong> — async-first, timezone-flexible.
                  </p>
                </div>
                <div>
                  <div className="loc-meta">
                    {[
                      { label: "Timezone", value: "UTC +7 (WIB)" },
                      { label: "Languages", value: "Indonesian, English" },
                      { label: "Remote", value: "Yes — Worldwide" },
                    ].map((row) => (
                      <motion.div
                        key={row.label}
                        className="loc-meta-row"
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                        transition={{ duration: 0.6, ease }}
                      >
                        <span className="loc-meta-label">{row.label}</span>
                        <span className="loc-meta-value">{row.value}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div style={{ marginTop: "1.5rem" }}>
                    <a
                      href="https://www.google.com/maps?q=-6.939573703556067,109.75465997796861"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="loc-status"
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="loc-status-dot" />
                      Open on Maps
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <motion.div
                className="loc-map"
                initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
              >
                <LocationMap />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
