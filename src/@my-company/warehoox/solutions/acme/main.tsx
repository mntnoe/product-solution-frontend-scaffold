import { Site } from "@my-company/warehoox/features/site/site";
import { SiteContainer } from "@my-company/warehoox/features/site/site-container";
import { AppliancePage } from "@my-company/warehoox/routes/appliance-page/appliance-page";
import * as React from "react";
import { createRoot } from "react-dom/client";

import "@my-company/style/global.css";

async function bootstrap() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <SiteContainer>
        <Site solutionName="Acme">
          {/* TODO: Routing here */}
          <AppliancePage />
        </Site>
      </SiteContainer>
    </React.StrictMode>,
  );
}

bootstrap().catch((e) => {
  // TODO: Site error handling.
  console.error(e);
});
