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

  const togglePopFalse = () => {
    setSeen(false);
  };

  const togglePopTrue = () => {
    setSeen(true);
  };
  const submitForm = (event) => {
    if (username != "" && email != "" && password != "") {
      event.preventDefault();
      setBlank(false);
    } else {
      setBlank(true);
    }
    if (!blank) {
      axios
        .post("http://shababackend.herokuapp.com/auth/register", {
          username: username,
          email: email,
          password: password,
        })
        .then(
          (response) => {
            if (response.data.response != "Already exits") {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("username", username);
              history.push("/mainpage");
              props.setLoggedIn(true);
              props.loggedInn.current = true;
            } else {
              setMessage(response.data.response);
              togglePopTrue();
            }
          },
          (error) => {
            console.log(error);
          }
        );
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
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={emailInputChange}
                value={email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={passwordInputChange}
                value={password}
                required
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
        <a href="/login">Already have an account?</a>
        {seen && <PopUp toggle={togglePopFalse} message={message} />}
      </div>
    </>
  );
}
