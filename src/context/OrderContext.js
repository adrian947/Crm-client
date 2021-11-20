import { createContext, useReducer } from "react";
import OrderReducer from "./OrderReducer";

import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  SELECT_AMOUNT,
  UPDATE_TOTAL,
} from "./../types/types";

export const OrderContext = createContext();

export const OrderContextComponent = ({ children }) => {
  const initialState = {
    client: {},
    products: [],
    total: 0,
  };
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const selectClientName = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };
  const selectProducts = (productSelect) => {
    //take a copy of the second array to assign to the first

    let newState;
    if (state.products.length > 0) {
      newState = productSelect.map((product) => {
        const newObj = state.products.find(
          (productState) => productState.id === product.id
        );
        return {
          ...product,
          ...newObj,
        };
      });
    } else {
      newState = productSelect;
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState,
    });
  };

  const modifyAmount = (amount) => {
    dispatch({
      type: SELECT_AMOUNT,
      payload: amount,
    });
  };

  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        client: state.client,
        products: state.products,
        total: state.total,
        selectClientName,
        selectProducts,
        modifyAmount,
        updateTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
