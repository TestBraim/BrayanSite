import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.history.replaceState({}, "", "/");
});

test("provides a skip link and named social links on the home page", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: /pular para o conteúdo/i })).toHaveAttribute("href", "#conteudo");
  expect(screen.getByRole("main")).toHaveAttribute("id", "conteudo");
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(within(screen.getByRole("contentinfo")).getByRole("link", { name: /whatsapp/i })).toBeInTheDocument();
});

test("closes the navigation disclosure with Escape and restores button focus", () => {
  render(<App />);
  const navigation = screen.getByRole("navigation", { name: "Navegação principal" });
  const menu = within(navigation).getByRole("button", { name: "Menu" });

  fireEvent.click(menu);
  expect(menu).toHaveAttribute("aria-expanded", "true");
  fireEvent.keyDown(within(navigation).getByRole("link", { name: "Sobre" }), { key: "Escape" });
  expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(menu).toHaveFocus();
});

test("updates the page title and moves focus to the content after navigation", async () => {
  const scrollTo = jest.spyOn(window, "scrollTo").mockImplementation(() => {});

  try {
    render(<App />);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://www.brayan.blog/");
    fireEvent.click(screen.getByRole("link", { name: "Currículo" }));

    expect(await screen.findByRole("heading", { level: 1, name: /currículo de brayan/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Currículo" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("main")).toHaveFocus();
    expect(document.title).toBe("Currículo | Brayan Pletsch");
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://www.brayan.blog/resume");
    const download = screen.getByRole("link", { name: "Download do currículo em PDF" });
    expect(download).toHaveAttribute("download", "cv_brayan_aragao_pletsch.pdf");
    expect(download).toHaveAttribute("href", "/cv_brayan_aragao_pletsch.pdf");
    expect(screen.getByRole("link", { name: /Exibir PDF Completo/i })).toHaveAttribute("href", download.getAttribute("href"));

    const preview = screen.getByRole("img", { name: "Prévia da primeira página do currículo" }).parentElement;
    expect(within(preview).getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/brayan-pletsch/");
    expect(within(preview).getByRole("link", { name: "Consultar certificado" })).toHaveAttribute("href", expect.stringContaining("https://www.credly.com/badges/"));
  } finally {
    scrollTo.mockRestore();
  }
});
