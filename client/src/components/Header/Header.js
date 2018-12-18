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

      {data && data.getCurrentUser ? (
        <Logout />
      ) : (
        <div className="logout_wrapper">
          <Link className="btn" to="/login">

            Log in
          </Link>
          <Link className="btn" to="/signup">

            Sign Up
          </Link>
        </div>
      )}

      <div className="hr" />
    </div>
  );
};

export default Header;
