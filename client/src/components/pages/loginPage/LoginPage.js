import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1 className="center">Log In!</h1>

        <LoginForm submit={this.submit} />

        <Link className="forgot_password__link" to="/forgot_password">
          Forgot Password?
        </Link>
      </div>
    );
  }
}

export default LoginPage;
