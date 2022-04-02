import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import PostCardProfile from "./PostCardProfile";
import "../styles/costum.css";

export default function OwnPosts() {
  const [postdata, setPostData] = useState();
  const [refr, setRefr] = useState(true);

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
  }, [refr]);

  return (
    <>
      <h1 className="mb-20 mt-6">Your own posts</h1>
      {postdata ? (
        postdata.length == 0 ? (
          <Loading truee={true} />
        ) : refr ? (
          postdata.map((item, key) => (
            <PostCardProfile item={item} key={key} setRefr={setRefr} />
          ))
        ) : (
          <Loading />
        )
      ) : (
        <Loading truee={false} />
      )}
    </>
  );
}
