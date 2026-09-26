import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF8",
        surface: "#FFFFFF",
        ink: "#101A1E",
        navy: {
          DEFAULT: "#0C2233",
          soft: "#173347",
          light: "#2A4A5E",
        },
        teal: {
          DEFAULT: "#0E7A73",
          strong: "#0A5F5A",
          tint: "#E7F3F1",
        },
        sage: "#7FA98E",
        border: "#E3E7E6",
        muted: "#5B6B6E",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 26, 30, 0.04), 0 8px 24px -12px rgba(16, 26, 30, 0.10)",
        raised: "0 2px 6px rgba(16, 26, 30, 0.06), 0 16px 36px -16px rgba(16, 26, 30, 0.16)",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        reveal: "reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
