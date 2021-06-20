import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../component/validation/Validation";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { loggedIn } = useContext(AuthContext);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const onSubmit = (value) => {
    setError(false);
    submitRequest(value);
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: LoginValidationSchema,
  });

  const submitRequest = async (value) => {
    axios
      .post(
        "https://simple-to-do-list-app-0.herokuapp.com/api/v1/login",
        value,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        formik.resetForm();

        window.location.reload();
      })
      .catch((err) => {
        const errResponse = err.response.data;
        setError({
          status: true,
          message: errResponse.message,
        });
      });
  };

  return (
    <>
      {loggedIn ? (
        <Redirect to="/task" />
      ) : (
        <>
          <div className="login">
            <div className="d-flex justify-content-center align-items-center h-100">
              <Card style={{ width: "25rem" }}>
                <Card.Body>
                  <Card.Title className="text-center">Login</Card.Title>
                  <Card.Text>
                    {error.status ? (
                      <>
                        <div className="validation">{error.message}</div>
                      </>
                    ) : null}
                    <Form noValidate onSubmit={formik.handleSubmit}>
                      <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          className="rounded-pill"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <div className="validation">
                          {formik.touched.username && formik.errors.username
                            ? formik.errors.username
                            : null}
                        </div>
                      </Form.Group>

                      <Form.Group
                        className="mb-4"
                        controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          className="rounded-pill"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <div className="validation">
                          {formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : null}
                        </div>
                      </Form.Group>

                      <Button variant="" className="rounded-pill" type="submit">
                        Submit
                      </Button>
                      <div className="footer">
                        <h6>
                          Forgot <a href="/forgot">Password ?</a>
                        </h6>
                        <h5>
                          <a href="/register">Create your account</a>
                        </h5>
                      </div>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
