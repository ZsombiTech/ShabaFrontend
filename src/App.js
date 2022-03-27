import React, { useState, useEffect } from "react";
import "./App.css";
import HeadNavbar from "./components/HeadNavbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import MainPage from "./components/MainPage";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [postData, setPostData] = useState();
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  useEffect(() => {
    axios.post("http://localhost:8000/posts", {}, config).then(
      (res) => {
        if (res.data.response === "Good") {
          setPostData(res.data.data);
          setLoggedIn(true);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              <Login />
            </div>
          </Route>

          <Route path="/register">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              <Register />
            </div>
          </Route>
          <Route path="/mainpage">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              <MainPage postData={postData} loggedIn={loggedIn} />
            </div>
          </Route>
          <Route>
            <HeadNavbar loggedIn={loggedIn} />
            <Error loggedIn={loggedIn} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
