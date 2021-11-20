import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";

import { useHistory } from "react-router";
import { NEW_PRODUCT } from "../gql/product";
import { GET_PRODUCTS } from './../gql/product';

const NewProduct = () => {
  const history = useHistory();
  const [msg, setMsg] = useState("");
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      const { getProduct } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
            getProduct: [...getProduct, newProduct],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      stock: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.string().required("price is required"),
      stock: Yup.string().required("stock is required"),
    }),

    onSubmit: async (values) => {
      try {
        await newProduct({
          variables: {
            input: {
              name: values.name,
              price: parseInt(values.price),
              stock: parseInt(values.stock)
            },
          },
        });
        history.push("/products");
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
        {formik.errors.name && formik.touched.name ? (
          <p className="cardValidation">{formik.errors.name}</p>
        ) : null}
        {formik.errors.price && formik.touched.price ? (
          <p className="cardValidation">{formik.errors.price}</p>
        ) : null}
        {formik.errors.stock && formik.touched.stock ? (
          <p className="cardValidation">{formik.errors.stock}</p>
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
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            className="form__input"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            id="stock"
            name="stock"
            className="form__input"
            onChange={formik.handleChange}
            value={formik.values.stock}
          />
          <input className="button mt-3" type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
