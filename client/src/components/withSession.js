import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries';
import { RefetchContext } from './context'


const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      console.log('data', data);
      if (loading) return null;
      return (
        <RefetchContext.Provider value={refetch}>
          <Component {...props} />
        </RefetchContext.Provider>
      );
    }}
  </Query>
);

export default withSession;
