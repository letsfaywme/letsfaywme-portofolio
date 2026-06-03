'use client';
import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, useAnimation, Variants, Variants as _ } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  blur?: boolean;
  scale?: number;
  duration?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  y = 24,
  blur = false,
  scale = 1,
  duration = 0.85,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -80px 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
      scale: scale !== 1 ? scale : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
