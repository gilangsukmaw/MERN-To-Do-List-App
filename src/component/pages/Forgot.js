import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
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
      history.push("/");
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Didn't have account? <Link to="/login">Sign Up</Link>
      </div>
    </>
  );
};

export default Forgot;
