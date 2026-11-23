import { SpeedInsights } from "@vercel/speed-insights/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {process.env.NODE_ENV === "production" && (
      <SpeedInsights configString={process.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG} />
    )}
  </StrictMode>
);
