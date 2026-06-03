"use client";
import Reveal from "@/app/components/ui/Reveal";
import Marquee from "@/app/components/ui/Marquee";
import { SKILL_ROWS } from "@/app/lib/data";

export default function SkillsSection() {
  const rows = SKILL_ROWS;
  const totalStations = rows.reduce((sum, r) => sum + r.items.length, 0);

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

        <Reveal delay={0.25} y={24}>
          <div className="transit-map">
            <div className="transit-map__bg" aria-hidden="true" />
            {rows.map((row, i) => (
              <Marquee
                key={row.number}
                items={row.items}
                number={row.number}
                label={row.label}
                accent={row.accent}
                direction={i % 2 === 0 ? 'left' : 'right'}
                speed={row.items.length}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="skills-foot">
            <span className="skills-foot-dot" aria-hidden="true" />
            <span>Lines run on a continuous loop · hover to board</span>
            <span className="skills-foot-sep" aria-hidden="true" />
            <span className="skills-foot-mono">v.2 · {totalStations} nodes</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
