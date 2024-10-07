import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              UM POUCO <span className="purple"> SOBRE </span> MIM
            </h1>
            <p className="home-about-body">
              Olá! Meu nome é Brayan, tenho <b className="purple">18 anos</b> e sou apaixonado por <b className="purple">tecnologia</b> e <b className="purple">programação</b> desde os meus <b className="purple">12 anos</b> de idade. Meu <b className="purple">objetivo principal</b> é me desenvolver como um <b className="purple">programador</b> e contribuir com <b className="purple">soluções inovadoras</b> e <b className="purple">eficientes</b> para resolver <b className="purple">problemas reais</b>.
              <br />
              <br /> Atualmente, curso <b className="purple">Engenharia de Software</b> na <b className="purple">UDF</b>, onde venho consolidando meus <b className="purple">conhecimentos técnicos</b> e <b className="purple">habilidades práticas</b>, sem deixar de explorar <b className="purple">novas tecnologias</b> e <b className="purple">metodologias</b> por conta própria. As linguagens em que mais me destaco são <b className="purple">Java</b>, <b className="purple">Python</b> e <b className="purple">JavaScript</b>, que utilizo para criar <b className="purple">aplicações robustas</b> e <b className="purple">funcionais</b>.
              <br />
              <br /> Em cada <b className="purple">experiência profissional</b> ou <b className="purple">projeto acadêmico</b>, sempre procurei manter um alto padrão de <b className="purple">comunicação</b> e <b className="purple">dedicação</b>, buscando <b className="purple">crescer</b> e ajudar o time a alcançar os melhores <b className="purple">resultados possíveis</b>. Minha <b className="purple">motivação</b> vem do desejo constante de <b className="purple">aprender</b> e de <b className="purple">compartilhar conhecimento</b> de forma prática e colaborativa.
              <br />
              <br />
              Seja <b className="purple">resolvendo desafios técnicos</b>, <b className="purple">desenvolvendo funcionalidades</b> ou <b className="purple">aprendendo novas tecnologias</b>, gosto de me manter <b className="purple">atualizado</b> e <b className="purple">disposto</b> a encarar novos desafios que me ajudem a <b className="purple">evoluir</b> como <b className="purple">profissional</b> e <b className="purple">pessoa</b>.
            </p>

          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>ENTRE EM CONTATO</h1>
            <p>
            Sinta-se à vontade para se <span className="purple">conectar </span>comigo
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/BrayanPletsch"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://wa.me/5561999177159?text=Ol%C3%A1%20Brayan!%20Gostaria%20de%20entrar%20em%20contato%20com%20voc%C3%AA"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <IoLogoWhatsapp />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/brayan-pletsch-b5953128b/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/brayan_pletsch/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
