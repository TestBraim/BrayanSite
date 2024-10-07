import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiIntellijidea,
  SiPycharm,
} from "react-icons/si";
import {  
  FaLinux
} from "react-icons/fa";
import {  
  BsWindows
} from "react-icons/bs";

const toolStackData = [
  { component: FaLinux, name: "Linux" },
  { component: SiVisualstudiocode, name: "Visual Studio Code" },
  { component: SiIntellijidea, name: "IntelliJ IDEA" },
  { component: BsWindows, name: "Windows" },
  { component: SiPycharm, name: "PyCharm" }
];

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {toolStackData.map(({ component: IconComponent, name }, index) => (
        <Col key={index} xs={4} md={2} className="tech-icons">
          <span className="tech-icon-image"><IconComponent /></span>
          <span className="tech-icon-name">{name}</span>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;