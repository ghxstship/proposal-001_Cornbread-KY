import type { Metadata } from "next";
import { Zilla_Slab, Libre_Caslon_Text, Rye, JetBrains_Mono, Alfa_Slab_One, Bebas_Neue } from "next/font/google";
import "./globals.css";

// Display — substitute for "Cowboy" (western/display)
const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-western",
  display: "swap",
});

// Primary headline — substitute for "Kopius Extra Bold" (heavy slab)
const alfa = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Secondary headline — substitute for "Kopius Bold Italic" (slab italic)
const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-head",
  display: "swap",
});

// Body — substitute for "Ranch Water" (readable serif)
const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

// Brand wordmark — AGV Miami lockup, matches the canonical proposal treatment
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cornbread Hemp × Abbey Road on the River 2026 / Activation Proposal",
  description:
    "Modular activation deployment proposal for the Cornbread Hemp activation at Abbey Road on the River — May 21-25, 2026, Jeffersonville, IN. Produced by AGV Miami.",
  keywords: [
    "cornbread hemp",
    "abbey road on the river",
    "jeffersonville indiana",
    "event activation",
    "agv miami",
    "agora graphics",
  ],
  authors: [{ name: "AGV Miami, LLC" }],
  openGraph: {
    title: "Cornbread Hemp × Abbey Road on the River 2026",
    description:
      "Modular activation deployment — May 21-25, 2026, Jeffersonville, IN. By AGV Miami.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${rye.variable} ${alfa.variable} ${zilla.variable} ${caslon.variable} ${bebas.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
