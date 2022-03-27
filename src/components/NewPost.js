import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function NewPost() {
  const [desc, setDesc] = useState();
  const [tags, setTags] = useState();
  const [submitted, setSubmitted] = useState();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const submitHandler = () => {
    axios
      .post(
        "http://localhost:8000/userpost",
        {
          username: localStorage.getItem("username"),
          description: desc,
          tags: tags,
        },
        config
      )
      .then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    setSubmitted(true);
  };

  const descInputChange = (event) => {
    setDesc(event.target.value);
  };
  const tagsInputChange = (event) => {
    setTags(event.target.value);
  };

  return (
    <>
      {!submitted ? (
        <div className="aligncenter">
          <h1 className="mb-11">Publish a new post</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tags (separated by commas)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tags"
                onChange={descInputChange}
                value={desc}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Everyone can see it"
                onChange={tagsInputChange}
                value={tags}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              size="lg"
              onClick={submitHandler}
            >
              Publish
            </Button>
          </Form>
        </div>
      ) : (
        <div className="aligncenter">
          <h1 className="mb-36">Publish a new post</h1>
          <Button variant="primary" type="submit" size="lg" href="/mainpage">
            Go to main page
          </Button>
        </div>
      )}
    </>
  );
}
