'use client';
import { SkillTag } from '@/app/lib/data';

interface MarqueeProps {
  items: SkillTag[];
  number: string;
  label: string;
  accent?: 'orange' | 'amber';
  direction?: 'left' | 'right';
  speed?: number;
}

export default function Marquee({
  items,
  number,
  label,
  accent = 'orange',
  direction = 'left',
  speed = 40,
}: MarqueeProps) {
  const duration = `${Math.max(22, items.length * speed * 0.22)}s`;
  const dirStyle: React.CSSProperties = {
    animationDuration: duration,
    animationDirection: direction === 'left' ? 'normal' : 'reverse',
  };

  return (
    <article className="t-line" data-accent={accent}>
      <div className="t-line__track">
        <div className={`t-line__rail t-line__rail--${accent}`} aria-hidden="true">
          <div className="t-line__dots" />
        </div>
        <div className="marquee-viewport t-line__viewport">
          <div className="marquee-track flex w-max" style={dirStyle}>
            <PillList items={items} accent={accent} />
            <PillList items={items} accent={accent} aria-hidden />
          </div>
        </div>
      </div>
    </article>
  );
}

function PillList({
  items,
  accent,
  ...rest
}: {
  items: SkillTag[];
  accent: 'orange' | 'amber';
  'aria-hidden'?: boolean;
}) {
  return (
    <ul
      className="m-0 flex items-center gap-3 pr-3"
      style={{ listStyle: 'none' }}
      {...rest}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li
            key={`${item.name}-${i}`}
            className={`t-pill t-pill--${accent}`}
          >
            <span className="t-pill__icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="t-pill__text">{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
}
