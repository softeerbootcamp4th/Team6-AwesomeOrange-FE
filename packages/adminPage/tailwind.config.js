/** @type {import('tailwindcss').Config} */
import redefinedStyles from "@awesome-orange/common/tailwind.redefine.js";

export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}", "../common/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...redefinedStyles,
    },
    fontFamily: {
      hdsans: ["hdsans"],
    },
  },
  plugins: [],
};
