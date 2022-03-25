import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/costum.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/auth/login", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          localStorage.setItem("token", response.data.token);
          console.log(localStorage.getItem("token"));
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const usernameInputChange = (event) => {
    setUsername(event.target.value);
  };
  const passwordInputChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="setlogin">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={usernameInputChange}
            value={username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordInputChange}
            value={password}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submitForm}>
          Login
        </Button>
      </Form>
    </div>
  );
}
