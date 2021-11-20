import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { OrderContext } from "./../../context/OrderContext";
import { GET_PRODUCTS } from "./../../gql/product";

const SelectProduct = () => {
  const [product, setProduct] = useState([]);
  const { selectProducts } = useContext(OrderContext);
  const { data, loading } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    selectProducts(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  const selectClient = (client) => {
    setProduct(client);
  };

  if (loading) return null;

  const { getProduct } = data;

  return (
    <div>
      <p className="mt-5 titleNewOrder">2. Select Product</p>
      <Select
        options={getProduct}
        isMulti={true}
        onChange={(product) => selectClient(product)}
        getOptionValue={(op) => op.id}
        getOptionLabel={(op) => `${op.name} - ${op.stock}`}
        noOptionsMessage={() => "No results"}
      />
    </div>
  );
};

export default SelectProduct;
