import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import SkillsSection from "./SkillsSection"

beforeEach(() => {
  document.documentElement.style.setProperty("--orange", "#e8622a")
  document.documentElement.style.setProperty("--orange-light", "#f07a45")
  document.documentElement.style.setProperty("--amber", "#d4853a")
  document.documentElement.style.setProperty("--text", "#f2ece3")
  document.documentElement.style.setProperty("--text-muted", "rgba(242, 236, 227, 0.55)")
  document.documentElement.style.setProperty("--border", "rgba(242, 236, 227, 0.07)")
  document.documentElement.style.setProperty("--surface", "#141210")
  document.documentElement.style.setProperty("--font-display", "sans-serif")
  document.documentElement.style.setProperty("--font-mono", "monospace")
  document.documentElement.style.setProperty("--font-body", "sans-serif")
  document.documentElement.style.setProperty("--ease", "cubic-bezier(0.22, 1, 0.36, 1)")
})

afterEach(() => {
  cleanup()
})

describe("SkillsSection", () => {
  it("renders section heading", () => {
    render(<SkillsSection />)
    expect(screen.getByText((t) => t.includes("toolkit"))).toBeDefined()
  })

  it("renders skill names", () => {
    render(<SkillsSection />)
    expect(screen.getAllByText((t) => t.includes("TypeScript")).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText((t) => t.includes("React")).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText((t) => t.includes("Figma")).length).toBeGreaterThanOrEqual(1)
  })

  it("renders stat counter", () => {
    render(<SkillsSection />)
    expect(screen.getByText("26")).toBeDefined()
  })

  it("renders scroll velocity sections", () => {
    render(<SkillsSection />)
    const parallaxElements = document.querySelectorAll(".parallax")
    expect(parallaxElements.length).toBeGreaterThan(0)
  })
})
