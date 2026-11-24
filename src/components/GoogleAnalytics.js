import { useEffect, useState } from "react";

const scriptId = "google-analytics-tag";
const storageKey = "ga_popup_dismissed";

function loadGoogleAnalytics(measurementId) {
  window[`ga-disable-${measurementId}`] = false;

  const existingScript = document.getElementById(scriptId);
  if (existingScript) return existingScript;

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
  document.head.appendChild(script);
  return script;
}

function GoogleAnalytics({ measurementId }) {
  const [blocked, setBlocked] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(storageKey)) {
      return;
    }

    let timeoutId;
    const script = loadGoogleAnalytics(measurementId);

    const handleLoad = () => {
      window.clearTimeout(timeoutId);
      setBlocked(false);
    };

    const handleError = () => {
      script.remove();
      setBlocked(true);
    };

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    timeoutId = setTimeout(() => {
      const hasGACookie = document.cookie.split(";").some((item) => item.trim().startsWith("_ga="));
      if (!hasGACookie) {
        setBlocked(true);
        if (script) script.remove();
      }
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
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