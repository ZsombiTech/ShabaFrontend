import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import HeadNavbar from "./components/HeadNavbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Account from "./components/Account";
import OwnPosts from "./components/OwnPosts";
import NewPost from "./components/NewPost";
import ViewProfile from "./components/ViewProfile";
import ProjectDetail from "./components/ProjectDetail";
import MainPage from "./components/MainPage";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const loggedInn = useRef(false);
  const [searchword, setSearchWord] = useState(" ");
  const [refresh, setRefresh] = useState(true);
  const [postData, setPostData] = useState();
  const [searched, setSearched] = useState(false);
  const [usernamee, setUsernamee] = useState();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  useEffect(() => {
    setUsernamee(localStorage.getItem("username"));

    axios.post("http://shababackend.herokuapp.com/posts", {}, config).then(
      (res) => {
        if (res.data.response === "Good") {
          loggedInn.current = true;
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
              <Login setLoggedIn={setLoggedIn} loggedInn={loggedInn} />
            </div>
          </Route>

          <Route path="/register">
            <HeadNavbar loggedIn={loggedIn} />
            <div className="centered">
              <Register setLoggedIn={setLoggedIn} loggedInn={loggedInn} />
            </div>
          </Route>
          <Route path="/mainpage">
            <HeadNavbar
              loggedIn={loggedIn}
              main={true}
              setSearchWord={setSearchWord}
              setRefresh={setRefresh}
              setSearched={setSearched}
              usernamee={usernamee}
            />
            <div className="centered">
              {postData && refresh ? (
                <MainPage
                  postData={postData.reverse()}
                  loggedIn={loggedIn}
                  searchword={searchword}
                  refresh={refresh}
                  searched={searched}
                  setSearched={setSearched}
                />
              ) : loggedInn ? (
                <Loading />
              ) : (
                <Error />
              )}
            </div>
          </Route>
          <Route path="/account">
            <HeadNavbar loggedIn={loggedIn} usernamee={usernamee} />
            <div className="centered">
              {loggedInn ? <Account /> : <Error />}
            </div>
          </Route>
          <Route path="/newpost">
            <HeadNavbar loggedIn={loggedIn} usernamee={usernamee} />
            <div className="centered">
              {loggedInn ? <NewPost /> : <Error />}
            </div>
          </Route>
          <Route path="/viewprofile">
            <HeadNavbar loggedIn={loggedIn} usernamee={usernamee} />
            <div className="centered">
              {loggedInn ? (
                <ViewProfile loggedIn={loggedIn} />
              ) : (
                <Error loggedIn={loggedIn} />
              )}
            </div>
          </Route>
          <Route path="/projectdetail">
            <HeadNavbar loggedIn={loggedIn} usernamee={usernamee} />
            <div className="centered">
              {loggedInn ? (
                <ProjectDetail loggedIn={loggedIn} />
              ) : (
                <Error loggedIn={loggedIn} />
              )}
            </div>
          </Route>
          <Route path="/ownposts">
            <HeadNavbar loggedIn={loggedIn} usernamee={usernamee} />
            <div className="centered">
              {loggedInn ? (
                <OwnPosts loggedIn={loggedIn} />
              ) : (
                <Error loggedIn={loggedIn} />
              )}
            </div>
          </Route>
          <Route>
            <HeadNavbar loggedIn={loggedIn} usernamee={usernamee} />
            <Error loggedIn={loggedIn} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
