import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { AuthContextProvider } from "./context/Auth-Context";

import "./index.css";
import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthContextProvider>
);
