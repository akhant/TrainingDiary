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
  mutation($exerciseName: String! $weightFrom: Int, $weightTo: Int) {
    addToList(exerciseName: $exerciseName, weightFrom: $weightFrom, weightTo: $weightTo) {
      exerciseDescriptionId
    }
  }
`;

export const CHANGE_LIST = gql`
  mutation($exerciseDescriptionId: ID!, $exerciseName: String! $weightFrom: Int, $weightTo: Int) {
    changeList(exerciseDescriptionId: $exerciseDescriptionId, exerciseName: $exerciseName, weightFrom: $weightFrom, weightTo: $weightTo) {
      exerciseDescriptionId
    }
  }
`;

export const REMOVE_FROM_LIST = gql`
mutation($exerciseDescriptionId: ID! ) {
  removeFromList(exerciseDescriptionId: $exerciseDescriptionId) {
    exerciseDescriptionId
  }
}
`;
