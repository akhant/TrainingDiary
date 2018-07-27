import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupForm from "./SignupForm";
import { signup } from "../../../AC/auth";

class SignupPage extends React.Component {
  submit = data =>
    this.props.signup(data);

  render() {
    return (
      <div>
        <h1 className="center">Sign Up!</h1>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {

  signup: PropTypes.func.isRequired
};

export default connect(
  null,
  { signup }
)(SignupPage);
