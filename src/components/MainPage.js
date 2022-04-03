import React, { Fragment, useState, useEffect } from "react";
import Cardd from "./Card";
import Loading from "./Loading";
import Error from "./Error";

export default function MainPage(props) {
  return (
    <>
      <div className="mt-20">
        {props.refresh && props.postData.length > 0 ? (
          props.loggedIn ? (
            props.postData.map((data, key) =>
              props.searchword.length < 1 ? (
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
              ) : (
                (data.title.includes(props.searchword) ||
                  data.tags.includes(props.searchword)) && (
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
                )
              )
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
