import {
  ADD_EXERCISE,
  FETCH_DATA,
  DROP_DATABASE,
  DELETE_EXERCISE,
  CHANGE_NAME
} from "constants";


export default (state = [], action) => {
  const { res } = action;
  
  if (!res) return state;


  if (action.type === FETCH_DATA) {
    state = res.exercises;
    return state;
  }

  if (action.type === ADD_EXERCISE) {
    if (res.newDate) {
      return state.concat(res.newExercise);
    } else {
      return state.concat([res]);
    }
  }


  if (action.type === CHANGE_NAME) {
      return state.map(exercise => {
        if (exercise._id === res.updatedExercise._id) {
          return res.updatedExercise
        } else {
          return exercise
        }
      })
    
  }

  if (action.type === DELETE_EXERCISE) {
    return state.filter(exercise => exercise._id !== res.removedExercise._id);
  }

  if (action.type === DROP_DATABASE) {
    
    return state.filter(exercise => {
      for (let i = 0; i < res.removedExercises.length; i++) {
        return exercise.date !== res.removedExercises[i].date;
      }
    });
  }

  return state;
};
