import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
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
              Eu me chamo Brayan, tenho 18 anos, e comecei a programar desde que eu tinha 12 anos de idade.
              <br />
              <br />Tenho maior dominância nas seguintes linguagens:
              <i>
                <b className="purple"> JavaScript | Python | JAVA. </b>
              </i>
              <br />
              <br />
              Atualmente estou cursando o&nbsp;
              <i>
                <b className="purple">Engenharia de Software</b>na {" "}
                <b className="purple">UDF</b> foi um motivo para deixar de me aprofundar nos{" "}
                </b>
              </i>
              <br />
              <br />
              Em minhas experiências de trabalho, sempre visei
              me <b className="purple">aperfeiçoar</b> ao
              <i>
                <b className="purple">
                  {" "}
                  máximo
                </b>
              </i>
              &nbsp; e sempre
              <i>
                <b className="purple"> melhorar</b>
              </i>
              &nbsp; minha comunicação, sempre entregando meu 
              <i>
                <b className="purple"> máximo</b>
              </i>
              &nbsp; por onde passo, com 
              <i>
                <b className="purple">
                  {" "}
                  comprometimento
                </b>
              </i>
              &nbsp; e 
              <i>
                <b className="purple"> disposição.</b>
              </i>
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
                  href="https://github.com/BigBraim"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/DrogaEoBraia_"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
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
