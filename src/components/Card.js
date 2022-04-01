import React from "react";
import Carddd from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Card(props) {
  const handleLink = () => {
    localStorage.setItem("searchusername", props.username);
  };
  const handleButton = () => {
    localStorage.setItem("projectname", props.description);
  };

  return (
    <Carddd style={{ width: "18rem", marginBottom: "5rem" }}>
      <Carddd.Body>
        <Carddd.Img src={props.url}></Carddd.Img>
        <Carddd.Title>{props.description}</Carddd.Title>
        <Carddd.Text>{props.tags}</Carddd.Text>
        <Link onClick={handleButton} to="/projectdetail">
          <Button variant="primary">Check it out</Button>
        </Link>
        <br />
        <br />
        <Carddd.Text>
          <Link onClick={handleLink} to="/viewprofile">
            Posted by {props.username}
          </Link>
        </Carddd.Text>
      </Carddd.Body>
    </Carddd>
  );
}
