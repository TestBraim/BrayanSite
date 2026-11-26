import Github from "./Github";
import Techstack from "./Techstack";
import AboutCard from "./AboutCard";
import laptopImg from "../../Assets/about.webp";
import Toolstack from "./Toolstack";

function About() {
  return (
    <div className="page-section about-page">
      <div className="container">
        <div className="about-intro">
          <div>
            <h1>Como <strong className="purple">eu</strong> trabalho?</h1>
            <AboutCard />
          </div>
          <img src={laptopImg} alt="" width="720" height="496" decoding="async" />
        </div>
        <section className="about-group" aria-labelledby="skills-title">
          <h2 id="skills-title"><strong className="purple">Skills</strong> Profissionais</h2>
          <Techstack />
        </section>
        <section className="about-group" aria-labelledby="tools-title">
          <h2 id="tools-title"><strong className="purple">Ferramentas</strong> que eu utilizo</h2>
          <Toolstack />
        </section>
        <Github />
      </div>
    </div>
  );
}

export default About;
