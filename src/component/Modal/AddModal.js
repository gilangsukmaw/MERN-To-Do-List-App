import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const ModalComponent = (props) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [value, setValue] = useState({
    name: "",
    description: "",
    email: currentUser.email,
  });

  const onChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    setValue({ ...value, [targetName]: targetValue });
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

  const addTask = async (id) => {
    axios
      .post("http://localhost:5000/api/v2/add", value)
      .then((response) => {
        props.onHide();
        window.location.reload();
      })
      .catch((error) => {
        const resMessage = error.response.data.message;
        if (resMessage.name === "TokenExpiredError") {
          logout();
          notifyErr("Your token is outdated, Login to continue!");
          history.push("/login");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new To Do
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  placeholder="Meeting at 10 AM"
                  name="name"
                  value={value.name}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Meeting with..."
                  name="description"
                  value={value.description}
                  onChange={onChange}
                  rows={3}
                />
              </Col>
            </Form.Group>
            <Button
              variant=""
              className="btn btn-outline-primary rounded-pill w-100"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponent;
