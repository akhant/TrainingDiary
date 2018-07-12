import { USER_LOGGED_IN } from "../constants";

export default (state = [], action) => {
  const { res, type, user } = action;
  
  if (type === USER_LOGGED_IN) {
    return user;
  }
  if (type === USER_LOGGED_IN) {
    return {};
  }
  return state;
};
