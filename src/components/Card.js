import React from "react";
import Carddd from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Card(props) {
  return (
    <Carddd style={{ width: "18rem", marginBottom: "5rem" }}>
      {/*<Carddd.Img variant="top" src="holder.js/100px180" />*/}
      <Carddd.Body>
        <Carddd.Title>{props.username}</Carddd.Title>
        <Carddd.Text>{props.description}</Carddd.Text>
        <Button variant="primary">Go somewhere</Button>
      </Carddd.Body>
    </Carddd>
  );
}
