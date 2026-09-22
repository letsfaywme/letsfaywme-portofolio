import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import SmoothScroll from './SmoothScroll';

const { create, destroy } = vi.hoisted(() => ({ create: vi.fn(), destroy: vi.fn() }));
vi.mock('lenis', () => ({ default: class { constructor(options: unknown) { create(options); } destroy = destroy; raf = vi.fn(); } }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

it('uses the managed animation loop and destroys it on unmount', () => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
  const view = render(<SmoothScroll />);
  expect(create).toHaveBeenCalledWith(expect.objectContaining({ autoRaf: true }));
  view.unmount();
  expect(destroy).toHaveBeenCalledOnce();
});

it('keeps native scrolling for reduced motion', () => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
  render(<SmoothScroll />);
  expect(create).not.toHaveBeenCalled();
});
