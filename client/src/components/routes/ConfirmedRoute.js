import React, { useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthContext } from '../context';

const ConfirmedRoute = ({ component: Component, ...rest }) => {
  const { data } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => (data && data.getCurrentUser && data.getCurrentUser.confirmed ? (
        <Component {...props} />
      ) : (
        <div className="confirm_restricted">
          {' '}
            Please confirm your email to get access
          {' '}
          <br />
          <Link to="/dashboard" className="btn">
              Dashboard
          </Link>
          {' '}
        </div>
      ))
      }
    />
  );
};

export default ConfirmedRoute;
