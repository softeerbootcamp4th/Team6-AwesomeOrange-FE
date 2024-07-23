import render from "./dist-ssg/main-server.js";
import { readdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirName = dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => resolve(__dirName, p);

console.log("--ssg result--");

const htmlPath = readdirSync(toAbsolute("dist")).filter((filePath) =>
  filePath.endsWith(".html"),
);

async function injectSSGToHtml(path) {
  const absolutePath = toAbsolute("dist/" + path);

  const template = await readFile(absolutePath, "utf-8");
  const html = template.replace("<!--hydrate_root-->", render(path));

  await writeFile(absolutePath, html);
  console.log(`pre-rendered : ${path}`);
}

htmlPath.forEach(injectSSGToHtml);
