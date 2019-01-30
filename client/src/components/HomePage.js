import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="home-page">
    <h1>Welcome to the world of power and self-discipline!</h1>
    <p>This place helps you to make yourself stronger.</p>
    <div>
      <p>
        If you've never been here before click{' '}
        <Link className="btn" to="/signup">
          Sign Up
        </Link>{' '}
        to start transformation to Halk
      </p>
      <p>
        Or continue and{' '}
        <Link className="btn" to="/login">
          Login
        </Link>
      </p>
    </div>
  </div>
);

export default HomePage;
