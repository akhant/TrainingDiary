import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

const ErrorMessage = (props) => {
  const { message } = props.params;
  return (
    <div className="error-message">
      {message && (
        <Message negative>
          <p>{message}</p>
        </Message>
      )}
    </div>
  );
};

export default connect(({ params }) => ({
  params,
}))(ErrorMessage);
