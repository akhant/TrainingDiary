import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/* import { Message } from "semantic-ui-react"; */
import ResetPasswordForm from "./ResetPasswordForm";
import { resetPassword } from "../../../AC/auth";

class ResetPasswordPage extends React.Component {
  submit = data => this.props.resetPassword(data);

  render() {
    return (
      <div>
        <ResetPasswordForm submit={this.submit} />
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired
};

export default connect(
  null,
  { resetPassword }
)(ResetPasswordPage);
