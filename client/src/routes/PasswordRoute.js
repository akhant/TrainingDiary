import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PasswordRoute = ({ requestChangePassword, component: Component, ...rest }) => (
  
  <Route
    {...rest}
    render={props =>
        requestChangePassword ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

PasswordRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    requestChangePassword: state.user.requestChangePassword
  };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(PasswordRoute);
