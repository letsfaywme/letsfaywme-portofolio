import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import CertificatesSection from "./CertificatesSection";
import { CERTIFICATES } from "@/app/lib/data";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a>,
  },
}));
vi.mock("@/app/components/ui/Reveal", () => ({ default: ({ children }: { children: ReactNode }) => <div>{children}</div> }));
vi.mock("@/app/components/ui/StaggerGroup", () => ({ default: ({ children }: { children: ReactNode }) => <div>{children}</div> }));

afterEach(cleanup);

describe("CertificatesSection", () => {
  it("shows both achievements with their ranks, competition scope, year, and projects", () => {
    render(<CertificatesSection />);
    const section = screen.getByRole("region", { name: "Current Achievements" });
    const cards = within(section).getAllByRole("article");
    expect(cards).toHaveLength(2);
    expect(within(cards[0]).getByText("Juara 3")).toBeInTheDocument();
    expect(within(cards[0]).getByText("Kreativitas dan Inovasi Masyarakat (Krenova)")).toBeInTheDocument();
    expect(within(cards[0]).getByText("Kabupaten Batang")).toBeInTheDocument();
    expect(within(cards[0]).getByRole("heading", { name: "Carify" })).toBeInTheDocument();
    expect(within(cards[0]).getByText("Panduan Cek Mobil")).toBeInTheDocument();
    expect(within(cards[1]).getByText("Juara 2")).toBeInTheDocument();
    expect(within(cards[1]).getByText("Internet of Things (IoT) — Elektro Expo Polines")).toBeInTheDocument();
    expect(within(cards[1]).getByText("Nasional")).toBeInTheDocument();
    expect(within(cards[1]).getByRole("heading", { name: "TAMENG" })).toBeInTheDocument();
    expect(within(cards[1]).getByText("Technology Agricultural Mechanized Environmental Guard")).toBeInTheDocument();
    cards.forEach((card) => expect(within(card).getByText("2026")).toBeInTheDocument());
    expect(within(section).queryByRole("link")).not.toBeInTheDocument();
    CERTIFICATES.forEach((cert) => expect(screen.getByRole("link", { name: new RegExp(cert.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })).toHaveAttribute("href", cert.url));
  });
});
