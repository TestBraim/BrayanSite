import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <div className="about-copy">
      <p>
        Olá, sou o <b className="purple">Brayan</b>, moro atualmente em <b className="purple">Brasília - DF</b>, e sou estudante de <span className="purple">Engenharia de Software</span> na <span className="purple">UDF</span> e desenvolvedor Full Stack com experiência em tecnologias como <span className="purple">Java (Spring Boot)</span>, <span className="purple">JavaScript</span> e <span className="purple">Python</span>. Atuo no desenvolvimento de <span className="purple">APIs RESTful</span>, integração de sistemas e gerenciamento de contêineres com <span className="purple">Docker</span>, sempre focado em otimizar performance e garantir segurança nas aplicações.
      </p>
      <p>
        Tenho familiaridade com ferramentas de automação como <span className="purple">Jenkins</span> e práticas de integração contínua (<span className="purple">CI/CD</span>), além de habilidades em gerenciamento de bancos de dados como <span className="purple">MongoDB</span>, <span className="purple">PostgreSQL</span> e <span className="purple">MySQL</span>. Possuo um perfil <span className="purple">autodidata</span> e estou sempre em busca de novos desafios para aprimorar minhas competências técnicas e contribuir com soluções <span className="purple">eficientes</span> para projetos e equipes de desenvolvimento.
      </p>
      <p>
        Além de programar, algumas outras atividades que adoro fazer!
      </p>
      <ul className="about-activities">
        <li><ImPointRight aria-hidden="true" /> Escutar Música</li>
        <li><ImPointRight aria-hidden="true" /> Ler Livros</li>
        <li><ImPointRight aria-hidden="true" /> Viajar</li>
      </ul>
      <figure className="about-quote">
        <blockquote>“Esforce-se para construir coisas que façam a diferença!”</blockquote>
        <figcaption>André Moraes</figcaption>
      </figure>
    </div>
  );
}

export default AboutCard;
