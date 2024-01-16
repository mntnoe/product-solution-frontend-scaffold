import * as ESBuild from "esbuild";
import { BuildConfig, BuildContext } from "./config.js";

type Options = {
  context: BuildContext;
  entryPoints: string[];
  tsconfig: string;
  outdir: string;
};

// Sample integration. You can use webpack, vite etc. instead, depending on
// your needs.
export function esbuild(options: Options) {
  return ESBuild.context({
    entryPoints: options.entryPoints,
    bundle: true,
    splitting: true,
    minify: options.context.config.minify,
    format: "esm",
    target: "es2020",
    tsconfig: options.tsconfig,
    outdir: options.outdir,
    plugins: [consolePlugin(), flagsPlugin(options.context.config)],
  });
}

// Used to inject the feature flags into the build.
function flagsPlugin(config: BuildConfig): ESBuild.Plugin {
  return {
    name: "flags",
    setup(build) {
      build.onResolve({ filter: /^@my-company\/core\/flags$/ }, (args) => ({
        path: args.path,
        namespace: "flags-ns",
      }));

      build.onLoad({ filter: /.*/, namespace: "flags-ns" }, () => ({
        contents: JSON.stringify({ Flags: config.flags }),
        loader: "json",
      }));
    },
  };
}

function consolePlugin(): ESBuild.Plugin {
  return {
    name: "console",
    setup(build) {
      let start = 0; // ms
      build.onStart(() => {
        start = Date.now();
      });
      build.onEnd((result) => {
        if (result.errors.length === 0)
          console.log(`Built in ${Date.now() - start}ms`);
      });
    },
  };
}
