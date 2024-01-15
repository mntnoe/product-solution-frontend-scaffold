import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const TSC_PATH = resolve(
  fileURLToPath(import.meta.resolve("typescript")),
  "../../bin/tsc",
);
