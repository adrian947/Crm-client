import React, { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import ProductSummary from "./ProductSummary";

const OrderSummary = () => {
  const { products } = useContext(OrderContext);

  return (
    <div>
      <p className="mt-5 titleNewOrder">3. End Order</p>
      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <ProductSummary product={product} key={product.id} />
          ))}
        </>
      ) : (
        <p>There isn't selected products</p>
      )}
    </div>
  );
};

export default OrderSummary;
