import React, { Fragment, useState, useEffect } from "react";
import Cardd from "./Card";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";

export default function MainPage(props) {
  const [results, setResults] = useState();
  const [blank, setBlank] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/searchword",
        { word: props.searchword },
        config
      )
      .then(
        (res) => {
          console.log(res.data);
          setResults(res.data.reverse());
        },
        (err) => {
          console.log(err);
        }
      );
    if (!props.searchword) {
      setBlank(true);
    } else {
      setBlank(false);
    }
  }, [props.searchword]);

  return (
    <>
      <div className="mt-20">
        {props.refresh && props.postData ? (
          props.loggedIn ? (
            props.searched && !blank ? (
              results.length > 0 ? (
                results.map((item, i) => (
                  <Cardd
                    key={i}
                    username={item.username}
                    title={item.title}
                    description={item.description}
                    tags={item.tags}
                    url={item.url}
                    id={item._id}
                    likedBy={item.likedBy}
                  />
                ))
              ) : (
                <Loading trueee={true} />
              )
            ) : (
              props.postData.map((data, key) => (
                <Cardd
                  key={key}
                  username={data.username}
                  title={data.title}
                  description={data.description}
                  tags={data.tags}
                  url={data.url}
                  id={data._id}
                  likedBy={data.likedBy}
                />
              ))
            )
          ) : (
            <Error />
          )
        ) : (
          <Loading trueeee={true} />
        )}
      </div>
    </>
  );
}
