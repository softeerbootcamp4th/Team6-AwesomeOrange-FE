import { build } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import config from "./vite.config.js";

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const mode = process.argv[2] ?? "main";
const toAbsolute = (p) => resolve(__dirname, p);

const buildConfig = {
	main: {
		clientEntry: "index.html",
		sourceDir: "mainPage",
		ssgEntry: "main-server.jsx"
	},
	admin: {
		clientEntry: "admin.html",
		sourceDir: "adminPage",
		ssgEntry: "main-server.jsx",
		url: [
			"index",
			"events",
			"events/create",
			"login",
			"events/[id]",
			"comments",
			"comments/[id]"
		]
	},
}

async function processBuild(mode) {
	await Promise.all([buildClient(mode), buildSSG(mode)]);
	await injectSSGToHtml(mode);
}

async function buildClient(mode) {
	await build({
		...config,
		build: {
			rollupOptions: {
				input: {
					entry: buildConfig[mode].clientEntry
				},
				output: {
					dir: `dist/${mode}`
				}
			}
		}
	});
	await rm(toAbsolute(`dist/${mode}/mockServiceWorker.js`));
}

function buildSSG(mode) {
	return build({
		...config,
		build: {
			ssr: true,
			rollupOptions: {
				input: {
					entry: `src/${buildConfig[mode].sourceDir}/${buildConfig[mode].ssgEntry}`
				},
				output: {
					dir: `dist-ssg/${mode}`
				}
			}
		}
	});
}

async function injectSSGToHtml(mode) {
	console.log("--ssg result--");
	const {default: render} = await import(`./dist-ssg/${mode}/entry.js`);
	const template = await readFile(`dist/${mode}/${buildConfig[mode].clientEntry}`, "utf-8");

	const urlEntryPoint = buildConfig[mode].url ?? ["index"];

	const promises = urlEntryPoint.map( async (path)=>{
		const absolutePath = toAbsolute(`dist/${mode}/${path}.html`);
		try {
			const html = template.replace("<!--hydrate_root-->", render(path));

			const dir = dirname(absolutePath);
			await mkdir(dir, { recursive: true });
			await writeFile(absolutePath, html);
			console.log(`pre-rendered : ${path}`);
		} catch {
			console.log(`pre-rendered failed : ${path}`);
		}
	} );
	await Promise.allSettled(promises);
	console.log("--successfully build completed!--");
}

processBuild(mode);