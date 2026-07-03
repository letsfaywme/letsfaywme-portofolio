import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans',preload:false});

export const viewport: Viewport = { themeColor: "#0d0c0a" };

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "/icon.svg", type: "image/svg+xml" }],
  title: "Fayakun • Portofolio",
  description: "Premium portfolio of Fayakun, a Project Manager & Web Developer crafting elegant digital experiences with modern technologies.",
  keywords: ["Project Manager", "Web Developer", "Next.js", "React", "Indonesia"],
  authors: [{ name: "Fayakun" }],
  openGraph: {
    title: "Fayakun • Portofolio",
    description: "Turning complex ideas into elegant digital products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fayakun — PM & Web Dev",
    description: "Turning complex ideas into elegant digital products.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head />
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
