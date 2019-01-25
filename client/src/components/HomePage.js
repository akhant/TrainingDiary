import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const HomePage = ({ isAuthenticated }) => (
  <div className="HomePage">
    <h1>Welcome to the world of power and self-discipline!</h1>
    <p>This place helps you to make yourself stronger.</p>

    {isAuthenticated ? (
      <div>
        <button type="button" className="btn"/*  onClick={() => logout() } */>
          Logout
        </button>
        <Link className="btn" to="/dashboard">
          Dashboard
          {' '}
        </Link>
        <Link className="btn" to="/statistic">
          Statistic
          {' '}
        </Link>
      </div>
    ) : (
      <div>
        <p>
          If you've never been here before click
          {' '}
          <Link className="btn" to="/signup">
            Sign Up
          </Link>
          {' '}
          to start transformation to Halk
        </p>
        <p>
          Or continue and
          {' '}
          <Link className="btn" to="/login">
            Login
          </Link>
        </p>
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(
  mapStateToProps
)(HomePage);
