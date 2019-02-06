import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="home-page">
    <h1>Training diary</h1>
    <div className="home-page__text">
      <p>Do exercises</p>
      <p>Make statistic and watch your progress</p>
      <p>Feel better</p>
      <p>Do more exercises</p>
    </div>
    <div className="home-page__actions">
      <p>To start</p>
      <Link className="btn" to="/signup">
        Sign Up
      </Link>{' '}
      <p>or</p>
      <Link className="btn" to="/login">
        Log in
      </Link>
      <p>to continue</p>
    </div>
  </div>
);

export default HomePage;
