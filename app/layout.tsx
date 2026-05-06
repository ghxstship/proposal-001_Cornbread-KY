import type { Metadata } from "next";
import { Alfa_Slab_One, Rye, Zilla_Slab, Libre_Caslon_Text, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display heavy slab — primary headlines
const alfa = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Western — Cornbread wordmark, hero title
const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-western",
  display: "swap",
});

// Headline italic — secondary slab for subheads + pitch lines
const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-head",
  display: "swap",
});

// Body — readable serif
const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

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
    description:
      "Modular activation deployment program for the 2026 Cornbread calendar.",
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
      className={`${alfa.variable} ${rye.variable} ${zilla.variable} ${caslon.variable} ${mono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
