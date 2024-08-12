import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "@common", replacement: resolve(__dirname, "src/common") },
      { find: "@main", replacement: resolve(__dirname, "src/mainPage/shared") },
      { find: "@admin", replacement: resolve(__dirname, "src/adminPage/shared") },
    ],
  },
});
