import homeLogo from "../../Assets/home-main.webp";
import homeLogoMedium from "../../Assets/home-main-720.webp";
import homeLogoSmall from "../../Assets/home-main-480.webp";
import wavingHand from "../../Assets/waving-hand.webp";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  return (
    <>
      <section className="home-section" aria-labelledby="home-title">
        <div className="container home-content">
          <div className="home-intro">
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
