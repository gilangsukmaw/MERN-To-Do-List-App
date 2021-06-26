import React, { useRef, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Forgot = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const emailRef = useRef();
  const { forgot } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSuccess("");
      setError("");
      setLoading(true);
      await forgot(emailRef.current.value);
      setSuccess("Check your email, for reset password!");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Email not found");
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
                {success && (
                  <h5 className="text-center" style={{ color: "green" }}>
                    {success}
                  </h5>
                )}
                {error && (
                  <h5 className="text-center" style={{ color: "red" }}>
                    {error}
                  </h5>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Button disabled={loading} className="w-100" type="submit">
                    Submit
                  </Button>
                  <div className="footer">
                    <h6>
                      Already have an account? <Link to="/login">Log In</Link>
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

export default Forgot;
