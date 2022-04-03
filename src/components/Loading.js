import React from "react";

export default function Loading(props) {
  let text = "Loading";
  if (props.truee) {
    text = "You haven't posted anything yet...";
  }
  if (props.trueee) {
    text = "No results found";
  }
  if (props.trueeee) {
    text = "No posts";
  }
  return <h1 className="mt-36">{text}</h1>;
}
