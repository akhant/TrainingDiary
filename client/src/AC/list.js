import {
  GET_LIST,
  REMOVE_FROM_LIST,
  ADD_TO_LIST,
  CHANGE_LIST
} from "../constants";

export const getListOfExercises = () => ({
  type: GET_LIST
});

export const addToList = data => ({
  type: ADD_TO_LIST,
  data
});

export const removeFromList = id => ({
  type: REMOVE_FROM_LIST,
  id
});

export const changeList = (id, newExerciseData) => ({
  type: CHANGE_LIST,
  id,
  newExerciseData
});
