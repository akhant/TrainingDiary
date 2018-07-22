import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/* import { Message } from "semantic-ui-react"; */
import ResetPasswordForm from "../forms/ResetPasswordForm";
import { resetPassword } from "../../AC/auth";

class ResetPasswordPage extends React.Component {
  /*  state = {
    loading: true,
    success: false
  }; */

  submit = data => this.props.resetPassword(data);
  /*    .then(() => this.props.history.push("/login")); */

  render() {
    /*  const { loading, success } = this.state;
    const token = this.props.match.params.token; */

    return (
      <div>
        Reset Password Page
        <ResetPasswordForm submit={this.submit} />
        {/* loading && <Message>Loading</Message>}
        {!loading &&
        success && <ResetPasswordForm submit={this.submit} token={token} />}
        {!loading && !success && <Message>Invalid Token</Message> */}
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired,
/*   history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }) */
};

export default connect(
  null,
  { resetPassword }
)(ResetPasswordPage);
