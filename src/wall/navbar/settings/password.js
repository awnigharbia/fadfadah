import React from "react";
import "../../css/Wall.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UPDATE_USER_MUTATION } from "./updateUserMutation";
import { useMutation } from "react-apollo-hooks";

const ValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  password: Yup.string().required("Requierd"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  )
});

const initialValues = {
  oldPassword: "",
  password: "",
  passwordConfirmation: ""
};

export default function Password({ show }) {
  const updateUser = useMutation(UPDATE_USER_MUTATION);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      validateOnBlur={true}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        updateUser({
          variables: {
            property: "password",
            value: values.passwordConfirmation
          },
          update: (proxy, res) => {
            // console.log(res)
          }
        });
      }}
      render={({ errors }) => (
        <Form className="password" style={{ display: show ? "flex" : "none" }}>
          <div className="password-content">
            <label>Enter the Old Password:</label>
            <Field
              name="oldPassword"
              type="password"
              placeholder="Old Password"
            />
            <label>Enter the new Password:</label>
            <Field name="password" type="password" placeholder="New Password" />
            <label>Confirm the new Password:</label>
            <Field
              name="passwordConfirmation"
              type="password"
              placeholder="New Password"
            />
          </div>
          {errors.passwordConfirmation && (
            <div>{errors.passwordConfirmation}</div>
          )}
          <div className="bottom">
            <button type="submit">Save</button>
          </div>
        </Form>
      )}
    />
  );
}
