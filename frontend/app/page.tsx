import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import { ShoeCard } from "@/components/ShoeCard";
import Image from "next/image";
import { HomeContent } from "@/components/HomeContent";

// GraphQL Query
const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      nodes {
        id
        databaseId
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
  }
`;

export const dynamic = "force-dynamic";

export default async function Home() {
  let products = [];
  try {
    const client = getClient();
    const { data } = await client.query({ query: GET_PRODUCTS });
    products = data?.products?.nodes || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return <HomeContent products={products} />;
}
