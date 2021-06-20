import React, { useState, useContext } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { RegisterValidationSchema } from "../component/validation/Validation";
import AuthContext from "../context/AuthContext";
import { Redirect } from "react-router-dom";

const Register = () => {
  const { loggedIn } = useContext(AuthContext);
  const [emailRegistered, setEmailRegistered] = useState(false);
  const [usernameRegistered, setusernameRegistered] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (value) => {
    setSuccess(false);
    setEmailRegistered(false);
    setusernameRegistered(false);
    submitRequest(value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: RegisterValidationSchema,
  });

  const submitRequest = async (value) => {
    axios
      .post(
        "https://simple-to-do-list-app-0.herokuapp.com/api/v1/register",
        value
      )
      .then((response) => {
        formik.resetForm();
        setSuccess(true);
      })
      .catch((err) => {
        const errResponse = err.response.data;
        if (errResponse.registered[0].email) {
          setEmailRegistered(true);
        }
        if (errResponse.registered[0].username) {
          setusernameRegistered(true);
        }
      });
  };

  return (
    <>
      {loggedIn ? (
        <Redirect to="/task" />
      ) : (
        <div className="register">
          <div className="d-flex justify-content-center align-items-center h-100">
            <Card style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Title className="text-center">Register</Card.Title>
                <Card.Text>
                  <hr />
                  {success ? <>You can logged in to your account</> : null}
                  <Form noValidate onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Control
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder="name"
                        className="rounded-pill"
                        onBlur={formik.handleBlur}
                      />
                      <div className="validation">
                        {formik.touched.name && formik.errors.name
                          ? formik.errors.name
                          : null}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        placeholder="username"
                        className="rounded-pill"
                        onBlur={formik.handleBlur}
                      />
                      <div className="validation">
                        {formik.touched.username && formik.errors.username
                          ? formik.errors.username
                          : null}
                        {usernameRegistered ? (
                          <>Username already registered!</>
                        ) : null}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Email"
                        className="rounded-pill"
                        onBlur={formik.handleBlur}
                      />
                      <div className="validation">
                        {formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : null}
                        {emailRegistered ? <>Email already registered</> : null}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Password"
                        className="rounded-pill"
                        onBlur={formik.handleBlur}
                      />
                      <div className="validation">
                        {formik.touched.password && formik.errors.password
                          ? formik.errors.password
                          : null}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="repeat_password"
                        value={formik.values.repeat_password}
                        onChange={formik.handleChange}
                        placeholder="Confirm Password"
                        className="rounded-pill"
                        onBlur={formik.handleBlur}
                      />
                      <div className="validation">
                        {formik.touched.repeat_password &&
                        formik.errors.repeat_password
                          ? formik.errors.repeat_password
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
                        <a href="/login">Already have account</a>
                      </h5>
                    </div>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
