import React, { useState, useEffect, useRef } from "react";
import Carddd from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Heart from "react-animated-heart";
import Button from "react-bootstrap/Button";
import "../styles/costum.css";
import axios from "axios";

export default function Card(props) {
  const [isClick, setClick] = useState();
  const numm = useRef(0);
  const [first, setFirst] = useState(true);

  const handleLink = () => {
    localStorage.setItem("searchusername", props.username);
  };

  const handleButton = () => {
    localStorage.setItem("projectname", props.title);
  };

  const heartHandler = () => {
    setFirst(false);
    setClick(!isClick);
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    numm.current = numm.current + 1;
    if (numm.current == 1) {
      props.likedBy.map((item) => {
        if (item == localStorage.getItem("username")) {
          setClick(true);
        }
      });
    }

    axios
      .post(
        `http://localhost:8000/likepost`,
        {
          clicked: isClick,
          id: props.id,
          first: first,
          username: localStorage.getItem("username"),
        },
        config
      )
      .then(
        (response) => {},
        (error) => {
          console.log(error);
        }
      );
  }, [isClick]);

  return (
    <Carddd
      style={{ width: "18rem", marginBottom: "3rem" }}
      className="aligncenter2"
    >
      <Carddd.Body>
        <Carddd.Img src={props.url}></Carddd.Img>
        <Carddd.Title className="mb-3 ">{props.title}</Carddd.Title>
        <Carddd.Text className="mb-1 text-base">
          {props.shortdescription}
        </Carddd.Text>
        <Carddd.Text className="text-sm">
          {props.tags.map((item) => `#${item}`)}
        </Carddd.Text>
        <Link onClick={handleButton} to="/projectdetail">
          <Button variant="primary">Check it out</Button>
        </Link>
        <br />
        <br />
        {props.private && (
          <Carddd.Text>
            <Link onClick={handleLink} to="/viewprofile">
              Posted by {props.username}
            </Link>
          </Carddd.Text>
        )}
      </Carddd.Body>
      <Heart isClick={isClick} onClick={heartHandler} className="heart" />
    </Carddd>
  );
}
