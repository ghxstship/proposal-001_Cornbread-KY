import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cornbread Primary
        orange: {
          DEFAULT: "#C5883F",
          dark: "#945F26",
          light: "#DD9F48",
        },
        cedar: "#44382A",
        cannabis: "#3D441D",
        buttermilk: "#E1D6C3",
        foil: "#DD9F48",
        mist: "#FCF8F1",
        // Utility
        ink: "#241B12",
        paper: "#FCF8F1",
        rule: "#C4B69A",
        muted: "#8A7D68",
        good: "#3D441D",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        head: ["var(--font-head)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        western: ["var(--font-western)", "Georgia", "serif"],
        brand: ["var(--font-brand)", "Impact", "Arial Black", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 4px rgba(44,26,14,0.06)",
        "card-hover": "0 8px 32px rgba(44,26,14,0.12)",
        hard: "6px 6px 0 #44382A",
        "hard-orange": "6px 6px 0 #C5883F",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "pulse-line": "pulseLine 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
