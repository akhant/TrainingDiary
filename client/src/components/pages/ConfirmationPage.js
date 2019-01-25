import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class ConfirmationPage extends React.Component {


  render() {
    return (
      <div className="confirm_restricted">
        Your email was confirmed. Go to dashboard ->
        {' '}
        <Link className="btn" to="/dashboard">
          {' '}
          Dashboard
          {' '}
        </Link>
        <br />
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
};

export default ConfirmationPage;
