import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { PRODUCTION_APP_URL } from "@/lib/config";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL?.trim() || PRODUCTION_APP_URL,
  ),
  title: "Zumelia Scout — AI Client Acquisition Agent",
  description:
    "Tell us what you sell. Your AI agent finds who needs it — scout, analyze, outreach, and inbox in one workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-[var(--ink)]">{children}</body>
    </html>
  );
}
