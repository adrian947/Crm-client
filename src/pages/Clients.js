import { useQuery } from "@apollo/client";
import React /* , {useContext} */ from "react";
// import { AuthcontextUser } from "../context/authContext";
import { GET_CLIENT_BY_SELLER } from "./../gql/client";

import { Link } from "react-router-dom";
import Client from "../components/Client";

const Clients = () => {
  const { data, loading } = useQuery(GET_CLIENT_BY_SELLER);

  if (loading) return null;

  return (
    <div className="contenedor">
      <h1 className="componentTitle">Your Clients</h1>
      <Link to="/newclient" className="ButtonNewClient">
        New CLient
      </Link>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th className="col fs-2">Name</th>
            <th className="col fs-2">Email</th>
            <th className="col fs-2">Company</th>
            <th className="col fs-2">Phone</th>
          </tr>
        </thead>
        <tbody className="">
          {data.getClientBySeller.map((client) => (
            <Client key={client.id} client={client} className="table__td" />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
