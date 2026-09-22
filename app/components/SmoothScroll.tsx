'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.08, duration: 1.2, autoRaf: true, allowNestedScroll: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
