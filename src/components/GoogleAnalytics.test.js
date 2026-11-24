import { StrictMode } from "react";
import { fireEvent, render, screen, act, queryByAttribute, queryAllByAttribute } from "@testing-library/react";
import GoogleAnalytics from "./GoogleAnalytics";

const measurementId = "G-TESTPORTAL";
const preferenceKey = "ga_popup_dismissed";
const tag = () => queryByAttribute("id", document.head, "google-analytics-tag");
const advance = () => act(() => jest.advanceTimersByTime(3000));
const popup = () => screen.queryByRole("heading", { name: "Cookies de métricas" });

beforeEach(() => jest.useFakeTimers());

afterEach(() => {
  jest.restoreAllMocks();
  window.localStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = `${cookie.split("=")[0].trim()}=; Max-Age=0; path=/`;
  });
  tag()?.remove();
  delete window.dataLayer;
  delete window.gtag;
  jest.useRealTimers();
});

test.each(["_ga", "_ga_TESTPORTAL"])("does not show a popup with %s", (name) => {
  render(<GoogleAnalytics measurementId={measurementId} />);
  document.cookie = `${name}=test; path=/`;
  advance();
  expect(tag()).toBeInTheDocument();
  expect(popup()).not.toBeInTheDocument();
});

test.each(["load", "error", "silent"])("checks cookies after timeout on %s", (event) => {
  render(<GoogleAnalytics measurementId={measurementId} />);
  if (event !== "silent") fireEvent[event](tag());
  expect(popup()).not.toBeInTheDocument();
  act(() => jest.advanceTimersByTime(2999));
  expect(popup()).not.toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1));
  expect(popup()).toBeInTheDocument();
});

test.each(["Aceitar", "Recusar", "Fechar"])("%s dismisses, grants consent, and persists across mounts", (name) => {
  const { unmount } = render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  
  const spy = jest.spyOn(window, "gtag");
  fireEvent.click(screen.getByRole("button", { name }));
  
  expect(window.localStorage.getItem(preferenceKey)).toBe("true");
  expect(popup()).not.toBeInTheDocument();
  
  if (typeof spy === "function") {
    expect(spy).toHaveBeenCalledWith("consent", "update", expect.any(Object));
  }
  
  unmount();
  tag()?.remove();
  
  render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  
  expect(tag()).toBeNull();
  expect(popup()).not.toBeInTheDocument();
});

test("StrictMode injects one script and still checks cookies", () => {
  render(<StrictMode><GoogleAnalytics measurementId={measurementId} /></StrictMode>);
  expect(queryAllByAttribute("id", document.head, "google-analytics-tag")).toHaveLength(1);
  expect(window.dataLayer.filter(([command]) => command === "config")).toHaveLength(1);
  advance();
  expect(popup()).toBeInTheDocument();
});

test("clears pending timeout on unmount", () => {
  const { unmount } = render(<GoogleAnalytics measurementId={measurementId} />);
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});

test.each([undefined, "", "UA-123", "G-invalid"])("ignores invalid measurement ID %s", (measurementId) => {
  render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  expect(tag()).toBeNull();
  expect(popup()).not.toBeInTheDocument();
});

test("configures the property when gtag already exists", () => {
  window.gtag = jest.fn();
  render(<GoogleAnalytics measurementId={measurementId} />);
  expect(window.gtag).toHaveBeenCalledWith("config", measurementId, expect.any(Object));
  advance();
  expect(popup()).toBeInTheDocument();
});

test("ignores cookies belonging to another property and similar names", () => {
  document.cookie = "_ga_OTHER=test; path=/";
  document.cookie = "prefix_ga=test; path=/";
  render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  expect(popup()).toBeInTheDocument();
});

test("updates the property and cancels the previous check", () => {
  const { rerender } = render(<GoogleAnalytics measurementId={measurementId} />);
  act(() => jest.advanceTimersByTime(2000));
  rerender(<GoogleAnalytics measurementId="G-SECOND" />);
  act(() => jest.advanceTimersByTime(1000));
  expect(popup()).not.toBeInTheDocument();
  expect(tag().src).toContain("id=G-SECOND");
  advance();
  expect(popup()).toBeInTheDocument();
});

test("dismisses for this mount even when storage is unavailable", () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Unavailable"); });
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Unavailable"); });
  const { rerender } = render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
  rerender(<GoogleAnalytics measurementId="G-SECOND" />);
  advance();
  expect(popup()).not.toBeInTheDocument();
});

test("handles inaccessible cookies without crashing", () => {
  jest.spyOn(document, "cookie", "get").mockImplementation(() => { throw new Error("Unavailable"); });
  render(<GoogleAnalytics measurementId={measurementId} />);
  advance();
  expect(popup()).toBeInTheDocument();
});