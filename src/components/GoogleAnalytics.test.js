import { fireEvent, render, screen } from "@testing-library/react";
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

test("keeps the settings closed and the Google tag unloaded before a choice and after refusal", () => {
  const { unmount } = render(<GoogleAnalytics measurementId={measurementId} />);

  const preferences = screen.getByRole("button", { name: "Cookies de métricas" });
  expect(preferences).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("button", { name: "Aceitar" })).not.toBeInTheDocument();
  expect(tag()).toBeNull();
  fireEvent.click(preferences);
  fireEvent.click(screen.getByRole("button", { name: "Recusar" }));
  expect(window.localStorage.getItem(preferenceKey)).toBe("denied");
  unmount();

  render(<GoogleAnalytics measurementId={measurementId} />);
  expect(tag()).toBeNull();
  expect(screen.getByRole("button", { name: "Cookies de métricas" })).toHaveAttribute("aria-expanded", "false");
});

test("applies saved consent when a returning visitor opens the page", () => {
  window.localStorage.setItem(preferenceKey, "granted");
  render(<GoogleAnalytics measurementId={measurementId} />);

  expect(tag()).toBeInTheDocument();
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(screen.getByRole("button", { name: "Cookies de métricas" })).toHaveAttribute("aria-expanded", "false");
});

test("loads the tag once after consent and disables measurement on withdrawal", () => {
  render(<GoogleAnalytics measurementId={measurementId} />);

  const preferences = screen.getByRole("button", { name: "Cookies de métricas" });
  fireEvent.click(preferences);
  fireEvent.click(screen.getByRole("button", { name: "Aceitar" }));
  expect(tag().src).toBe(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(window.dataLayer.map((entry) => Array.from(entry))).toEqual([
    ["consent", "default", {
      analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    }],
    ["consent", "update", { analytics_storage: "granted" }],
    ["js", expect.any(Date)],
    ["config", measurementId, expect.objectContaining({
      allow_google_signals: false, allow_ad_personalization_signals: false,
    })],
  ]);

  fireEvent.click(preferences);
  fireEvent.click(screen.getByRole("button", { name: "Recusar" }));

  expect(window[`ga-disable-${measurementId}`]).toBe(true);
  expect(Array.from(window.dataLayer[window.dataLayer.length - 1])).toEqual([
    "consent", "update", { analytics_storage: "denied" },
  ]);
  expect(preferences).toHaveFocus();
  expect(document.querySelectorAll("#google-analytics-tag")).toHaveLength(1);
});
