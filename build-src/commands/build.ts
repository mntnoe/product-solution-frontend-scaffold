import { copyFileSync } from "node:fs";
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
  await spawnTSC();
  await spawnESBuild(options);
  copyFileSync("public/index.html", `build/release/${options.app}/index.html`);
}

function spawnTSC() {
  return spawn(TSC_PATH, ["--build", "src"]);
}

async function spawnESBuild({ app, context }: DevServerOptions) {
  const ctx = await esbuild({
    context,
    entryPoints: getEntryPoints(app),
    tsconfig: "src/tsconfig.json",
    outdir: `build/release/${app}`,
  });
  await ctx.rebuild();
  await ctx.dispose();
}
