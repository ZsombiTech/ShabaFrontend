import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/costum.css";

export default function Error(props) {
  return (
    <div className="aligncenter">
      <h1 className="mt-36 mb-11">
        Sorry, but there was a problem, please try again
      </h1>

      {!props.loggedIn && (
        <>
          <h4 className="mb-10">
            Maybe try to refresh the page or login again
          </h4>

          <Button href="/login" size="lg">
            Login
          </Button>
        </>
      )}
      {props.loggedIn && (
        <>
          <h4>Go to the main page</h4>

          <Button href="/mainpage">Main Page</Button>
        </>
      )}
    </div>
  );
}
