import React, { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";

const Total = () => {
  const { total } = useContext(OrderContext);

  return (
    <div className="total">
      <p className="total__pay">Total to pay:</p>
      <p className="total__pay">${total}</p>
    </div>
  );
};

export default Total;
