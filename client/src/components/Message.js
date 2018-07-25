import React from "react";
import { connect } from "react-redux";

const Message = props => {
  const { messages } = props;

  return (
    <div className="Message">
      {messages.message && (
        <div className="errorMessage">
          <p>{messages.message}</p>
        </div>
      )}
    </div>
  );
};

export default connect(({ messages }) => ({
  messages
}))(Message);
