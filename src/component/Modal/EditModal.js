import React, { useState, useEffect } from "react";
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

  const getTask = async (id) => {
    axios
      .get("https://simple-to-do-list-app-0.herokuapp.com/api/v2/" + id)
      .then((response) => {
        setValue({
          name: response.data.name,
          description: response.data.description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTask = async (id) => {
    console.log(value);
    axios
      .post(
        "https://simple-to-do-list-app-0.herokuapp.com/api/v2/update/" + id,
        value
      )
      .then((response) => {
        props.onHide();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const modal = props.show;
    if (modal) {
      getTask(props.value);
    }
  }, [props.show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(props.value);
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
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
                  rows={3}
                  name="description"
                  value={value.description}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Button
              variant=""
              className="btn btn-outline-primary rounded-pill w-100"
              type="submit"
            >
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponent;
