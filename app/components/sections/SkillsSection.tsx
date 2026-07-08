"use client";
import { useState } from "react";
import Reveal from "@/app/components/ui/Reveal";
import ScrollVelocity from "@/app/components/ui/ScrollVelocity";
import { SKILL_ROWS } from "@/app/lib/data";

export default function SkillsSection() {
  const rows = SKILL_ROWS;
  const totalStations = rows.reduce((sum, r) => sum + r.items.length, 0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="section-container">
      <div className="section-wrap">
        <div className="section-index">03 / Capabilities</div>

        <div className="skills-head">
          <div className="skills-head-left">
            <Reveal>
              <div className="section-label">Capabilities</div>
            </Reveal>
            <Reveal delay={0.1} blur>
              <h2 className="section-heading">
                A <em>toolkit</em> refined through craft.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.18} y={16}>
            <div className="skills-head-right">
              <p className="section-intro">
                Languages, frameworks, and the supporting tools I lean on to
                ship work that feels considered.
              </p>
              <div className="skills-stat">
                <div className="skills-stat-num">
                  {String(totalStations).padStart(2, '0')}
                </div>
                <div className="skills-stat-meta">
                  <div className="skills-stat-label">stations</div>
                  <div className="skills-stat-sub">{rows.length} lines · live</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="skills-velocity">
          {rows.map((row, index) => (
            <div
              key={row.number}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ScrollVelocity
                paused={hoveredIndex === index}
                texts={[(
                  <span className={`sv-pills sv-${row.accent}`}>
                    {row.items.map((s) => {
                      const Icon = s.icon;
                      return (
                        <span key={s.name} className="sv-pill">
                          <span className="sv-pill-icon"><Icon /></span>
                          <span className="sv-pill-name">{s.name}</span>
                        </span>
                      );
                    })}
                  </span>
                )]}
                velocity={index === 0 ? -80 : 80}
                numCopies={4}
                damping={30}
                stiffness={200}
                className={`sv-text sv-${row.accent}`}
                scrollerClassName="sv-scroller"
                scrollerStyle={{ willChange: 'transform' }}
              />
            </div>
          ))}
        </div>

        <Reveal delay={0.35}>
          <div className="skills-foot">
            <span className="skills-foot-dot" aria-hidden="true" />
            <span>Scrolling with velocity · feel the momentum</span>
            <span className="skills-foot-sep" aria-hidden="true" />
            <span className="skills-foot-mono">v.2 · {totalStations} nodes</span>
          </div>
        </Reveal>
      </div>

      <style>{`
        .skills-velocity {
          padding: 4rem 0 3rem;
          overflow-x: clip;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          user-select: text;
        }
        .sv-scroller {
          display: flex;
          white-space: nowrap;
          line-height: 1.3;
        }
        .sv-text {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .sv-pills {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sv-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 1rem 0.55rem 0.7rem;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--surface);
          transition: border-color 0.3s var(--ease);
        }
        .sv-pill-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .sv-orange .sv-pill-icon { color: var(--orange); background: var(--orange-dim); }
        .sv-amber .sv-pill-icon { color: var(--amber); background: rgba(212, 133, 58, 0.10); }
        .sv-pill-name {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text);
          letter-spacing: 0.005em;
        }
        .sv-orange + .sv-amber { margin-top: 0.5rem; }

        @media (max-width: 768px) {
          .skills-velocity { padding: 2.5rem 0 2rem; gap: 1rem; }
          .sv-pill { padding: 0.45rem 0.8rem 0.45rem 0.55rem; border-radius: 11px; gap: 0.45rem; }
          .sv-pill-icon { width: 30px; height: 30px; border-radius: 8px; font-size: 1rem; }
          .sv-pill-name { font-size: 0.78rem; }
          .sv-pills { gap: 0.75rem; }
        }
        @media (max-width: 480px) {
          .sv-pill { padding: 0.35rem 0.6rem 0.35rem 0.45rem; border-radius: 9px; gap: 0.35rem; }
          .sv-pill-icon { width: 24px; height: 24px; border-radius: 6px; font-size: 0.85rem; }
          .sv-pill-name { font-size: 0.7rem; }
          .sv-pills { gap: 0.5rem; }
        }
      `}</style>
    </section>
  );
}
