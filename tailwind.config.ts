import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rich warm charcoal — not cold, earthy depth
        earth: {
          50: "#FAF8F5",
          100: "#F3EDE6",
          200: "#E8DDD0",
          300: "#D4C4B0",
          400: "#B8A08A",
          500: "#9C8068",
          600: "#7D6352",
          700: "#5E4A3D",
          800: "#3F312A",
          900: "#2A201C",
          950: "#1A1311",
        },
        // Deep ink — primary dark (like rich black coffee)
        ink: {
          50: "#F5F3F0",
          100: "#E8E4DE",
          200: "#D1C9BD",
          300: "#B5A999",
          400: "#998C78",
          500: "#7D6F5C",
          600: "#635848",
          700: "#4A4136",
          800: "#312C24",
          900: "#1F1C17",
          950: "#12100D",
        },
        // Warm amber / temple gold — primary accent
        amber: {
          50: "#FFF9ED",
          100: "#FFF0D1",
          200: "#FFDDA1",
          300: "#FFC866",
          400: "#FFB633",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        // Terracotta — secondary warm accent
        terra: {
          50: "#FDF4F0",
          100: "#FAE5DB",
          200: "#F5C7B5",
          300: "#EEA48A",
          400: "#E67E5E",
          500: "#DC5A36",
          600: "#C4421F",
          700: "#A33519",
          800: "#842C15",
          900: "#6B2513",
        },
        // Sage / moss — nature accent
        sage: {
          50: "#F4F7F2",
          100: "#E5EDE0",
          200: "#CBDCC2",
          300: "#A7C498",
          400: "#83AC6E",
          500: "#65904F",
          600: "#4E743C",
          700: "#3D5B31",
          800: "#33492A",
          900: "#2B3D24",
        },
        // Stone — neutral midtones
        stone: {
          50: "#F8F7F5",
          100: "#EFEEE9",
          200: "#E0DDD5",
          300: "#CBC6BA",
          400: "#B0A899",
          500: "#968D7D",
          600: "#7C7265",
          700: "#635A50",
          800: "#4A433C",
          900: "#352F2A",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', '"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        shimmer: "shimmer 2s infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "ripple": "ripple 0.6s linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.35)" },
          "50%": { boxShadow: "0 0 24px 8px rgba(245, 158, 11, 0.12)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        "warm-gradient":
          "linear-gradient(135deg, #F59E0B 0%, #DC5A36 50%, #C4421F 100%)",
        "dark-gradient":
          "linear-gradient(135deg, #1F1C17 0%, #2A201C 50%, #312C24 100%)",
      },
      backgroundSize: {
        shimmer: "200% 100%",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 28, 23, 0.1)",
        "card-hover": "0 24px 64px -16px rgba(31, 28, 23, 0.18)",
        "glow-amber": "0 0 48px -12px rgba(245, 158, 11, 0.3)",
        "glow-terra": "0 0 48px -12px rgba(220, 90, 54, 0.3)",
        "glow-sage": "0 0 48px -12px rgba(101, 144, 79, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
