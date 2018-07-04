import { SHOW_MESSAGE } from "../constants";

export default (state = {}, action) => {
  const { type, message } = action;

  if (type === SHOW_MESSAGE) {
    return Object.assign({}, state, message);
  }

  return state;
};
