'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function Counter({ value, duration = 1.6, suffix = '', className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf: number;
    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <motion.span ref={ref} className={className} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
      {display}
      {suffix}
    </motion.span>
  );
}
