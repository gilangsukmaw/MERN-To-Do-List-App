import React, { useRef, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("The email or password is incorrect");
      } else {
        setError("Failed to Log in, try again later");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="login">
        <div className="d-flex justify-content-center align-items-center h-100">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Card.Text>
                {error && (
                  <h5 className="text-center" style={{ color: "red" }}>
                    {error}
                  </h5>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Control
                      type="email"
                      className="rounded-pill"
                      ref={emailRef}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      className="rounded-pill"
                      ref={passwordRef}
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
                  <div className="footer">
                    <h6>
                      <Link to="/forgot-password">Forgot Password</Link>
                    </h6>
                    <h5>
                      Didn't have account? <Link to="/signup">Sign Up</Link>
                    </h5>
                  </div>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
