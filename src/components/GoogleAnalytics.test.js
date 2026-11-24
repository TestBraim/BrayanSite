import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import GoogleAnalytics from "./GoogleAnalytics";

const measurementId = "G-TESTPORTAL";
const storageKey = "ga_popup_dismissed";
const originalFetch = window.fetch;
const notice = () => screen.queryByRole("heading", { name: "Cookies de métricas" });

beforeEach(() => {
  window.fetch = jest.fn();
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  window.localStorage.clear();
  if (originalFetch === undefined) {
    delete window.fetch;
  } else {
    window.fetch = originalFetch;
  }
});

test("exibe o aviso imediatamente se a assinatura do uBlock for detectada", async () => {
  window.fetch.mockResolvedValue({ text: async () => "uBlock Origin" });
  render(<GoogleAnalytics measurementId={measurementId} />);

  await waitFor(() => expect(notice()).toBeInTheDocument());
});

test("exibe o aviso imediatamente se o fetch falhar (CORS/Bloqueio)", async () => {
  window.fetch.mockRejectedValue(new TypeError("Failed to fetch"));
  render(<GoogleAnalytics measurementId={measurementId} />);

  await waitFor(() => expect(notice()).toBeInTheDocument());
});

test("carrega o analytics sem aviso se o script real for retornado", async () => {
  window.fetch.mockResolvedValue({ text: async () => "Google Analytics Real" });
  render(<GoogleAnalytics measurementId={measurementId} />);

  await waitFor(() => expect(document.getElementById("google-analytics-tag")).toBeInTheDocument());
  expect(notice()).not.toBeInTheDocument();
});

test.each(["Aceitar", "Recusar", "Fechar"])("%s salva no localStorage e força o recarregamento", async (name) => {
  window.fetch.mockResolvedValue({ text: async () => "uBlock Origin" });
  render(<GoogleAnalytics measurementId={measurementId} />);

  await waitFor(() => expect(notice()).toBeInTheDocument());

  const gtagSpy = jest.spyOn(window, "gtag");
  
  fireEvent.click(screen.getByRole("button", { name }));

  expect(window.localStorage.getItem(storageKey)).toBe("true");
  expect(notice()).not.toBeInTheDocument();
  expect(gtagSpy).toHaveBeenCalledWith("consent", "update", expect.any(Object));
  expect(document.getElementById("google-analytics-tag")).toBeInTheDocument();
});

test("não dispara o fetch se o aviso já foi fechado anteriormente", () => {
  window.localStorage.setItem(storageKey, "true");
  render(<GoogleAnalytics measurementId={measurementId} />);

  expect(window.fetch).not.toHaveBeenCalled();
  expect(notice()).not.toBeInTheDocument();
});

test("ignora IDs de medição inválidos", () => {
  render(<GoogleAnalytics measurementId="ID-INVALIDO" />);

  expect(window.fetch).not.toHaveBeenCalled();
  expect(notice()).not.toBeInTheDocument();
});

test("aborta o fetch se o componente for desmontado", () => {
  let abortSignal;
  window.fetch.mockImplementation((_, options) => {
    abortSignal = options.signal;
    return new Promise(() => {});
  });

  const { unmount } = render(<GoogleAnalytics measurementId={measurementId} />);
  unmount();

  expect(abortSignal.aborted).toBe(true);
});