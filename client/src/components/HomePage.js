import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import logo from '../assets/images/logo.png';

const HomePage = () => (
  <div className="home-page">
    <h1>Training diary</h1>
    <div className="home-page__text">
      <p>Do exercises, watch your progress, become stronger </p>
      <Image src={logo} alt="logo" className="logo" />
    </div>
    <div className="home-page__actions">
      <Link className="btn" to="/signup">
        Sign Up
      </Link>{' '}
      <Link className="btn" to="/login">
        Log in
      </Link>
    </div>
  </div>
);

export default HomePage;
