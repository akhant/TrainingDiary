import React from 'react';

import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = () => (
  <div>
    <h1 className="center">Log In!</h1>
    <LoginForm />
    <Link className="forgot_password__link" to="/forgot_password">
      Forgot Password?
    </Link>
  </div>
);

export default LoginPage;
