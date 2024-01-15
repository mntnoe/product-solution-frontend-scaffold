/**
 * Spawn a child process ignoring input, and piping output.
 */
export function spawn(cmd: string, args: string[]): Promise<void>;
