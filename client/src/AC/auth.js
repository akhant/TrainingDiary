import {
  USER_LOGGED_IN,
  USER_SIGNUP,
  USER_LOGGED_OUT,
  RESET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  USER_LOGIN,
  USER_CONFIRMATION,
} from '../constants';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const signup = data => ({
  type: USER_SIGNUP,
  data,
});

export const login = credentials => ({
  type: USER_LOGIN,
  credentials,
});

/* eslint-disable */
export const logout = () => dispatch => {
  localStorage.removeItem('bookwormJWT');
  dispatch(userLoggedOut());
};

/* eslint-enable */
export const confirm = () => ({
  type: USER_CONFIRMATION,
});

export const resetPasswordRequest = ({ email }) => ({
  type: RESET_PASSWORD_REQUEST,
  email,
});

export const resetPassword = data => ({
  type: RESET_PASSWORD,
  data,
});
