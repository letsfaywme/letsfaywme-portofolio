'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/hooks/useTheme';

const ease = [0.22, 1, 0.36, 1] as const;

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <style>{`
        .theme-toggle {
          position: relative;
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 99px;
          color: var(--text-muted);
          cursor: none;
          transition: color 0.3s var(--ease), border-color 0.3s var(--ease), background 0.3s var(--ease), transform 0.4s var(--ease);
          overflow: hidden;
          flex-shrink: 0;
        }
        .theme-toggle::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, var(--orange), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s var(--ease);
          pointer-events: none;
        }
        .theme-toggle:hover {
          color: var(--orange);
          border-color: var(--border-warm);
          transform: scale(1.05);
        }
        .theme-toggle:hover::before {
          opacity: 0.15;
        }
        .theme-toggle:active {
          transform: scale(0.95);
        }
        .theme-toggle-icon {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
        }
        @media (max-width: 800px) {
          .theme-toggle { width: 38px; height: 38px; }
        }
      `}</style>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggle}
        aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
        aria-pressed={mounted ? !isDark : undefined}
        title={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
        suppressHydrationWarning
      >
        <AnimatePresence mode="wait" initial={false}>
          {mounted && (
            <motion.span
              key={theme}
              className="theme-toggle-icon"
              initial={{ y: -16, opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: 16, opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.45, ease }}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
