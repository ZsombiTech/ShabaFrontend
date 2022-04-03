import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import PopUp from "./PopUp";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [tags, setTags] = useState("");
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState();
  const [checked, setChecked] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const submitHandler = () => {
    if (shortDesc != "" && longDesc != "" && title != "" && tags != "") {
      axios
        .post(
          "http://localhost:8000/userpost",
          {
            username: localStorage.getItem("username"),
            title: title,
            shortdescription: shortDesc,
            longdescription: longDesc,
            tags: tags,
            url: url,
            private: !checked,
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

  const shortDescInputChange = (event) => {
    setShortDesc(event.target.value);
  };
  const longDescInputChange = (event) => {
    setLongDesc(event.target.value);
  };

  const tagsInputChange = (event) => {
    setTags(event.target.value);
  };

  const urlInputChange = (event) => {
    setUrl(event.target.value);
  };

  const checkboxHandler = () => {
    setChecked(!checked);

    console.log(checked);
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
            <Form.Group className="mb-3" controlId="formBasisText">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={shortDescInputChange}
                value={shortDesc}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Long Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                onChange={longDescInputChange}
                value={longDesc}
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
              <Form.Check
                type="checkbox"
                label="Show my profile"
                onChange={checkboxHandler}
                defaultValue={checked}
                checked={checked}
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
          <h1 className="mb-36">Succesfully published</h1>
          <Button variant="primary" type="submit" size="lg" href="/mainpage">
            Go to main page
          </Button>
        </div>
      )}
    </>
  );
}
