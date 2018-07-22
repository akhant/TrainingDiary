import React from "react";
import PropTypes from "prop-types";
/* import { Message, Icon } from "semantic-ui-react"; */
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirm } from "../../AC/auth";

class ConfirmationPage extends React.Component {
  componentDidMount() {
    this.props.confirm();
  }

  render() {
    return (
      <div className="confirm_restricted">
        Your email was confirmed. Go to dashboard ->{" "}
        <Link className="btn" to="/dashboard">
          {" "}
          Dashboard{" "}
        </Link>
        <br />
        {/*  {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading &&
        success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Thank you. Your account has been verified.
              </Message.Header>
              <Link to="/dashboard">Go to your dashboard</Link>
            </Message.Content>
          </Message>
        )}

        {!loading &&
        !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Ooops. Invalid token it seems.</Message.Header>
            </Message.Content>
          </Message>
        )} */}
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
