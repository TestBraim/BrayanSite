import { fireEvent, render, screen, act } from "@testing-library/react";
import GoogleAnalytics from "./GoogleAnalytics";

const measurementId = "G-TESTPORTAL";
const preferenceKey = "google-analytics-preference";
const tag = () => document.getElementById("google-analytics-tag");

afterEach(() => {
  window.localStorage.removeItem(preferenceKey);
  tag()?.remove();
  delete window.dataLayer;
  delete window.gtag;
  delete window[`ga-disable-${measurementId}`];
  delete window.gaCheck;
  jest.useRealTimers(); // Restaura os timers reais após cada teste
});

test("loads analytics automatically without showing a preference control", () => {
  render(<GoogleAnalytics measurementId={measurementId} />);

  expect(tag()).toBeInTheDocument();
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(screen.queryByRole("button", { name: /Aceitar|Recusar|Fechar/ })).not.toBeInTheDocument();
});

test("ignores an old refusal and loads the tag only once", () => {
  window.localStorage.setItem(preferenceKey, "denied");
  render(<GoogleAnalytics measurementId={measurementId} />);

  expect(tag().src).toBe(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(window.dataLayer.map((entry) => Array.from(entry))).toEqual([
    ["consent", "default", {
      analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    }],
    ["js", expect.any(Date)],
    ["config", measurementId, expect.objectContaining({
      allow_google_signals: false, allow_ad_personalization_signals: false,
    })],
  ]);

  expect(document.querySelectorAll("#google-analytics-tag")).toHaveLength(1);
});

test("shows the popup only after the tag fails to load or times out", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  // Simula o erro de carregamento
  fireEvent.error(tag());

  expect(tag()).toBeNull();
  expect(screen.getByRole("heading", { name: "Cookies de métricas" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Aceitar" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Recusar" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
});

test("refusal also grants consent and reloads the tag", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  fireEvent.error(tag());
  fireEvent.click(screen.getByRole("button", { name: "Recusar" }));

  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(tag()).toBeInTheDocument();
  expect(document.querySelectorAll("#google-analytics-tag")).toHaveLength(1);
  expect(window.dataLayer).toHaveLength(3);
  expect(screen.queryByRole("heading", { name: "Cookies de métricas" })).not.toBeInTheDocument();
});

test("closing via X also grants consent and reloads the tag", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  fireEvent.error(tag());
  fireEvent.click(screen.getByRole("button", { name: "Fechar" }));

  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(tag()).toBeInTheDocument();
  expect(document.querySelectorAll("#google-analytics-tag")).toHaveLength(1);
  expect(screen.queryByRole("heading", { name: "Cookies de métricas" })).not.toBeInTheDocument();
});

test("retries the tag after the visitor accepts the blocked attempt", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  fireEvent.error(tag());
  fireEvent.click(screen.getByRole("button", { name: "Aceitar" }));

  expect(tag()).toBeInTheDocument();
  expect(document.querySelectorAll("#google-analytics-tag")).toHaveLength(1);
  expect(window.dataLayer).toHaveLength(3);
  expect(screen.queryByRole("heading", { name: "Cookies de métricas" })).not.toBeInTheDocument();

  // Simula um segundo bloqueio
  fireEvent.error(tag());
  expect(screen.getByRole("heading", { name: "Cookies de métricas" })).toBeInTheDocument();
});