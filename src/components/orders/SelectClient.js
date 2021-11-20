import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { GET_CLIENT_BY_SELLER } from "./../../gql/client";
import { useQuery } from "@apollo/client";
import { OrderContext } from "./../../context/OrderContext";

const SelectClient = () => {
  const [client, setCLient] = useState({});
  const { data, loading } = useQuery(GET_CLIENT_BY_SELLER);
  const { selectClientName } = useContext(OrderContext);

  useEffect(() => {
    selectClientName(client);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const selectClient = (client) => {
    setCLient(client);
  };

  if (loading) return null;

  const getclients = data.getClientBySeller;

  return (
    <div>
      <p className="titleNewOrder">1. Select Client</p>
      <Select
        options={getclients}
        isMulti={false}
        onChange={(client) => selectClient(client)}
        getOptionValue={(op) => op.id}
        getOptionLabel={(op) => op.name}
        noOptionsMessage={() => "No results"}
      />
    </div>
  );
};

export default SelectClient;
