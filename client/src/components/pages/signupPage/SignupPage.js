import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <h1 className="center">Sign Up!</h1>
        <SignupForm />
      </div>
    );
  }
}


export default SignupPage;
