import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: any = null;

export const getClient = () => {
  if (client) return client;

  const uri = process.env.NEXT_PUBLIC_WORDPRESS_URL 
    ? `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/index.php?graphql`
    : "http://localhost:8080/index.php?graphql";

  client = new ApolloClient({
    link: new HttpLink({
      uri,
    }),
    cache: new InMemoryCache(),
  });

  return client;
};
