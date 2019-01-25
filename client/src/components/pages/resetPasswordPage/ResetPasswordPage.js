import React from 'react';
import PropTypes from 'prop-types';
import ResetPasswordForm from './ResetPasswordForm';


class ResetPasswordPage extends React.Component {


  render() {
    return (
      <div>
        <ResetPasswordForm />
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

export default ResetPasswordPage;
