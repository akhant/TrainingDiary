import {

  SHOW_MESSAGE,
  ADD_PARAM,
} from '../constants';

export const showMessage = message => ({
  type: SHOW_MESSAGE,
  message,
});

export const addParam = param => ({
  type: ADD_PARAM,
  param,
});
