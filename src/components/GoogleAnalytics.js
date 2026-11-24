import { useEffect } from "react";

const SCRIPT_ID = "google-analytics-tag";

function GoogleAnalytics({ measurementId }) {
  useEffect(() => {
    if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;

    const source = `/metrics/gtag/js?id=${encodeURIComponent(measurementId)}`;
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript?.getAttribute("src") === source) return;
    existingScript?.remove();

    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
    }
    window.gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: window.location.hostname,
    });

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = source;
    document.head.appendChild(script);
  }, [measurementId]);

  return null;
}

export default GoogleAnalytics;
