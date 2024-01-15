import { isDefined } from "@my-company/util/is-defined";

export function cx(
  ...classNames: (string | null | undefined | false)[]
): string {
  return classNames.filter(isDefined).join(" ");
}
