import React, { useState, useEffect } from "react";
import Carddd from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Loading from "./Loading";
import Error from "./Error";
import "../styles/costum.css";
import { Link } from "react-router-dom";

import axios from "axios";

export default function ProjectDetail(props) {
  const [userdatas, setUserDatas] = useState();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleLink = () => {
    localStorage.setItem("searchusername", userdatas.username);
  };

  const projectNamee = localStorage.getItem("projectname");

  useEffect(() => {
    const projectName = localStorage.getItem("projectname");
    axios
      .get(`http://localhost:8000/findpost:${projectName}`, config)
      .then((response) => {
        setUserDatas(response.data[0]);
        console.log(response.data[0]);
      });
  }, []);
  return (
    <>
      {userdatas ? (
        <div>
          <h1 className="mt-6 mb-12">Project Details</h1>
          <Carddd style={{ width: "18rem", marginBottom: "3rem" }}>
            <Carddd.Body className="aligncenter2">
              <Carddd.Img src={userdatas.url}></Carddd.Img>
              <Carddd.Title className="mb-3 ">{userdatas.title}</Carddd.Title>
              <Carddd.Text className="mb-1 text-base">
                {userdatas.longdescription}
              </Carddd.Text>
              <Carddd.Text className="text-sm">
                {userdatas.tags.map((item) => `#${item}`)}
              </Carddd.Text>
              <div className="flex">
                <label>❤</label>
                <p className="ml-2">{userdatas.likes}</p>
              </div>
              <br />
              <br />
              <Carddd.Text>
                <Link onClick={handleLink} to="/viewprofile">
                  Posted by {userdatas.username}
                </Link>
              </Carddd.Text>
            </Carddd.Body>
          </Carddd>
          <Button href="/mainpage" className="mb-10">
            Back to the main page
          </Button>
        </div>
      ) : projectNamee ? (
        <Loading />
      ) : (
        <Error loggedIn={props.loggedIn} />
      )}
    </>
  );
}
