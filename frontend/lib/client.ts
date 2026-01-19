import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: any = null;

export const getClient = () => {
  if (client) return client;

  client = new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:8080/index.php?graphql",
    }),
    cache: new InMemoryCache(),
  });

  return client;
};
