import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ORDERS_BY_SELLER } from "../gql/order";
import Order from "../components/orders/Order";

const Orders = () => {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS_BY_SELLER,{
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    console.log("error", error);
  }

  if (loading) return null;
  const { getOrderBySeller } = data;
  return (
    <>
      <div className="contenedor">
        <h1 className="componentTitle">Orders</h1>
        <Link to="/neworder" className="ButtonNewClient">
          New Order
        </Link>

        {getOrderBySeller.length > 0 ? (
          getOrderBySeller.map((order) => (
            <Order key={order.id} order={order} refetch={refetch}/>
          ))
        ) : (
          <p className="noOrders">There are no orders for this seller</p>
        )}
      </div>
    </>
  );
};

export default Orders;
