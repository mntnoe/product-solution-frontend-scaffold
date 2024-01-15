import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { BuildContext, defaultConfig } from "./config.js";

interface Options {
  projectRoot: string;
}

const APPS: AppId[] = ["admin", "warehoox"];
const PROFILES: ProfileId[] = ["default", "debug"]; // TODO: Read from profiles directory.

export async function run({ projectRoot }: Options) {
  const context: BuildContext = new BuildContext({
    projectRoot,
    config: defaultConfig,
  });

  const parser = yargs(hideBin(process.argv))
    .usage("Usage: $0 [options] <command> [command-options]")
    .help()
    .alias("help", "h")
    .version(false)
    .strict()
    .fail((msg, err, yargs) => {
      if (err) return;

      console.error([yargs.help(), "", msg].join("\n"));
      process.exit(1);
    });

  parser
    .option("app", {
      alias: "a",
      describe: "select application",
      demandOption: true,
      nargs: 1,
      choices: APPS,
    })
    .option("profile", {
      alias: "p",
      describe: "override configuration profile",
      nargs: 1,
      choices: PROFILES,
    });

  parser.command({
    command: "build",
    describe: "create a deployable build",
    handler: async (argv: any) => {
      const command = await import("./commands/build.js");
      await command.run({
        app: argv.app,
        // The dev server should default to the debug profile.
        context: await context.withProfile(argv.profile ?? "debug"),
      });
    },
  });

  parser.command({
    command: "dev",
    describe: "start dev server",
    handler: async (argv: any) => {
      const command = await import("./commands/dev-server.js");
      await command.run({
        app: argv.app,
        // The dev server should default to the debug profile.
        context: await context.withProfile(argv.profile ?? "debug"),
      });
    },
  });

  const argv = await parser.parse();
  if (argv._.length === 0) parser.showHelp();
}
