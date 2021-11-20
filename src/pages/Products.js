import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "./../gql/product";
import { Link } from "react-router-dom";
import Product from "../components/Product";

const Products = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);

  if (loading) return null;

  return (
    <div className="contenedor">
      <h1 className="componentTitle">Products</h1>
      <Link to="/newproduct" className="ButtonNewClient">
        New Product
      </Link>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th className="col fs-2">Name</th>
            <th className="col fs-2">Price</th>
            <th className="col fs-2">Stock</th>
          </tr>
        </thead>
        <tbody className="">
          {data.getProduct.map((product) => (
            <Product key={product.id} product={product} className="table__td" />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
