import {
  GET_LIST,
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  CHANGE_LIST,
} from '../constants';

export default (state = [], action) => {
  const {
    list, type, exercise, id, newExerciseData,
  } = action;
  switch (type) {
    case GET_LIST:
      if (!list) return state;
      return list;
    case ADD_TO_LIST:
      if (!exercise) return state;
      return state.concat([exercise]);
    case REMOVE_FROM_LIST:
      return state.filter(exercise => exercise._id !== id);
    case CHANGE_LIST:
      if (!id || !newExerciseData) return state;
      return state.map((exercise) => {
        if (exercise._id === id) return { _id: id, ...newExerciseData };
        return exercise;
      });
    default:
      return state;
  }
};
