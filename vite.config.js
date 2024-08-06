import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
});
