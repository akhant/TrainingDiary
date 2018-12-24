import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo_middle.png';
import { AuthContext } from '../context';
import Logout from './Logout';

const Header = () => {
  const { data } = useContext(AuthContext);

  return (
    <div className="header">
      <Link to="/">
        <span className="image_span">
          <Image src={logo} alt="logo" />
        </span>

        <h1 className="main_h1">Training diary</h1>
      </Link>

      <div className="header__nav">
        {data && data.getCurrentUser ? (
          <div>
            <Logout />

            <Link className="header__nav_link" to="/dashboard">

              Dashboard
            </Link>
            <Link className="header__nav_link" to="/statistic">

              Statistic
            </Link>
            <Link className="header__nav_link" to="/exercises">

              Exercises
            </Link>
          </div>
        ) : (
          <div >
            <Link className="header__nav_link" to="/login">

              Log in
            </Link>
            <Link className="header__nav_link" to="/signup">

              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div className="hr" />
    </div>
  );
};

export default Header;
