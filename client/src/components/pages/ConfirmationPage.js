import React from 'react';
import PropTypes from 'prop-types';
/* import { Message, Icon } from "semantic-ui-react"; */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirm } from '../../AC/auth';

class ConfirmationPage extends React.Component {
  componentDidMount() {
    this.props.confirm();
  }

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

export default connect(
  null,
  { confirm }
)(ConfirmationPage);
