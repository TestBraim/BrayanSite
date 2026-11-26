import myImg from "../../Assets/avatar.svg";
import SocialLinks from "../SocialLinks";

function Home2() {
  return (
    <>
      <section className="container home-about" id="about" aria-labelledby="intro-title">
        <div className="home-about-description">
          <h2 id="intro-title">Um pouco <span className="purple">sobre</span> mim</h2>
          <p>
            Programo desde os 12 anos e hoje trabalho como <strong className="purple">desenvolvedor full stack</strong> em <strong className="purple">Brasília</strong>.
          </p>
          <p>
            Desde novembro de 2025 estou na <strong className="purple">RUUP</strong>, num sistema em <strong className="purple">Laravel</strong> e <strong className="purple">Vue</strong> com PostgreSQL. Cuido das APIs, da autenticação, da criptografia dos documentos médicos e da integração com a OpenAI, além da hospedagem na <strong className="purple">AWS</strong>, com o back-end em EC2 e o banco no Aurora (RDS).
          </p>
          <p>
            Antes disso, passei um ano na <strong className="purple">Tellus</strong> como desenvolvedor back-end. Lá desenvolvi <strong className="purple">APIs REST</strong> com autenticação JWT, documentei as APIs no Swagger e no Postman e escrevi consultas e índices em MySQL. Montei automações em <strong className="purple">Python</strong> e n8n para tratar planilhas e integrar sistemas, e fiz algumas telas em React com TypeScript.
          </p>
          <p>
            Minha primeira experiência foi na <strong className="purple">Von Allen</strong>, em 2024, com APIs em <strong className="purple">Java</strong> e <strong className="purple">Spring Boot</strong>, MongoDB, Docker e pipeline de CI/CD no Jenkins e no GitLab.
          </p>
          <p>
            Curso o 7º semestre de <strong className="purple">Engenharia de Software</strong> na <strong className="purple">UDF</strong>, com formatura prevista para o final de 2027.
          </p>
        </div>
        <img src={myImg} className="avatar" width="217" height="237" alt="" loading="lazy" decoding="async" />
      </section>
      <section className="container home-contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Entre em contato</h2>
        <p>Pode me chamar por <strong className="purple">qualquer um</strong> dos canais abaixo.</p>
        <SocialLinks className="social-links-prominent" />
      </section>
    </>
  );
}

export default Home2;
