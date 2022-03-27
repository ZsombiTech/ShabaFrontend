import React from "react";
import Button from "react-bootstrap/Button";

export default function Error(props) {
  return (
    <div>
      <h1 className="mt-52 mb-11">
        Sorry, but there was a problem, please try again
      </h1>

      {!props.loggedIn && (
        <>
          <h4>Maybe try to login</h4>
          <Button href="/login">Login</Button>
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
