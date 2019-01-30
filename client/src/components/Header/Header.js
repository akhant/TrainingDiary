import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Image, Grid } from 'semantic-ui-react';
import logo from '../../assets/images/logo_middle.png';
import { AuthContext } from '../context';
import Logout from './Logout';

const Header = () => {
  const { data } = useContext(AuthContext);

  return (
    <Grid centered className="header">
      <Grid.Row columns={3}>
        <Grid.Column verticalAlign="middle">
          <Link to="/dashboard">
            <span className="header__h1 header__h1_left">Training</span>
          </Link>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <span className="header__logo">
            <Link to="/">
              <Image src={logo} alt="logo" />
            </Link>
          </span>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Link to="/statistic">
            <span className="header__h1 header__h1_right">Diary</span>
          </Link>
        </Grid.Column>
      </Grid.Row>

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
