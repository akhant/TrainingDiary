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
      list
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
  mutation($userId: String!, $exerciseName: String! $weightFrom: Int, $weightTo: Int) {
    addToList(userId: $userId, exerciseName: $exerciseName, weightFrom: $weightFrom, weightTo: $weightTo) {
      exerciseDescriptionId
    }
  }
`;

export const REMOVE_FROM_LIST = gql`
mutation($userId: String!, $exerciseId: String! ) {
  removeFromList(username: $username, exerciseId: $exerciseId) {
    exerciseDescriptionId
  }
}
`;
