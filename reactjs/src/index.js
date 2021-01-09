import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/index";
import { Provider } from "react-redux";
import AuthService from "./services/AuthService";
import { setCurrentUser, logoutUser } from "./store/actions/auth/actionCreators";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:9000/";

const initialState = {
  user: {
    isAuthenticated: false,
    profile: {},
  },
};

const store = configureStore(initialState);

if (AuthService.getToken()) {
  AuthService.getProfile()
    .then((resp) => {
      store.dispatch(setCurrentUser(resp.data.data));
    })
    .catch(() => {
      store.dispatch(logoutUser());
    });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
