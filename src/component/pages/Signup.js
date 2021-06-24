import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password not match!");
    }
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setSuccess("Account Created");
      history.push("/");
    } catch {
      setError("Failed to create an account!");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="register">
        <div className="d-flex justify-content-center align-items-center h-100">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              <Card.Text>
                <hr />
                {success && (
                  <Alert variant="success">
                    {success} {currentUser.email}
                  </Alert>
                )}
                {error && (
                  <h5 className="text-center" style={{ color: "red" }}>
                    {error}
                  </h5>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="rounded-pill"
                      ref={emailRef}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" id="password">
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Confirm Password"
                      className="rounded-pill"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" id="password-confirm">
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      placeholder="Confirm Password"
                      className="rounded-pill"
                      required
                    />
                  </Form.Group>

                  <Button
                    disabled={loading}
                    variant=""
                    className="rounded-pill"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
                <div className="footer">
                  <h6>
                    <Link to="/login">Forgot Password</Link>
                  </h6>
                  <h5>
                    Already have an account? <Link to="/login">Log In</Link>
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

export default Signup;
