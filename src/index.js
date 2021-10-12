import React from "react";
import ReactDOM from "react-dom";
import { StylesProvider } from "@mui/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import "index.scss";
import App from "App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
