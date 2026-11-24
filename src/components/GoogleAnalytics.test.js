import { fireEvent, render, screen, act } from "@testing-library/react";
import GoogleAnalytics from "./GoogleAnalytics";

const measurementId = "G-TESTPORTAL";
const preferenceKey = "ga_popup_dismissed";
const tag = () => document.getElementById("google-analytics-tag");

afterEach(() => {
  window.localStorage.clear();
  tag()?.remove();
  delete window.dataLayer;
  delete window.gtag;
  delete window[`ga-disable-${measurementId}`];
  jest.useRealTimers();
});

test("loads analytics automatically without showing a preference control", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);

  fireEvent.load(tag());
  
  act(() => {
    jest.advanceTimersByTime(3000);
  });

  expect(tag()).toBeInTheDocument();
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(screen.queryByRole("heading", { name: "Cookies de métricas" })).not.toBeInTheDocument();
});

test("ignores an old dismissal and does not load the tag", () => {
  window.localStorage.setItem(preferenceKey, "true");
  render(<GoogleAnalytics measurementId={measurementId} />);

  expect(tag()).toBeNull();
  expect(screen.queryByRole("heading", { name: "Cookies de métricas" })).not.toBeInTheDocument();
});

test("shows the popup only after the tag fails to load", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  fireEvent.error(tag());

  expect(tag()).toBeNull();
  expect(screen.getByRole("heading", { name: "Cookies de métricas" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Aceitar" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Recusar" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
});

test("shows the popup after a timeout if the tag loads but the GA cookie is missing", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  fireEvent.load(tag());
  
  act(() => {
    jest.advanceTimersByTime(3000);
  });

  expect(screen.getByRole("heading", { name: "Cookies de métricas" })).toBeInTheDocument();
});

test("refusal also grants consent, saves to localStorage, and removes the popup", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  fireEvent.error(tag());
  fireEvent.click(screen.getByRole("button", { name: "Recusar" }));

  expect(window.localStorage.getItem(preferenceKey)).toBe("true");
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(tag()).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Cookies de métricas" })).not.toBeInTheDocument();
});

test("closing via X also grants consent, saves to localStorage, and removes the popup", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  fireEvent.error(tag());
  fireEvent.click(screen.getByRole("button", { name: "Fechar" }));

  expect(window.localStorage.getItem(preferenceKey)).toBe("true");
  expect(window[`ga-disable-${measurementId}`]).toBe(false);
  expect(tag()).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Cookies de métricas" })).not.toBeInTheDocument();
});

test("retries the tag after the visitor accepts the blocked attempt", () => {
  jest.useFakeTimers();
  render(<GoogleAnalytics measurementId={measurementId} />);
  
  fireEvent.error(tag());
  fireEvent.click(screen.getByRole("button", { name: "Aceitar" }));

  expect(window.localStorage.getItem(preferenceKey)).toBe("true");
  expect(tag()).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Cookies de métricas" })).not.toBeInTheDocument();
});