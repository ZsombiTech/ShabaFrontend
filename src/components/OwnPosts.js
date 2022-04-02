import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Carddd from "react-bootstrap/Card";
import "../styles/costum.css";

export default function OwnPosts() {
  const [postdata, setPostData] = useState();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/ownposts:${localStorage.getItem("username")}`,
        config
      )
      .then((response) => {
        setPostData(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <>
      <h1 className="mb-20 mt-6">Your own posts</h1>
      {postdata ? (
        postdata.length == 0 ? (
          <Loading truee={true} />
        ) : (
          postdata.map((item, key) => (
            <Carddd style={{ width: "18rem", marginBottom: "3rem" }} key={key}>
              <Carddd.Body className="aligncenter2">
                <Carddd.Img src={item.url}></Carddd.Img>
                <Carddd.Title>{item.description}</Carddd.Title>
                <Carddd.Text>{item.tags}</Carddd.Text>
                <br />
                <br />
                <div className="flex">
                  <label>❤</label>
                  <p className="ml-2">{item.likes}</p>
                </div>
              </Carddd.Body>
            </Carddd>
          ))
        )
      ) : (
        <Loading truee={false} />
      )}
    </>
  );
}
