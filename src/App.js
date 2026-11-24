import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Pre from "./components/Pre";
import "./style.css";

const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/ResumeNew"));
const Blog = lazy(() => import("./components/blog/error404"));

const siteOrigin = "https://www.brayan.blog";
const fullName = "Brayan Aragão Pletsch";
const shortName = "Brayan Pletsch";

const pages = [
  {
    path: "/",
    title: `${shortName} | Portfólio`,
    description: `Portfólio de ${fullName}, também conhecido como ${shortName}. Veja seus projetos de desenvolvimento web, competências e currículo.`,
    Component: Home,
  },
  {
    path: "/about",
    title: `Sobre | ${fullName}`,
    description: `Conheça a trajetória de ${fullName} e as tecnologias e ferramentas que ele usa no desenvolvimento web.`,
    Component: About,
  },
  {
    path: "/project",
    title: `Projetos | ${fullName}`,
    description: `Explore os projetos de ${fullName} em Java, Spring Boot e JavaScript, com links para o código e demonstrações.`,
    Component: Projects,
  },
  {
    path: "/resume",
    title: `Currículo | ${fullName}`,
    description: `Veja a formação, a experiência e as competências de ${fullName} no currículo em PDF.`,
    Component: Resume,
  },
  {
    path: "/blog",
    title: `Blog | ${fullName}`,
    description: `Os artigos do blog de ${fullName} ainda serão publicados.`,
    Component: Blog,
  },
];

function Page({ path, title, description, onReady, children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = new URL(path, siteOrigin).href;
    document.title = title.replace(fullName, shortName);
    document.head.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.head.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.head.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.head.querySelector('meta[property="og:url"]')?.setAttribute("content", url);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    onReady(pathname);
  }, [description, onReady, path, pathname, title]);

  return children;
}

function Site() {
  const { pathname } = useLocation();
  const previousPage = useRef(pathname);
  const main = useRef(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setInitialLoading(false), 1200);
    return () => window.clearTimeout(timeout);
  }, []);

  // Suspense delays this callback until the destination content is ready.
  const onPageReady = useCallback((nextPage) => {
    if (previousPage.current === nextPage) return;

    previousPage.current = nextPage;
    main.current.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {initialLoading && <Pre />}
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo principal
      </a>
      <Navbar />
      <main id="conteudo" ref={main} tabIndex={-1}>
        <Suspense fallback={initialLoading ? null : <Pre />}>
          <Routes>
            {pages.map(({ path, title, description, Component }) => (
              <Route
                key={path}
                path={path}
                element={(
                  <Page path={path} title={title} description={description} onReady={onPageReady}>
                    <Component />
                  </Page>
                )}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}

export default App;
