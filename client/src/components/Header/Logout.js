import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const Logout = ({ history }) => {
  const onLogout = (client) => {
    localStorage.removeItem('TrainingDiaryToken');
    client.resetStore();
    history.push('/');
  };
  return (
    <ApolloConsumer>
      {client => (
        <button className="header__nav_link" onClick={() => onLogout(client)}>
          Logout
        </button>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Logout);
