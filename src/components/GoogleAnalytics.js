import { useEffect, useState } from "react";

const scriptId = "google-analytics-tag";
const storageKey = "ga_popup_dismissed";

function loadGoogleAnalytics(measurementId, onStatusChange) {
  window[`ga-disable-${measurementId}`] = false;

  const existingScript = document.getElementById(scriptId);
  if (existingScript) {
    onStatusChange("success");
    return existingScript;
  }

  if (!window.gtag) {
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
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;

  fetch(script.src)
    .then((response) => response.text())
    .then((text) => {
      if (text.length < 1000) {
        onStatusChange("blocked");
      } else {
        onStatusChange("success");
        document.head.appendChild(script);
      }
    })
    .catch(() => {
      onStatusChange("blocked");
    });

  return script;
}

function GoogleAnalytics({ measurementId }) {
  const [blocked, setBlocked] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(storageKey)) {
      return;
    }

    const script = loadGoogleAnalytics(measurementId, (status) => {
      if (status === "blocked") {
        setBlocked(true);
        if (script) script.remove();
      } else {
        setBlocked(false);
      }
    });

    return () => {
      if (script) script.remove();
    };
  }, [measurementId, attempt]);

  function choose() {
    localStorage.setItem(storageKey, "true");
    setBlocked(false);
    window[`ga-disable-${measurementId}`] = false;
    setAttempt((current) => current + 1);
  }

  if (!blocked) return null;

  return (
    <div className="analytics-notice">
      <button
        type="button"
        className="analytics-close"
        onClick={choose}
        aria-label="Fechar"
      >
        &times;
      </button>

      <h2>Cookies de métricas</h2>
      <p>
        Com sua permissão, o Google Analytics usa cookies para medir visitas, páginas acessadas e a origem das visitas. Você pode mudar sua escolha no rodapé.{" "}
        <a href="https://policies.google.com/technologies/partner-sites?hl=pt-BR">
          Como o Google usa esses dados
        </a>
        .
      </p>
      <div className="analytics-actions">
        <button type="button" onClick={choose}>Recusar</button>
        <button type="button" onClick={choose}>Aceitar</button>
      </div>
    </div>
  );
}

export default GoogleAnalytics;