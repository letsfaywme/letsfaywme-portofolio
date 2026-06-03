'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAME = 'Fayakun';
const ease = [0.22, 1, 0.36, 1] as const;

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHidden(true);
      setTimeout(() => window.dispatchEvent(new Event('loader:done')), 900);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)", transition: { duration: 0.9, ease } }}
          style={{
            position: 'fixed', inset: 0,
            background: 'var(--charcoal)',
            zIndex: 10000,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2.25rem',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text)',
            overflow: 'hidden', display: 'flex',
          }}>
            {[...NAME].map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: '110%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.7, ease }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div style={{ width: 180, height: 1, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 1.5, ease }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--orange), var(--amber))' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--text-sub)',
            }}
          >
            Loading
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
