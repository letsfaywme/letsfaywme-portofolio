import { act, cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import ScrollVelocity from './ScrollVelocity';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('runs only while visible and cancels frames when paused or unmounted', () => {
  let intersect: (entries: { isIntersecting: boolean }[]) => void = () => {};
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: typeof intersect) { intersect = callback; }
    observe() {}
    disconnect() {}
  });
  const raf = vi.fn(() => 7);
  const cancel = vi.fn();
  vi.stubGlobal('requestAnimationFrame', raf);
  vi.stubGlobal('cancelAnimationFrame', cancel);
  const view = render(<ScrollVelocity texts={['Skills']} />);
  expect(raf).not.toHaveBeenCalled();
  act(() => intersect([{ isIntersecting: true }]));
  expect(raf).toHaveBeenCalledOnce();
  act(() => intersect([{ isIntersecting: false }]));
  expect(cancel).toHaveBeenCalledWith(7);
  view.rerender(<ScrollVelocity texts={['Skills']} paused />);
  expect(raf).toHaveBeenCalledOnce();
  view.unmount();
});

it('does not schedule animation for reduced motion', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: true }));
  const raf = vi.fn();
  vi.stubGlobal('requestAnimationFrame', raf);
  render(<ScrollVelocity texts={['Skills']} />);
  expect(raf).not.toHaveBeenCalled();
});
