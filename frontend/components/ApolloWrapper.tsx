"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";
import { v4 as uuidv4 } from "uuid";
import { ReactNode } from "react";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/index.php?graphql",
  });

  const authLink = setContext((_, { headers }) => {
      let sessionToken = null;
      if (typeof window !== 'undefined') {
         sessionToken = localStorage.getItem("woo-session-id");
         if (!sessionToken) {
           sessionToken = uuidv4();
           localStorage.setItem("woo-session-id", sessionToken);
         }
      }
      return {
          headers: {
              ...headers,
              "woocommerce-session": sessionToken ? `Session ${sessionToken}` : "",
          }
      }
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink,
            httpLink,
          ])
        : ApolloLink.from([authLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
