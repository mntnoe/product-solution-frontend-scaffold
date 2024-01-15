import { Card } from "@my-company/components/card";
import * as React from "react";
import { createRoot } from "react-dom/client";
import s from "@my-company/admin/main.module.css";

import "@my-company/style/global.css";

async function bootstrap() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <Card className={s.card}>Admin interface</Card>
    </React.StrictMode>,
  );
}

bootstrap().catch((e) => {
  // TODO: Site error handling.
  console.error(e);
});
