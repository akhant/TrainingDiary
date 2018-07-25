import {
  ADD_EXERCISE,
  FETCH_DATA,
  DROP_DATABASE,
  DELETE_EXERCISE,
  CHANGE_NAME,
  DELETE_APPROACH,
  ADD_APPROACH,
  CHANGE_APPROACH,
  WORKOUT_START,
  WORKOUT_FINISH,
  USER_SIGNUP,
  USER_LOGIN,
  USER_CONFIRMATION,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD
} from "constants";

import { userLoggedIn } from "../AC/auth";

const baseUrl = "http://localhost:3000/api";

const fetchData = store => next => action => {
  const {
    email,
    token,
    credentials,
    user,
    data,
    type,
    pickDate,
    workoutFinish,
    workoutStart,
    approachValue,
    approachId,
    exerciseId,
    dateId,
    exerciseName,
    date,
    exerciseTime,
    restTime,
    weight,
    ...rest
  } = action;

  if (type === FETCH_DATA) {
    return fetch(`${baseUrl}/data`)
      .then(res => res.json())
      .then(res => next({ res, type, ...rest }));
  }

  if (type === USER_SIGNUP) {
    fetch(`${baseUrl}/users`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        data
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        // check res and token
        localStorage.bookwormJWT = res.user.token;
        store.dispatch(userLoggedIn(res.user));
        return next({ ...rest });
      });
  }

  if (type === USER_CONFIRMATION) {
    fetch(`${baseUrl}/confirmation`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        email: store.getState().user.email
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        // check res and token
        localStorage.bookwormJWT = res.user.token;
        store.dispatch(userLoggedIn(res.user));
        return next({ res: res.user, ...rest });
      });
  }

  if (type === RESET_PASSWORD_REQUEST) {
    fetch(`${baseUrl}/reset_password_request`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        email
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ ...res, ...action }));
  }

  if (type === RESET_PASSWORD) {
    fetch(`${baseUrl}/reset_password`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        data
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ ...res, ...action }));
  }

  if (type === USER_LOGIN) {
    fetch(`${baseUrl}/auth`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        credentials
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        if (!res.user.error) {
          localStorage.bookwormJWT = res.user.token;
        }

        store.dispatch(userLoggedIn(res.user));
        next({ res: res.user, ...rest });
      });
  }

  if (type === ADD_EXERCISE) {
    fetch(`${baseUrl}/data`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        dateId,
        date: pickDate._d.toDateString()
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ pickDate, res, type, ...rest }));
  }

  if (type === DROP_DATABASE) {
    fetch(`${baseUrl}/drop`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        date: pickDate._d.toDateString()
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ pickDate, res, type, ...rest }));
  }

  if (type === DELETE_EXERCISE) {
    fetch(`${baseUrl}/deleteEx`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        date: pickDate._d.toDateString(),
        exerciseId
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ pickDate, res, type, ...rest }));
  }

  if (type === CHANGE_NAME) {
    fetch(`${baseUrl}/changeName`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        exerciseName,
        exerciseId
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ res, type, ...rest }));
  }
  if (type === ADD_APPROACH) {
    fetch(`${baseUrl}/addApproach`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        date,
        dateId,
        exerciseId,
        exerciseName,
        approachId
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ res, type, ...rest }));
  }
  if (type === DELETE_APPROACH) {
    fetch(`${baseUrl}/deleteApproach`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        approachId
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ res, type, ...rest }));
  }
  if (type === CHANGE_APPROACH) {
    fetch(`${baseUrl}/changeApproach`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        approachValue,
        approachId,
        exerciseTime,
        restTime,
        weight
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ res, type, ...rest }));
  }
  if (type === WORKOUT_START) {
    fetch(`${baseUrl}/workoutStart`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        date: pickDate._d.toDateString(),
        workoutStart
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ workoutStart, pickDate, res, type, ...rest }));
  }

  if (type === WORKOUT_FINISH) {
    fetch(`${baseUrl}/workoutFinish`, {
      method: "post",
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        date: pickDate._d.toDateString(),
        workoutFinish
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => next({ workoutFinish, pickDate, res, type, ...rest }));
  }

  console.log("STORE STATE FROM MIDDLEWARE", store.getState());
  return next(action);
};

export default fetchData;
