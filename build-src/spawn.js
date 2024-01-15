import cp from "node:child_process";

export function spawn(cmd, args) {
  // It is clunky to use util.promisify to handle
  // errors in this case, so we wrap manually.
  return new Promise((resolve, reject) => {
    const result = cp.spawn(cmd, args, {
      stdio: ["ignore", "inherit", "inherit"],
    });
    result.on("exit", handleExit.bind(null, resolve, reject, cmd, args));
    result.on("error", reject);
  });
}

function handleExit(resolve, reject, cmd, args, code) {
  if (code === 0) resolve();
  else reject(new Error(`${cmd} ${args.join(" ")} failed with code ${code}`));
}
