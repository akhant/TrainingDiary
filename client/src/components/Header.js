import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../AC/auth';
import logo from '../assets/images/logo_middle.png';
import { AuthContext } from './context';

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

      {data.getCurrentUser ? (
        <div className="logout_wrapper">
          <button className="btn" onClick={() => logout()}>

            Logout
          </button>
        </div>
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

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(Header);
