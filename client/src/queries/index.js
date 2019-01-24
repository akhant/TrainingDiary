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
        value
        approachId
        exerciseName
        exerciseTime
        restTime
        timeFromStart
        weight
        approachNumber
        exerciseId
      }
      list {
        exerciseName
        weightFrom
        weightTo
        exerciseDescriptionId
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
    addToList(
      exerciseName: $exerciseName
      weightFrom: $weightFrom
      weightTo: $weightTo
    ) {
      exerciseDescriptionId
    }
  }
`;

export const CHANGE_LIST = gql`
  mutation(
    $exerciseDescriptionId: ID!
    $exerciseName: String!
    $weightFrom: Int
    $weightTo: Int
  ) {
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
  mutation($exerciseId: ID!, $weight: Int!) {
    addApproach(exerciseId: $exerciseId, weight: $weight) {
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
  mutation($approachId: ID!, $value: String!) {
    changeApproachValue(approachId: $approachId, value: $value) {
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
