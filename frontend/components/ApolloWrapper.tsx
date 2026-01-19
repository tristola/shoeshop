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
  const customFetch = async (uri: RequestInfo | URL, options: RequestInit) => {
    const response = await fetch(uri, options);
    const sessionToken = response.headers.get("woocommerce-session");
    if (sessionToken && typeof window !== "undefined") {
      localStorage.setItem("woo-session-v2", sessionToken);
    }
    return response;
  };

  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8080"}/index.php?graphql`,
    fetch: customFetch as any,
  });

  const authLink = setContext((_, { headers }) => {
      let sessionToken = null;
      if (typeof window !== 'undefined') {
         sessionToken = localStorage.getItem("woo-session-v2");
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
