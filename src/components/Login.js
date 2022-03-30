import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/costum.css";
import axios from "axios";

export default function Login(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticproblem, setAuthenticproblem] = useState(true);
  const [seen, setSeen] = useState(false);

  const togglePop = () => {};

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/auth/login", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          if (response.data.response == "correct") {
            setAuthenticproblem(false);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", username);
            props.setLoggedIn(true);
          } else {
            console.log(response.data.response);
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .then(() => {
        if (!authenticproblem) {
          history.push("/mainpage");
        }
      });
  };

  const usernameInputChange = (event) => {
    setUsername(event.target.value);
  };
  const passwordInputChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="aligncenter">
        <h1>Login to your account</h1>
        <div className="setlogin ">
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

            <Button
              variant="primary"
              type="submit"
              size="lg"
              className="mb-11"
              onClick={submitForm}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
      <a href="/register">Already have an account?</a>
    </>
  );
}
