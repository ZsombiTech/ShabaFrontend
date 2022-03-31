import React from "react";
import Carddd from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Card(props) {
  return (
    <Carddd style={{ width: "18rem", marginBottom: "5rem" }}>
      <Carddd.Body>
        <Carddd.Img src={props.url}></Carddd.Img>
        <Carddd.Title>{props.description}</Carddd.Title>
        <Carddd.Text>{props.tags}</Carddd.Text>
        <Button variant="primary">Check it out</Button>
        <br />
        <br />
        <Carddd.Text>Posted by {props.username}</Carddd.Text>
      </Carddd.Body>
    </Carddd>
  );
}
