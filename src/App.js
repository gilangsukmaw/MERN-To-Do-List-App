import React from "react";
import Router from "./router/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.scss";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
