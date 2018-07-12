import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
/* import * as actions from "../../actions/auth"; */
/*  */
const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? (
      <div>
        <button onClick={() => logout()}>Logout</button>
        <Link to="/dashboard">Dashboard </Link>
        <Link to="/statistic">Statistic </Link>
      </div>
    ) : (
      <div>
        <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
  /* logout: PropTypes.func.isRequired */
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(HomePage);
/* { logout: actions.logout } */
