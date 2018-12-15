import {
  FETCH_DATA,
  ADD_APPROACH,
  DELETE_APPROACH,
  DELETE_EXERCISE,
  DROP_DATABASE,
  CHANGE_APPROACH,
  CHANGE_NAME,
} from '../constants';

export default (state = [], action) => {
  const { res, type } = action;

  if (!res) return state;

  if (action.type === FETCH_DATA) {
    return res.approaches;
  }

  if (type === ADD_APPROACH) {
    if (res.newApproach) return state.concat([res.newApproach]);

    return state.concat([res]);
  }
  if (type === CHANGE_APPROACH) {
    return state.map((approach) => {
      if (approach._id === res._id) return res;

      return approach;
    });
  }

  if (type === CHANGE_NAME) {
    if (res.approaches[0]) {
      return state
        .filter(
          approach => approach.exerciseId !== res.approaches[0].exerciseId
        )
        .concat(res.approaches);
    }
  }

  if (type === DELETE_APPROACH) {
    return state.filter(approach => approach._id !== res._id);
  }

  if (type === DELETE_EXERCISE) {
    if (res.removedExercises) {
      return state.filter((approach) => {
        for (let i = 0; i < res.removedApproaches.length; i++) {
          return approach.exerciseId !== res.removedApproaches[i].exerciseId;
        }
      });
    }
  }

  if (type === DROP_DATABASE) {
    return state.filter((approach) => {
      for (let i = 0; i < res.removedApproaches.length; i++) {
        return approach.date !== res.removedApproaches[i].date;
      }
    });
  }

  return state;
};
