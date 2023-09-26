import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPycharm,
} from "react-icons/si";
import {  
  FaLinux
} from "react-icons/fa";
import {  
  BsWindows
} from "react-icons/bs";
import {  
  RiFileExcel2Fill
} from "react-icons/ri";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <FaLinux />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPycharm   />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <BsWindows />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <RiFileExcel2Fill />
      </Col>
    </Row>
  );
}

export default Toolstack;
