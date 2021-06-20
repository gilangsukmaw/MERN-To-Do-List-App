import React, { useState, useEffect, useContext } from "react";
import { Navbar, NavDropdown, Container } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const NavbarComponent = () => {
  const [userInfo, setUserInfo] = useState([]);
  const { loggedIn } = useContext(AuthContext);
  const { getLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  const onLogout = async () => {
    axios.get("https://simple-to-do-list-app-0.herokuapp.com/api/v1/logout");
    getLoggedIn();

    window.location.reload();
  };

  const getUserInfo = async () => {
    axios
      .get("https://simple-to-do-list-app-0.herokuapp.com/api/v1/")
      .then((response) => {
        const resData = response.data;
        setUserInfo(resData);
        console.log(userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/#" className="text-white">
            React App
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {loggedIn ? (
              <>
                <LoggedInNav userInfo={userInfo} onLogout={onLogout} />
              </>
            ) : (
              <>
                <Navbar.Text className="mr-4">
                  <a href="/login">Login</a>
                </Navbar.Text>
                <Navbar.Text>
                  <a href="/register">Register</a>
                </Navbar.Text>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const LoggedInNav = (props) => {
  return (
    <>
      <Navbar.Text className="mr-4">
        <a href="/task">Task List</a>
      </Navbar.Text>
      <NavDropdown title={props.userInfo.username} id="collasible-nav-dropdown">
        <NavDropdown.Item href="/profile" className="nav-dropdown">
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item className="nav-dropdown" onClick={props.onLogout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default NavbarComponent;
