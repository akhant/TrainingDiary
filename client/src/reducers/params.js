import { ADD_PARAM } from '../constants';

export default (state = { message: '', started: false }, action) => {
  const { param } = action;

  if (action.type === ADD_PARAM) {
    return Object.assign({}, state, param);
  }

  return state;
};
