import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const ModalComponent = (props) => {
  const [value, setValue] = useState({
    name: "",
    description: "",
  });

  const onChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    setValue({ ...value, [targetName]: targetValue });
  };

  const addTask = async (id) => {
    axios
      .post("https://simple-to-do-list-app-0.herokuapp.com/api/v2/add", value)
      .then((response) => {
        props.onHide();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
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
