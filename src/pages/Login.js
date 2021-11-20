import React, { useState, useContext } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { AUTH_USER } from "../gql/auth";
import { AuthcontextUser } from "../context/authContext";
import { decodeToken } from "./../helpers/auth";

const Login = () => {
  const [msg, setMsg] = useState("");
  const [authUser] = useMutation(AUTH_USER);
  const { setUser } = useContext(AuthcontextUser);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("You must place an emaill"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const { data } = await authUser({
          variables: {
            input: {
              ...values,
            },
          },
        });
        console.log("data", data);
        const decode = decodeToken(data.authUser.token);

        setUser(decode);
        setMsg(`Welcome`);

        localStorage.setItem("token", data.authUser.token);
      } catch (error) {
        console.log("error", error);
        setMsg(error.message);
      }
    },
  });

  return (
    <div className="pageAuth">
      <div className="container">
        <h1 className="title">Login</h1>
        <div className="">
          {msg && <p className="cardValidation">{msg}</p>}
          {formik.errors.email && formik.touched.email ? (
            <p className="cardValidation">{formik.errors.email}</p>
          ) : null}
          {formik.errors.password && formik.touched.password ? (
            <p className="cardValidation">{formik.errors.password}</p>
          ) : null}

          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="form__campo">
              <label className="form__label" htmlFor="email">
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
              <label className="form__label" htmlFor="password">
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
            <input type="submit" className="button" value="LogIn" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
