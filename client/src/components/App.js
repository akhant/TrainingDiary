import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import configureStore from '../store';
import Header from './Header/Header';
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';
/* import ConfirmedRoute from './routes/ConfirmedRoute'; */
import SignupPage from './pages/signupPage/SignupPage';
import LoginPage from './pages/loginPage/LoginPage';
import NotFound from './pages/NotFound';
import ForgotPasswordPage from './pages/forgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/resetPasswordPage/ResetPasswordPage';
import ExercisesPage from './pages/exercisesPage/ExercisesPage';
import HomePage from './HomePage';
import Main from './pages/dashboard/Dashboard';
import Confirmation from './Confirmation';
import Statistic from './pages/statistic/Statistic';
import withSession from './withSession';
import '../assets/js';
import 'semantic-ui-css/semantic.min.css';
import '../assets/styles/styles.sass';
/* import ErrorBoundary from './ErrorBoundary'; */

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

// TODO: return ConfirmedRoute for statistic and exercises pages
const Root = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <GuestRoute path="/signup" exact component={SignupPage} />
          <GuestRoute path="/login" exact component={LoginPage} />
          <GuestRoute path="/forgot_password" exact component={ForgotPasswordPage} />
          <UserRoute path="/dashboard" exact component={Main} />
          <UserRoute path="/statistic" exact component={Statistic} />
          <GuestRoute path="/reset_password/:token" exact component={ResetPasswordPage} />
          <Route path="/confirmation/:token" exact component={Confirmation} />
          <UserRoute path="/exercises" exact component={ExercisesPage} />
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
