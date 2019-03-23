import React from 'react';
import { Query } from 'react-apollo';
import { CONFIRMATION } from '../queries';
import RedirectWithMessage from './messages/RedirectWithMessage';

const Confirmation = ({
  match: {
    params: { token },
  },
}) => (
  <Query query={CONFIRMATION} variables={{ token }}>
    {({ data }) => {
      if (data && data.confirmation && data.confirmation.ok) {
        return <RedirectWithMessage to="/dashboard" message="Your email has been confirmed" time={5} />;
      }
      return <div className="confirmation-response">You need to confirm your email</div>;
    }}
  </Query>
);

export default Confirmation;
