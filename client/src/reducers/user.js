import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD
} from "../constants";

export default (state = [], action) => {
  const { passwordChanged, sended, type, user } = action;

  if (type === USER_LOGGED_IN) {
    return user;
  }
  if (type === USER_LOGGED_OUT) {
    return {};
  }
  if (type === RESET_PASSWORD_REQUEST) {
    if (!sended) return { ...state, sended: false };
    return { ...state, sended };
  }
  if (type === RESET_PASSWORD) {
    if (!passwordChanged) return { ...state, passwordChanged: false };
    return { ...state, passwordChanged };
  }
  return state;
};
