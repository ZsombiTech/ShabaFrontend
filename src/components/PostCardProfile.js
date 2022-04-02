import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Loading from "./Loading";
import Carddd from "react-bootstrap/Card";

export default function PostCardProfile(props) {
  const [refr, setRefr] = useState(true);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const deleteHandler = () => {
    setRefr(false);
    props.setRefr(false);
    axios
      .post(
        "http://localhost:8000/deletepost",
        {
          id: props.item._id,
        },
        config
      )
      .then(
        (response) => {
          console.log(response);
          setRefr(true);
          props.setRefr(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
      {refr ? (
        <Carddd style={{ width: "18rem", marginBottom: "3rem" }}>
          <Carddd.Body className="aligncenter2">
            <Carddd.Img src={props.item.url}></Carddd.Img>
            <Carddd.Title>{props.item.description}</Carddd.Title>
            <Carddd.Text>{props.item.tags}</Carddd.Text>
            <div className="flex">
              <label>❤</label>
              <p className="ml-2">{props.item.likes}</p>
            </div>
            <br />
            <Button variant="danger" onClick={deleteHandler}>
              Delete
            </Button>
          </Carddd.Body>
        </Carddd>
      ) : (
        <Loading />
      )}
    </>
  );
}
