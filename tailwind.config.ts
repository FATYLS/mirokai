import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          start: "#000f23",
          end: "#002c68",
        },
        rose: {
          60: "#a2337d",
          20: "rgba(236, 213, 229, 0.2)",
        },
        violet: {
          10: "#f5eff6",
          50: "#b182b7",
          60: "#9e63a5",
        },
        card: {
          DEFAULT: "rgba(215, 215, 215, 0.08)",
        },
        stroke: {
          button: "#f6eaf2",
        },
        text: {
          primary: "#f5eff6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        display: "-0.011em",
      },
      backgroundImage: {
        "ink-gradient": "linear-gradient(180deg, #000f23 0%, #002c68 100%)",
        "rose-violet": "linear-gradient(180deg, #a2337d 0%, #9e63a5 100%)",
      },
      borderRadius: {
        pill: "26px",
      },
      animation: {
        "fade-in": "fadeIn 600ms ease-out both",
        "pulse-soft": "pulseSoft 2.2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
