import { gql } from "@apollo/client";

export const GET_CLIENT_BY_SELLER = gql`
  query GetClientBySeller {
    getClientBySeller {
      id
      name
      surName
      company
      email
      phone
    }
  }
`;

export const GET_ONE_CLIENT = gql`
  query GetOneClient($getOneClient: ID!) {
    getOneClient(id: $getOneClient) {
      id
      name
      surName
      company
      email
      phone
      seller {
        create
        email
        surName
        name
        id
      }
    }
  }
`;

export const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      surName
      company
      email
      phone
    }
  }
`;
export const DELETE_CLIENT = gql`
  mutation deleteClient($deleteClientId: ID!) {
    deleteClient(id: $deleteClientId)
  }
`;
export const UPDATE_CLIENT = gql`
  mutation updateClient($updateClientId: ID!, $input: ClientInput) {
    updateClient(id: $updateClientId, input: $input) {
      id
      name
      surName
      company
      email
      phone
      seller {
        id
        name
        surName
        email
        create
      }
    }
  }
`;
