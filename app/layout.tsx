import type { Metadata } from "next";
import { Roboto_Slab, Rye, Bitter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Brand fonts (per CB_BrandGuide-2025) are commercial faces — Kopius (Schick
// Toikka), Ranch Water (Sudtipos), and Cowboy. They aren't on Google Fonts.
// In production, load the licensed faces via an Adobe Fonts kit and the brand
// names listed first in each font-family stack will pick them up automatically.
//
// The Google Fonts loaded here are the closest free substitutes:
//   · Kopius        →  Roboto Slab (heavy slab, similar proportions)
//   · Ranch Water   →  Bitter (humanist serif, comfortable on body copy)
//   · Cowboy        →  Rye (western/saloon display, comparable spurs)

// Primary headline substitute for Kopius Extra Bold
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Body + button substitute for Ranch Water Regular & Italic
const bitter = Bitter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

// Western detail substitute for Cowboy
const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-western",
  display: "swap",
});

// Mono — used for tabular figures only (rate cards, document IDs)
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cornbread Hemp × AGV Miami — Abbey Road on the River 2026 Activation Deployment Program",
  description:
    "Modular activation deployment proposal for the Cornbread Hemp activation. Per-activation, per-month, one-time upgrades, optional add-ons. Anchor engagement at Abbey Road on the River — May 21–25, 2026, Jeffersonville, IN. Prepared by AGV Miami for Cornbread Hemp.",
  keywords:
    "Cornbread Hemp, AGV Miami, Abbey Road on the River, RiverStage, Jeffersonville, brand activation, deployment, fabrication, asset management, hemp",
  openGraph: {
    title: "Cornbread Hemp × AGV Miami — Abbey Road on the River 2026",
    description: "Modular activation deployment program for the 2026 Cornbread calendar.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${bitter.variable} ${rye.variable} ${mono.variable}`}
    >
      <head>
        {/* Cormorant Garamond — typed-signature italic on the authorization pad */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap"
          rel="stylesheet"
        />
        {/*
          Production: drop in the AGV Miami Adobe Fonts kit URL here to load
          the licensed brand faces (Kopius, Ranch Water, Cowboy). Brand names
          appear first in every font-family stack in cornbread.css, so they
          resolve as soon as the kit is available — Google Font substitutes
          stay as graceful fallbacks.
          <link rel="stylesheet" href="https://use.typekit.net/<kit-id>.css" />
        */}
      </head>
      <body>{children}</body>
    </html>
  );
}
