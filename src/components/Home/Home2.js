import myImg from "../../Assets/avatar.svg";
import SocialLinks from "../SocialLinks";

function Home2() {
  return (
    <>
      <section className="container home-about" id="about" aria-labelledby="intro-title">
        <div className="home-about-description">
          <h2 id="intro-title">Um pouco <span className="purple">sobre</span> mim</h2>
          <p>
            Olá! Meu nome é Brayan, tenho <b className="purple">19 anos</b> e sou apaixonado por <b className="purple">tecnologia</b> e <b className="purple">programação</b> desde os meus <b className="purple">12 anos</b> de idade. Meu <b className="purple">objetivo principal</b> é me desenvolver como um <b className="purple">programador</b> e contribuir com <b className="purple">soluções inovadoras</b> e <b className="purple">eficientes</b> para resolver <b className="purple">problemas reais</b>.
          </p>
          <p>
            Atualmente, curso <b className="purple">Engenharia de Software</b> na <b className="purple">UDF</b>, onde venho consolidando meus <b className="purple">conhecimentos técnicos</b> e <b className="purple">habilidades práticas</b>, sem deixar de explorar <b className="purple">novas tecnologias</b> e <b className="purple">metodologias</b> por conta própria. As linguagens em que mais me destaco são <b className="purple">Java</b>, <b className="purple">Python</b> e <b className="purple">JavaScript</b>, que utilizo para criar <b className="purple">aplicações robustas</b> e <b className="purple">funcionais</b>.
          </p>
          <p>
            Em cada <b className="purple">experiência profissional</b> ou <b className="purple">projeto acadêmico</b>, sempre procurei manter um alto padrão de <b className="purple">comunicação</b> e <b className="purple">dedicação</b>, buscando <b className="purple">crescer</b> e ajudar o time a alcançar os melhores <b className="purple">resultados possíveis</b>. Minha <b className="purple">motivação</b> vem do desejo constante de <b className="purple">aprender</b> e de <b className="purple">compartilhar conhecimento</b> de forma prática e colaborativa.
          </p>
          <p>
            Seja <b className="purple">resolvendo desafios técnicos</b>, <b className="purple">desenvolvendo funcionalidades</b> ou <b className="purple">aprendendo novas tecnologias</b>, gosto de me manter <b className="purple">atualizado</b> e <b className="purple">disposto</b> a encarar novos desafios que me ajudem a <b className="purple">evoluir</b> como <b className="purple">profissional</b> e <b className="purple">pessoa</b>.
          </p>
        </div>
        <img src={myImg} className="avatar" width="217" height="237" alt="" loading="lazy" decoding="async" />
      </section>
      <section className="container home-contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Entre em contato</h2>
        <p>Sinta-se à vontade para se <span className="purple">conectar</span> comigo</p>
        <SocialLinks className="social-links-prominent" />
      </section>
    </>
  );
}

export default Home2;
