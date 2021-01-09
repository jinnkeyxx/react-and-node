import AuthService from "../../../services/AuthService";
import {
  setCurrentUser,
  registerSuccess,
  logoutUser,
  getErrors,
} from "./actionCreators";

/**
 * Login user action
 */
export const loginUser = (state) => (dispatch) => {
  AuthService.login(state.username, state.password)
    .then((resp) => {
      dispatch(setCurrentUser(resp.data.data));
      AuthService.saveToken(resp.data.token);
      window.location.reload();
    })
    .catch((error) => {
      if (error.response.data) {
        dispatch(
          getErrors({
            loginError: error.response.data.message,
          })
        );
      }
    });
};

/**
 * Logout action
 */
export const logout = (history) => (dispatch) => {
  AuthService.logout();
  dispatch(logoutUser());
  history.push("/");
  window.location.reload();
};

/**
 * Register user action
 */
export const registerUser = (data, history) => (dispatch) => {
  AuthService.register(data)
    .then((resp) => {
      if (resp.data.success) {
        dispatch(registerSuccess());
        history.push("/login");
      }
    })
    .catch((error) => {
      if (error.response.data) {
        dispatch(
          getErrors({
            registerError: error.response.data.error,
          })
        );
      }
    });
};
