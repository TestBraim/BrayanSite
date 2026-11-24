import { useEffect, useRef, useState } from "react";

const preferenceKey = "google-analytics-preference";
const scriptId = "google-analytics-tag";

function readPreference() {
  try {
    const saved = window.localStorage.getItem(preferenceKey);
    return saved === "granted" || saved === "denied" ? saved : null;
  } catch {
    return null;
  }
}

function setAnalyticsConsent(measurementId, preference) {
  window[`ga-disable-${measurementId}`] = preference !== "granted";

  if (document.getElementById(scriptId)) {
    window.gtag("consent", "update", { analytics_storage: preference });

    if (preference === "denied") {
      for (const name of ["_ga", `_ga_${measurementId.slice(2)}`]) {
        document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${window.location.hostname}; Secure`;
      }
    }
    return;
  }

  if (preference !== "granted") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
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
  const [preference, setPreference] = useState(readPreference);
  const [showPreferences, setShowPreferences] = useState(false);
  const preferencesButton = useRef(null);

  useEffect(() => {
    setAnalyticsConsent(measurementId, preference ?? "denied");
  }, [measurementId, preference]);

  useEffect(() => {
    function syncPreference(event) {
      if (event.key === preferenceKey || event.key === null) setPreference(readPreference());
    }

    window.addEventListener("storage", syncPreference);
    return () => window.removeEventListener("storage", syncPreference);
  }, []);

  function savePreference(value) {
    try {
      window.localStorage.setItem(preferenceKey, value);
    } catch {
      // The choice still applies to the current visit if storage is unavailable.
    }

    setPreference(value);
    setShowPreferences(false);
    preferencesButton.current?.focus({ preventScroll: true });
  }

  return (
    <div className="analytics-preferences">
      <button
        ref={preferencesButton}
        type="button"
        className="analytics-preferences-toggle"
        aria-expanded={showPreferences}
        aria-controls="analytics-preferences-panel"
        onClick={() => setShowPreferences((open) => !open)}
      >
        Cookies de métricas
      </button>
      <section id="analytics-preferences-panel" className="analytics-preferences-panel" aria-labelledby="analytics-title" hidden={!showPreferences}>
        <h2 id="analytics-title">Cookies de métricas</h2>
        <p>
          Com sua permissão, o Google Analytics usa cookies para medir visitas, páginas acessadas e a origem das visitas.{" "}
          <a href="https://policies.google.com/technologies/partner-sites?hl=pt-BR">Como o Google usa esses dados</a>.
        </p>
        <div className="analytics-actions">
          <button type="button" onClick={() => savePreference("denied")}>Recusar</button>
          <button type="button" onClick={() => savePreference("granted")}>Aceitar</button>
        </div>
      </section>
    </div>
  );
}

export default GoogleAnalytics;
