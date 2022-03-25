import React, { useState } from "react";
import "./App.css";
import HeadNavbar from "./components/HeadNavbar";
import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  axios.post("http://localhost:8000/posts", {}, config).then(
    (res) => {
      if (res.data.response === "Good") {
        setloggedIn(true);
      }
    },
    (error) => {
      console.log(error);
    }
  );

  return (
    <Router>
      <div className="App">
        <HeadNavbar />
        <div className="centered">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/mainpage">{loggedIn && <MainPage />}</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
