import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import { client } from "./data/client";
import { App } from "./components/App/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
