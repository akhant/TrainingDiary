import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const UserRoute = ({ isConfirmed, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isConfirmed ? (
        <Component {...props} />
      ) : (
        <div className="confirm_restricted"> Please confirm your email to get access </div>
      )
    }
  />
);

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: state.user.confirmed
  };
}

export default connect(mapStateToProps)(UserRoute);
