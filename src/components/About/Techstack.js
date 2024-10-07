import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiPython,
  DiGit,
  DiJava
} from "react-icons/di";
import {
  SiSpringboot,
  SiPostgresql,
  SiMongodb,
  SiSonarqube,
  SiJenkins
} from "react-icons/si";
import {
  AiFillGithub,
  AiFillGitlab
} from "react-icons/ai";
import {
  FaDocker
} from "react-icons/fa";
import {
  FiFigma
} from "react-icons/fi";

const techStackData = [
  { component: DiJava, name: "Java" },
  { component: SiSpringboot, name: "Spring Boot" },
  { component: SiPostgresql, name: "Postgre SQL" },
  { component: DiPython, name: "Python" },
  { component: FaDocker, name: "Docker" },
  { component: SiMongodb, name: "MongoDB" },
  { component: SiSonarqube, name: "Sonar Qube" },
  { component: SiJenkins, name: "Jenkins" },
  { component: DiGit, name: "Git" },
  { component: AiFillGitlab, name: "GitLab" },
  { component: AiFillGithub, name: "GitHub" },
  { component: DiReact, name: "React" },
  { component: DiJavascript1, name: "Java Script" },
  { component: DiNodejs, name: "Node.js" },
  { component: FiFigma, name: "Figma" }
];

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {techStackData.map(({ component: IconComponent, name }, index) => (
        <Col key={index} xs={4} md={2} className="tech-icons">
          <span className="tech-icon-image"><IconComponent /></span>
          <span className="tech-icon-name">{name}</span>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;