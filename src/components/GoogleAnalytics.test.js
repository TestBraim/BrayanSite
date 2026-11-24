import { StrictMode } from "react";
import { cleanup, queryAllByAttribute, queryByAttribute, render } from "@testing-library/react";
import GoogleAnalytics from "./GoogleAnalytics";

const tag = () => queryByAttribute("id", document.head, "google-analytics-tag");

afterEach(() => {
  cleanup();
  tag()?.remove();
  delete window.gtag;
  delete window.dataLayer;
  window.localStorage.clear();
});

test("loads the first-party tag and configures Analytics", () => {
  render(<GoogleAnalytics measurementId="G-6BPJBLHPNR" />);
  expect(tag()).toHaveAttribute("src", "/metrics/gtag/js?id=G-6BPJBLHPNR");
  expect(tag().async).toBe(true);
  expect(window.dataLayer.map((entry) => Array.from(entry))).toEqual([
    ["js", expect.any(Date)],
    ["config", "G-6BPJBLHPNR", expect.any(Object)],
  ]);
});

test("does not duplicate loading in StrictMode", () => {
  render(<StrictMode><GoogleAnalytics measurementId="G-TEST" /></StrictMode>);
  expect(queryAllByAttribute("id", document.head, "google-analytics-tag")).toHaveLength(1);
  expect(window.dataLayer).toHaveLength(2);
});

test.each([undefined, "", "UA-123", "invalid"])("ignores invalid ID %s", (id) => {
  render(<GoogleAnalytics measurementId={id} />);
  expect(tag()).toBeNull();
});

test("preserves an existing gtag function and configures a changed property", () => {
  window.gtag = jest.fn();
  const { rerender } = render(<GoogleAnalytics measurementId="G-FIRST" />);
  const previous = tag();
  rerender(<GoogleAnalytics measurementId="G-SECOND" />);
  expect(previous).not.toBeInTheDocument();
  expect(tag()).toHaveAttribute("src", "/metrics/gtag/js?id=G-SECOND");
  expect(window.gtag).toHaveBeenCalledWith("config", "G-SECOND", expect.any(Object));
});

test("does not use the obsolete popup dismissal flag", () => {
  window.localStorage.setItem("ga_popup_dismissed", "true");
  const { container } = render(<GoogleAnalytics measurementId="G-TEST" />);
  expect(tag()).toBeInTheDocument();
  expect(container).toBeEmptyDOMElement();
});
