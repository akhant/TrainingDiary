import {
  FETCH_DATA,
  ADD_EXERCISE,
  DROP_DATABASE,
  DELETE_EXERCISE,
  CHANGE_NAME,
  ADD_APPROACH,
  DELETE_APPROACH,
  CHANGE_APPROACH,
  WORKOUT_START,
  SHOW_MESSAGE,
  WORKOUT_FINISH,
  ADD_PARAM,
} from '../constants';

export const fetchData = pickDate => ({
  type: FETCH_DATA,
  pickDate,
});

export const addExercise = (pickDate, dateId) => ({
  type: ADD_EXERCISE,
  pickDate,
  dateId,
});

export const dropDatabase = pickDate => ({
  type: DROP_DATABASE,
  pickDate,
});

export const deleteExercise = (pickDate, exerciseId) => ({
  type: DELETE_EXERCISE,
  pickDate,
  exerciseId,
});

export const changeExerciseNameValue = (exerciseName, exerciseId) => ({
  type: CHANGE_NAME,
  exerciseName,
  exerciseId,
});

export const addApproach = (date, dateId, exerciseId, exerciseName, approachId) => ({
  type: ADD_APPROACH,
  date,
  dateId,
  exerciseId,
  exerciseName,
  approachId,
});

export const deleteApproach = approachId => ({
  type: DELETE_APPROACH,
  approachId,
});

export const changeApproach = (approachValue, approachId, exerciseTime, restTime, weight) => ({
  type: CHANGE_APPROACH,
  approachValue,
  approachId,
  exerciseTime,
  restTime,
  weight,
});

export const showMessage = message => ({
  type: SHOW_MESSAGE,
  message,
});

export const workoutStart = (pickDate, workoutStart) => ({
  type: WORKOUT_START,
  pickDate,
  workoutStart,
});

export const workoutFinish = (pickDate, workoutFinish) => ({
  type: WORKOUT_FINISH,
  pickDate,
  workoutFinish,
});

export const addParam = param => ({
  type: ADD_PARAM,
  param,
});
