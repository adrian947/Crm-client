import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProduct {
    getProduct {
      id
      name
      stock
      price
      create
    }
  }
`;
export const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      stock
      price
      create
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updateProductId: ID!, $input: ProductInput) {
    updateProduct(id: $updateProductId, input: $input) {
      id
      name
      stock
      price
      create
    }
  }
`;

export const GET_PRODUCT_ID = gql`
  query getProductById($getProductById: ID!) {
    getProductById(id: $getProductById) {
      id
      name
      stock
      price
      create
    }
  }
`;
export const DELETE_PRODUCT = gql`
mutation deleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }
`;
