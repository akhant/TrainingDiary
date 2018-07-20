import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants";

export default (state = [], action) => {
  const { type, user } = action;

  if (type === USER_LOGGED_IN) {
    return user;
  }
  if (type === USER_LOGGED_OUT) {
    return {};
  }
  return state;
};
