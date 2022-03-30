import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PopUp from "./PopUp";
import "../styles/costum.css";
import axios from "axios";

export default function Register(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blank, setBlank] = useState(true);
  const [message, setMessage] = useState();
  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen((seen) => !seen);
    console.log(seen);
  };

  const submitForm = (event) => {
    setUsername((username) => username.replace(/\s/g, ""));
    setEmail((email) => email.replace(/\s/g, ""));
    setPassword((password) => password.replace(/\s/g, ""));
    event.preventDefault();
    if (username == "" || email == "" || password == "") {
      setMessage("Please fill out correctly");
      togglePop();
    } else {
      setBlank(false);
    }
    if (!blank) {
      axios
        .post("http://localhost:8000/auth/register", {
          username: username,
          email: email,
          password: password,
        })
        .then(
          (response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", username);
            props.setLoggedIn(true);
          },
          (error) => {
            console.log(error);
          }
        )
        .then(() => {
          history.push("/mainpage");
        });
    }
  };

  const usernameInputChange = (event) => {
    setUsername(event.target.value);
  };
  const passwordInputChange = (event) => {
    setPassword(event.target.value);
  };
  const emailInputChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <div className="aligncenter">
        <h1 className="">Register an account</h1>
        <div className="setlogin">
          <Form>
            <Form.Group className="mb-3" controlId="formBasiName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={usernameInputChange}
                value={username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={emailInputChange}
                value={email}
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
              Register
            </Button>
          </Form>
        </div>
        <a href="/login">Login to your account</a>
        {seen && <PopUp toggle={togglePop} message={message} />}
      </div>
    </>
  );
}
