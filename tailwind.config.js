/** @type {import('tailwindcss').Config} */
import redefinedStyles from "./tailwind.redefine.js";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...redefinedStyles,
    },
    fontFamily: {
      "ds-digital": ["ds-digital"],
      hdsans: ["hdsans"],
    },
  },
  plugins: [],
};
