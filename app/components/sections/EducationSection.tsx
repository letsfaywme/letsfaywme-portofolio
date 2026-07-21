"use client";
import { useState } from "react";
import Reveal from "@/app/components/ui/Reveal";
import { SCHOOLS } from "@/app/lib/data";

function visibleAchievements(
  achievements: (typeof SCHOOLS)[number]["achievements"],
  expanded: boolean,
) {
  const LIMIT = 3;
  return expanded ? achievements : achievements.slice(0, LIMIT);
}

export default function EducationSection() {
  const [expandedSchool, setExpandedSchool] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .edu-timeline {
          position: relative;
        }
        .edu-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent 0%, var(--border) 6%, var(--border) 94%, transparent 100%);
          transform: translateX(-0.5px);
        }

        .edu-item {
          display: flex;
          position: relative;
          padding: 2.5rem 0;
          width: 100%;
        }
        .edu-item[data-side="left"] {
          justify-content: flex-start;
        }
        .edu-item[data-side="right"] {
          justify-content: flex-end;
        }

        .edu-item__dot {
          position: absolute;
          left: 50%;
          top: 3rem;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: var(--orange);
          border: 2px solid var(--charcoal);
          z-index: 2;
          transform: translateX(-50%);
          transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
        }
        .edu-item[data-index="2"] .edu-item__dot {
          width: 18px; height: 18px;
          box-shadow: 0 0 20px rgba(232,98,42,0.3);
        }
        .edu-item:hover .edu-item__dot {
          transform: translateX(-50%) scale(1.25);
          box-shadow: 0 0 24px rgba(232,98,42,0.45);
        }

        .edu-item__card {
          width: calc(50% - 3rem);
          border: 1px solid var(--border);
          border-radius: var(--r);
          padding: 1.5rem 1.75rem;
          background: var(--surface);
          transition: border-color 0.4s var(--ease), transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
          position: relative;
        }
        .edu-item[data-side="left"] .edu-item__card {
          margin-right: auto;
        }
        .edu-item[data-side="right"] .edu-item__card {
          margin-left: auto;
        }
        .edu-item__card:hover {
          border-color: var(--border-warm);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px -12px rgba(232,98,42,0.15);
        }

        .edu-item__year {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: var(--orange);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          padding: 0.2rem 0.75rem;
          border: 1px solid var(--border-warm);
          border-radius: 20px;
          background: var(--orange-dim);
          width: fit-content;
        }
        .edu-item__year::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--orange);
          flex-shrink: 0;
        }

        .edu-item__name {
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 1.8vw, 1.35rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
          line-height: 1.15;
          margin: 0 0 0.15rem;
        }
        .edu-item__major {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 0.85rem;
        }
        .edu-item__achievements {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          align-items: baseline;
        }
        .ach-regular {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 300;
          line-height: 1.6;
          width: 100%;
        }
        .ach-chip {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 16px;
          font-size: 0.74rem;
          font-weight: 440;
          line-height: 1.4;
          transition: all 0.35s var(--ease);
        }
        .ach-more {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          padding: 0.25rem 0.65rem;
          border-radius: 16px;
          font-size: 0.72rem;
          font-weight: 500;
          background: transparent;
          border: 1px dashed var(--border);
          color: var(--text-muted);
          transition: all 0.3s var(--ease);
        }
        .ach-more:hover {
          border-color: var(--orange);
          color: var(--orange);
          background: var(--orange-dim);
        }
        .ach-less {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-sub);
          padding: 0.2rem 0;
          transition: color 0.3s var(--ease);
          width: 100%;
          margin-top: 0.15rem;
        }
        .ach-less:hover { color: var(--orange); }
        .ach-orange {
          background: rgba(232, 98, 42, 0.07)
          ;
          border: 1px solid rgba(232, 98, 42, 0.18);
          color: var(--orange-light);
        }
        .ach-orange:hover {
          background: rgba(232, 98, 42, 0.12);
          border-color: rgba(232, 98, 42, 0.3);
          transform: translateY(-1px);
        }
        .ach-amber {
          background: rgba(212, 133, 58, 0.07);
          border: 1px solid rgba(212, 133, 58, 0.18);
          color: var(--amber);
        }
        .ach-amber:hover {
          background: rgba(212, 133, 58, 0.12);
          border-color: rgba(212, 133, 58, 0.3);
          transform: translateY(-1px);
        }

        .edu-item__connect {
          position: absolute;
          top: 3rem;
          height: 1px;
          width: 1.5rem;
          background: var(--border);
          z-index: 1;
        }
        .edu-item[data-side="left"] .edu-item__connect {
          left: calc(50% + 7px);
        }
        .edu-item[data-side="right"] .edu-item__connect {
          right: calc(50% + 7px);
        }

        @media (max-width: 768px) {
          .edu-timeline::before { left: 20px; }
          .edu-item { padding: 1.5rem 0; }
          .edu-item__dot { left: 20px; top: 2.25rem; width: 12px; height: 12px; }
          .edu-item[data-index="2"] .edu-item__dot { width: 15px; height: 15px; }
          .edu-item[data-side="left"],
          .edu-item[data-side="right"] { justify-content: flex-start; }
          .edu-item__card { width: calc(100% - 3rem); margin-left: 2.5rem !important; }
          .edu-item__connect { display: none; }
          .edu-item__year { font-size: 0.68rem; }
          .ach-chip { font-size: 0.7rem; padding: 0.2rem 0.6rem; }
          .ach-regular { font-size: 0.8rem; }
        }
        @media (max-width: 480px) {
          .edu-item { padding: 1rem 0; }
          .edu-item__card { padding: 0.9rem 1.1rem; width: calc(100% - 2.5rem); margin-left: 2rem !important; }
          .edu-item__dot { left: 16px; top: 1.75rem; width: 10px; height: 10px; }
          .edu-timeline::before { left: 16px; }
          .edu-item__name { font-size: 0.95rem; margin-bottom: 0; }
          .edu-item__major { font-size: 0.68rem; margin-bottom: 0.6rem; }
          .edu-item__year { font-size: 0.6rem; padding: 0.1rem 0.45rem; margin-bottom: 0.35rem; }
          .edu-item__achievements { gap: 0.25rem; }
          .ach-chip { font-size: 0.6rem; padding: 0.1rem 0.45rem; border-radius: 10px; }
          .ach-regular { font-size: 0.72rem; line-height: 1.5; }
        }
        @media (max-width: 380px) {
          .edu-item__card { width: calc(100% - 2rem); margin-left: 1.5rem !important; padding: 0.75rem 0.9rem; }
          .edu-item__dot { left: 12px; }
          .edu-timeline::before { left: 12px; }
        }
      `}</style>

      <section id="education" className="section-container">
        <div className="section-wrap">
          <div className="section-index">04 / Education</div>

          <div className="section-header">
            <div>
              <Reveal>
                <div className="section-label">Education</div>
              </Reveal>
              <Reveal delay={0.1} blur>
                <h2 className="section-heading">
                  Where it all <em>began</em>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="section-intro">
                The foundation that shaped me — from a curious kid to a builder
                and leader.
              </p>
            </Reveal>
          </div>

          <div className="edu-timeline">
            {SCHOOLS.map((s, i) => {
              const expanded = expandedSchool === i;
              const hidden = s.achievements.length - 3;
              return (
                <Reveal key={s.school} delay={i * 0.15}>
                  <div
                    className="edu-item"
                    data-side={i % 2 === 0 ? "left" : "right"}
                    data-index={i}
                  >
                    <div className="edu-item__dot" />
                    <div className="edu-item__connect" />
                    <div className="edu-item__card">
                      <div className="edu-item__year">{s.period}</div>
                      <h3 className="edu-item__name">{s.school}</h3>
                      {s.major && (
                        <div className="edu-item__major">{s.major}</div>
                      )}
                      <div className="edu-item__achievements">
                        {visibleAchievements(s.achievements, expanded).map(
                          (a) =>
                            a.type === "regular" ? (
                              <span key={a.text} className="ach-regular">
                                {a.text}
                              </span>
                            ) : (
                              <span
                                key={a.text}
                                className={`ach-chip ${a.type === "leadership" ? "ach-orange" : "ach-amber"}`}
                              >
                                {a.text}
                              </span>
                            ),
                        )}
                        {!expanded && hidden > 0 && (
                          <span
                            className="ach-more"
                            onClick={() => setExpandedSchool(i)}
                          >
                            +{hidden} more
                          </span>
                        )}
                        {expanded && (
                          <span
                            className="ach-less"
                            onClick={() => setExpandedSchool(null)}
                          >
                            ← Show less
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
