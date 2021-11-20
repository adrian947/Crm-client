import { gql } from "@apollo/client";

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;
export const GET_ORDERS_BY_SELLER = gql`
  query GetOrderBySeller {
    getOrderBySeller {
      id
      order {
        id
        amount
        name
        price
      }
      total
      client {
        id
        name
        surName
        company
        email
        phone
        seller
      }
      create
      state
      seller
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($updateOrderId: ID!, $input: OrderInput) {
    updateOrder(id: $updateOrderId, input: $input) {
      id
      state
    }
  }
`;
export const GET_ORDER = gql`
  query getOrder {
    getOrder {
      id
      order {
        id
        amount
        name
      }
      total
      seller
      create
      state
    }
  }
`;
export const DELETE_ORDER = gql`
mutation deleteOrder($deleteOrderId: ID!) {
  deleteOrder(id: $deleteOrderId)
}
`;
