import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import decode from 'jwt-decode';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import configureStore from '../store';
import Header from './Header/Header';
import UserRoute from '../routes/UserRoute';
import GuestRoute from '../routes/GuestRoute';
import ConfirmedRoute from '../routes/ConfirmedRoute';
import SignupPage from './pages/signupPage/SignupPage';
import LoginPage from './pages/loginPage/LoginPage';
import NotFound from './pages/NotFound';
import ConfirmationPage from './pages/ConfirmationPage';
import ForgotPasswordPage from './pages/forgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/resetPasswordPage/ResetPasswordPage';
import ExercisesPage from './pages/exercisesPage/ExercisesPage';
import HomePage from './HomePage';
import Main from './pages/dashboard/Main';
import Statistic from './pages/statistic/Statistic';
import { userLoggedIn } from '../AC/auth';
import withSession from './withSession';
import '../assets/js';
import '../assets/styles/bootstrap.css';
import '../assets/styles/styles.sass';

const store = configureStore();

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    const token = localStorage.getItem('TrainingDiaryToken');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      // localStorage.removeItem('TrainingDiaryToken');
    }
  },
});

/* if (localStorage.TrainingDiaryToken) {
  const payload = decode(localStorage.TrainingDiaryToken);
  const user = {
    token: localStorage.TrainingDiaryToken,
    email: payload.email,
    confirmed: payload.confirmed,
  };
  store.dispatch(userLoggedIn(user));
} */

// TODO: return ConfirmedRoute for statistic and exercises pages
const Root = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route exact path="/confirmation" component={ConfirmationPage} />
          <GuestRoute path="/signup" exact component={SignupPage} />
          <GuestRoute path="/login" exact component={LoginPage} />
          <GuestRoute
            path="/forgot_password"
            exact
            component={ForgotPasswordPage}
          />
          <UserRoute path="/dashboard" exact component={Main} />
          <Route path="/statistic" exact component={Statistic} />
          <GuestRoute path="/reset_password" exact component={ResetPasswordPage} />
          <Route path="/exercises" exact component={ExercisesPage} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

const RootWithSession = withSession(Root);
const App = () => (
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>
);

export default App;
