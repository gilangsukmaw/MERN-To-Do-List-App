import React from "react";
import { Navbar, NavDropdown, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

const NavbarComponent = (props) => {
  toast.configure();

  const history = useHistory();
  const { currentUser, logout } = useAuth();

  const notifyWarn = (value) => {
    toast.warn(value, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyErr = (value) => {
    toast.error(value, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogout = async () => {
    try {
      await logout();

      notifyWarn("You are Log out!");
      history.push("/");
    } catch (err) {
      notifyErr("Failed to logout");
    }
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
            {currentUser ? (
              <>
                <LoggedInNav
                  currentUser={currentUser.email}
                  handleLogout={handleLogout}
                />
              </>
            ) : (
              <>
                <Navbar.Text className="mr-4">
                  <a href="/login">Log in</a>
                </Navbar.Text>
                <Navbar.Text>
                  <a href="/signup">Sign Up</a>
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
        <Link to="/app">Task list</Link>
      </Navbar.Text>
      <NavDropdown title={props.currentUser} id="collasible-nav-dropdown">
        <NavDropdown.Item className="nav-dropdown">
          <Link to="/update-profile" className="nav-dropdown">
            Change password
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item className="nav-dropdown" onClick={props.handleLogout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default NavbarComponent;
