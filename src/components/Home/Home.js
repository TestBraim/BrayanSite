import { useEffect, useRef } from "react";
import homeLogo from "../../Assets/home-main.webp";
import homeLogoMedium from "../../Assets/home-main-720.webp";
import homeLogoSmall from "../../Assets/home-main-480.webp";
import wavingHand from "../../Assets/waving-hand.webp";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  const intro = useRef(null);

  useEffect(() => {
    const navigation = performance.getEntriesByType?.("navigation")[0];
    if (navigation?.type !== "reload" || window.location.hash || !window.matchMedia("(max-width: 61.99rem)").matches) return;

    let frame;
    function revealIntro() {
      frame = window.requestAnimationFrame(() => {
        const header = document.querySelector(".site-header");
        if (!header || !intro.current) return;

        const headerBottom = header.getBoundingClientRect().bottom;
        const introBounds = intro.current.getBoundingClientRect();
        if (introBounds.top < headerBottom && introBounds.bottom > headerBottom) {
          window.scrollTo(0, 0);
        }
      });
    }

    // Wait for the browser to restore the scroll position before checking the introduction.
    if (document.readyState === "complete") revealIntro();
    else window.addEventListener("pageshow", revealIntro, { once: true });

    return () => {
      window.removeEventListener("pageshow", revealIntro);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section className="home-section" aria-labelledby="home-title">
        <div className="container home-content">
          <div className="home-intro" ref={intro}>
            <p className="greeting">
              Olá Dev! <img className="wave" src={wavingHand} alt="" width="80" height="80" />
            </p>
            <h1 id="home-title">
              Você está no site do <strong className="main-name">BRAYAN</strong>
            </h1>
            <Type />
          </div>
          <img
            className="home-illustration"
            src={homeLogo}
            srcSet={`${homeLogoSmall} 480w, ${homeLogoMedium} 720w, ${homeLogo} 900w`}
            sizes="(min-width: 65rem) 450px, (min-width: 48rem) 42vw, (min-width: 30rem) 450px, calc(100vw - 2rem)"
            width="900"
            height="900"
            fetchpriority="high"
            alt=""
          />
        </div>
      </section>
      <Home2 />
    </>
  );
}

export default Home;
