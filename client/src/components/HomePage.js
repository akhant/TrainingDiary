import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className='home-page'>
    <div className='home-page__item'>
      <h1>Training diary</h1>
      <div className='home-page__text'>
        <p>Do exercises, watch your progress, become stronger </p>
      </div>
      <div className='home-page__actions'>
        <Link className='btn' to='/signup'>
          Sign Up
        </Link>{' '}
        <Link className='btn' to='/login'>
          Log in
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
