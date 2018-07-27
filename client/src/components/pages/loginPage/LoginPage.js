import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { login } from "../../../AC/auth";

class LoginPage extends Component {
  submit = data => this.props.login(data);

  render() {
    return (
      <div>
        <h1 className="center">Log In!</h1>

        <LoginForm submit={this.submit} />

        <Link className="forgot_password__link" to="/forgot_password">
          Forgot Password?
        </Link>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  { login }
)(LoginPage);
