import React, { useState, useEffect } from "react";
import "./App.css";
import HeadNavbar from "./components/HeadNavbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Account from "./components/Account";
import NewPost from "./components/NewPost";
import ViewProfile from "./components/ViewProfile";
import ProjectDetail from "./components/ProjectDetail";
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
          setLoggedIn(true);
          setPostData(res.data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [loggedIn]);

  if (loggedIn) {
    if (window.location.pathname == "/login") {
      setLoggedIn(false);
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("searchusername");
      localStorage.removeItem("projectname");
    }
    if (window.location.pathname == "/register") {
      setLoggedIn(false);
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("searchusername");
      localStorage.removeItem("projectname");
    }
    if (window.location.pathname != "/viewprofile") {
      localStorage.removeItem("searchusername");
    }
    if (window.location.pathname != "/projectdetail") {
      localStorage.removeItem("projectname");
    }
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              <Login setLoggedIn={setLoggedIn} />
            </div>
          </Route>

          <Route path="/register">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              <Register setLoggedIn={setLoggedIn} />
            </div>
          </Route>
          <Route path="/mainpage">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              {postData ? (
                <MainPage postData={postData.reverse()} loggedIn={loggedIn} />
              ) : loggedIn ? (
                <Loading />
              ) : (
                <Error />
              )}
            </div>
          </Route>
          <Route path="/account">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">{loggedIn ? <Account /> : <Error />}</div>
          </Route>
          <Route path="/newpost">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">{loggedIn ? <NewPost /> : <Error />}</div>
          </Route>
          <Route path="/viewprofile">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              {loggedIn ? (
                <ViewProfile loggedIn={loggedIn} />
              ) : (
                <Error loggedIn={loggedIn} />
              )}
            </div>
          </Route>
          <Route path="/projectdetail">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              {loggedIn ? (
                <ProjectDetail loggedIn={loggedIn} />
              ) : (
                <Error loggedIn={loggedIn} />
              )}
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
