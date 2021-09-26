// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

type FormData = {
  email: string | undefined;
  password: string | undefined;
};

const FormikForm = () => {
  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik<FormData>
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: FormData = { email: undefined, password: undefined };
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => {
          console.log("Re-rendered");

          return (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormikForm;
