import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/costum.css";

export default function HeadNavbar(props) {
  const [searchwords, setSearchWords] = useState();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("projectname");
    localStorage.removeItem("searchusername");
  };

  const handleSearchBar = (event) => {
    setSearchWords(event.target.value);
  };

  const handleSearchButton = () => {
    props.setSearched(true);
    props.setRefresh(false);
    props.setSearchWord(searchwords);
    props.setRefresh(true);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand
          href={props.loggedIn ? "/mainpage" : "/login"}
          className="addmgright0"
        >
          SHABA
        </Navbar.Brand>
        {props.loggedIn && (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Navbar.Text className="addmgright">
                  <a href="/account"> Signed in as: {props.usernamee}</a>
                </Navbar.Text>

                <Button href="/newpost" className="addmgright2">
                  New Post
                </Button>
                <NavDropdown.Divider />
                <Button onClick={handleLogout} href="/login">
                  Logout
                </Button>
              </Nav>
              {props.main && (
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    value={searchwords}
                    onChange={handleSearchBar}
                    placeholder="Search by tag"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button
                    variant="outline-success"
                    onClick={handleSearchButton}
                  >
                    Search
                  </Button>
                </Form>
              )}
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}
