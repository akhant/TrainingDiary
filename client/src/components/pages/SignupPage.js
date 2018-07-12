import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupForm from "../forms/SignupForm";
import { signup } from "../../AC/users";

class SignupPage extends React.Component {
  submit = data =>
    this.props.signup(data);

  render() {
    return (
      <div>
        Signup Page
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
