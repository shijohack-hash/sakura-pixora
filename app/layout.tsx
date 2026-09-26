import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";

const display = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixora — Transform One Image Into Endless Possibilities",
  description:
    "Remove backgrounds, generate scenes, resize for every platform, and create studio-quality product visuals in seconds with AI-powered media workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
