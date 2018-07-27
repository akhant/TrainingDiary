import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { resetPasswordRequest } from "../../../AC/auth";

class ForgotPasswordPage extends React.Component {
  submit = data => this.props.resetPasswordRequest(data);

  render() {
    return (
      <div>
        <ForgotPasswordForm submit={this.submit} />
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { resetPasswordRequest }
)(ForgotPasswordPage);
