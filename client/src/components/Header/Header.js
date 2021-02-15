import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { AuthContext } from '../context';
import Logout from './Logout';

const Header = (props) => {
  const { data } = useContext(AuthContext);

  return (
    <Grid className='header'>
      <div className='header__nav'>
        {data && data.getCurrentUser ? (
          <div>
            <Link
              style={{
                color: window.location.pathname === '/' ? '#cc0000' : '#111',
              }}
              className='header__nav_link'
              to='/dashboard'
            >
              Dashboard
            </Link>
            <Link
              style={{
                color: window.location.pathname === '/' ? '#cc0000' : '#111',
              }}
              className='header__nav_link'
              to='/statistic'
            >
              Statistic
            </Link>
            <Link
              style={{
                color: window.location.pathname === '/' ? '#cc0000' : '#111',
              }}
              className='header__nav_link'
              to='/exercises'
            >
              Exercises
            </Link>
            <Logout />
          </div>
        ) : (
          <div>
            <Link className='header__nav_link' to='/login'>
              Log in
            </Link>
            <Link className='header__nav_link' to='/signup'>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </Grid>
  );
};

export default Header;
