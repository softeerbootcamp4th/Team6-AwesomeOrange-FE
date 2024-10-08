import { build } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile, mkdir, readdir, copyFile } from "node:fs/promises";
import config from "./vite.config.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const toAbsolute = (p) => resolve(__dirname, p);

const buildUrl = [
  "index",
  "events",
  "events/create",
  "login",
  "events/[id]",
  "comments",
  "comments/[id]",
  "users",
];

async function copyFolder(src, dest) {
  // 대상 폴더가 존재하지 않으면 생성
  await mkdir(dest, { recursive: true });

  // src 폴더 안의 모든 항목 가져오기
  const entries = await readdir(src, { withFileTypes: true });

  // 모든 항목을 순회하며 복사
  for (let entry of entries) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);

    if (entry.isDirectory()) {
      // 디렉토리인 경우 재귀적으로 복사
      await copyFolder(srcPath, destPath);
    } else {
      // 파일인 경우 복사
      await copyFile(srcPath, destPath);
    }
  }
}

async function processBuild() {
  await Promise.all([buildClient(), buildSSG()]);
  await Promise.all([
    copyFolder("../../public/font", `./dist/font`),
    copyFolder("../../public/favicon", `./dist/favicon`),
    copyFolder("../../public/icons", `./dist/shared/icons`),
  ]);
  await injectSSGToHtml();
}

async function buildClient() {
  await build({
    ...config,
  });
}

function buildSSG() {
  return build({
    ...config,
    build: {
      ssr: true,
      rollupOptions: {
        input: {
          entry: `./src/main-server.jsx`,
        },
        output: {
          dir: `./dist-ssg`,
        },
      },
    },
  });
}

async function injectSSGToHtml() {
  console.log("--ssg result--");
  const { default: render } = await import(`./dist-ssg/entry.js`);
  const template = await readFile(`./dist/index.html`, "utf-8");

  const urlEntryPoint = buildUrl ?? ["index"];

  const promises = urlEntryPoint.map(async (path) => {
    const absolutePath = toAbsolute(`./dist/${path}.html`);
    try {
      const html = template.replace("<!--hydrate_root-->", render(path));

      const dir = dirname(absolutePath);
      await mkdir(dir, { recursive: true });
      await writeFile(absolutePath, html);
      console.log(`pre-rendered : ${path}`);
    } catch (e) {
      console.log(`pre-rendered failed : ${path}`);
      console.error(e);
    }
  });
  await Promise.allSettled(promises);
  console.log("--successfully build completed!--");
}

processBuild();
