import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import EducationSection from "./EducationSection"

beforeEach(() => {
  document.documentElement.style.setProperty("--orange", "#e8622a")
  document.documentElement.style.setProperty("--orange-light", "#f07a45")
  document.documentElement.style.setProperty("--amber", "#d4853a")
  document.documentElement.style.setProperty("--text", "#f2ece3")
  document.documentElement.style.setProperty("--text-muted", "rgba(242, 236, 227, 0.55)")
  document.documentElement.style.setProperty("--border", "rgba(242, 236, 227, 0.07)")
  document.documentElement.style.setProperty("--border-warm", "rgba(232, 98, 42, 0.18)")
  document.documentElement.style.setProperty("--surface", "#141210")
  document.documentElement.style.setProperty("--surface-2", "#1a1814")
  document.documentElement.style.setProperty("--charcoal", "#0b0a08")
  document.documentElement.style.setProperty("--orange-dim", "rgba(232, 98, 42, 0.10)")
  document.documentElement.style.setProperty("--font-display", "sans-serif")
  document.documentElement.style.setProperty("--font-mono", "monospace")
  document.documentElement.style.setProperty("--font-body", "sans-serif")
  document.documentElement.style.setProperty("--ease", "cubic-bezier(0.22, 1, 0.36, 1)")
})

afterEach(() => {
  cleanup()
})

describe("EducationSection", () => {
  it("renders section heading", () => {
    render(<EducationSection />)
    expect(screen.getByText((t) => t.includes("began"))).toBeDefined()
  })

  it("renders all school entries", () => {
    render(<EducationSection />)
    expect(screen.getAllByText("SD Negeri Medono 08").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("SMP Negeri 13 Pekalongan").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("SMK Negeri 1 Kandeman").length).toBeGreaterThanOrEqual(1)
  })

  it("renders major for SMK", () => {
    render(<EducationSection />)
    expect(screen.getAllByText("Rekayasa Perangkat Lunak").length).toBeGreaterThanOrEqual(1)
  })

  it("renders achievements", () => {
    render(<EducationSection />)
    expect(screen.getAllByText("Ketua OSIS 2024–2025").length).toBeGreaterThanOrEqual(1)
  })

  it("has alternating left/right layout classes", () => {
    render(<EducationSection />)
    const items = document.querySelectorAll(".edu-item")
    expect(items.length).toBe(3)
    expect(items[0].getAttribute("data-side")).toBe("left")
    expect(items[1].getAttribute("data-side")).toBe("right")
    expect(items[2].getAttribute("data-side")).toBe("left")
  })
})
