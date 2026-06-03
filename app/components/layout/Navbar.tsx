'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NAV_LINKS, SOCIAL_LINKS } from '@/app/lib/data';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import ThemeToggle from '@/app/components/ui/ThemeToggle';
import StaggeredMenu from '@/app/components/ui/StaggeredMenu';

const PillNav = dynamic(() => import('@/app/components/ui/PillNav'), { ssr: false });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const items = NAV_LINKS.map((link) => ({
    label: link.label,
    href: link.href,
  }));

  return (
    <>
      <style>{`
        .pill-nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
          transition: background 0.5s var(--ease), backdrop-filter 0.5s var(--ease), border-color 0.5s var(--ease);
        }
        .pill-nav-root.scrolled {
          background: var(--scrim);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          border-bottom: 1px solid var(--border);
        }
        .pill-nav-inner {
          position: relative;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pill-nav-inner .pill-nav-container {
          position: relative;
          top: auto;
        }
        .pill-nav-extra {
          position: absolute;
          right: 2.5rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-shrink: 0;
        }
        .pill-nav-extra .staggered-menu-wrapper {
          --sm-accent: var(--orange, #e8622a);
          display: none;
        }
        .pill-nav-extra .sm-toggle {
          color: var(--nav-pill-text);
          background: var(--nav-pill-bg);
        }
        .pill-nav-extra .sm-toggle:hover {
          background: var(--nav-pill-strip);
        }
        @media (max-width: 768px) {
          .pill-nav-extra .staggered-menu-wrapper {
            display: flex;
          }
          .pill-nav-container .mobile-menu-button {
            display: none;
          }
          .pill-nav-root {
            padding: 0.75rem 0;
          }
          .pill-nav-inner {
            padding: 0 1.25rem;
            justify-content: space-between;
            gap: 0.5rem;
          }
          .pill-nav-extra {
            position: static;
            transform: none;
          }
          .pill-nav-inner .pill-nav-container {
            flex: initial;
          }
        }
      `}</style>

      <nav className={`pill-nav-root ${scrolled ? 'scrolled' : ''}`}>
        <div className="pill-nav-inner">
          <PillNav
            items={items}
            activeHref={`#${active}`}
            ease="power2.easeOut"
            baseColor="var(--nav-pill-strip)"
            pillColor="var(--nav-pill-bg)"
            hoveredPillTextColor="var(--nav-hover-text)"
            pillTextColor="var(--nav-pill-text)"
            initialLoadAnimation={false}
          />
          <div className="pill-nav-extra">
            <ThemeToggle />
            <StaggeredMenu
              position="right"
              colors={['#e8622a', '#f97316', '#1a1a2e']}
              items={items.map(i => ({ label: i.label, link: i.href }))}
              socialItems={SOCIAL_LINKS.map(s => ({ label: s.label, link: s.href }))}
              displaySocials={true}
              displayItemNumbering={true}
              changeMenuColorOnOpen={false}
              closeOnClickAway={true}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
