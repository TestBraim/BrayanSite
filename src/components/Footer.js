import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Desenvolvedor Web | Brayan Pletsch |</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year}</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/BrayanPletsch"
                style={{ color: "white" }}
                target="_blank" 
                rel="noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://wa.me/5561999177159?text=Ol%C3%A1%20Brayan!%20Gostaria%20de%20entrar%20em%20contato%20com%20voc%C3%AA"
                style={{ color: "white" }}
                target="_blank" 
                rel="noreferrer"
              >
                <IoLogoWhatsapp />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/brayan-pletsch/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/brayan_pletsch/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
