import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { DELETE_ORDER, UPDATE_ORDER } from "../../gql/order";

const Order = ({ order, refetch }) => {
  const [state, setState] = useState(order.state);
  const [clase, setClase] = useState("");
  const [UpdateOrder] = useMutation(UPDATE_ORDER);
  const [deleteOrder] = useMutation(DELETE_ORDER);

  useEffect(() => {
    if (state) {
      setState(state);
    }
    ChangeColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const ChangeColor = () => {
    if (state === "Pending") {
      setClase("blue");
    } else if (state === "Complete") {
      setClase("violet");
    } else {
      setClase("red");
    }
  };

  const changeStateOrder = async (value) => {
    try {
      const { data } = await UpdateOrder({
        variables: {
          updateOrderId: order.id,
          input: {
            state: value,
            client: order.client.id,
          },
        },
      });
      setState(data.updateOrder.state);
    } catch (error) {
      console.log("error", error);
    }
  };
  

  const handleOrderDelete = async (id) => {
    try {
      const { data } = await deleteOrder({
        variables: {
          deleteOrderId: id,
        },
      });

      console.log("data", data);
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="contenedorOrder">
      <div className="cardOrder">
        <p>
          Client: <span className="cardOrder__name">{order.client.name}</span>{" "}
          <span className="cardOrder__name">{order.client.surName}</span>
        </p>
        <p>Email: {order.client.email}</p>
        <p>Phone: {order.client.phone}</p>
        <select
          className={`cardOrder__state ${clase}`}
          onChange={(e) => changeStateOrder(e.target.value)}
          value={state}
        >
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
          <option value="Cancel">Cancel</option>
        </select>
      </div>
      <div className="cardOrder">
        <h4 className="cardOrder__title">Order Summary</h4>
        {order.order.map((order) => (
          <div key={order.id} className="cardOrder__art">
            <ul>
              <li className="cardOrder__li">
                <p className="cardOrder__item">Product: {order.name}</p>
                <p className="cardOrder__item cardOrder__item--border">
                  Quantity: {order.amount}
                </p>
              </li>
            </ul>
          </div>
        ))}
        <p className="cardOrder__total">
          <span className="cardOrder__total--span">Total:</span> {order.total}
        </p>

        <button
          className="ButtonNewClient ButtonNewClient--deleteOrder"
          onClick={() => handleOrderDelete(order.id)}
        >
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default Order;
