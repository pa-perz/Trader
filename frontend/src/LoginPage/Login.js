import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";
import { Button, ButtonGroup, Container, FormGroup, Label } from "reactstrap";
import axios from "axios";

export default class Login extends Component {
  render() {
    const { history } = this.props;
    return (
      <Formik
        initialValues={{
          username: "",
          password: "",
          terms: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required"),
          password: Yup.string().required("Password is required"),
          terms: Yup.boolean()
            .required("Required")
            .oneOf([false], "You must accept the terms and conditions."),
        })}
        onSubmit={async (fields) => {
          await axios
            .post("/authenticate", {
              username: fields.username,
              password: fields.password,
            })
            .then(function (response) {
              localStorage.setItem(
                "user",
                "Bearer " + JSON.stringify(response.data.jwt).replace(/['"]+/g, '')
              );
              history.push("/");
            })
            .catch(function (error) {
              alert(error);
            });
        }}
        render={({ errors, status, touched }) => (
          <div className="d-flex bg-secondary vh-100">
            <div className="mt-4 w-25 m-auto rounded shadow bg-light p-4 align-items-center justify-content-center">
              <Container>
                <h2>Login</h2>
                <Form className="mt-2">
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Field
                      type="text"
                      name="username"
                      className={
                        "form-control" +
                        (errors.username && touched.username
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup className="mt-2">
                    <Label for="password">Password</Label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup className="mt-2">
                    <Field
                      type="checkbox"
                      name="terms"
                      style={{
                        marginRight: "0.4rem",
                      }}
                      className={
                        "form-check-input" +
                        (errors.terms && touched.terms ? " is-invalid" : "")
                      }
                    />
                    <Label>
                      I accept I have <i>not</i> read the{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://media.tenor.com/videos/e9359c87a6d957c44d4fd10bc59f125f/mp4"
                        className="text-decoration-none"
                      >
                        terms and conditions
                      </a>
                      .
                    </Label>
                    <ErrorMessage
                      name="terms"
                      component="div"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup className="mt-3">
                    <ButtonGroup>
                      <Button color="primary" type="submit">
                        Login
                      </Button>
                      <Button color="outline-primary" type="reset">
                        Reset
                      </Button>
                    </ButtonGroup>
                  </FormGroup>
                </Form>
              </Container>
            </div>
          </div>
        )}
      />
    );
  }
}
