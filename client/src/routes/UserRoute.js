import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../components/context';

const UserRoute = ({ component: Component, ...rest }) => {
  const { data } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (data && data.getCurrentUser ? <Component {...props} /> : <Redirect to="/" />)
      }
    />
  );
};

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default UserRoute;
