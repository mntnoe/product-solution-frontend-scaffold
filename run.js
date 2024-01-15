#!/usr/bin/env node
/**
 * Build script entry point. All tooling is run through this script to make
 * sure the correct configuration profile is applied.
 *
 * The build script code resides in `build-src`, a convention burrowed from
 * `Gradle`.
 */

import { copyFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { TSC_PATH } from "./build-src/tsc-path.js";
import { spawn } from "./build-src/spawn.js";

async function compileAndRun() {
  const projectRoot = dirname(fileURLToPath(import.meta.url));

  // Ensure that we have a consistent working directory for relative paths.
  process.chdir(projectRoot);

  // The compiled output is cached thanks to the .tsbuildinfo file. Alternatively,
  // you can use `ts-node` instead, or simply put type annotations in comments and
  // enable `checkJs` in `build-src/tsconfig.json`.
  await spawn(TSC_PATH, ["-b", "build-src"]);
  copySharedFile("tsc-path.js");
  copySharedFile("spawn.js");

  const main = await import("./build-src/build/main.js");
  await main.run({ projectRoot });
}

try {
  await compileAndRun();
} catch (e) {
  console.log(e?.message || e);
  process.exit(1);
}

// We need to copy the .js files shared with this script as well to make
// relative imports work.
function copySharedFile(filename) {
  copyFileSync(`build-src/${filename}`, `build-src/build/${filename}`);
}
