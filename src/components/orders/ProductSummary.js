import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext";

const ProductSummary = ({ product }) => {
  const [inputAmount, setInputAmount] = useState({
    amount: "",
  });
  const { amount } = inputAmount;

  const { modifyAmount, updateTotal } = useContext(OrderContext);

  useEffect(() => {
    updateAmount();
    updateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputAmount]);

  const handleInputChange = (e) => {
    setInputAmount({
      ...inputAmount,
      [e.target.name]: e.target.value,
    });
  };

  const updateAmount = () => {
    const NewProduct = { ...product, amount: Number(amount) };
    modifyAmount(NewProduct);
  };

  return (
    <div>
      <ul className="productList">
        <li className="productList__list">{`${product.name} - $${product.price}`}</li>
        <input
          type="number"
          className="productList__input"
          onChange={handleInputChange}
          name="amount"
          value={amount}
        />
      </ul>
    </div>
  );
};

export default ProductSummary;
