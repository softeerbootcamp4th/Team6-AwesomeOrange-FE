import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr";
import sharedAssetRouter from "@awesome-orange/common/sharedAssetRouter.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    sharedAssetRouter([
      ["/font", "/public/font"],
      ["/shared", "/public"],
      ["/mockServiceWorker.js", "/public/mockServiceWorker.js"],
    ]),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "@common", replacement: "@awesome-orange/common/src" },
      { find: "@main", replacement: resolve(__dirname, "src/shared") },
    ],
  },
  preview: {
    proxy: {
      "/api": {
        target: "http://softeerorange.store",
        changeOrigin: true,
      },
    },
  },
});
