import { useEffect, useState } from "react";

const SCRIPT_ID = "google-analytics-tag";
const DISMISSED_KEY = "ga_popup_dismissed";
const CONSENT = {
  analytics_storage: "granted",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

function isNoticeDismissed() {
  try {
    return Boolean(window.localStorage.getItem(DISMISSED_KEY));
  } catch {
    return false;
  }
}

function persistDismissal() {
  try {
    window.localStorage.setItem(DISMISSED_KEY, "true");
  } catch {
    return;
  }
}

function ensureGoogleTag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") return;

  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", { ...CONSENT });
  window.gtag("js", new Date());
}

function loadGoogleAnalytics(measurementId, forceReload = false) {
  const source = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  const existingScript = document.getElementById(SCRIPT_ID);

  if (!forceReload && existingScript?.src === source) return existingScript;

  existingScript?.remove();
  ensureGoogleTag();
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
  return script;
}

function useAnalyticsNotice(measurementId) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(isNoticeDismissed);

  useEffect(() => {
    setVisible(false);
    
    if (dismissed || isNoticeDismissed() || !/^G-[A-Z0-9]+$/.test(measurementId)) {
      return;
    }

    const controller = new AbortController();
    const testUrl = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;

    fetch(testUrl, { mode: "cors", credentials: "omit", signal: controller.signal })
      .then((response) => response.text())
      .then((text) => {
        if (text.includes("uBlock Origin") || text.includes("gorhill")) {
          setVisible(true);
        } else {
          loadGoogleAnalytics(measurementId);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setVisible(true);
        }
      });

    return () => controller.abort();
  }, [measurementId, dismissed]);

  function dismissNotice() {
    persistDismissal();
    setDismissed(true);
    setVisible(false);
    window[`ga-disable-${measurementId}`] = false;
    ensureGoogleTag();
    window.gtag("consent", "update", { ...CONSENT });
    loadGoogleAnalytics(measurementId, true);
  }

  return { visible, dismissNotice };
}

function GoogleAnalytics({ measurementId }) {
  const { visible, dismissNotice } = useAnalyticsNotice(measurementId);

  if (!visible) return null;

  return (
    <div className="analytics-notice">
      <button
        type="button"
        className="analytics-close"
        onClick={dismissNotice}
        aria-label="Fechar"
      >
        &times;
      </button>
      <h2>Cookies de métricas</h2>
      <p>
        Com sua permissão, o Google Analytics usa cookies para medir visitas, páginas acessadas e a origem das visitas.{" "}
        <a href="https://policies.google.com/technologies/partner-sites?hl=pt-BR">
          Como o Google usa esses dados
        </a>
        .
      </p>
      <div className="analytics-actions">
        <button type="button" onClick={dismissNotice}>Recusar</button>
        <button type="button" onClick={dismissNotice}>Aceitar</button>
      </div>
    </div>
  );
}

export default GoogleAnalytics;