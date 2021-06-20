import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const LoginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "minimum length is 4")
    .required("username is required!"),
  password: yup.string().required("password is required!"),
});

const RegisterValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "minimum length is 3")
    .required("name is required!"),
  username: yup
    .string()
    .min(4, "minimum length is 4")
    .required("username is required!"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("email is required!"),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter strong password!")
    .required("password is required!"),
  repeat_password: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Password does not match!")
      .required("Password does not match!"),
  }),
});

export { RegisterValidationSchema, LoginValidationSchema };
