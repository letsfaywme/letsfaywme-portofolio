"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Reveal from "@/app/components/ui/Reveal";
import Counter from "@/app/components/ui/Counter";
import { STATS } from "@/app/lib/data";

const ProfileCard = dynamic(() => import("@/app/components/ui/ProfileCard"), {
  ssr: false,
  loading: () => <div style={{ width: 340, height: 480, opacity: 0 }} />,
}) as unknown as React.ComponentType<Record<string, unknown>>;

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 5rem;
          align-items: center;
        }
        .about-card-wrap {
          position: relative;
          width: 100%;
          max-width: 420px;
          margin-left: auto;
          margin-right: auto;
          padding: 2rem 0;
        }

        .about-body {
          color: var(--text-muted);
          font-size: 1.02rem;
          line-height: 1.85;
          margin-bottom: 1.5rem;
          font-weight: 300;
          max-width: 56ch;
        }
        .about-body strong { color: var(--text); font-weight: 500; }

        .about-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          margin-top: 2.5rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--border);
        }
        .stat-num {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.03em;
          line-height: 1;
          display: flex;
          align-items: baseline;
        }
        .stat-num-suffix { color: var(--orange); font-weight: 500; margin-left: 2px; }
        .stat-label {
          font-size: 0.72rem;
          color: var(--text-sub);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 0.6rem;
        }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .about-card-wrap { max-width: 360px; margin: 0 auto; }
        }
        @media (max-width: 540px) {
          .about-stats { gap: 2rem; }
          .about-card-wrap { max-width: 300px; }
        }
        @media (max-width: 480px) {
          .about-grid { gap: 2rem; }
          .about-stats { gap: 1.5rem; justify-content: center; }
        }
        @media (max-width: 380px) {
          .about-card-wrap { max-width: 260px; }
          .about-body { font-size: 0.95rem; }
        }
      `}</style>

      <section id="about" className="section-container">
        <div className="section-wrap" ref={sectionRef}>
          <div className="section-index">02 / About</div>

          <div className="about-grid">
            <Reveal>
              <div className="about-card-wrap">
                <ProfileCard
                  avatarUrl="/foto-profil.jpeg"
                  grainUrl="/grain.svg"
                  name="Fayakun"
                  title=""
                  handle="letsfaywme"
                  status="Available"
                  contactText="Hire Me"
                  enableTilt={true}
                  enableMobileTilt={false}
                  mobileTiltSensitivity={2.5}
                  behindGlowEnabled={false}
                  onContactClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div className="section-label">About</div>
              </Reveal>
              <Reveal delay={0.1} blur>
                <h2 className="section-heading">
                  Crafting digital experiences with <em>intention</em>.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="about-body">
                  I&apos;m <strong>Fayakun</strong> — a Project Manager and Web Developer
                  passionate about crafting modern digital products. I specialize in
                  managing development workflows, designing engaging user
                  experiences, and building responsive websites that blend
                  creativity with functionality.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="about-body">
                  Turning ideas into sleek digital products with modern design,
                  clean code, and strategic execution. Focused on building
                  experiences that are both functional and visually impactful.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="about-stats">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <div className="stat-num">
                        <Counter value={parseInt(s.num)} duration={1.8} />
                        <span className="stat-num-suffix">{s.suffix}</span>
                      </div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
