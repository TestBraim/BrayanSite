import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Olá pessoal, eu me chamo <span className="purple">Brayan </span>
            sou de <span className="purple"> Brasília - DF, Brasil.</span>
            <br /> Sou um estudante, cursando atualmente Engenharia de Software.
            <br />
            Além disso, atualmente trabalho com <span className="purple">montagem</span> e 
            <span className="purple"> desmontagem</span> de <span className="purple">hardware</span>, 
            <span className="purple"> formatação</span> de computadores, 
            <span className="purple"> edição</span> de <span className="purple">vídeos</span>, 
            <span className="purple"> design</span>, e também tenho <span className="purple">Excel intermediário</span> em meu currículo.
            <br />
            <br />
            Além de programar, algumas outras atividades que adoro fazer!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Jogar Games
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
