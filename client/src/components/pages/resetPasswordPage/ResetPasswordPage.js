import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordPage = ({
  match: {
    params: { token },
  },
}) => (
  <div className="reset-password-page">
    <ResetPasswordForm token={token} />
  </div>
);

export default ResetPasswordPage;
