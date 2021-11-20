import React from "react";
import { useLocation, useHistory } from "react-router";
import { useMutation, useQuery } from "@apollo/client";

import { Formik } from "formik";
import * as Yup from "yup";
import { UPDATE_PRODUCT, GET_PRODUCT_ID } from "./../gql/product";

const UpdateProduct = () => {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname.replace("/updateproduct/", "");

  const [UpdateProduct] = useMutation(UPDATE_PRODUCT);

  const { data, loading } = useQuery(GET_PRODUCT_ID, {
    variables: {
      getProductById: path,
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
  });

  if (loading) return null;

  const { getProductById } = data;

  return (
    <div>
      <h1 className="componentTitle">Update Client</h1>
      <div className="ContainerForm">
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={getProductById}
          onSubmit={async (values) => {
            try {
              await UpdateProduct({
                variables: {
                  updateProductId: getProductById.id,
                  input: {
                    name: values.name,
                    price: parseInt(values.price),
                    stock: parseInt(values.stock),
                  },
                },
              });

              history.push("/products");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(props) => {
            return (
              <form className="formNewClient" onSubmit={props.handleSubmit}>
                {props.errors.name && props.touched.name ? (
                  <p className="cardValidation">{props.errors.name}</p>
                ) : null}
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form__input"
                  onChange={props.handleChange}
                  value={props.values.name}
                />
                {props.errors.price && props.touched.price ? (
                  <p className="cardValidation">{props.errors.price}</p>
                ) : null}

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form__input"
                  onChange={props.handleChange}
                  value={props.values.price}
                />
                {props.errors.stock && props.touched.stock ? (
                  <p className="cardValidation">{props.errors.stock}</p>
                ) : null}
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  className="form__input"
                  onChange={props.handleChange}
                  value={props.values.stock}
                />

                <input className="button mt-3" type="submit" value="Update" />
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProduct;
