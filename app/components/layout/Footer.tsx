export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          border-top: 1px solid var(--border);
          padding: 2.5rem 2.5rem;
          background: var(--charcoal);
        }
        .footer-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .footer-logo {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-muted);
        }
        .footer-logo span { color: var(--orange); }
        .footer-tag {
          font-size: 0.78rem;
          color: var(--text-sub);
        }
        .footer-copy {
          font-size: 0.78rem;
          color: var(--text-sub);
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
        }
        .footer-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          cursor: none;
          padding: 0.55rem 1rem;
          border: 1px solid var(--border);
          border-radius: 99px;
          transition: all 0.3s var(--ease);
        }
        .footer-back:hover {
          color: var(--orange);
          border-color: var(--border-warm);
          transform: translateY(-2px);
        }
        @media (max-width: 700px) {
          .footer-inner { justify-content: center; text-align: center; }
          .footer-root { padding: 2.5rem 1.5rem; }
        }
      `}</style>
      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">Lets<span>Fay</span>wme</div>
            <div className="footer-tag">Crafted with precision &amp; passion.</div>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} — All rights reserved.</div>
          <a href="#hero" className="footer-back">↑ Back to top</a>
        </div>
      </footer>
    </>
  );
}
