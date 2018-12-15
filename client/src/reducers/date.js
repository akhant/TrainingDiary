import { FETCH_DATA, DROP_DATABASE, ADD_EXERCISE } from '../constants';

export default (state = [], action) => {
  const { res } = action;
  if (!res) return state;

  if (action.type === FETCH_DATA) {
    return res.date;
  }

  if (action.type === ADD_EXERCISE) {
    if (res.newDate) {
      return state.concat([res.newDate]);
    }
  }

  if (action.type === DROP_DATABASE) {
    return state.filter(obj => obj.date !== res.removedDate.date);
  }

  return state;
};
