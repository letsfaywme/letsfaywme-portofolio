'use client';
import { useEffect, useRef } from 'react';

export function useScrollReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px', ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return ref;
}
