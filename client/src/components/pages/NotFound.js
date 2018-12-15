import React from 'react';
import { Link } from 'react-router-dom';

export default ({ location }) => (
  <div className="confirm_restricted">

    Page "
    {location.pathname}
" not found.
    <br />

    404
    <br />
    <Link to="/dashboard" className="btn">

      Go to dashboard
    </Link>
  </div>
);
