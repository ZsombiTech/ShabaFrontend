import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function HeadNavbar(props) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  });

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">SHABA</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {props.loggedIn && (
            <>
              <Navbar.Text className="mr-11">
                <a href="/account"> Signed in as: {username}</a>
              </Navbar.Text>

              <Button onClick={handleLogout} href="/login">
                Logout
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
