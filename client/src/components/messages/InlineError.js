import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => <div className="inline-error">{text}</div>;

InlineError.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InlineError;
