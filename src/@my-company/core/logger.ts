import { Flags } from "@my-company/core/flags";

export function info(
  message: string,
  context?: Record<string, string | number | boolean | null | undefined>,
): void {
  console.info(message, context);
  if (Flags.RemoteLogging) {
    // TODO: send to remote logging service
  }
}
