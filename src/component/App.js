import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/style.scss";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import GetStartedRoute from "./GetStartedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import Dashboard from "./pages/auth/Dashboard";
import UpdateProfile from "./pages/auth/UpdateProfile";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/app" component={Dashboard} />
            <PrivateRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            />

            <GetStartedRoute path="/signup" component={Signup} />
            <GetStartedRoute path="/login" component={Login} />
            <GetStartedRoute path="/forgot-password" component={Forgot} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
