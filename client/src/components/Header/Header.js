import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { AuthContext } from '../context';
import Logout from './Logout';

const Header = () => {
  const { data } = useContext(AuthContext);

  return (
    <Grid className="header">
      {/* <Grid.Row centered columns={3}>
        <Grid.Column width={5} verticalAlign="middle">
          <Link to="/dashboard">
            <div className="header__h1 header__h1_left">Training</div>
          </Link>
        </Grid.Column>
        <Grid.Column width={6} verticalAlign="middle">
          <div className="header__logo">
            <Link to="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
        </Grid.Column>
        <Grid.Column width={5} verticalAlign="middle">
          <Link to="/statistic">
            <div className="header__h1 header__h1_right">Diary</div>
          </Link>
        </Grid.Column>
      </Grid.Row> */}

      <div className="header__nav">
        {data && data.getCurrentUser ? (
          <div>
            <Link className="header__nav_link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="header__nav_link" to="/statistic">
              Statistic
            </Link>
            <Link className="header__nav_link" to="/exercises">
              Exercises
            </Link>
            <Logout />
          </div>
        ) : (
          <div>
            <Link className="header__nav_link" to="/login">
              Log in
            </Link>
            <Link className="header__nav_link" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </Grid>
  );
};

export default Header;
