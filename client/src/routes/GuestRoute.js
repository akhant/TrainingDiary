import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../components/context';

const GuestRoute = ({ component: Component, ...rest }) => {
  const { data } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => (data && !data.getCurrentUser ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      ))
      }
    />
  );
};

export default GuestRoute;
