import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const observabilityConfig = process.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {process.env.NODE_ENV === "production" && (
      <>
        <VercelAnalytics configString={observabilityConfig} />
        <SpeedInsights configString={observabilityConfig} />
      </>
    )}
  </StrictMode>
);
