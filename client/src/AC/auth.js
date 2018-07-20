import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOGIN,USER_CONFIRMATION } from "../constants";
/* import api from "../api"; */
/* import setAuthorizationHeader from "../utils/setAuthorizationHeader"; */

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = credentials => ({
  type: USER_LOGIN,
  credentials
});

export const logout = () => dispatch => {
  localStorage.removeItem("bookwormJWT");

  dispatch(userLoggedOut());
};

export const confirm = token => ({
  type: USER_CONFIRMATION,
  token
});

/* export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
}); 



export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);
 */
