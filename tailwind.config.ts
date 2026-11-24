import type { Config } from "tailwindcss";

// Brand palette. If a Hyderabad Solar logo is supplied, replace these values with the logo colours.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sun: { DEFAULT: "#FF7A1A", soft: "#FFD9BA", deep: "#B44A00" },
        teal: { DEFAULT: "#0B4F5C", dark: "#073A44", soft: "#D5E7EA" },
        cream: "#FFF6E8",
        ink: "#1D1D1F",
        leaf: { DEFAULT: "#2E9E5B", deep: "#1F7543", soft: "#D9F0E2" },
        pearl: "#F3EFE8",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-telugu)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "var(--font-telugu)", "system-ui", "sans-serif"],
        telugu: ["var(--font-telugu)", "var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(11,79,92,0.25), 0 4px 10px -4px rgba(29,29,31,0.08)",
        lift: "0 22px 45px -15px rgba(11,79,92,0.35), 0 8px 16px -8px rgba(29,29,31,0.12)",
        glow: "0 12px 40px -8px rgba(255,122,26,0.55)",
      },
      keyframes: {
        rise: { "0%": { transform: "translateY(90px)", opacity: "0.2" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        flow: { "0%": { strokeDashoffset: "24" }, "100%": { strokeDashoffset: "0" } },
        pop: { "0%": { transform: "scale(0.96)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        pulseRing: { "0%": { boxShadow: "0 0 0 0 rgba(46,158,91,0.5)" }, "100%": { boxShadow: "0 0 0 14px rgba(46,158,91,0)" } },
        march: { "0%": { backgroundPosition: "0 0" }, "100%": { backgroundPosition: "28px 0" } },
        nudge: { "0%,100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(3px)" } },
      },
      animation: {
        rise: "rise 1.8s cubic-bezier(.2,.8,.2,1) both",
        flow: "flow 1s linear infinite",
        pop: "pop .35s ease-out both",
        pulseRing: "pulseRing 2s ease-out infinite",
        march: "march 0.9s linear infinite",
        nudge: "nudge 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
