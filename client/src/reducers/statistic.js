import {
  WORKOUT_START,
  /* ADD_APPROACH, */
  FETCH_DATA,
  WORKOUT_FINISH,
} from '../constants';

export default (state = [], action) => {
  const { type, res } = action;

  if (type === FETCH_DATA) {
    if (!res) return state;
    if (!state.length) {
      return state.concat(res.statistic);
    }

    return state.map((stateObj) => {
      for (let i = 0; i < res.statistic.length; i++) {
        if (stateObj.date === res.statistic[i].date) {
          return res.statistic[i];
        }
        return stateObj;
      }
    });
  }

  if (type === WORKOUT_START) {
    if (!res) return state;
    // if new response doesn't match with existing state we add it to state,
    // else update state through map
    if (state.every(stateObj => stateObj.date !== res.date)) {
      return state.concat(res);
    }

    return state.map((stat) => {
      if (stat.date === res.date) return res;
      return stat;
    });
  }

  if (type === WORKOUT_FINISH) {
    // Update state if we have new stat
    if (!res) return state;

    return state.map((stat) => {
      if (stat.date === res.date) return res;
      return stat;
    });
  }

  return state;
};
