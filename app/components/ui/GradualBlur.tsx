'use client';
import { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import './GradualBlur.css';

type Position = 'top' | 'bottom' | 'left' | 'right';
type Curve = 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
type Target = 'parent' | 'page';
type Animated = boolean | 'scroll';

interface GradualBlurProps {
  preset?: string;
  position?: Position;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: Animated;
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: Curve;
  responsive?: boolean;
  target?: Target;
  className?: string;
  style?: React.CSSProperties;
  hoverIntensity?: number;
  onAnimationComplete?: () => void;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;
}

const PRESETS: Record<string, Partial<GradualBlurProps>> = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 },
};

const CURVE_FUNCTIONS: Record<Curve, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  'ease-in': (p) => p * p,
  'ease-out': (p) => 1 - Math.pow(1 - p, 2),
  'ease-in-out': (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const getGradientDirection = (position: Position): string => {
  const map: Record<Position, string> = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right',
  };
  return map[position] || 'to bottom';
};

const debounce = <T extends (...args: any[]) => void>(fn: T, wait: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

function GradualBlur(props: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const defaults = {
      position: 'bottom' as Position,
      strength: 2,
      height: '6rem',
      width: '100%',
      divCount: 5,
      exponential: false,
      zIndex: 1000,
      animated: false as Animated,
      duration: '0.3s',
      easing: 'ease-out',
      opacity: 1,
      curve: 'linear' as Curve,
      responsive: false,
      target: 'parent' as Target,
      className: '',
      style: {} as React.CSSProperties,
    };
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return { ...defaults, ...presetConfig, ...props };
  }, [props]);

  const resolveResponsive = useCallback(
    (key: 'height' | 'width'): string => {
      if (!config.responsive) return config[key];
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const keyCap = key[0].toUpperCase() + key.slice(1) as 'Height' | 'Width';
      const mobileKey = `mobile${keyCap}` as keyof GradualBlurProps;
      const tabletKey = `tablet${keyCap}` as keyof GradualBlurProps;
      const desktopKey = `desktop${keyCap}` as keyof GradualBlurProps;
      if (w <= 480 && config[mobileKey]) return config[mobileKey] as string;
      if (w <= 768 && config[tabletKey]) return config[tabletKey] as string;
      if (w <= 1024 && config[desktopKey]) return config[desktopKey] as string;
      return config[key];
    },
    [config]
  );

  const [responsiveHeight, setResponsiveHeight] = useState(() => resolveResponsive('height'));
  const [responsiveWidth, setResponsiveWidth] = useState(() => resolveResponsive('width'));

  useEffect(() => {
    if (!config.responsive) return;
    const calc = () => {
      setResponsiveHeight(resolveResponsive('height'));
      setResponsiveWidth(resolveResponsive('width'));
    };
    const debounced = debounce(calc, 100);
    calc();
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
  }, [config.responsive, resolveResponsive]);

  const [isVisible, setIsVisible] = useState(!(config.animated === 'scroll'));

  useEffect(() => {
    if (config.animated !== 'scroll' || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [config.animated]);

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength! * config.hoverIntensity : config.strength!;

    const curveFunc = CURVE_FUNCTIONS[config.curve!] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount!; i++) {
      let progress = i / config.divCount!;
      progress = curveFunc(progress);

      let blurValue: number;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount! + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position!);

      const divStyle: React.CSSProperties = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity!,
      };

      if (config.animated && config.animated !== 'scroll') {
        divStyle.transition = `backdrop-filter ${config.duration} ${config.easing}`;
      }

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo((): React.CSSProperties => {
    const isVertical = ['top', 'bottom'].includes(config.position!);
    const isPageTarget = config.target === 'page';
    const h = config.responsive ? responsiveHeight : config.height!;
    const w = config.responsive ? responsiveWidth : config.width!;

    const baseStyle: React.CSSProperties = {
      position: isPageTarget ? ('fixed' as const) : ('absolute' as const),
      pointerEvents: config.hoverIntensity ? ('auto' as const) : ('none' as const),
      opacity: isVisible ? 1 : 0,
      zIndex: isPageTarget ? config.zIndex! + 100 : config.zIndex!,
      ...config.style,
    };

    if (config.animated) {
      baseStyle.transition = `opacity ${config.duration} ${config.easing}`;
    }

    if (isVertical) {
      baseStyle.height = h;
      baseStyle.width = w;
      if (config.position === 'top' || config.position === 'bottom') {
        (baseStyle as any)[config.position] = 0;
      }
      baseStyle.left = '0';
      baseStyle.right = '0';
    } else {
      baseStyle.width = w;
      baseStyle.height = h;
      if (config.position === 'left' || config.position === 'right') {
        (baseStyle as any)[config.position] = 0;
      }
      baseStyle.top = '0';
      baseStyle.bottom = '0';
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  useEffect(() => {
    if (isVisible && config.animated === 'scroll' && config.onAnimationComplete) {
      const ms = parseFloat(config.duration!) * 1000;
      const t = setTimeout(() => config.onAnimationComplete!(), ms);
      return () => clearTimeout(t);
    }
  }, [isVisible, config.animated, config.duration, config.onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className}`}
      style={containerStyle}
      onMouseEnter={config.hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={config.hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div
        className="gradual-blur-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {blurDivs}
      </div>
    </div>
  );
}

const GradualBlurMemo = memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
(GradualBlurMemo as any).PRESETS = PRESETS;
(GradualBlurMemo as any).CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;
export { PRESETS, CURVE_FUNCTIONS };
