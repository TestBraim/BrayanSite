import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Errorabout from "./Errorabout";
import laptopImg from "../../Assets/about.png";

function error404() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "6em", paddingBottom: "60px" }}>
            Aguardando <strong className="purple">Novidades</strong> 
            </h1>
            <Errorabout />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
            
          >
            <img src={laptopImg} alt="about" className="img-fluid" /><br></br><br></br><br></br><br></br><br></br>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default error404;
