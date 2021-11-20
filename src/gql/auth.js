import { gql } from "@apollo/client";

export const NEW_USER = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      surName
      email
      create
    }
  }
`;
export const AUTH_USER = gql`
  mutation authUser($input: authInput) {
    authUser(input: $input) {
      token
    }
  }
`;
export const GET_USER = gql`
  query GetUser($token: String) {
    getUser(token: $token) {
      id
      name
      surName
      email
    }
  }
`;
export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String) {
    verifyToken(token: $token)
  }
`;
