import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const BLACK = "#0f0f0c";
const YELLOW = "#f6ff00";
const WHITE = "#ECEDEE";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    // extend: {
    //   backgroundImage: {
    //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    //     "gradient-conic":
    //       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    //   },
    //   colors: {
    //     border: "#272727",
    //     custom: {
    //       1: "#202328",
    //       2: "#101114",
    //       3: "#C9D1D9",
    //       4: "#9EA3AE",
    //       5: "#31363F",
    //       6: "#C7CAD1",
    //     },
    //     foreground: "var(--foreground)",
    //     gray: {
    //       100: "var(--accents-1)",
    //       200: "var(--accents-2)",
    //       300: "var(--accents-3)",
    //       400: "var(--accents-4)",
    //       500: "var(--accents-5)",
    //       600: "var(--accents-6)",
    //       700: "var(--accents-7)",
    //       800: "var(--accents-8)",
    //     },
    //     "gray-main": "var(--gray)",
    //     "gray-base": "var(--gray1)",
    //     secondary: "var(--secondary-color)",
    //     sidebar: "var(--sidebar)",
    //     brand: {
    //       100: "var(--brand-lighter)",
    //       200: "var(--brand-light)",
    //       300: "var(--brand)",
    //       400: "var(--brand-dark)",
    //     },
    //     rgb: {
    //       1: "rgba(32, 35, 40, 1)",
    //       2: "rgba(199, 202, 209, 1)",
    //       3: "rgba(32, 35, 40, 0.80)",
    //       4: "rgba(32, 35, 40, 0.15)",
    //       5: "rgba(32, 35, 40, 0.30)",
    //       6: "rgba(201, 209, 217, 0.60)",
    //       7: "rgba(201, 209, 217, 1)",
    //       8: "rgba(201, 209, 217, 0.50)",
    //       9: " rgba(36, 107, 253, 0.20)",
    //       10: "rgba(201, 209, 217, 0.50)",
    //       11: "rgba(36, 107, 253, 0.20)",
    //       12: "rgba(73, 132, 253, 1)",
    //       13: "rgba(6, 17, 20, 0.50)",
    //       14: "rgba(201, 209, 217, 0.70)",
    //       15: "rgba(201, 209, 217, 0.90)",
    //     },
    //   },
    //   fontFamily: {
    //     inter: ["Inter", "sans-serif"],
    //   },
    //   fontSize: {
    //     xxs: "10px",
    //     xs: "var(--text-xs)",
    //     sm: "var(--text-sm)",
    //     md: "var(--text-md)",
    //     lg: "var(--text-lg)",
    //     xl: "var(--text-xl)",
    //   },
    //   minWidth: {
    //     btn: "160px",
    //   },
    //   backgroundSize: {
    //     "size-200": "200% 200%",
    //   },
    //   backgroundPosition: {
    //     "pos-0": "0% 0%",
    //     "pos-100": "100% 100%",
    //   },
    // },
  },
  plugins: [
    addVariablesForColors,
    nextui({
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            background: WHITE, // or DEFAULT
            foreground: BLACK, // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: WHITE,
              DEFAULT: "#006FEE",
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: BLACK, // or DEFAULT
            foreground: WHITE, // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: BLACK,
              DEFAULT: YELLOW,
            },
          },
          // ... rest of the colors
        },
        // mytheme: {
        //   // custom theme
        //   extend: "dark",
        //   colors: {
        //     primary: {
        //       DEFAULT: "#BEF264",
        //       foreground: "#000000",
        //     },
        //     focus: "#BEF264",
        //   },
        // },
      },
    }),
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
