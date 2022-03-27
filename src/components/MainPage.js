import React, { useEffect, useState, Fragment } from "react";
import Cardd from "./Card";
import Error from "./Error";

export default function MainPage(props) {
  console.log(props.loggedIn);
  return (
    <>
      <div className="mt-20">
        {props.postData.length > 0 ? (
          props.loggedIn ? (
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
          )
        ) : (
          <h1 className="mt-56">No post to show...</h1>
        )}
      </div>
    </>
  );
}
