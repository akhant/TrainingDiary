import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries';
import { AuthContext } from './context';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      return (
        <AuthContext.Provider value={{ data, refetch }}>
          <Component {...props} />
        </AuthContext.Provider>
      );
    }}
  </Query>
);

export default withSession;
