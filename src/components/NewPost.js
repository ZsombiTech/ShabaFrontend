import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import PopUp from "./PopUp";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const submitHandler = () => {
    if (desc != "" && tags != "") {
      axios
        .post(
          "http://localhost:8000/userpost",
          {
            username: localStorage.getItem("username"),
            title: title,
            description: desc,
            tags: tags,
            url: url,
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
    }
  };

  const titleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const descInputChange = (event) => {
    setDesc(event.target.value);
  };

  const tagsInputChange = (event) => {
    setTags(event.target.value);
  };

  const urlInputChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <>
      {!submitted ? (
        <div className="aligncenter">
          <h1 className="mb-11">Publish a new post</h1>
          <Form>
            <Form.Group className="mb-2" controlId="formBasicImage">
              <Form.Label>Image URL (not required)</Form.Label>
              <Form.Control
                type="url"
                placeholder="URL"
                pattern="https://.*"
                onChange={urlInputChange}
                value={url}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicText">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={titleInputChange}
                value={title}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={descInputChange}
                value={desc}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tags (separated by commas)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tags"
                onChange={tagsInputChange}
                value={tags}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Everyone can see it" />
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
          <h1 className="mb-36">Succesfully published</h1>
          <Button variant="primary" type="submit" size="lg" href="/mainpage">
            Go to main page
          </Button>
        </div>
      )}
    </>
  );
}
