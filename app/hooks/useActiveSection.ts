'use client';
import { useEffect, useState } from 'react';

const SECTIONS = ['about','skills','experience','certificates','testimonials','projects','location','contact'];

export function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY + 120;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActive(id); return;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return active;
}
