"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/app/components/ui/MagneticButton";
import GradualBlur from "@/app/components/ui/GradualBlur";
import SideRays from "@/app/components/ui/SideRays";

const NAME = "Fayakun";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [ready, setReady] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window;
  }, []);

  const handleNameMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice.current || !nameRef.current) return;
    const rect = nameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const handler = () => setReady(true);
    window.addEventListener('loader:done', handler, { once: true });
    return () => window.removeEventListener('loader:done', handler);
  }, []);

  useEffect(() => {
    if (!ready) return;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed.length < NAME.length) {
        timeout = setTimeout(() => {
          setTyped(NAME.slice(0, typed.length + 1));
        }, 140);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 0);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 10000);
    } else if (phase === "deleting") {
      if (typed.length > 0) {
        timeout = setTimeout(() => {
          setTyped(NAME.slice(0, typed.length - 1));
        }, 70);
      } else {
        timeout = setTimeout(() => setPhase("typing"), 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [typed, phase, ready]);

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 2.5rem 6rem;
          max-width: 1300px;
          margin: 1rem auto 0;
          position: relative;
          overflow: hidden;
        }

        .hero-pretitle {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--orange);
          letter-spacing: 0.05em;
          margin-bottom: -4px;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          overflow: hidden;
        }
        .hero-pretitle::before {
          content: '';
          display: block;
          width: 2.5rem;
          height: 1px;
          background: var(--orange);
          opacity: 0.6;
          transform-origin: left;
          animation: lineGrow 1s var(--ease) 1.7s both;
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(4.5rem, 14vw, 11rem);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.2;
          color: var(--text);
          margin-bottom: 2rem;
          display: flex;
          cursor: default;
        }
        .hero-name__text {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          background: linear-gradient(180deg, var(--text) 0%, color-mix(in srgb, var(--text) 55%, transparent) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-name__glow {
          position: absolute;
          inset: -60% -30%;
          pointer-events: none;
          transition: opacity 0.35s ease;
          z-index: 0;
          will-change: transform, opacity;
          background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--text) 10%, transparent) 0%, transparent 55%);
        }
        .hero-name__visible {
          display: inline-block;
        }
        .hero-name__cursor {
          display: inline-block;
          width: 0.08em;
          height: 0.85em;
          margin-left: 0.04em;
          background: var(--orange);
          -webkit-text-fill-color: var(--orange);
          border-radius: 2px;
          transform: translateY(0.05em);
          animation: heroCursorBlink 1s steps(1) infinite;
        }
        @keyframes heroCursorBlink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }

        .hero-role {
          font-size: clamp(1.1rem, 2.2vw, 1.4rem);
          font-weight: 300;
          color: var(--text);
          letter-spacing: -0.005em;
          margin-bottom: 1rem;
          max-width: 30ch;
          line-height: 1.4;
        }
        .hero-role em {
          font-style: normal;
          color: var(--orange);
          font-weight: 400;
        }

        .hero-tagline {
          font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          color: var(--text-muted);
          max-width: 52ch;
          margin-bottom: 3.5rem;
          line-height: 1.7;
          font-weight: 300;
        }
        .hero-tagline em {
          font-style: normal;
          color: var(--text);
          font-weight: 500;
        }

        .hero-ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .hero-meta {
          position: absolute;
          bottom: 3rem;
          left: 2.5rem;
          right: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 2rem;
          pointer-events: none;
        }
        .hero-meta-left {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--text-sub);
          text-transform: uppercase;
          line-height: 1.7;
        }
        .hero-meta-left strong { color: var(--text-muted); font-weight: 500; }

        .hero-scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-sub);
          pointer-events: auto;
        }
        .scroll-line {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, var(--orange), transparent);
          animation: scrollLine 2.2s var(--ease) infinite;
        }

        .hero-bg {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: min(600px, 100%);
          height: min(600px, 100%);
          background: radial-gradient(circle, rgba(232, 98, 42, 0.12) 0%, transparent 60%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-rays {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.8;
        }

        @media (max-width: 900px) {
          .hero-meta { position: static; margin-top: 4rem; flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 700px) {
          .hero-section { padding: 0 1.5rem 4rem; margin: 0.5rem auto 0; }
        }
        @media (max-width: 520px) {
          .hero-name { font-size: clamp(3.2rem, 12vw, 4.5rem); }
          .hero-role { font-size: clamp(1.05rem, 3.2vw, 1.2rem); }
          .hero-tagline { margin-bottom: 2.5rem; }
        }
        @media (max-width: 400px) {
          .hero-name { font-size: clamp(3rem, 14vw, 4.5rem); }
          .hero-role { font-size: clamp(1rem, 4vw, 1.1rem); }
          .hero-tagline { font-size: 0.9rem; }
        }
      `}</style>

      <section id="hero" ref={ref} className="section-container">
        <motion.div className="hero-bg" style={{ opacity: bgOpacity, scale: bgScale }} />
        <div className="hero-rays">
          <SideRays
            speed={1.5}
            rayColor1="#EAB308"
            rayColor2="#f97316"
            intensity={1.2}
            spread={2.5}
            origin="top-right"
            tilt={-8}
            saturation={1.4}
            blend={0.6}
            falloff={2.2}
            opacity={0.5}
          />
        </div>
        <div className="hero-section">


          <motion.h1
            className="hero-name"
            style={{ y: nameY, opacity: nameOpacity }}
            ref={nameRef}
            onMouseMove={handleNameMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="hero-name__text">
              <span className="hero-name__visible">{typed || "\u00A0"}</span>
              <span className="hero-name__cursor" aria-hidden="true" />
              <span
                className="hero-name__glow"
                style={{
                  "--glow-x": `${mousePos.x}%`,
                  "--glow-y": `${mousePos.y}%`,
                  opacity: isHovering ? 1 : 0,
                } as React.CSSProperties}
              />
            </span>
          </motion.h1>

          <motion.p
            className="hero-role"
            style={{ y: subtitleY }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.3, duration: 0.85, ease }}
          >
            Turning complex ideas into <em>elegant digital products</em> with craft, clarity and modern technology.
          </motion.p>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.45, duration: 0.85, ease }}
          >
            I&apos;m <em>Fayakun</em> — a Project Manager &amp; Web Developer from Indonesia,
            bridging the gap between vision and execution with precision and craft.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.85, ease }}
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Get in Touch
            </MagneticButton>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.9 }}
          >
            <div className="hero-meta-left">
              <strong>Based in</strong> Batang, Indonesia<br />
              <strong>Working with</strong> clients worldwide
            </div>
            <a href="#about" className="hero-scroll" style={{ textDecoration: "none" }}>
              <span>Scroll</span>
              <div className="scroll-line" />
            </a>
          </motion.div>
          <GradualBlur preset="subtle" position="bottom" height="8rem" target="parent" divCount={6} curve="bezier" />
        </div>
      </section>
    </>
  );
}
