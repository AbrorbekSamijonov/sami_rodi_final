import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { BRAND } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Newsreader({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["500", "600", "700"], adjustFontFallback: false });

const title = "SamiRodi | Shade-Resilient Solar Panels";
const description =
  "SamiRodi's CPCF cell protection prevents hotspot overheating and cumulative cell damage, so solar panels keep producing in partial shade. Backed by peer-reviewed research.";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: BRAND.name, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#0A1522" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
