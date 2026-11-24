import { useEffect, useState } from "react";

const scriptId = "google-analytics-tag";

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
  const [showPreferences, setShowPreferences] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const script = loadGoogleAnalytics(measurementId);
    function handleError() {
      script.remove();
      setBlocked(true);
    }

    script.addEventListener("error", handleError);
    return () => script.removeEventListener("error", handleError);
  }, [measurementId, attempt]);

  function choose() {
    setShowPreferences(false);
    setBlocked(false);
    window[`ga-disable-${measurementId}`] = false;
    setAttempt((current) => current + 1);
  }

  function closePreferences() {
    setShowPreferences(false);
    choose();
  }

  if (!blocked) return null;

  return (
    <div className="analytics-preferences">
      <button
        type="button"
        className="analytics-preferences-toggle"
        aria-expanded={showPreferences}
        aria-controls="analytics-preferences-panel"
        onClick={() => (showPreferences ? closePreferences() : setShowPreferences(true))}
      >
        Cookies de métricas
      </button>
      <section
        id="analytics-preferences-panel"
        className="analytics-preferences-panel"
        aria-labelledby="analytics-title"
        hidden={!showPreferences}
      >
        <h2 id="analytics-title">Cookies de métricas</h2>
        <p>
          O Google Analytics não carregou. Se você liberar a tag nas proteções do
          navegador, clique em Aceitar para tentar novamente.{" "}
          <a href="https://policies.google.com/technologies/partner-sites?hl=pt-BR">
            Como o Google usa esses dados
          </a>
          .
        </p>
        <div className="analytics-actions">
          <button type="button" onClick={choose}>Recusar</button>
          <button type="button" onClick={choose}>Aceitar</button>
        </div>
      </section>
    </div>
  );
}

export default GoogleAnalytics;