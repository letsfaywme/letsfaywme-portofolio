import { act, cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import ProfileCard from './ProfileCard';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it('stops scheduling frames once tilt settles, even in a focused tab', () => {
  const frames = new Map<number, FrameRequestCallback>();
  let id = 0;
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frames.set(++id, callback); return id; });
  vi.stubGlobal('cancelAnimationFrame', (key: number) => frames.delete(key));
  vi.spyOn(document, 'hasFocus').mockReturnValue(true);
  render(<ProfileCard />);
  act(() => {
    for (let time = 16; time <= 16000 && frames.size; time += 16) {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(time));
    }
  });
  expect(frames.size).toBe(0);
});

it('does not start tilt for reduced motion', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: true }));
  const raf = vi.fn();
  vi.stubGlobal('requestAnimationFrame', raf);
  render(<ProfileCard />);
  expect(raf).not.toHaveBeenCalled();
});
