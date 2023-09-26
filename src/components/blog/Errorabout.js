import React from "react";
import Card from "react-bootstrap/Card";

function Errorabout() {
  return (
    <Card className="quote-card-indisponivel">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Blog <span className="purple">Indisponível </span>
            no momento
            <br /> Em breve <span className="purple">NOVIDADES!! </span>
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default Errorabout;
