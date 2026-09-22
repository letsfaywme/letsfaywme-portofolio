import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import Loader from './Loader';

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

it('shows a simple wordmark and removes the intro after 400ms', () => {
  vi.useFakeTimers();
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
  render(<Loader />);
  expect(screen.getByText('Fayakun')).toBeInTheDocument();
  expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  act(() => { vi.advanceTimersByTime(400); });
  expect(screen.queryByText('Fayakun')).not.toBeInTheDocument();
  expect(vi.getTimerCount()).toBe(0);
});

it('skips reduced-motion intro and clears timers on unmount', () => {
  vi.useFakeTimers();
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
  const reduced = render(<Loader />);
  act(() => { vi.advanceTimersByTime(0); });
  expect(screen.queryByText('Fayakun')).not.toBeInTheDocument();
  reduced.unmount();
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
  const normal = render(<Loader />);
  normal.unmount();
  expect(vi.getTimerCount()).toBe(0);
});
