import { readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirName = dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => resolve(__dirName, p);

const htmlPathMap = new Map(
  readdirSync(__dirName)
    .filter((filePath) => filePath.endsWith(".html"))
    .map((path) => [
      path === "index.html" ? "/" : "/" + path.slice(0, -5),
      path,
    ]),
);

const serverPath = [...htmlPathMap.keys()];

const viteServerConfig = {
  root: __dirName,
  server: {
    middlewareMode: true,
    watch: {
      usePooling: true,
      interval: 100,
    },
    hmr: true,
  },
  appType: "custom",
};

async function createServer() {
  const app = express();
  const vite = await createViteServer(viteServerConfig);
  app.use(vite.middlewares);

  app.get(serverPath, async (req, res) => {
    try {
      const url = req.originalUrl;
      const fileUrl = htmlPathMap.get(req.path);

      let template = readFileSync(toAbsolute(fileUrl), "utf-8");
      template = await vite.transformIndexHtml(url, template);

      const render = (await vite.ssrLoadModule("/src/main-server.jsx")).default;
      const html = template.replace("<!--hydrate_root-->", render(fileUrl));

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(5173);
  // console log
  console.log(
    "\x1b[32mstart VITE hmr-ssg server\x1b[39m : \x1b[36mhttp://localhost\x1b[1m:5173\x1b[22m\x1b[39m",
  );
  console.log(
    "\x1b[90mpress \x1b[39m\x1b[1mcontrol + C\x1b[22m \x1b[90mto close server\x1b[39m",
  );
}

createServer();
