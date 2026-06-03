"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/app/components/ui/Reveal";
import { PROJECTS } from "@/app/lib/data";
import Image from "next/image";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "web", label: "Web App" },
  { key: "pm", label: "PM" },
  { key: "platform", label: "Platform" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.49.11-3.1 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.61.23 2.8.11 3.1.75.8 1.2 1.82 1.2 3.08 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = PROJECTS.filter((p) => p.categories.includes(activeFilter));

  return (
    <>
      <style>{`
        .proj-filter {
          display: inline-flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          padding: 0.4rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 99px;
          margin-bottom: 3rem;
        }
        .filter-btn {
          position: relative;
          padding: 0.55rem 1.2rem;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: none;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
          transition: color 0.4s var(--ease);
        }
        .filter-btn:hover { color: var(--text); }
        .filter-btn.active {
          color: #fff;
        }
        .filter-btn-bg {
          position: absolute;
          inset: 0;
          border-radius: 99px;
          background: var(--orange);
          z-index: -1;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(360px, 100%), 1fr));
          gap: 1.5rem;
        }
        .project-card {
          display: flex;
          flex-direction: column;
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          overflow: hidden;
          transition: transform 0.6s var(--ease), border-color 0.5s var(--ease), box-shadow 0.6s var(--ease);
        }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-warm);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
        }
        .project-thumb {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: var(--surface-2);
        }
        .project-image {
          object-fit: cover;
          transition: transform 0.9s var(--ease), filter 0.7s var(--ease);
        }
        .project-card:hover .project-image {
          transform: scale(1.08);
          filter: brightness(0.7);
        }
        .project-view {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: var(--scrim-image);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.5s var(--ease);
          z-index: 2;
        }
        .project-card:hover .project-view { opacity: 1; }
        .project-view-btn {
          padding: 0.7rem 1.3rem;
          background: var(--orange);
          color: #fff;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: 99px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transform: translateY(10px);
          transition: transform 0.5s var(--ease), background 0.3s var(--ease);
        }
        .project-view-btn:hover { background: var(--orange-light); }
        .project-card:hover .project-view-btn { transform: translateY(0); }

        .project-body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 1.75rem 1.75rem 2rem;
        }
        .project-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.9rem;
        }
        .project-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-sub);
          font-weight: 400;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .project-name {
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.025em;
          margin-bottom: 0.5rem;
        }
        .project-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin-bottom: 0;
          font-weight: 300;
          flex: 1;
        }
        .project-links {
          display: flex;
          gap: 1.5rem;
          padding-top: 1.25rem;
          margin-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .project-link {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.3s var(--ease);
        }
        .project-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s var(--ease);
        }
        .project-link:hover { color: var(--orange); }
        .project-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .project-link svg { width: 13px; height: 13px; }

        @media (max-width: 700px) {
          .projects-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
        @media (max-width: 480px) {
          .project-body { padding: 1.25rem 1.25rem 1.5rem; }
          .project-name { font-size: 1.2rem; }
          .project-desc { font-size: 0.85rem; }
          .project-links { gap: 1rem; }
        }
      `}</style>

      <section id="projects" className="section-container">
        <div className="section-wrap">
          <div className="section-index">05 / Selected Work</div>

          <div className="section-header">
            <Reveal>
              <div className="section-label">Selected Work</div>
              <h2 className="section-heading">
                Projects built with <em>care</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="section-intro" style={{ marginBottom: 0 }}>
                A small selection of products and platforms I&apos;ve designed,
                built, or led from concept to launch.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="proj-filter">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`filter-btn ${activeFilter === f.key ? "active" : ""}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {activeFilter === f.key && (
                    <motion.span
                      layoutId="filter-active"
                      className="filter-btn-bg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{f.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  layout
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease,
                    layout: { duration: 0.5, ease },
                  }}
                >
                  <div className="project-thumb">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="project-image"
                      sizes="(max-width: 700px) 100vw, 50vw"
                    />
                    <div className="project-view">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-view-btn"
                      >
                        View Live <ArrowUpRight />
                      </a>
                    </div>
                  </div>
                  <div className="project-body">
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-name">{project.name}</div>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-links">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Live Demo <ArrowUpRight />
                      </a>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Source <GithubIcon />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
