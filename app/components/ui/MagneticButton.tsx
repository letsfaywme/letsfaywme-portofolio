'use client';
import { useRef, MouseEvent } from 'react';

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function MagneticButton({ href, variant = 'primary', children, style, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22 - 2}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '1rem 2.1rem',
    fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
    borderRadius: 99, textDecoration: 'none',
    transition: 'background .4s var(--ease), border-color .4s var(--ease), box-shadow .4s var(--ease), color .4s var(--ease)',
    cursor: 'none',
    willChange: 'transform',
    ...style,
  };

  const primary: React.CSSProperties = {
    ...base,
    background: 'var(--orange)', color: '#fff',
    boxShadow: '0 6px 24px rgba(232, 98, 42, 0.25)',
  };
  const secondary: React.CSSProperties = {
    ...base,
    background: 'transparent', color: 'var(--text)',
    border: '1px solid var(--border)',
  };

  return (
    <a
      ref={ref}
      href={href}
      style={variant === 'primary' ? primary : secondary}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.background = 'var(--orange-light)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(232, 98, 42, 0.4)';
        } else {
          e.currentTarget.style.borderColor = 'var(--border-warm)';
          e.currentTarget.style.color = 'var(--text)';
          e.currentTarget.style.background = 'rgba(232, 98, 42, 0.05)';
        }
      }}
      onMouseOut={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.background = 'var(--orange)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(232, 98, 42, 0.25)';
        } else {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text)';
          e.currentTarget.style.background = 'transparent';
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}
