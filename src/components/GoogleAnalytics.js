import { useEffect } from "react";

const scriptId = "google-analytics-tag";

function loadGoogleAnalytics(measurementId) {
  window[`ga-disable-${measurementId}`] = false;

  if (document.getElementById(scriptId)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: window.location.hostname,
  });

  const script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

function GoogleAnalytics({ measurementId }) {
  useEffect(() => {
    loadGoogleAnalytics(measurementId);
  }, [measurementId]);

  return null;
}

export default GoogleAnalytics;
