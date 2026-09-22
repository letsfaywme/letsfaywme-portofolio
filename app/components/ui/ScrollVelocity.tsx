'use client';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import {
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import './ScrollVelocity.css';

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  paused?: boolean;
}

function VelocityText({
  children,
  baseVelocity = 100,
  scrollContainerRef,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
  paused = false,
}: VelocityTextProps) {
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const dirRef = useRef(1);
  const vfRef = useRef(0);
  const posRef = useRef(0);

  useEffect(() => {
    const unsub = velocityFactor.on('change', (v: number) => { vfRef.current = v });
    return unsub;
  }, [velocityFactor]);

  function wrap(min: number, max: number, v: number) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  useEffect(() => {
    const element = scrollerRef.current;
    if (!element || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let rafId: number;
    let prevTime: number | null = null;
    let visible = false;

    function tick(time: number) {
      if (prevTime === null) prevTime = time;
      const delta = Math.min(time - prevTime, 50);
      prevTime = time;

      {
        const vf = vfRef.current;
        if (vf < 0) dirRef.current = -1;
        else if (vf > 0) dirRef.current = 1;

        let moveBy = dirRef.current * baseVelocity * (delta / 1000);
        moveBy += dirRef.current * moveBy * vf;
        posRef.current += moveBy;
      }

      if (scrollerRef.current && copyWidth > 0) {
        scrollerRef.current.style.transform = `translate3d(${wrap(-copyWidth, 0, posRef.current)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    }

    const updatePlayback = () => {
      cancelAnimationFrame(rafId);
      prevTime = null;
      if (visible && !document.hidden) rafId = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
    };
  }, [baseVelocity, copyWidth, paused]);

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span className={className} key={i} ref={i === 0 ? copyRef : null} aria-hidden={i > 0 ? true : undefined}>
        {children}&nbsp;
      </span>
    );
  }

  return (
    <div className={parallaxClassName} style={parallaxStyle}>
      <div
        ref={scrollerRef}
        className={scrollerClassName}
        style={scrollerStyle}
      >
        {spans}
      </div>
    </div>
  );
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts?: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  paused?: boolean;
}

export default function ScrollVelocity({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
  paused = false,
}: ScrollVelocityProps) {
  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          paused={paused}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
}
