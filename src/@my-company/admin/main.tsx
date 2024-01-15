import * as React from "react";
import { createRoot } from "react-dom/client";

import "@my-company/style/global.css";

async function bootstrap() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <div>Admin interface</div>
    </React.StrictMode>,
  );
}

bootstrap().catch((e) => {
  // TODO: Site error handling.
  console.error(e);
});
