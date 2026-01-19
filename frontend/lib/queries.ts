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
      checkoutUrl
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
        checkoutUrl
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($keys: [ID], $all: Boolean, $clientMutationId: String!) {
    removeItemsFromCart(input: { keys: $keys, all: $all, clientMutationId: $clientMutationId }) {
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
        checkoutUrl
      }
    }
  }
`;

export const CHECKOUT_MUTATION = gql`
  mutation Checkout(
    $billing: CustomerAddressInput
    $shipping: CustomerAddressInput
    $paymentMethod: String = "cod"
    $shipToDifferentAddress: Boolean = false
    $clientMutationId: String!
  ) {
    checkout(
      input: {
        billing: $billing
        shipping: $shipping
        paymentMethod: $paymentMethod
        shipToDifferentAddress: $shipToDifferentAddress
        clientMutationId: $clientMutationId
      }
    ) {
      order {
        id
        orderKey
        orderNumber
        status
        date
      }
      result
      redirect
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        excerpt
        slug
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($id: ID!, $idType: PostIdType = SLUG) {
    post(id: $id, idType: $idType) {
      id
      title
      content
      date
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;
