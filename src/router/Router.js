import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
//import pages
import Index from "../pages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import App from "../pages/auth/App";
import Profile from "../pages/auth/Profile";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Index />
        </Route>
        {/* Auth pages */}
        <Route exact path="/task">
          <Navbar />
          <App />
        </Route>
        <Route exact path="/profile">
          <Navbar />
          <Profile />
        </Route>{" "}
        {/* Not Authorize Page */}
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/forgot">
          <ForgotPassword />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
