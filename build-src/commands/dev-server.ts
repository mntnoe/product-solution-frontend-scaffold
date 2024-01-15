import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import http from "node:http";
import { BuildContext } from "../config.js";
import { esbuild } from "../esbuild.js";
import { getEntryPoints } from "../get-entry-points.js";
import { spawn } from "../spawn.js";
import { TSC_PATH } from "../tsc-path.js";

type DevServerOptions = {
  app: AppId;
  context: BuildContext;
};

export async function run(options: DevServerOptions) {
  await spawnESBuild(options);
  await spawnExpress();
  spawnTSC();

  return new Promise<void>(() => {
    /* never resolve */
  });
}

async function spawnESBuild({ app, context }: DevServerOptions) {
  const ctx = await esbuild({
    context,
    entryPoints: getEntryPoints(app),
    tsconfig: "src/tsconfig.json",
    outdir: "build/dev-server",
  });
  await ctx.watch();
}

async function spawnExpress() {
  const app = express();
  const server = http.createServer(app);

  app.use("/assets", express.static("build/dev-server"));

  app.use("/assets", express.static("public", { index: false }));

  // Example of proxying a remote API to simplify local development.
  app.use(
    "/api/items",
    createProxyMiddleware({
      secure: false,
      logLevel: "warn",
      changeOrigin: true,
      target: "https://random-data-api.com/api/v2/appliances",
      pathRewrite: { "^/api/items": "" },
    }),
  );

  // Default to serving index.html for all non-asset requests.
  app.use(function (req, res, next) {
    if (req.url.startsWith("/assets/") || req.url.startsWith("/api/")) {
      res.sendStatus(404);
      return;
    }

    res.sendFile("public/index.html", { root: process.cwd() });
  });

  await new Promise<void>((resolve, reject) => {
    server.listen(3000, resolve);
    server.on("error", reject);
  });
}

function spawnTSC() {
  spawn(TSC_PATH, ["--build", "--watch", "--preserveWatchOutput", "src"]);
}
