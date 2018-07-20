import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOGIN } from "../constants";
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

/* export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
}); 

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);
 */
