import React from "react";
import Carddd from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Card(props) {
  return (
    <Carddd style={{ width: "18rem", marginBottom: "5rem" }}>
      {/*<Carddd.Img variant="top" src="holder.js/100px180" />*/}
      <Carddd.Body>
        <Carddd.Img src="http://verselemzes.hu/wp-content/uploads/2017/11/Berzsenyi-D%C3%A1niel-2.2-224x300.jpg"></Carddd.Img>
        <Carddd.Title>{props.description}</Carddd.Title>
        <Carddd.Text>{props.tags}</Carddd.Text>
        <Button variant="primary">Go somewhere</Button>
      </Carddd.Body>
    </Carddd>
  );
}
