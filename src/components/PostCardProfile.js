import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Loading from "./Loading";
import Carddd from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function PostCardProfile(props) {
  const [refr, setRefr] = useState(true);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleButton = () => {
    localStorage.setItem("projectname", props.item.title);
  };

  const deleteHandler = () => {
    setRefr(false);
    props.setRefr(false);
    axios
      .post(
        "http://shababackend.herokuapp.com/deletepost",
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
            <Carddd.Title className="mb-3 ">{props.item.title}</Carddd.Title>
            <Carddd.Text className="mb-1 text-base">
              {props.item.description}
            </Carddd.Text>
            <Carddd.Text className="text-sm">
              {props.item.tags.map((item) => `#${item}`)}
            </Carddd.Text>
            <div className="flex">
              <label>❤</label>
              <p className="ml-2">{props.item.likes}</p>
            </div>
            <br />
            <Link onClick={handleButton} to="/projectdetail">
              <Button variant="primary">Check it out</Button>
            </Link>
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
