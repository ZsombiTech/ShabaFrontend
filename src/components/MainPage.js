import React, { useEffect, useState, Fragment } from "react";
import Cardd from "./Card";

export default function MainPage(props) {
  console.log(props.postData);
  return (
    <>
      {props.postData.map((data, key) => (
        <Cardd
          key={key}
          username={data.username}
          description={data.description}
          imageUrl={data.imageUrl}
        />
      ))}
    </>
  );
}
