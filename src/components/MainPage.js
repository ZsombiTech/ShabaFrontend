import React, { useEffect, useState, Fragment } from "react";
import Cardd from "./Card";
import Error from "./Error";

export default function MainPage(props) {
  console.log(props.loggedIn);
  return (
    <>
      {props.loggedIn ? (
        props.postData.map((data, key) => (
          <Cardd
            key={key}
            username={data.username}
            description={data.description}
            imageUrl={data.imageUrl}
          />
        ))
      ) : (
        <Error />
      )}
    </>
  );
}
