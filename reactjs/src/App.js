import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./Css/style.css";
import AuthLoginPage from "./Pages/Auth/login";
import HomePage from "./Pages/Home";

import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Widgets from "./Components/Widgets";
function App() {
  return (
    <Router>
      <div className="app">
        {" "}
        <Switch>
          <NoAuth path="/auth/login">
            <AuthLoginPage />
          </NoAuth>
          <NoAuth path="/auth/register">
            <div>
              <h1>Register</h1>
            </div>
          </NoAuth>
          <IsAuth>
            <Header />
            <div className="appBody">
              <Sidebar />
              <Route path="/">
                <HomePage />
              </Route>
              <Widgets />
            </div>
          </IsAuth>
        </Switch>
      </div>
    </Router>
  );
}
const IsAuth = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const NoAuth = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !localStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
