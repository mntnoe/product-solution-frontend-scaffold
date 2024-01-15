export function getEntryPoints(app: AppId): string[] {
  switch (app) {
    case "warehoox":
      // TODO: Add command line flag to select solution.
      return [`src/@my-company/${app}/solutions/acme/main.tsx`];
    default:
      return [`src/@my-company/${app}/main.tsx`];
  }
}
