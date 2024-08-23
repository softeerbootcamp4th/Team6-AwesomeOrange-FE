import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { createReadStream } from "node:fs";
import { lookup } from "mime-types";

const __dirname = fileURLToPath(new URL("../../", import.meta.url));

export default function sharedAssetRouter(paths) {
  function foundRoute(path) {
    for (let [symbol, assetPath] of paths) {
      if (path.startsWith(symbol)) {
        const postfix = path.slice(symbol.length);
        return join(assetPath, postfix);
      }
    }
    return null;
  }

  return {
    name: "shared-assets",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const originPath = foundRoute(req.url);
        if (originPath === null) return next();
        const filePath = join(__dirname, originPath);

        const stream = createReadStream(filePath);
        stream.on("error", (err) => {
          if (err.code === "ENOENT") {
            res.statusCode = 404;
            res.end("File not found");
          } else {
            res.statusCode = 500;
            res.end("Server error");
          }
        });

        const contentType = lookup(filePath);
        res.setHeader("Content-Type", contentType);
        stream.pipe(res);
      });
    },
  };
}
