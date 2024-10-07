import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Olá, sou o <b className="purple">Brayan</b>, moro atualmente em <b className="purple">Brasília - DF</b>, e sou estudante de <span className="purple">Engenharia de Software</span> na <span className="purple">UDF</span> e desenvolvedor Full Stack com experiência em tecnologias como <span className="purple">Java (Spring Boot)</span>, <span className="purple">JavaScript</span> e <span className="purple">Python</span>. Atuo no desenvolvimento de <span className="purple">APIs RESTful</span>, integração de sistemas e gerenciamento de contêineres com <span className="purple">Docker</span>, sempre focado em otimizar performance e garantir segurança nas aplicações.
            <br />
            <br />
            Tenho familiaridade com ferramentas de automação como <span className="purple">Jenkins</span> e práticas de integração contínua (<span className="purple">CI/CD</span>), além de habilidades em gerenciamento de bancos de dados como <span className="purple">MongoDB</span>, <span className="purple">PostgreSQL</span> e <span className="purple">MySQL</span>. Possuo um perfil <span className="purple">autodidata</span> e estou sempre em busca de novos desafios para aprimorar minhas competências técnicas e contribuir com soluções <span className="purple">eficientes</span> para projetos e equipes de desenvolvimento.            <br />
            <br />
            Além de programar, algumas outras atividades que adoro fazer!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Escutar Música
            </li>
            <li className="about-activity">
              <ImPointRight /> Ler Livros
            </li>
            <li className="about-activity">
              <ImPointRight /> Viajar
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
          "Esforce-se para construir coisas que façam a diferença!"{" "}
          </p>
          <footer className="blockquote-footer">André Moraes</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
