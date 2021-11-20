import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { NEW_USER } from "./../gql/auth";

const Register = () => {
  const [msg, setMsg] = useState("");
  const [newUser] = useMutation(NEW_USER);

  const formik = useFormik({
    initialValues: {
      name: "",
      surName: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surName: Yup.string().required("SurName is required"),
      email: Yup.string()
        .required("Email is required")
        .email("You must place an emaill"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password you must be 6 characters"),
    }),

    onSubmit: async (values) => {
      try {
        const { data } = await newUser({
          variables: {
            input: {
              ...values,
            },
          },
        });

        setMsg(`Welcome ${data.newUser.name}`);
      } catch (msg) {
        console.log("msg", msg);
        setMsg(msg.message);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      }
      formik.handleReset();
    },
  });

  return (
    <div className="pageAuth">
      <div className="container--register">
      <h1 className="title">Register</h1>
        <div className="">
          {msg && <p className="cardValidation">{msg}</p>}
          {formik.errors.name && formik.touched.name ? (
            <p className="cardValidation">{formik.errors.name}</p>
          ) : null}
          {formik.errors.surName && formik.touched.surName ? (
            <p className="cardValidation">{formik.errors.surName}</p>
          ) : null}
          {formik.errors.email && formik.touched.email ? (
            <p className="cardValidation">{formik.errors.email}</p>
          ) : null}
          {formik.errors.password && formik.touched.password ? (
            <p className="cardValidation">
              {formik.errors.password}
            </p>
          ) : null}

          <form
            className="form"
            onSubmit={formik.handleSubmit}
          >
            <div className="form__campo">
              <label
                className="form__label"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div className="form__campo">
              <label
                className="form__label"
                htmlFor="surName"
              >
                Surname
              </label>
              <input
                className="form__input"
                id="surName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.surName}
              />
            </div>
            <div className="form__campo">
              <label
                className="form__label"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="form__campo">
              <label
                className="form__label"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <input
              type="submit"
              className="button"
              value="Register"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
