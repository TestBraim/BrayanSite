import IconList from "./IconList";
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
  return <IconList items={toolStackData} />;
}

export default Toolstack;
