import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Desenvolvedor WEB",
          "Freelancer",
          "Designer Gráfico",
          "Desenvolvedor Back-End",
          "Editor de Vídeos",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
