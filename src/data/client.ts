import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloError,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { ErrorCodes } from "../types/errorCodes";

const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
const token = process.env.REACT_APP_GRAPHQL_TOKEN;

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  if (!token || !endpoint) {
    throw new ApolloError({
      errorMessage: "ENV variables are not defined",
      extraInfo: {
        error_code: ErrorCodes.MISSING_ENV,
      },
    });
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
