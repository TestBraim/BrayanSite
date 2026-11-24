import { StrictMode } from "react";
import {
  act,
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryByAttribute,
  render,
  screen,
} from "@testing-library/react";
import GoogleAnalytics from "./GoogleAnalytics";

const measurementId = "G-TESTPORTAL";
const storageKey = "ga_popup_dismissed";
const originalFetch = window.fetch;
const tag = () => queryByAttribute("id", document.head, "google-analytics-tag");
const notice = () => screen.queryByRole("heading", { name: "Cookies de métricas" });
const advance = () => act(() => jest.advanceTimersByTime(3000));

async function loadScript() {
  await act(async () => {
    tag().dispatchEvent(new Event("load"));
  });
}

beforeEach(() => {
  jest.useFakeTimers();
  window.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: jest.fn().mockResolvedValue("Google Analytics"),
  });
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  window.localStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = `${cookie.split("=")[0].trim()}=; Max-Age=0; path=/`;
  });
  tag()?.remove();
  delete window.gtag;
  delete window.dataLayer;
  delete window[`ga-disable-${measurementId}`];
  if (originalFetch === undefined) delete window.fetch;
  else window.fetch = originalFetch;
  jest.useRealTimers();
});

test.each(["_ga", "_ga_TESTPORTAL"])("keeps notice hidden with %s and no blocking signature", async (name) => {
  render(<GoogleAnalytics measurementId={measurementId} />);
  document.cookie = `${name}=test; path=/`;
  await loadScript();
  advance();
  expect(notice()).not.toBeInTheDocument();
});

test.each(["uBlock Origin", "gorhill"])("detects the simulated %s signature even with existing cookies", async (signature) => {
  window.fetch.mockResolvedValue({ ok: true, text: async () => signature });
  document.cookie = "_ga=old; path=/";
  render(<GoogleAnalytics measurementId={measurementId} />);
  await loadScript();
  advance();
  expect(notice()).toBeInTheDocument();
});

test("marks a script error as blocked even with an old cookie", () => {
  document.cookie = "_ga=old; path=/";
  render(<GoogleAnalytics measurementId={measurementId} />);
  fireEvent.error(tag());
  advance();
  expect(notice()).toBeInTheDocument();
});

test("shows the notice after three seconds without cookies or script events", () => {
  render(<GoogleAnalytics measurementId={measurementId} />);
  act(() => jest.advanceTimersByTime(2999));
  expect(notice()).not.toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1));
  expect(notice()).toBeInTheDocument();
});

test("handles a blocking signature received after the timeout", async () => {
  let resolveResponse;
  window.fetch.mockReturnValue(new Promise((resolve) => { resolveResponse = resolve; }));
  document.cookie = "_ga=old; path=/";
  render(<GoogleAnalytics measurementId={measurementId} />);
  await loadScript();
  advance();
  expect(notice()).not.toBeInTheDocument();
  await act(async () => {
    resolveResponse({ ok: true, text: async () => "uBlock Origin" });
  });
  expect(notice()).toBeInTheDocument();
});

test.each(["Aceitar", "Recusar", "Fechar"])("%s grants consent, replaces the script and persists dismissal", (name) => {
  const { unmount } = render(<GoogleAnalytics measurementId={measurementId} />);
  const previousScript = tag();
  advance();
  const gtag = jest.spyOn(window, "gtag");
  window[`ga-disable-${measurementId}`] = true;
  fireEvent.click(screen.getByRole("button", { name }));
  expect(window.localStorage.getItem(storageKey)).toBe("true");
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(gtag).toHaveBeenCalledWith("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  expect(previousScript).not.toBeInTheDocument();
  expect(tag()).toBeInTheDocument();
  expect(tag()).not.toBe(previousScript);
  advance();
  expect(notice()).not.toBeInTheDocument();
  unmount();
  tag().remove();
  render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  expect(tag()).toBeNull();
  expect(notice()).not.toBeInTheDocument();
});

test("avoids duplicate scripts in StrictMode", async () => {
  render(<StrictMode><GoogleAnalytics measurementId={measurementId} /></StrictMode>);
  expect(queryAllByAttribute("id", document.head, "google-analytics-tag")).toHaveLength(1);
  await loadScript();
  expect(window.fetch).toHaveBeenCalledTimes(1);
  advance();
  expect(notice()).toBeInTheDocument();
});

test("aborts inspection and clears the timeout on unmount", async () => {
  window.fetch.mockReturnValue(new Promise(() => {}));
  const { unmount } = render(<GoogleAnalytics measurementId={measurementId} />);
  await loadScript();
  const signal = window.fetch.mock.calls[0][1].signal;
  unmount();
  expect(signal.aborted).toBe(true);
  expect(jest.getTimerCount()).toBe(0);
});

test.each([undefined, "", "UA-123", "G-invalid"])("ignores invalid ID %s", (id) => {
  render(<GoogleAnalytics measurementId={id} />);
  advance();
  expect(tag()).toBeNull();
  expect(notice()).not.toBeInTheDocument();
});

test("dismisses even when localStorage is unavailable", () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Unavailable"); });
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Unavailable"); });
  render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
  advance();
  expect(notice()).not.toBeInTheDocument();
});

test("requests a readable CORS response when inspecting the script", async () => {
  render(<GoogleAnalytics measurementId={measurementId} />);
  await loadScript();
  expect(window.fetch).toHaveBeenCalledWith(tag().src, expect.objectContaining({
    mode: "cors",
    credentials: "omit",
  }));
});

test("does not treat CORS failure as proof that the script was blocked", async () => {
  window.fetch.mockRejectedValue(new TypeError("Failed to fetch"));
  document.cookie = "_ga=existing; path=/";
  render(<GoogleAnalytics measurementId={measurementId} />);
  await loadScript();
  advance();
  expect(tag()).not.toHaveAttribute("data-blocked");
  expect(notice()).not.toBeInTheDocument();
});

test("does not attempt to read an opaque response", async () => {
  const text = jest.fn().mockResolvedValue("");
  window.fetch.mockResolvedValue({ ok: false, type: "opaque", text });
  render(<GoogleAnalytics measurementId={measurementId} />);
  await loadScript();
  expect(text).not.toHaveBeenCalled();
  advance();
  expect(notice()).toBeInTheDocument();
});

test("honors a persisted dismissal without loading or checking analytics", () => {
  window.localStorage.setItem(storageKey, "true");
  render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  expect(tag()).toBeNull();
  expect(window.fetch).not.toHaveBeenCalled();
  expect(notice()).not.toBeInTheDocument();
});
