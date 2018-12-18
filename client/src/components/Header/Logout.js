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
        <div className="logout_wrapper">
          <button className="btn" onClick={() => onLogout(client)}>

            Logout
          </button>
        </div>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Logout);
