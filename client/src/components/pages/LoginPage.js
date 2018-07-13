import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import { login } from "../../AC/auth";

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data)

  render() {
    return (
      <div>
        <h1>Login page</h1>

        <LoginForm submit={this.submit} />

        <Link to="/forgot_password">Forgot Password?</Link>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
