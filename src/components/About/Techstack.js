import IconList from "./IconList";
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
  { component: SiPostgresql, name: "PostgreSQL" },
  { component: DiPython, name: "Python" },
  { component: FaDocker, name: "Docker" },
  { component: SiMongodb, name: "MongoDB" },
  { component: SiSonarqube, name: "SonarQube" },
  { component: SiJenkins, name: "Jenkins" },
  { component: DiGit, name: "Git" },
  { component: AiFillGitlab, name: "GitLab" },
  { component: AiFillGithub, name: "GitHub" },
  { component: DiReact, name: "React" },
  { component: DiJavascript1, name: "JavaScript" },
  { component: DiNodejs, name: "Node.js" },
  { component: FiFigma, name: "Figma" }
];

function Techstack() {
  return <IconList items={techStackData} />;
}

export default Techstack;
