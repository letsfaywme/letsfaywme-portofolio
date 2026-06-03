'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
    restDelta: 0.001,
  });

  return (
    <div className="scroll-progress">
      <motion.div ref={ref} className="scroll-progress-bar" style={{ scaleX }} />
    </div>
  );
}
