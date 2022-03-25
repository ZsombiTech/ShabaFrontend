import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function HeadNavbar(props) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  });

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">SHABA</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {props.loggedIn && (
            <Navbar.Text>Signed in as: {username}</Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
