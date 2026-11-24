import { render, screen } from "@testing-library/react";
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
});

test("loads analytics automatically without showing a preference control", () => {
  render(<GoogleAnalytics measurementId={measurementId} />);

  expect(tag()).toBeInTheDocument();
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(screen.queryByRole("button", { name: /Cookies de métricas|Aceitar|Recusar/ })).not.toBeInTheDocument();
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
