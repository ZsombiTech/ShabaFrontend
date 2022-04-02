import React from "react";

export default function Loading(props) {
  let text = "Loading";
  if (props.truee) {
    text = "You haven't posted anything yet...";
  }
  return <h1 className="mt-36">{text}</h1>;
}
