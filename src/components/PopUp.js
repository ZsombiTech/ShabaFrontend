import React from "react";
import "../App.css";

export default function PopUp(props) {
  const handleClick = () => {
    props.toggle();
  };

  return (
    <div className="modall">
      <div className="modall_content">
        <span className="close" onClick={handleClick}>
          x
        </span>
        <h2>R</h2>
      </div>
    </div>
  );
}
