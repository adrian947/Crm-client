import React, { useContext, useState } from "react";
import SelectClient from "../components/orders/SelectClient";
import SelectProduct from "../components/orders/SelectProduct";
import Total from "../components/orders/Total";
import { OrderContext } from "../context/OrderContext";
import { useMutation } from "@apollo/client";
import { NEW_ORDER } from "../gql/order";
import OrderSummary from "./../components/orders/OrderSummary";
import { useHistory } from "react-router";

const NewOrder = () => {
  const [error, setError] = useState("");
  const { client, products, total } = useContext(OrderContext);
  const [newOrder] = useMutation(
    NEW_ORDER /*  , {
    update(cache, { data: { newOrder } }) {
      const { getOrderBySeller } = cache.readQuery({
        query: GET_ORDERS_BY_SELLER,
      });
      cache.writeQuery({
        query: GET_ORDERS_BY_SELLER,
        data: {
          getOrderBySeller: [...getOrderBySeller, newOrder],
        },
      });
    },
  }  */
  );

  const history = useHistory();

  const disabled = () => {
    if (Object.keys(client).length !== 0 && products.length > 0 && total > 0) {
      return false;
    } else {
      return true;
    }
  };

  const mapProducts = products.map((product) => ({
    name: product.name,
    id: product.id,
    amount: product.amount,
  }));
  
  const handleNewOrder = async () => {
    try {
      await newOrder({
        variables: {
          input: {
            order: mapProducts,
            total: total,
            client: client.id,
            state: "Pending",
          },
        },
      });

      history.push("/orders");
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    }
  };

  return (
    <div className="contenedor">
      <h1 className="componentTitle">new Order</h1>
      <div className="contentNewOrder">
        {error ? <p className="newOrderError">{error}</p> : null}
        <SelectClient />
        <SelectProduct />
        <OrderSummary />
        <Total />

        <button
          className="ButtonNewClient ButtonNewClient--newOrder"
          disabled={disabled()}
          onClick={handleNewOrder}
        >
          Register Order
        </button>
      </div>
    </div>
  );
};

export default NewOrder;
