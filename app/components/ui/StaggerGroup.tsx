'use client';
import { useRef, ReactNode, Children } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  blur?: boolean;
  duration?: number;
  once?: boolean;
}

export default function StaggerGroup({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  y = 30,
  blur = true,
  duration = 0.75,
  once = true,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={itemVariants} style={{ display: 'contents' }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
