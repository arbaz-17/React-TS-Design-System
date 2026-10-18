
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/global.css";
import App from "./App";
import { TooltipProvider } from "./components/interactive/tooltip/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <TooltipProvider
        delayDuration={500}
        skipDelayDuration={300}
      >
        <App />
      </TooltipProvider>
  </StrictMode>,
);
