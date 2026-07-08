import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

const mockOn = vi.fn(() => vi.fn())

const mockMotionValue = {
  get: () => 0,
  set: vi.fn(),
  onChange: vi.fn(),
  on: mockOn,
  destroy: vi.fn(),
}

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, variants, whileInView, ref, ...rest } = props
      return <div ref={ref} {...rest}>{children}</div>
    },
    span: ({ children, ...props }: any) => {
      const { initial, animate, variants, whileInView, ref, ...rest } = props
      return <span ref={ref} {...rest}>{children}</span>
    },
  },
  useInView: () => true,
  useAnimation: () => ({ start: vi.fn() }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({ scrollY: mockMotionValue }),
  useVelocity: () => mockMotionValue,
  useSpring: (val: any) => mockMotionValue,
  useTransform: () => mockMotionValue,
  useMotionValue: (initial: any) => ({
    get: () => initial ?? 0,
    set: vi.fn(),
    onChange: vi.fn(),
    on: mockOn,
    destroy: vi.fn(),
  }),
}))
