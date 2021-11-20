import React from "react";
import { useLocation, useHistory } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ONE_CLIENT, UPDATE_CLIENT } from "../gql/client";
import { Formik } from "formik";
import * as Yup from "yup";

const UpdateClient = () => {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname.replace("/updateclient/", "");

  const [updateClient] = useMutation(UPDATE_CLIENT);

  const { data, loading } = useQuery(GET_ONE_CLIENT, {
    variables: {
      getOneClient: path,
    },
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("You must place an emaill"),
    name: Yup.string().required("Name is required"),
    surName: Yup.string().required("SurName is required"),
    company: Yup.string().required("Company is required"),
  });

  if (loading) return null;

  const { getOneClient } = data;

  return (
    <div>
      <h1 className="componentTitle">Update Client</h1>
      <div className="ContainerForm">
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={getOneClient}
          onSubmit={async (values) => {
            try {
              await updateClient({
                variables: {
                  updateClientId: getOneClient.id,
                  input: {
                    name: values.name,
                    surName: values.surName,
                    company: values.company,
                    email: values.email,
                    phone: values.phone,
                  },
                },
              });

              history.push("/clients");
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
                {props.errors.surName && props.touched.surName ? (
                  <p className="cardValidation">{props.errors.surName}</p>
                ) : null}

                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surName"
                  className="form__input"
                  onChange={props.handleChange}
                  value={props.values.surName}
                />
                {props.errors.company && props.touched.company ? (
                  <p className="cardValidation">{props.errors.company}</p>
                ) : null}
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form__input"
                  onChange={props.handleChange}
                  value={props.values.company}
                />
                {props.errors.email && props.touched.email ? (
                  <p className="cardValidation">{props.errors.email}</p>
                ) : null}
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form__input"
                  onChange={props.handleChange}
                  value={props.values.email}
                />
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form__input"
                  onChange={props.handleChange}
                  value={props.values.phone}
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

export default UpdateClient;
