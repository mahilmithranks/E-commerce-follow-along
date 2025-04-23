import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./index.css";
import App from "./App.jsx";
import { PAYPAL_CLIENT_ID } from "./config/paypal";
import { Provider } from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </PayPalScriptProvider>
  </StrictMode>
);
