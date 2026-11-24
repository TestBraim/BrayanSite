import { useEffect, useState } from "react";

const SCRIPT_ID = "google-analytics-tag";
const DISMISSED_KEY = "ga_popup_dismissed";
const CHECK_DELAY = 3000;
const BLOCKER_SIGNATURE = /ublock\s+origin|gorhill/i;
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

function hasAnalyticsCookie(measurementId) {
  try {
    return document.cookie.split(";").some((cookie) => {
      const name = cookie.trim().split("=")[0];
      return name === "_ga" || name === `_ga_${measurementId.slice(2)}`;
    });
  } catch {
    return false;
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
    if (dismissed || isNoticeDismissed() || !/^G-[A-Z0-9]+$/.test(measurementId)) return;

    const script = loadGoogleAnalytics(measurementId);
    const controller = new AbortController();
    let active = true;
    let checked = false;

    function updateNotice() {
      if (!active || !checked) return;
      setVisible(!isNoticeDismissed() && (
        script.dataset.blocked === "true" || !hasAnalyticsCookie(measurementId)
      ));
    }

    function markBlocked() {
      if (!active) return;
      script.dataset.blocked = "true";
      updateNotice();
    }

    async function inspectScript() {
      try {
        const response = await window.fetch(script.src, { signal: controller.signal, mode: "no-cors" });
        if (!response.ok && response.type !== "opaque") return;
        const source = await response.text();
        if (BLOCKER_SIGNATURE.test(source)) markBlocked();
      } catch {
        markBlocked();
      }
    }

    script.addEventListener("load", inspectScript);
    script.addEventListener("error", markBlocked);

    const timeout = window.setTimeout(() => {
      checked = true;
      updateNotice();
    }, CHECK_DELAY);

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
      script.removeEventListener("load", inspectScript);
      script.removeEventListener("error", markBlocked);
    };
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