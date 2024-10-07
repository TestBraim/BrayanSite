import React from "react";
import Card from "react-bootstrap/Card";

function Errorabout() {
  return (
    <Card className="quote-card-indisponivel">
      <Card.Body>
        <blockquote className="blockquote mb-0">
        <p style={{ textAlign: "justify" }}>
            <span className="purple">Não fique triste</span>. Logo, logo esta página irá 
            <span className="purple"> funcionar</span>, <br />
            apenas <span className="purple">aguarde um pouco</span>. <br />
            Em breve <span className="purple">NOVIDADES!!</span>
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default Errorabout;
