import { gql } from "@apollo/client";

export const TOP_SELLERS = gql`
  query betterSeller {
    betterSeller {
      total
      seller {
        name
        surName
        email
      }
    }
  }
`;

export const TOP_CLIENTS = gql`
  query betterClient {
    betterClient {
      total
      client {
        name
        company
      }
    }
  }
`;
