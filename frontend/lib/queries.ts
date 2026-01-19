import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              name
              shortDescription
              image {
                sourceUrl
              }
              ... on SimpleProduct {
                price
              }
              ... on VariableProduct {
                price
              }
            }
          }
          quantity
          total
        }
      }
      total
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: Int!, $quantity: Int = 1, $clientMutationId: String!) {
    addToCart(input: { productId: $productId, quantity: $quantity, clientMutationId: $clientMutationId }) {
      cart {
        contents {
          nodes {
            key
            product {
              node {
                id
                name
                shortDescription
                image {
                  sourceUrl
                }
                ... on SimpleProduct {
                  price
                }
                ... on VariableProduct {
                  price
                }
              }
            }
            quantity
            total
          }
        }
        total
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($keys: [ID], $all: Boolean) {
    removeItemsFromCart(input: { keys: $keys, all: $all }) {
      cart {
        contents {
          nodes {
            key
            product {
              node {
                id
                name
                shortDescription
                image {
                  sourceUrl
                }
                ... on SimpleProduct {
                  price
                }
                ... on VariableProduct {
                  price
                }
              }
            }
            quantity
            total
          }
        }
        total
      }
    }
  }
`;
