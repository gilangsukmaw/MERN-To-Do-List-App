import React from "react";
import { Card } from "react-bootstrap";

const Forgot = () => {
  return (
    <>
      <div className="forgot">
        <div className="d-flex justify-content-center align-items-center h-100">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title className="text-center">Forgot Password</Card.Title>
              <Card.Text>
                <h3 className="text-center">Not done yet!</h3>
                {/* <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="rounded-pill"
                    />
                  </Form.Group>

                  <Button variant="" className="rounded-pill" type="submit">
                    Submit
                  </Button>
                </Form> */}
                <div className="footer">
                  <h6>
                    <a href="/login">Already have account</a>
                  </h6>
                  <h5>
                    <a href="/register">Create your account</a>
                  </h5>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Forgot;
