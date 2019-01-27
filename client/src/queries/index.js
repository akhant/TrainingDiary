import { gql } from 'apollo-boost';

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      confirmed
      userId
    }
  }
`;

export const GET_LIST = gql`
  query {
    getList {
      list {
        exerciseName
        weightFrom
        weightTo
        exerciseDescriptionId
      }
    }
  }
`;

export const GET_DAY_DATA = gql`
  query($date: String!) {
    getDayData(date: $date) {
      date
      exercises {
        exerciseName
        exerciseId
      }
      approaches {
        date
        value
        weight
        exerciseName
        approachNumber
        approachId
        exerciseId
        approachTime
        restTime
        startApproachTime
        finishApproachTime
      }
      list {
        exerciseName
        weightFrom
        weightTo
        exerciseDescriptionId
      }
      statistic {
        date
        workoutStart
        workoutFinish
        workoutTime
      }
    }
  }
`;

export const GET_EXERCISE_APPROACHES = gql`
  query($exerciseName: String!) {
    getExerciseApproaches(exerciseName: $exerciseName) {
      approaches {
        date
        value
        weight
        exerciseName
        approachNumber
        approachId
        exerciseId
        approachTime
        restTime
        startApproachTime
        finishApproachTime
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_TO_LIST = gql`
  mutation($exerciseName: String!, $weightFrom: Int, $weightTo: Int) {
    addToList(exerciseName: $exerciseName, weightFrom: $weightFrom, weightTo: $weightTo) {
      exerciseDescriptionId
    }
  }
`;

export const CHANGE_LIST = gql`
  mutation($exerciseDescriptionId: ID!, $exerciseName: String!, $weightFrom: Int, $weightTo: Int) {
    changeList(
      exerciseDescriptionId: $exerciseDescriptionId
      exerciseName: $exerciseName
      weightFrom: $weightFrom
      weightTo: $weightTo
    ) {
      exerciseDescriptionId
    }
  }
`;

export const REMOVE_FROM_LIST = gql`
  mutation($exerciseDescriptionId: ID!) {
    removeFromList(exerciseDescriptionId: $exerciseDescriptionId) {
      exerciseDescriptionId
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation($date: String!) {
    addExercise(date: $date) {
      exerciseName
      exerciseId
    }
  }
`;

export const REMOVE_EXERCISE = gql`
  mutation($exerciseId: ID!) {
    removeExercise(exerciseId: $exerciseId) {
      exerciseId
    }
  }
`;

export const CHANGE_SELECT_EXERCISE_NAME = gql`
  mutation($exerciseId: ID!, $exerciseName: String!) {
    changeSelectExerciseName(exerciseId: $exerciseId, exerciseName: $exerciseName) {
      exerciseId
      exerciseName
    }
  }
`;

export const ADD_APPROACH = gql`
  mutation($exerciseId: ID!, $startApproachTime: String!) {
    addApproach(exerciseId: $exerciseId, startApproachTime: $startApproachTime) {
      approachId
    }
  }
`;

export const REMOVE_APPROACH = gql`
  mutation($approachId: ID!) {
    removeApproach(approachId: $approachId) {
      approachId
    }
  }
`;

export const CHANGE_APPROACH_VALUE = gql`
  mutation($approachId: ID!, $value: String!, $finishApproachTime: String!) {
    changeApproachValue(approachId: $approachId, value: $value, finishApproachTime: $finishApproachTime) {
      approachId
    }
  }
`;

export const CHANGE_APPROACH_WEIGHT = gql`
  mutation($approachId: ID!, $weight: Int!) {
    changeApproachWeight(approachId: $approachId, weight: $weight) {
      approachId
    }
  }
`;

export const WORKOUT_START = gql`
  mutation($workoutStart: String!) {
    workoutStart(workoutStart: $workoutStart) {
      workoutStart
    }
  }
`;

export const WORKOUT_FINISH = gql`
  mutation($workoutFinish: String!) {
    workoutFinish(workoutFinish: $workoutFinish) {
      workoutFinish
    }
  }
`;

export const SEND_FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    sendForgotPassword(email: $email) {
      ok
    }
  }
`;
