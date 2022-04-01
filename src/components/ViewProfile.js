import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";
import Button from "react-bootstrap/Button";

export default function ViewProfile(props) {
  const [userdatas, setUserDatas] = useState();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const searchusernamee = localStorage.getItem("searchusername");

  useEffect(() => {
    const searchusername = localStorage.getItem("searchusername");
    axios
      .get(`http://localhost:8000/users:${searchusername}`, config)
      .then((response) => {
        setUserDatas(response.data.docs[0]);
        console.log(response.data.docs[0]);
      });
  }, []);

  return (
    <>
      {userdatas ? (
        <div>
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
              <div className=" image d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-secondary">
                  <img
                    src="https://i.imgur.com/wvxPV9S.png"
                    height="100"
                    width="100"
                  />
                </button>
                <span className="name mt-3">{userdatas.username}</span>
                <span className="idd">{userdatas.email}</span>
                <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                  <span className="idd1">{userdatas._id}</span>
                  <span>
                    <i className="fa fa-copy"></i>
                  </span>
                </div>
                <div className="text mt-3 mb-8 w-52">
                  {userdatas.description}
                </div>
                <div className=" px-2 rounded mt-4 date ">
                  <span className="join">
                    Joined: {userdatas.date.slice(0, 10)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button href="/mainpage">Back to the main page</Button>
        </div>
      ) : searchusernamee ? (
        <Loading />
      ) : (
        <Error loggedIn={props.loggedIn} />
      )}
    </>
  );
}
