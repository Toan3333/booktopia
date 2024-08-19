import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import Providers from "./redux/Provider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <GoogleOAuthProvider clientId="494926915712-lnktr7iibqfmhh7ji15unepog735j6bp.apps.googleusercontent.com">
        <Providers>
          <App />
        </Providers>
      </GoogleOAuthProvider>
    </HashRouter>
  </React.StrictMode>
);
