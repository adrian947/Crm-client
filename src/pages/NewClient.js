import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { GET_CLIENT_BY_SELLER, NEW_CLIENT } from "../gql/client";
import { useHistory } from "react-router";

const NewClient = () => {
  const history = useHistory();
  const [msg, setMsg] = useState("");
  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      const { getClientBySeller } = cache.readQuery({
        query: GET_CLIENT_BY_SELLER,
      });

      cache.writeQuery({
        query: GET_CLIENT_BY_SELLER,
        data: {
          getClientBySeller: [...getClientBySeller, newClient],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surName: "",
      company: "",
      email: "",
      phone: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("You must place an emaill"),
      name: Yup.string().required("Name is required"),
      surName: Yup.string().required("SurName is required"),
      company: Yup.string().required("Company is required"),
    }),

    onSubmit: async (values) => {
      try {
        await newClient({
          variables: {
            input: {
              ...values,
            },
          },
        });
        history.push("/clients");
      } catch (error) {
        console.log("error", error);
        setMsg(error.message);
      }
    },
  });

  return (
    <div>
      <h1 className="componentTitle">NewClient</h1>
      <div className="ContainerForm">
        {msg && <p className="cardValidation">{msg}</p>}
        {formik.errors.email && formik.touched.email ? (
          <p className="cardValidation">{formik.errors.email}</p>
        ) : null}
        {formik.errors.name && formik.touched.name ? (
          <p className="cardValidation">{formik.errors.name}</p>
        ) : null}
        {formik.errors.surName && formik.touched.surName ? (
          <p className="cardValidation">{formik.errors.surName}</p>
        ) : null}
        {formik.errors.company && formik.touched.company ? (
          <p className="cardValidation">{formik.errors.company}</p>
        ) : null}

        <form className="formNewClient" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form__input"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surName"
            className="form__input"
            onChange={formik.handleChange}
            value={formik.values.surName}
          />
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            className="form__input"
            onChange={formik.handleChange}
            value={formik.values.company}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form__input"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form__input"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />

          <input className="button mt-3" type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export default NewClient;
